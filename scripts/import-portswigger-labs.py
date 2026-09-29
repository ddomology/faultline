#!/usr/bin/env python3
"""Import a saved PortSwigger All labs page into a small, public-safe catalog.

Only public lab labels/URLs and the explicit completion snapshot are retained.
The source HTML, scripts, account widgets, cookies, and identifiers are not copied.
Uses Python's standard library. Re-running with the same source/date is deterministic.

Usage:
    python scripts/import-portswigger-labs.py saved-all-labs.html \
        --output data/labs.json --snapshot-date 2026-09-29
"""

from __future__ import annotations

import argparse
from collections import Counter
from dataclasses import dataclass, field
from datetime import date
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import urljoin, urlsplit, urlunsplit


SOURCE_URL = "https://portswigger.net/web-security/all-labs"
DIFFICULTIES = {"APPRENTICE", "PRACTITIONER", "EXPERT"}
VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


@dataclass
class Node:
    tag: str
    attrs: dict[str, str]
    children: list[Node | str] = field(default_factory=list)

    def walk(self):
        yield self
        for child in self.children:
            if isinstance(child, Node):
                yield from child.walk()

    def text(self):
        return " ".join("".join(child.text() if isinstance(child, Node) else child for child in self.children).split())


class DocumentParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("document", {})
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node(tag, dict(attrs))
        self.stack[-1].children.append(node)
        if tag not in VOID_TAGS:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                return

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def canonical_lab_url(href):
    parsed = urlsplit(urljoin(SOURCE_URL, href))
    if parsed.scheme != "https" or parsed.netloc != "portswigger.net":
        raise ValueError(f"Unexpected external lab URL: {href!r}")
    path = parsed.path.rstrip("/")
    slug = path.rsplit("/", 1)[-1]
    if not path.startswith("/web-security/") or not re.fullmatch(r"lab(?:-[a-z0-9-]+)?", slug):
        raise ValueError(f"Unexpected lab path: {path!r}")
    # Nested topics can reuse lab basenames (e.g. reflected/stored XSS).
    # Include subtopic segments so note paths stay stable without numbering.
    slug = "-".join(path.split("/")[3:])
    if not re.fullmatch(r"[a-z0-9-]+", slug):
        raise ValueError(f"Unsafe note slug derived from {path!r}")
    return urlunsplit(("https", "portswigger.net", path, "", "")), slug


def parse_catalog(html, snapshot_date):
    parser = DocumentParser()
    parser.feed(html)
    roots = [node for node in parser.root.walk() if node.attrs.get("id") == "all-labs"]
    if len(roots) != 1:
        raise ValueError("Expected exactly one #all-labs container; saved page format may have changed.")

    categories = []
    labs = []
    category = None
    for node in roots[0].walk():
        if node.tag == "h2":
            category_id = node.attrs.get("id", "")
            if not re.fullmatch(r"[a-z0-9-]+", category_id):
                raise ValueError(f"Invalid category identifier: {category_id!r}")
            category = {"id": category_id, "title": node.text()}
            if not category["title"]:
                raise ValueError(f"Empty category title: {category_id}")
            categories.append(category)

        classes = node.attrs.get("class", "").split()
        if "widgetcontainer-lab-link" not in classes:
            continue
        if category is None:
            raise ValueError("Encountered a lab before its category heading.")

        anchors = [child for child in node.walk() if child.tag == "a" and child.attrs.get("href")]
        if len(anchors) != 1:
            raise ValueError(f"Expected one link per lab, got {len(anchors)}.")
        anchor = anchors[0]
        title = anchor.text()
        if not title:
            raise ValueError("Lab title is empty.")
        url, slug = canonical_lab_url(anchor.attrs["href"])
        levels = [child.text() for child in node.walk() if child.tag == "span" and child.text() in DIFFICULTIES]
        if len(levels) != 1:
            raise ValueError(f"Missing/ambiguous difficulty for {title!r}.")
        if ("is-solved" in classes) == ("is-notsolved" in classes):
            raise ValueError(f"Missing/ambiguous completion status for {title!r}.")
        solved = "is-solved" in classes
        statuses = [child.text() for child in node.walk() if "lab-status-icon" in child.attrs.get("class", "").split()]
        if statuses and statuses != ["Solved" if solved else "Not solved"]:
            raise ValueError(f"Conflicting completion label for {title!r}.")
        lab_id = f"{category['id']}/{slug}"
        labs.append({
            "id": lab_id,
            "slug": slug,
            "title": title,
            "url": url,
            "category": category["id"],
            "categoryTitle": category["title"],
            "difficulty": levels[0].title(),
            "solved": solved,
            "notePath": f"labs/{lab_id}.md",
            "noteUrl": None,
            "noteStatus": None,
            "order": len(labs) + 1,
        })

    if not labs:
        raise ValueError("No labs were found; refusing to create an empty catalog.")
    for key in ("id", "url", "notePath"):
        duplicates = [value for value, count in Counter(lab[key] for lab in labs).items() if count > 1]
        if duplicates:
            raise ValueError(f"Duplicate {key}: {duplicates}")
    if len({item["id"] for item in categories}) != len(categories):
        raise ValueError("Duplicate category identifier.")

    for category in categories:
        selected = [lab for lab in labs if lab["category"] == category["id"]]
        category["count"] = len(selected)
        category["solved"] = sum(lab["solved"] for lab in selected)
    return {
        "schemaVersion": 1,
        "sourceUrl": SOURCE_URL,
        "snapshotDate": snapshot_date,
        "completionSource": "saved-page-snapshot",
        "stats": {
            "total": len(labs),
            "solved": sum(lab["solved"] for lab in labs),
            "categories": len(categories),
            "byDifficulty": dict(sorted(Counter(lab["difficulty"] for lab in labs).items())),
        },
        "categories": categories,
        "labs": labs,
    }


def main():
    args_parser = argparse.ArgumentParser(description=__doc__)
    args_parser.add_argument("html", type=Path, help="Locally saved All labs HTML file")
    args_parser.add_argument("--output", type=Path, default=Path("data/labs.json"))
    args_parser.add_argument("--snapshot-date", required=True, help="Date the HTML was saved (YYYY-MM-DD)")
    args = args_parser.parse_args()
    try:
        date.fromisoformat(args.snapshot_date)
        catalog = parse_catalog(args.html.read_text(encoding="utf-8-sig"), args.snapshot_date)
    except (OSError, ValueError) as error:
        args_parser.error(str(error))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"output": str(args.output), **catalog["stats"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()

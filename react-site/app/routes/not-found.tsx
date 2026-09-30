import { Link } from 'react-router'
export function meta() { return [{ title: '페이지 없음 · Faultline' }, { name: 'robots', content: 'noindex' }] }
export default function NotFound() { return <main className="error-page" tabIndex={-1}><h1 className="library-title">페이지를 찾을 수 없습니다.</h1><p><Link to="/">Faultline으로 돌아가기</Link></p></main> }

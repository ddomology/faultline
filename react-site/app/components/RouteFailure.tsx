import { Link, isRouteErrorResponse, useRevalidator } from 'react-router'
import { useEffect } from 'react'
import { DeploymentChanged } from '../lib/route-version'

export default function RouteFailure({ error }: { error: unknown }) {
  const revalidator = useRevalidator()
  const missing = isRouteErrorResponse(error) && error.status === 404
  const changed = error instanceof DeploymentChanged
  useEffect(() => {
    if (!(error instanceof DeploymentChanged)) return
    const target = new URL(window.location.href)
    target.searchParams.set('_flv', error.buildId)
    window.location.replace(target.href)
  }, [error])
  if (changed) return <section className="route-failure" role="status"><h1 className="library-title">페이지를 새로 불러오는 중입니다.</h1></section>
  return <section className="route-failure" role="alert">
    <h1 className="library-title">{missing ? '페이지를 찾을 수 없습니다.' : '글을 불러오지 못했습니다.'}</h1>
    <p>{missing ? '주소가 바뀌었거나 없는 노트입니다.' : '연결을 확인한 뒤 다시 시도해 주세요. 읽던 목록으로 돌아갈 수도 있습니다.'}</p>
    <div>{!missing && <button type="button" disabled={revalidator.state !== 'idle'} onClick={() => void revalidator.revalidate()}>{revalidator.state === 'idle' ? '다시 시도' : '불러오는 중…'}</button>}<Link to="/">풀이 목록</Link></div>
  </section>
}

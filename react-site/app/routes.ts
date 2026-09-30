import { index, route, type RouteConfig } from '@react-router/dev/routes'
export default [
  index('routes/home.tsx'),
  route('404.html', 'routes/not-found.tsx'),
  route('*', 'routes/note.tsx'),
] satisfies RouteConfig

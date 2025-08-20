import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [index('routes/home.tsx'), route('me', 'routes/me.tsx')] satisfies RouteConfig

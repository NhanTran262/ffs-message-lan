import { Suspense } from 'react'
import AuthCard from '~/components/auth/auth-card'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    {
      name: 'description',
      content: 'Welcome to React Router!'
    }
  ]
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCard />
    </Suspense>
  )
}

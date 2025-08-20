import { Suspense } from 'react'
import MePage from '~/pages/me-page'

export default function Me() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MePage />
    </Suspense>
  )
}

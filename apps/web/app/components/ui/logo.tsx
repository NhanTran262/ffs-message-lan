import { Link } from 'react-router'
import { cn } from '~/lib/utils'

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to={'/'} className={cn('logo', className)}>
      <em>Ping</em>
    </Link>
  )
}

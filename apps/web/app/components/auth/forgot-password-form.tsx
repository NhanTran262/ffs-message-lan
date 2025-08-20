import { Button } from '~/components/ui/button'

export default function ForgotPasswordForm({ onSwitch }: { onSwitch: (form: 'login') => void }) {
  return (
    <div className=''>
      Forgot Password Here
      <Button variant='destructive' onClick={() => onSwitch('login')}>
        Quay lại
      </Button>
    </div>
  )
}

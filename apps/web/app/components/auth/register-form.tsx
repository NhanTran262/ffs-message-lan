import { useState } from 'react'
import AccountInfoStep from '~/components/auth/account-info-step'
import OtpStep from '~/components/auth/otp-step'
import PhoneStep from '~/components/auth/phone-step'
import { Button } from '~/components/ui/button'

export default function RegisterForm({ onSwitch }: { onSwitch: (form: 'login') => void }) {
  const [step, setStep] = useState<{ name: 'phone' | 'otp' | 'account-info'; phoneNumber?: string }>({ name: 'phone' })
  return (
    <div className='flex flex-col gap-2'>
      {step.name === 'phone' && <PhoneStep onSwitch={setStep} />}
      {step.name === 'otp' && <OtpStep onSwitch={setStep} phoneNumber={step.phoneNumber} />}
      {step.name === 'account-info' && <AccountInfoStep onSwitch={setStep} phoneNumber={step.phoneNumber} />}
      <div className='flex flex-row justify-center items-center gap-1 text-sm'>
        <p>Bạn đã có tài khoản?</p>
        <Button type='button' variant='link' className='text-primary p-0' onClick={() => onSwitch('login')}>
          Đăng nhập
        </Button>
      </div>
    </div>
  )
}

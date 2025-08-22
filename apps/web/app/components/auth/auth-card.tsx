import { useState } from 'react'
import ForgotPasswordForm from '~/components/auth/forgot-password-form'
import LoginForm from '~/components/auth/login-form'
import RegisterForm from '~/components/auth/register-form'
import Logo from '~/components/ui/logo'
import { Card, CardHeader, CardTitle } from '~/components/ui/card'

export default function AuthCard() {
  const [form, setForm] = useState<'login' | 'register' | 'forgot-password'>('login')
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <Logo className='mb-10 text-4xl' />
      <Card className='w-full max-w-xl min-h-[500px] px-25'>
        <CardHeader className='text-center'>
          <CardTitle>
            {form === 'login' && 'Đăng nhập với mật khẩu'}
            {form === 'register' && 'Đăng ký tài khoản'}
            {form === 'forgot-password' && 'Quên mật khẩu'}
          </CardTitle>
        </CardHeader>
        {form === 'login' && <LoginForm onSwitch={setForm} />}
        {form === 'register' && <RegisterForm onSwitch={setForm} />}
        {form === 'forgot-password' && <ForgotPasswordForm onSwitch={setForm} />}
      </Card>
    </div>
  )
}

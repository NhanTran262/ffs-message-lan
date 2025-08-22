import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import PhoneInputField from '~/components/ui/phone-input-field'
import { ValidationRules } from '~/constants/validation-rule.constant'

export default function LoginForm({ onSwitch }: { onSwitch: (form: 'register' | 'forgot-password') => void }) {
  const navigate = useNavigate()
  const FormSchema = z.object({
    phone: z.string().min(ValidationRules.DEFAULT_FIELD_LENGTH, {
      message: 'Số điện thoại không được để trống.'
    }),
    password: z
      .string()
      .min(ValidationRules.DEFAULT_FIELD_LENGTH, {
        message: 'Mật khẩu không được để trống.'
      })
      .min(ValidationRules.MIN_PASSWORD_LENGTH, {
        message: 'Mật khẩu của bạn phải có ít nhất 6 ký tự.'
      })
      .regex(ValidationRules.PASSWORD_REGEX, {
        message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.'
      })
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      phone: '',
      password: ''
    }
  })
  const onSubmit = (value: z.infer<typeof FormSchema>) => {
    navigate('/me')
    console.log('Form submitted:', value)
    // Handle login logic here
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col gap-6'>
          <FormField
            control={form.control}
            name='phone'
            render={() => <PhoneInputField name='phone' country='vn' enableSearch placeholder='Số điện thoại' />}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl className='py-6 rounded-xs'>
                  <Input
                    {...field}
                    id='password'
                    type='password'
                    placeholder='Mật khẩu'
                    className='focus-visible:ring-[0.5px] focus-visible:ring-input/0 focus-visible:border-input'
                  />
                </FormControl>
                <FormMessage />
                <Button
                  type='button'
                  variant='link'
                  className='text-destructive ml-auto p-0'
                  onClick={() => onSwitch('forgot-password')}
                >
                  Quên mật khẩu?
                </Button>
              </FormItem>
            )}
          />
        </div>
        <div className='flex-col gap-2'>
          <Button type='submit' className='w-full py-6 rounded-sm'>
            Đăng nhập với mật khẩu
          </Button>
          <div className='flex flex-row justify-center items-center gap-1 text-sm'>
            <p>Bạn chưa có tài khoản?</p>
            <Button type='button' variant='link' className='text-primary p-0' onClick={() => onSwitch('register')}>
              Đăng ký
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

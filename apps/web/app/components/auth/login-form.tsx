import { useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import ClientOnly from '~/wrapper/client-only'

export default function LoginForm({ onSwitch }: { onSwitch: (form: 'register' | 'forgot-password') => void }) {
  const form = useForm({
    defaultValues: {
      phone: '',
      password: ''
    }
  })
  const onSubmit = (values: any) => {
    console.log('Form submitted:', values)
    // Handle login logic here
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col gap-6'>
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ClientOnly>
                    <PhoneInput
                      country={'vn'}
                      enableSearch={true}
                      value={field.value}
                      onChange={(value) => field.onChange('+' + value)}
                      inputProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: true
                      }}
                    />
                  </ClientOnly>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='relative flex flex-col gap-2 items-center'>
                <FormControl className='w-full py-6 rounded-xs'>
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
            <Button
              type='button'
              variant='link'
              className='text-primary p-0'
              onClick={() => onSwitch('register' )}
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

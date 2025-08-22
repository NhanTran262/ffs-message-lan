import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import z from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { ValidationRules } from '~/constants/validation-rule.constant'

export default function AccountInfoStep({
  onSwitch,
  phoneNumber
}: {
  onSwitch: (payload: { name: 'account-info'; phoneNumber?: string }) => void
  phoneNumber?: string
}) {
  const navigate = useNavigate()
  const FormSchema = z
    .object({
      phoneNumber: z.string().optional(),
      fullName: z.string().min(ValidationRules.DEFAULT_FIELD_LENGTH, {
        message: 'Tên của bạn không được để trống.'
      }),
      password: z
        .string()
        .min(ValidationRules.DEFAULT_FIELD_LENGTH, {
          message: 'Mật khẩu của bạn không được để trống.'
        })
        .min(ValidationRules.MIN_PASSWORD_LENGTH, {
          message: 'Mật khẩu của bạn phải có ít nhất 6 ký tự.'
        })
        .regex(ValidationRules.PASSWORD_REGEX, {
          message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.'
        }),
      confirmPassword: z.string().min(ValidationRules.DEFAULT_FIELD_LENGTH, {
        message: 'Vui lòng xác nhận mật khẩu của bạn.'
      })
    })
    .refine((value) => value.password === value.confirmPassword, {
      message: 'Mật khẩu xác nhận của bạn không khớp.',
      path: ['confirmPassword']
    })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      phoneNumber: phoneNumber || '',
      fullName: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    onSwitch({ name: 'account-info', phoneNumber })
    navigate('/me')

    console.log('Form submitted:', values)
    // Handle account info submission logic here
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormControl className='py-6 rounded-xs'>
                <Input
                  {...field}
                  id='fullName'
                  type='text'
                  placeholder='Tên của bạn'
                  className='focus-visible:ring-[0.5px] focus-visible:ring-input/0 focus-visible:border-input'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormControl className='py-6 rounded-xs'>
                <Input
                  {...field}
                  id='confirmPassword'
                  type='password'
                  placeholder='Xác nhận mật khẩu'
                  className='focus-visible:ring-[0.5px] focus-visible:ring-input/0 focus-visible:border-input'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full py-6 rounded-sm'>
          Đăng ký
        </Button>
      </form>
    </Form>
  )
}

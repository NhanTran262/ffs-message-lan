import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'

export default function AccountInfoStep({
  onSwitch,
  phoneNumber
}: {
  onSwitch: (payload: { name: 'account-info'; phoneNumber?: string }) => void
  phoneNumber?: string
}) {
  const FormSchema = z
    .object({
      fullName: z.string().min(1, { message: 'Tên của bạn không được để trống.' }),
      password: z
        .string()
        .min(1, { message: 'Mật khẩu của bạn không được để trống.' })
        .min(6, { message: 'Mật khẩu của bạn phải có ít nhất 6 ký tự.' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/, {
          message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.'
        }),
      confirmPassword: z.string().min(1, { message: 'Vui lòng xác nhận mật khẩu của bạn.' })
    })
    .refine((value) => value.password === value.confirmPassword, {
      message: 'Mật khẩu xác nhận không khớp.',
      path: ['confirmPassword']
    })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    onSwitch({ name: 'account-info', phoneNumber })

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
            <FormItem className='relative flex flex-col gap-2 items-center'>
              <FormControl className='w-full py-6 rounded-xs'>
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='relative flex flex-col gap-2 items-center'>
              <FormControl className='w-full py-6 rounded-xs'>
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

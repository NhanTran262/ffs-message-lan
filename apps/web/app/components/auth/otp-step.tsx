import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { ValidationRules } from '~/constants/validation-rule.constant'

export default function OtpStep({
  onSwitch,
  phoneNumber
}: {
  onSwitch: (payload: { name: 'account-info'; phoneNumber?: string }) => void
  phoneNumber?: string
}) {
  const FormSchema = z.object({
    otp: z
      .string()
      .length(ValidationRules.OTP_LENGTH, {
        message: 'Mã xác thực của bạn phải có đúng 6 ký tự.'
      })
      .regex(ValidationRules.OTP_REGEX, {
        message: 'Mã xác thực phải là chữ số.'
      })
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      otp: ''
    }
  })

  function onSubmit(value: z.infer<typeof FormSchema>) {
    onSwitch({ name: 'account-info', phoneNumber })
    console.log('Form submitted:', value)
    // Handle OTP verification logic here
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='otp'
          render={({ field }) => (
            <FormItem>
              <FormControl className='py-6 rounded-xs'>
                <Input
                  {...field}
                  id='otp'
                  type='number'
                  placeholder='Nhập mã xác thực'
                  className='focus-visible:ring-[0.5px] focus-visible:ring-input/0 focus-visible:border-input
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full py-6 rounded-sm'>
          Xác thực
        </Button>
      </form>
    </Form>
  )
}

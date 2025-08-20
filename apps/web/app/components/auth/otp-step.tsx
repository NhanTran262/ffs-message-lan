import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'

export default function OtpStep({
  onSwitch,
  phoneNumber
}: {
  onSwitch: (payload: { name: 'account-info'; phoneNumber?: string }) => void
  phoneNumber?: string
}) {
  const FormSchema = z.object({
    pin: z
      .string()
      .length(6, { message: 'Mã xác thực của bạn phải có đúng 6 ký tự.' })
      .regex(/^\d+$/, { message: 'Mã xác thực phải là chữ số.' })
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: ''
    }
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    onSwitch({ name: 'account-info', phoneNumber })
    // toast('You submitted the following values', {
    //   description: (
    //     <pre className='mt-2 w-[320px] rounded-md bg-neutral-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   )
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='pin'
          render={({ field }) => (
            <FormItem className='relative flex flex-col gap-2 items-center'>
              <FormControl className='w-full py-6 rounded-xs'>
                <Input
                  {...field}
                  id='pin'
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

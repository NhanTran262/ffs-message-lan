import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormField } from '~/components/ui/form'
import PhoneInputField from '~/components/ui/phone-input-field'
import { ValidationRules } from '~/constants/validation-rule.constant'

export default function PhoneStep({
  onSwitch
}: {
  onSwitch: (payload: { name: 'otp'; phoneNumber?: string }) => void
}) {
  //TODO: Uncomment the following code to enable OTP functionality with Firebase
  // const onRecaptcha = () => {
  //   if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  //       size: 'invisible',
  //       callback: (response: any) => {
  //         console.log('Recaptcha verified:', response)
  //         // Handle successful recaptcha verification
  //       },
  //       'expired-callback': () => {
  //         console.log('Recaptcha expired')
  //         // Handle recaptcha expiration
  //       }
  //     })
  //   }
  // }
  //TODO: Uncomment the following code to enable OTP functionality with Firebase
  // const sendOtp = async (phoneNumber: string) => {
  //   onRecaptcha()
  //   const appVerifier = window.recaptchaVerifier
  //   await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  //     .then((confirmationResult) => {
  //       window.confirmationResult = confirmationResult
  //     })
  //     .catch((error) => {
  //       console.error('Error sending OTP:', error)
  //       // Handle error in sending OTP
  //     })
  // }
  const FormSchema = z.object({
    phone: z.string().min(ValidationRules.DEFAULT_FIELD_LENGTH, {
      message: 'Số điện thoại không được để trống.'
    })
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      phone: ''
    }
  })

  const onSubmit = async (value: z.infer<typeof FormSchema>) => {
    onSwitch({ name: 'otp', phoneNumber: value.phone })

    console.log('Form submitted:', value)
    // Handle login logic here
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='flex flex-col gap-6'>
          <FormField
            control={form.control}
            name='phone'
            render={() => <PhoneInputField name='phone' country='vn' enableSearch placeholder='Số điện thoại' />}
          />
          {/* //TODO: Uncomment the following code to enable OTP functionality with Firebase */}
          {/* <div id='recaptcha-container'></div> */}
        </div>
        <Button type='submit' className='w-full py-6 rounded-sm'>
          Nhận mã xác thực
        </Button>
      </form>
    </Form>
  )
}

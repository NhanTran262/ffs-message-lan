import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import ClientOnly from '~/wrapper/client-only'
import PhoneInput from 'react-phone-input-2'
import { useForm } from 'react-hook-form'

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

  const form = useForm({
    defaultValues: {
      phone: ''
    }
  })

  const onSubmit = async (values: any) => {
    onSwitch({ name: 'otp', phoneNumber: values.phone })

    console.log('Form submitted:', values)
    // Handle login logic here
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
                      enableSearch
                      value={field.value}
                      onChange={(value) => field.onChange('+' + value)}
                      inputProps={{
                        name: 'phone',
                        autoFocus: true
                      }}
                    />
                  </ClientOnly>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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

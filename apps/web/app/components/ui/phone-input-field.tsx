import { useFormContext } from 'react-hook-form'
import type { PhoneInputProps } from 'react-phone-input-2'
import PhoneInput from 'react-phone-input-2'
import { FormControl, FormItem, FormMessage } from '~/components/ui/form'
import ClientOnly from '~/wrapper/client-only'

interface PhoneInputFieldProps extends Partial<PhoneInputProps> {
  name: string
}

export default function PhoneInputField({ name, ...props }: PhoneInputFieldProps) {
  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()

  const value = watch(name)
  const error = errors[name]?.message as string | undefined
  return (
    <FormItem>
      <FormControl>
        <ClientOnly>
          <PhoneInput
            {...props}
            value={value}
            onChange={(value) => setValue(name, '+' + value, { shouldValidate: true })}
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true
            }}
            inputClass={error ? 'form-control-error' : 'form-control'}
            buttonClass={error ? 'flag-dropdown-error' : 'flag-dropdown'}
          />
        </ClientOnly>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

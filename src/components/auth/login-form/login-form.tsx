import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'

import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox.tsx'
import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'

const loginSchema = z.object({
  email: z.string().email({ message: 'incorrect email address ' }),
  password: z.string().min(3, { message: 'password must be 3 character or more' }),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof loginSchema>
export const LoginForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  })

  const onSubmit = (data: FormValues) => {
    reset({ email: '', password: '', rememberMe: false })
    console.log(data, data.rememberMe)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <ControlledTextField
        name={'email'}
        control={control}
        label={'email'}
        error={errors.email?.message}
      />
      <ControlledTextField
        name={'password'}
        control={control}
        label={'password'}
        type={'password'}
        error={errors.password?.message}
      />
      <ControlledCheckbox name={'rememberMe'} control={control} label={'remember me'} />

      <Button type="submit">Submit</Button>
    </form>
  )
}

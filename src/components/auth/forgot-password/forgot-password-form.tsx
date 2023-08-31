import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'

import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'incorrect email address ' }),
})

type FormValues = z.infer<typeof forgotPasswordSchema>
export const forgotPasswordForm = () => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: FormValues) => {
    reset({ email: '' })
    console.log(data.email)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField name={'email'} control={control} label={'Email'} />
      <Button type="submit">Send Instructions</Button>
    </form>
  )
}

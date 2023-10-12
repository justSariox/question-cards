import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './forgot-password.module.css'

import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'
import { Typography } from '@/components/ui/typography'

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'incorrect email address ' }),
})

type FormValues = z.infer<typeof forgotPasswordSchema>
export const ForgotPasswordForm = () => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: FormValues) => {
    reset({ email: '' })
  }

  return (
    <Card className={s.card}>
      <Typography variant={'large'} as={'h1'} className={s.title}>
        Forgot your password?
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <ControlledTextField name={'email'} control={control} label={'Email'} />
        <Typography variant={'body2'} className={s.description}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button type="submit" className={s.button}>
          Send Instructions
        </Button>
      </form>
      <Typography variant={'body2'} className={s.rememberPassword}>
        Did you remember your password?
      </Typography>
      <Button as={'a'} variant={'link'} className={s.buttonTryLoggingIn}>
        Try logging in
      </Button>
    </Card>
  )
}

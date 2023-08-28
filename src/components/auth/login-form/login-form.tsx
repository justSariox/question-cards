import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './login-form.module.scss'

import { Card } from '@/components/ui/card'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox.tsx'
import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'
import { Typography } from '@/components/ui/typography'

const loginSchema = z.object({
  email: z.string().email({ message: 'incorrect email address ' }),
  password: z.string().min(3, { message: 'password must be 3 character or more' }),
  rememberMe: z.boolean().optional(),
})

type LoginFormProps = {
  onSubmit: (data: FormValues) => void
}

type FormValues = z.infer<typeof loginSchema>
export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  })

  const onSubmitHandler = handleSubmit(onSubmit)

  return (
    <Card className={s.card}>
      <Typography variant={'large'} className={s.title}>
        Sign in
      </Typography>
      <form onSubmit={onSubmitHandler} className={s.loginForm}>
        <ControlledTextField name={'email'} control={control} label={'email'} />
        <ControlledTextField
          name={'password'}
          control={control}
          label={'password'}
          type={'password'}
        />
        <ControlledCheckbox
          className={s.checkbox}
          name={'rememberMe'}
          control={control}
          label={'remember me'}
        />
        <Typography className={s.forgotLink} variant={'caption'} as={'a'} href={'/forgot-password'}>
          Forgot Password?
        </Typography>

        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </form>
      <Typography className={s.caption} variant={'caption'}>
        {"Don't have an account?"}
      </Typography>
      <Button variant={'link'} fullWidth as={'a'} href={'/sign-up'}>
        Sign up
      </Button>
    </Card>
  )
}

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './login-form.module.scss'

import { Card } from '@/components/ui/card'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox.tsx'
import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'
import { Typography } from '@/components/ui/typography'
import { useLoginMutation } from '@/services/auth/auth.ts'

const loginSchema = z.object({
  email: z.string().email({ message: 'incorrect email address ' }),
  password: z.string().min(3, { message: 'password must be 3 character or more' }),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const [login] = useLoginMutation()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  })

  // if (error) {
  //   if (
  //     'status' in error &&
  //     typeof error.data === 'object' &&
  //     error.data &&
  //     'message' in error.data
  //   )
  //     setError('password', {
  //       type: 'custom',
  //       message: error.data.message as string,
  //     })
  // }

  return (
    <Card className={s.card}>
      <Typography variant={'large'} className={s.title}>
        Sign in
      </Typography>
      <form onSubmit={handleSubmit(login)} className={s.loginForm}>
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
        <ControlledCheckbox
          className={s.checkbox}
          name={'rememberMe'}
          control={control}
          label={'remember me'}
        />
        <Typography variant={'body2'} as={Link} to={'/recover'} className={s.forgotLink}>
          Forgot your password?
        </Typography>

        <Button type="submit">Sign In</Button>
      </form>
      <Typography className={s.caption} variant={'caption'}>
        {"Don't have an account?"}
      </Typography>
      <Button variant={'link'} fullWidth as={Link} to={'/sign-up'}>
        Sign up
      </Button>
    </Card>
  )
}

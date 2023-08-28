import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './register-form.module.scss'

import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'
import { Typography } from '@/components/ui/typography'

const registerSchema = z
  .object({
    email: z.string().email({ message: 'incorrect email address ' }),
    password: z.string().min(3, { message: 'password must be 3 character or more' }),
    confirmPassword: z.string().min(3, { message: 'password must be 3 character or more' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'passwords did not match',
        path: ['confirmPassword'],
      })
    }

    return { confirmPassword, password }
  })

type RegisterFormProps = {
  onSubmit: (data: FormValues) => void
}

type FormValues = z.infer<typeof registerSchema>
export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(registerSchema),
    defaultValues: {},
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
        <ControlledTextField
          name={'confirmPassword'}
          control={control}
          label={'Confirm Password'}
          type={'password'}
        />
        <Button type="submit" fullWidth>
          Sign up
        </Button>
      </form>
      <Typography className={s.caption} variant={'caption'}>
        {'Already have an account?'}
      </Typography>
      <Button variant={'link'} fullWidth as={'a'} href={'/sign-in'}>
        Sign in
      </Button>
    </Card>
  )
}

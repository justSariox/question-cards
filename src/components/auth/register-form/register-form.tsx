import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { omit } from 'remeda'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './register-form.module.scss'

import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'
import { Typography } from '@/components/ui/typography'
import { useSignUpMutation } from '@/services/auth/auth.ts'

const registerSchema = z
  .object({
    email: z.string().email({ message: 'incorrect email address ' }).nonempty('Enter email'),
    password: z
      .string()
      .nonempty('Enter password')
      .min(3, { message: 'password must be 3 character or more' }),
    confirmPassword: z.string().nonempty('Confirm your password'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'passwords do not match',
        path: ['confirmPassword'],
      })
    }

    return { confirmPassword, password }
  })

type FormValues = z.infer<typeof registerSchema>

export const RegisterForm = () => {
  const [signUp, { error }] = useSignUpMutation()

  const { handleSubmit, control, setError } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  })

  const onSubmitHandler = handleSubmit(data => signUp(omit(data, ['confirmPassword'])))

  if (error) {
    if (
      'status' in error &&
      'data' in error &&
      error.status === 400 &&
      typeof error.data === 'object' &&
      error.data &&
      'errorMessages' in error.data
    ) {
      // @ts-ignore
      error.data.errorMessages.forEach((errorMessage: any) => {
        setError(errorMessage.field, {
          type: 'custom',
          message: errorMessage.message,
        })
      })
    }
  }

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
      <Button variant={'link'} fullWidth as={Link} to={'/sign-in'} className={s.buttonSignIn}>
        Sign in
      </Button>
    </Card>
  )
}

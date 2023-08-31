import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './create-new-password.module.css'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'
import { Typography } from '@/components/ui/typography'

const createPasswordSchema = z.object({
  password: z.string().min(3, { message: 'password must be 3 character or more' }),
})

type FormValue = z.infer<typeof createPasswordSchema>

export const CreatePasswordForm = () => {
  const { handleSubmit, control, reset } = useForm<FormValue>({
    resolver: zodResolver(createPasswordSchema),
  })

  const onSubmitHandler = (data: FormValue) => {
    reset({ password: '' })
    console.log(data.password)
  }

  return (
    <Card className={s.card}>
      <Typography variant={'large'} as={'h1'} className={s.title}>
        Create new password
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={s.form}>
        <ControlledTextField
          name={'password'}
          control={control}
          type={'password'}
          label={'Password'}
        />
        <Typography variant={'body2'} className={s.description}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button type={'submit'} className={s.button}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import avatar from '../assets/svg/avatar.svg'
import editIcon from '../assets/svg/edit-2-outline.svg'

import s from './edit-profile.module.scss'

import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'
import { Typography } from '@/components/ui/typography'

const loginSchema = z.object({
  name: z.string().min(2, { message: 'password must be 2 character or more' }),
})

type FormValues = z.infer<typeof loginSchema>
export const EditProfile = () => {
  const [editName, setEditName] = useState<boolean>(false)
  const [name, setName] = useState<string>('Vasya')
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data, data.name)
    setName(data.name)
    setEditName(!editName)
  }

  const onChangeName = () => {
    setEditName(!editName)
  }

  return (
    <Card className={s.card}>
      <Typography variant={'large'} as={'h1'}>
        Personal Information
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.avatar}>
          <img src={avatar} alt="avatar" />
          <div className={s.editIconAvatarWrapper}>
            <img src={editIcon} className={s.editIconAvatar} alt="Edit icon" />
          </div>
        </div>
        {editName ? (
          <div className={s.changeName}>
            <ControlledTextField name={'name'} control={control} label={'Nickname'} />
            <Button className={s.saveChangeButton}>Save Changes</Button>
          </div>
        ) : (
          <div className={s.infoContainer}>
            <div className={s.name}>
              <Typography variant={'h1'} as={'span'}>
                {name}
              </Typography>
              <img
                src={editIcon}
                onClick={onChangeName}
                className={s.editNameIcon}
                alt="Edit icon"
              />
            </div>
            <Typography variant={'body2'} className={s.email}>
              my@mail.com
            </Typography>
            <Button type="submit" logout={true} variant={'secondary'}>
              Logout
            </Button>
          </div>
        )}
      </form>
    </Card>
  )
}

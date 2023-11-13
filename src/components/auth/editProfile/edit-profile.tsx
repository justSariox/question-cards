import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import editIcon from '../assets/svg/edit-2-outline.svg'

import s from './edit-profile.module.scss'

import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'
import { Typography } from '@/components/ui/typography'
import { useGetMeQuery, useUpdateProfileMutation } from '@/services/auth/auth.ts'

const loginSchema = z.object({
  name: z.string().min(3, { message: 'password must be 3 character or more' }),
  /*  avatar: z.string().min(3, { message: 'password must be 3 character or more' }),
    email: z.string().email({ message: 'incorrect email address ' }).nonempty('Enter email'),*/
})

type FormValues = z.infer<typeof loginSchema>

export const EditProfile = () => {
  const { data: user } = useGetMeQuery()
  const [editName, setEditName] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  console.log(errors)

  const [editProfile] = useUpdateProfileMutation()

  const onSubmit = (data: FormValues) => {
    console.log(data)
    editProfile({
      name: data.name,
      /*      avatar: user?.avatar,
            email: user?.email,*/
    })
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={s.form}
        encType="multipart/form-data"
        method="post"
      >
        <div className={s.avatar}>
          <img src={user?.avatar} alt="avatar" className={s.avatarImg} />
          {!editName && (
            <div className={s.editIconAvatarWrapper}>
              <img src={editIcon} className={s.editIconAvatar} alt="Edit icon" />
            </div>
          )}
        </div>
        {editName ? (
          <div className={s.changeName}>
            <ControlledTextField
              name={'name'}
              control={control}
              label={'Nickname'}
              defaultValue={user?.name}
            />
            <Button className={s.saveChangeButton} type={'submit'}>
              Save Changes
            </Button>
          </div>
        ) : (
          <div className={s.infoContainer}>
            <div className={s.name}>
              <Typography variant={'h1'} as={'span'}>
                {user?.name}
              </Typography>
              <img
                src={editIcon}
                onClick={onChangeName}
                className={s.editNameIcon}
                alt="Edit icon"
              />
            </div>
            <Typography variant={'body2'} className={s.email}>
              {user?.email}
            </Typography>
          </div>
        )}
      </form>
      {!editName && (
        <Button type="submit" logout={true} variant={'secondary'}>
          Logout
        </Button>
      )}
    </Card>
  )
}

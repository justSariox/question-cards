import s from './header.module.scss'

import AvatarIcon from '@/assets/avatar.png'
import { useGetMeQuery } from '@/services/auth/auth.ts'

export const Avatar = () => {
  const { data: user } = useGetMeQuery()

  return (
    <div className={s.block}>
      <span className={s.editName}>{user?.name}</span>
      <img alt={'Avatar'} src={user?.avatar ? user.avatar : AvatarIcon} className={s.avatar} />
    </div>
  )
}

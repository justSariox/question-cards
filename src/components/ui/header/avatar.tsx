import s from './header.module.scss'

import AvatarIcon from '@/assets/avatar.png'
import { useGetMeQuery } from '@/services/auth/auth.ts'

export const Avatar = () => {
  const { data } = useGetMeQuery()

  return (
    <div className={s.block}>
      <span>{data?.name}</span>
      <img
        alt={'Avatar'}
        src={data?.avatar === '' ? data?.avatar : AvatarIcon}
        className={s.avatar}
      />
    </div>
  )
}

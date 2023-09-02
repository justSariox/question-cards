import s from './header.module.scss'

import AvatarIcon from '@/assets/avatar.png'

export type AvatarProps = {
  name?: string
}

export const Avatar = (props: AvatarProps) => {
  const { name = 'Ivan' } = props

  return (
    <div className={s.block}>
      <span>{name}</span>
      <img alt={'Avatar'} src={AvatarIcon} className={s.avatar} />
    </div>
  )
}

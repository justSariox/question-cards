import { ComponentPropsWithoutRef } from 'react'

import s from './header.module.scss'

import AvatarIcon from '@/assets/avatar.png'
import Logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
// import { Avatar } from '@/components/ui/header/avatar'
import { useGetMeQuery } from '@/services/auth/auth.ts'

export type HeaderProps = {
  className?: string
  isLoggedIn: boolean
} & ComponentPropsWithoutRef<'div'>

export const Avatar = () => {
  const { data } = useGetMeQuery()

  return (
    <div className={s.block}>
      <span className={s.editName}>{data?.name}</span>
      <img alt={'Avatar'} src={AvatarIcon} className={s.avatar} />
    </div>
  )
}

export const Header = (props: HeaderProps) => {
  const { className, isLoggedIn, ...rest } = props

  // const isLoggedIn = useState<boolean | undefined>(onLogin)

  return (
    <div className={`${s.header} ${className}`} {...rest}>
      <a href={'/'}>
        <img alt={'Logo'} src={Logo} />
      </a>
      {isLoggedIn ? <Avatar /> : <Button variant={'primary'}>Sign In</Button>}
    </div>
  )
}

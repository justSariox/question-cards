import { ComponentPropsWithoutRef } from 'react'

import { Avatar } from './avatar.tsx'
import s from './header.module.scss'

// import AvatarIcon from '@/assets/avatar.png'
import Logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import { DropDown } from '@/components/ui/dropDown'
import { User } from '@/services/auth/types.ts'
// import { useGetMeQuery } from '@/services/auth/auth.ts'

export type HeaderProps = {
  className?: string
  isLoggedIn: boolean
  user: User | undefined
} & ComponentPropsWithoutRef<'div'>

export const Header = (props: HeaderProps) => {
  const { className, isLoggedIn, user, ...rest } = props

  return (
    <div className={`${s.header} ${className}`} {...rest}>
      <a href={'/'}>
        <img alt={'Logo'} src={Logo} />
      </a>
      {isLoggedIn ? (
        <DropDown isProfile={true} user={user} deckId={''}>
          <Avatar />
        </DropDown>
      ) : (
        <Button variant={'primary'}>Sign In</Button>
      )}
    </div>
  )
}

import { ComponentPropsWithoutRef } from 'react'

import s from './header.module.scss'

import Logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/header/avatar.tsx'

export type HeaderProps = {
  className?: string
  isLoggedIn: boolean
} & ComponentPropsWithoutRef<'div'>

export const Header = (props: HeaderProps) => {
  const { className, isLoggedIn, ...rest } = props

  // const isLoggedIn = useState<boolean | undefined>(onLogin)

  return (
    <div className={`${s.header} ${className}`} {...rest}>
      <img alt={'Logo'} src={Logo} />
      {isLoggedIn ? <Avatar /> : <Button variant={'primary'}>Sign In</Button>}
    </div>
  )
}

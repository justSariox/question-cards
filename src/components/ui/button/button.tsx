import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  className?: string
  disabled?: boolean
  logout?: boolean
  remove?: boolean
  fullWidth?: boolean
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    variant = 'primary',
    className,
    as: Component = 'button',
    logout,
    remove,
    children,
    ...rest
  } = props

  return (
    <Component
      className={`${s[variant]}
      ${logout ? s.logout : ''} ${remove ? s.remove : ''} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  )
}

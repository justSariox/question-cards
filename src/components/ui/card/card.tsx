import { ComponentPropsWithoutRef, ReactNode } from 'react'

import s from './card.module.scss'

export type CardProps = {
  className?: string
  children?: ReactNode
} & ComponentPropsWithoutRef<'div'>
export const Card = (props: CardProps) => {
  const { className, children, ...restProps } = props

  return (
    <div className={`${s.card} ${className}`} {...restProps}>
      {children}
    </div>
  )
}

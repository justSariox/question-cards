import { FC } from 'react'

import { ArrowLeft, ArrowRight } from '@/components/ui/assets/svg'
import s from '@/components/ui/pagination/pagination.module.scss'

export type NavigationButtonProps = {
  onClick: () => void
  disabled?: boolean
}

export const PrevButton: FC<NavigationButtonProps> = ({ onClick, disabled }) => {
  return (
    <button className={s.item} onClick={onClick} disabled={disabled}>
      <ArrowLeft fill={disabled ? 'gray' : 'white'} />
    </button>
  )
}

export const NextButton: FC<NavigationButtonProps> = ({ onClick, disabled }) => {
  return (
    <button className={s.item} onClick={onClick} disabled={disabled}>
      <ArrowRight fill={disabled ? 'gray' : 'white'} />
    </button>
  )
}

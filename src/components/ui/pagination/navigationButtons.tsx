import { FC } from 'react'

import vectorRight from '@/components/ui/assets/svg/vectorRight.svg'
import s from '@/components/ui/pagination/pagination.module.scss'

export type NavigationButtonProps = {
  onClick: () => void
  disabled?: boolean
  image?: string
}

export const PrevButton: FC<NavigationButtonProps> = ({ onClick, disabled, image }) => {
  return (
    <button className={s.item} onClick={onClick} disabled={disabled}>
      <img src={image} alt={''} className={s.icon} />
    </button>
  )
}

export const NextButton: FC<NavigationButtonProps> = ({ onClick, disabled }) => {
  return (
    <button className={s.item} onClick={onClick} disabled={disabled}>
      <img src={vectorRight} alt={'vectorRight'} />
    </button>
  )
}

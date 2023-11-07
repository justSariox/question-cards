import { ReactNode } from 'react'

import s from './modal.module.scss'

import { Button } from '@/components/ui/button'

type PropsType = {
  className?: ReactNode
  children?: ReactNode
  onClose: () => void
  ConfirmButtonTitle: string
  CancelButtonTitle?: string
  onChange: () => void
  variant: 'add' | 'edit' | 'delete'
}

export const ModalButtons = ({
  children,
  onClose,
  CancelButtonTitle = 'Cancel',
  ConfirmButtonTitle,
  onChange,
  variant,
}: PropsType) => {
  const deleteButtonHandler = () => {
    variant === 'delete' && onChange()
  }

  return (
    <div className={s.contentBox}>
      {children}
      <div className={s.buttonsContainer}>
        <div className={s.cancelButtonWrapper}>
          <Button variant={'secondary'} onClick={onClose}>
            {CancelButtonTitle}
          </Button>
        </div>
        <div className={s.confirmButtonWrapper} onClick={deleteButtonHandler}>
          <Button variant={'primary'} type={'submit'}>
            {ConfirmButtonTitle}
          </Button>
        </div>
      </div>
    </div>
  )
}

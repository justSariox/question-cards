import { ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import closeIcon from '../assets/svg/close.svg'

import s from './modal.module.scss'

type PropsType = {
  open: boolean
  className?: ReactNode
  title?: string
  children?: ReactNode
  onClose?: () => void
  isDisabled?: boolean
}

export const Modal = ({ title = 'Title', children, onClose, open = true }: PropsType) => {
  const handleModalClosed = () => {
    onClose?.()
  }

  return (
    <div className={s.modalWrapper}>
      {open && (
        <Dialog.Root open={open} onOpenChange={handleModalClosed}>
          {/*          <Dialog.Trigger asChild>
            <button className={`${s.Button} ${s.violet}`}>Edit profile</button>
          </Dialog.Trigger>*/}
          <Dialog.Portal>
            <Dialog.Overlay className={s.DialogOverlay} />
            <Dialog.Content className={s.DialogContent}>
              <header className={s.modalHeader}>
                <Dialog.Title className={s.DialogTitle}>{title}</Dialog.Title>
                <Dialog.Close asChild>
                  <button className={s.Button} aria-label="Close">
                    <img src={closeIcon} alt="close" className={s.IconButton} />
                  </button>
                </Dialog.Close>
              </header>
              <div className={s.contentBox}>{children}</div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  )
}

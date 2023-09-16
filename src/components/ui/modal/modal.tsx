import { ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from './modal.module.scss'

type PropsType = {
  open: boolean
  className?: ReactNode
  title?: string
  children: ReactNode
  onClose?: () => void
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
              <header>
                <Dialog.Title className={s.DialogTitle}>{title}</Dialog.Title>
                <Dialog.Close asChild>
                  <button className={s.IconButton} aria-label="Close">
                    <Cross2Icon />
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

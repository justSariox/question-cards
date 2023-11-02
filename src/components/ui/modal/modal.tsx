import { ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import closeIcon from '../assets/svg/close.svg'

import s from './modal.module.scss'

type PropsType = {
  title?: string
  children?: ReactNode
  onClose: () => void
  isDisabled?: boolean
  open: boolean
}

export const Modal = ({ title = 'Title', onClose, open, children }: PropsType) => {
  const handleModalClosed = () => {
    onClose()
  }

  return (
    <div className={s.modalWrapper}>
      <Dialog.Root open={open} onOpenChange={handleModalClosed}>
        {open && (
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
              {children}
              {/*              <div className={s.contentBox}>
                {children}
                <div className={s.buttonsContainer}>
                  <div className={s.cancelButtonWrapper}>
                    <Button variant={'secondary'} onClick={onClose}>
                      Cancel
                    </Button>
                  </div>
                  <div className={s.confirmButtonWrapper}>
                    <Button variant={'primary'} onClick={onChange}>
                      Save changes
                    </Button>
                  </div>
                </div>
              </div>*/}
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </Dialog.Root>
    </div>
  )
}

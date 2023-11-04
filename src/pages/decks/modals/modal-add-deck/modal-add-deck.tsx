import { useState } from 'react'

import s from './modal-add-deck.module.css'

import { Button } from '@/components/ui/button'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox.tsx'
import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'
import { Modal } from '@/components/ui/modal'
import { ModalButtons } from '@/components/ui/modal/modal-buttons.tsx'
import { useCreateDeckMutation } from '@/services/decks/decks.ts'

type PropsType = {
  handleSubmit: any
  control: any
  errors: any
}

export const ModalAddDeck = ({ handleSubmit, control, errors }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)

  const [createDeck] = useCreateDeckMutation()

  const onCancelButtonClick = () => {
    setOpen(false)
  }

  const handleModalOpened = () => {
    setOpen(true)
  }
  const createDeckHandler = (arg: { name: string; isPrivate?: boolean }) => {
    createDeck(arg).then(() => {
      setOpen(false)
    })
  }

  return (
    <div>
      <Modal open={open} onClose={onCancelButtonClick} title={'Add New Deck'}>
        <form onSubmit={handleSubmit(createDeckHandler)}>
          <ModalButtons ConfirmButtonTitle={'Save changes'} onClose={onCancelButtonClick}>
            <div className={s.modalContentContainer}>
              <ControlledTextField
                name={'name'}
                control={control}
                error={errors.isPrivate?.message}
                label={'Name Deck'}
                className={s.inputWidth}
              />
              <ControlledCheckbox name={'isPrivate'} control={control} label={'Private deck'} />
            </div>
          </ModalButtons>
        </form>
      </Modal>

      <Button className={s.buttonAddDeck} onClick={handleModalOpened}>
        Add New Deck
      </Button>
    </div>
  )
}

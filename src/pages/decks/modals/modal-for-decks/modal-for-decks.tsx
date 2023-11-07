import { ReactNode, useState } from 'react'

import s from './modal-for-decks.module.css'

import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox.tsx'
import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'
import { Modal } from '@/components/ui/modal'
import { ModalButtons } from '@/components/ui/modal/modal-buttons.tsx'
import {
  useCreateDeckMutation,
  useEditDeckMutation,
  useRemoveDeckMutation,
} from '@/services/decks/decks.ts'
import { Deck } from '@/services/decks/types.ts'

type PropsType = {
  handleSubmit: any
  control: any
  errors: any
  children: ReactNode
  deck?: Deck
  variant: 'add' | 'edit' | 'delete'
}

export const ModalForDecks = ({
  handleSubmit,
  control,
  errors,
  children,
  variant,
  deck,
}: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)

  const onCancelButtonClick = () => setOpen(false)
  const handleModalOpened = () => setOpen(true)
  const [createDeck] = useCreateDeckMutation()
  const [editDeck] = useEditDeckMutation()
  const [deleteDeck] = useRemoveDeckMutation()

  const deleteHandler = () => {
    if (deck)
      deleteDeck({ id: deck.id }).then(() => {
        setOpen(false)
      })
  }

  const createDeckHandler = (arg: { name: string; isPrivate: boolean }) => {
    createDeck(arg).then(() => {
      setOpen(false)
    })
  }

  const editDeckHandler = (arg: { name: string; isPrivate: boolean }) => {
    if (deck)
      editDeck({ id: deck.id, ...arg }).then(() => {
        setOpen(false)
      })
  }

  const variantsHandler = (arg: { name: string; isPrivate: boolean }) => {
    if (variant === 'add') createDeckHandler(arg)
    if (variant === 'edit') editDeckHandler(arg)
  }

  const variantsTitle =
    // eslint-disable-next-line no-nested-ternary
    variant === 'add' ? 'Add New Deck' : variant === 'edit' ? 'Edit Deck' : 'Delete Deck'

  const variantsButtonTitle =
    // eslint-disable-next-line no-nested-ternary
    variant === 'add' ? 'Add New Deck' : variant === 'edit' ? 'Save changes' : 'Delete Deck'

  return (
    <div>
      <Modal open={open} onClose={onCancelButtonClick} title={variantsTitle}>
        <form onSubmit={handleSubmit(variantsHandler)}>
          <ModalButtons
            ConfirmButtonTitle={variantsButtonTitle}
            onClose={onCancelButtonClick}
            onChange={deleteHandler}
            variant={variant}
          >
            <div>
              {variant === 'delete' ? (
                <div className={s.descriptionForDeleteDeck}>
                  <div className={s.description}>
                    Do you really want to remove{' '}
                    <strong>
                      <i>{deck && deck.name}</i>
                    </strong>
                    ? All cards will be deleted.
                  </div>
                </div>
              ) : (
                <div>
                  <ControlledTextField
                    name={'name'}
                    control={control}
                    error={errors.isPrivate?.message}
                    label={'Name Deck'}
                    className={s.inputWidth}
                    defaultValue={deck?.name}
                  />
                  <ControlledCheckbox name={'isPrivate'} control={control} label={'Private deck'} />
                </div>
              )}
            </div>
          </ModalButtons>
        </form>
      </Modal>
      <div onClick={handleModalOpened}>{children}</div>
    </div>
  )
}

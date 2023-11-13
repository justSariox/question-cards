import { ReactNode, useState } from 'react'

import s from './modal-for-cards.module.css'

import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'
import { ControlledSelect } from '@/components/ui/controlled/controlled-select/controlled-select.tsx'
import { Modal } from '@/components/ui/modal'
import { ModalButtons } from '@/components/ui/modal/modal-buttons.tsx'
import { useEditCardMutation, useRemoveCardMutation } from '@/services/cards/cards.ts'
import { Card, EditCardRequestType } from '@/services/cards/types.ts'
import { useCreateCardMutation } from '@/services/decks/decks.ts'
import { CreateCardParams, Deck } from '@/services/decks/types.ts'

type PropsType = {
  handleSubmit: any
  control: any
  errors: any
  children: ReactNode
  variant: 'add' | 'edit' | 'delete'
  card?: Card
  deck?: Deck
}

export const ModalForCards = ({
  handleSubmit,
  control,
  errors,
  children,
  variant,
  card,
  deck,
}: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)

  const onCancelButtonClick = () => setOpen(false)
  const handleModalOpened = () => setOpen(!open)
  const [addCard] = useCreateCardMutation()
  const [editCard] = useEditCardMutation()
  const [deleteCard] = useRemoveCardMutation()

  const deleteCardHandler = () => {
    if (card)
      deleteCard({ id: card.id }).then(() => {
        setOpen(false)
      })
  }

  const createCardHandler = (arg: CreateCardParams) => {
    if (deck)
      addCard({ ...arg, id: deck.id }).then(() => {
        setOpen(false)
      })
  }

  const editCardHandler = (arg: EditCardRequestType) => {
    if (card)
      editCard({ ...arg, id: card.id }).then(() => {
        setOpen(false)
      })
  }

  const variantsHandler = (arg: { id: string; question: string; answer: string }) => {
    if (variant === 'add') createCardHandler(arg)
    if (variant === 'edit') editCardHandler(arg)
  }

  const variantsTitle =
    // eslint-disable-next-line no-nested-ternary
    variant === 'add' ? 'Add New Card' : variant === 'edit' ? 'Edit Card' : 'Delete Card'

  const variantsButtonTitle =
    // eslint-disable-next-line no-nested-ternary
    variant === 'add' ? 'Add New Card' : variant === 'edit' ? 'Save changes' : 'Delete Card'

  const questionFormats = [
    { label: 'Text', value: 'Text' },
    { label: 'Video', value: 'Video' },
    { label: 'Picture', value: 'Picture' },
  ]

  return (
    <div>
      <Modal open={open} onClose={onCancelButtonClick} title={variantsTitle}>
        <form onSubmit={handleSubmit(variantsHandler)}>
          <ModalButtons
            ConfirmButtonTitle={variantsButtonTitle}
            onClose={onCancelButtonClick}
            onChange={deleteCardHandler}
            variant={variant}
          >
            <div className={s.infoContainer}>
              {variant === 'delete' ? (
                <div className={s.descriptionForDeleteDeck}>
                  <div className={s.description}>
                    Do you really want to remove{' '}
                    <strong>
                      <i>{card && card.question}</i>
                    </strong>
                    ? Card will be permanently deleted.
                  </div>
                </div>
              ) : (
                <div className={s.fieldsForCard}>
                  <ControlledSelect
                    name={'questionFormat'}
                    control={control}
                    selectItems={questionFormats}
                    defaultValue={questionFormats[0].value}
                    label={'Choose a question format'}
                  />
                  <ControlledTextField
                    name={'question'}
                    control={control}
                    error={errors.question}
                    label={'Question'}
                    className={s.inputWidth}
                    defaultValue={card?.question}
                  />
                  <ControlledTextField
                    name={'answer'}
                    control={control}
                    error={errors.answer}
                    label={'Answer'}
                    className={s.inputWidth}
                    defaultValue={card?.answer}
                  />
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

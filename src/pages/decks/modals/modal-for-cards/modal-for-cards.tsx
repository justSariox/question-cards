import { ReactNode, useState } from 'react'

import s from './modal-for-cards.module.css'

import { ControlledSelect } from '@/components/ui/controlled/controlled-select/controlled-select.tsx'
import { Modal } from '@/components/ui/modal'
import { ModalButtons } from '@/components/ui/modal/modal-buttons.tsx'
import { DeleteContent } from '@/pages/decks/modals/modal-for-cards/content-for-modals/delete-content.tsx'
import { ImageContent } from '@/pages/decks/modals/modal-for-cards/content-for-modals/image-content.tsx'
import { TextContent } from '@/pages/decks/modals/modal-for-cards/content-for-modals/text-content.tsx'
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

  const variantsHandler = (arg: CreateCardParams | EditCardRequestType) => {
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
        <form
          method={'post'}
          encType={'multipart/form-data'}
          onSubmit={handleSubmit(variantsHandler)}
        >
          <ModalButtons
            ConfirmButtonTitle={variantsButtonTitle}
            onClose={onCancelButtonClick}
            onChange={deleteCardHandler}
            variant={variant}
          >
            <div className={s.infoContainer}>
              {variant === 'delete' ? (
                <DeleteContent card={card} />
              ) : (
                <div className={s.fieldsForCard}>
                  <ControlledSelect
                    name={'questionFormat'}
                    control={control}
                    selectItems={questionFormats}
                    defaultValue={questionFormats[0].value}
                    label={'Choose a question format'}
                  />
                  {/*нужно сделать отображение в зависимости от селекта */}
                  {!open ? (
                    <TextContent control={control} card={card} errors={errors} />
                  ) : (
                    <ImageContent control={control} card={card} />
                  )}
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

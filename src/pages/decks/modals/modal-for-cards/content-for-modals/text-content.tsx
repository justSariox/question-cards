import s from '../modal-for-cards.module.css'

import { ControlledTextField } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'
import { Card } from '@/services/cards/types.ts'

type PropsType = {
  control: any
  errors: any
  card?: Card
}

export const TextContent = ({ control, errors, card }: PropsType) => {
  return (
    <div>
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
  )
}

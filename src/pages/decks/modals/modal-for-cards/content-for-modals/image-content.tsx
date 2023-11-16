import s from '../modal-for-cards.module.css'

import { InputFile } from '@/components/ui/inputFile/inputFile.tsx'
import { Card } from '@/services/cards/types.ts'

type PropsType = {
  control: any
  card?: Card
}

export const ImageContent = ({ control, card }: PropsType) => {
  /*  const [questionFileName, setQuestionFileName] = useState<string>('')
    const [answerFileName, setAnswerFileName] = useState<string>('')
  
    const changeCoverQuestion = (e: any) => {
      setQuestionFileName(e.target.value.replace(/.*\\/, ''))
    }
  
    const changeCoverAnswer = (e: any) => {
      setAnswerFileName(e.target.value.replace(/.*\\/, ''))
    }*/

  return (
    <div>
      <div className={s.inputeFileRow}>
        Question:
        {card?.questionImg ? card.questionImg : <div className={s.fakeImage}></div>}
        <InputFile inputName={'questionImg'} control={control} defaultValue={card?.questionImg} />
      </div>
      <div className={s.answerContainer}>
        Answer:
        {card?.answerImg ? card.answerImg : <div className={s.fakeImage}></div>}
        <InputFile inputName={'answerImg'} control={control} defaultValue={card?.answerImg} />
      </div>
    </div>
  )
}

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledRadio } from '@/components/ui/controlled/controlled-radio/controlled-radio.tsx'
import { Typography } from '@/components/ui/typography'
import s from '@/pages/decks/deck/card/card.module.css'
import { useGetCardForLearnQuery, usePostGradeMutation } from '@/services/decks/decks.ts'
import { Deck } from '@/services/decks/types.ts'

type PropsType = {
  deck: Deck | undefined
  deckId: string | undefined
}

const radioSchema = z.object({
  grade: z.string(),
})

export type FormValues = z.infer<typeof radioSchema>

export const CardInfo = ({ deck, deckId }: PropsType) => {
  const [open, setOpen] = useState(false)
  const { data: card } = useGetCardForLearnQuery({ id: deckId || '', previousCardId: '' })
  const [postGrade] = usePostGradeMutation()

  const showAnswer = () => {
    setOpen(!open)
  }

  const postGradeHandle = (arg: any) => {
    setOpen(!open)
    if (deckId && card) postGrade({ id: deckId, cardId: card.id, grade: +arg.grade })
  }

  const options = [
    { label: 'Did not know', value: '1' },
    { label: 'Forgot', value: '2' },
    { label: 'A lot of thought', value: '3' },
    { label: 'Сonfused', value: '4' },
    { label: 'Knew the answer', value: '5' },
  ]

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(radioSchema),
  })

  return (
    <div className={s.cardContainer}>
      <Card className={s.card}>
        <Typography variant={'large'} className={s.cardTitle}>
          Learn &#8220;{deck?.name || 'Deck Name'}&#8221;
        </Typography>
        <div className={s.cardInfo}>
          <Typography variant={'subtitle1'}>
            <strong>Question:</strong>{' '}
            <span className={s.question}>
              {card?.question}
              {card?.questionImg && (
                <img src={card.questionImg} alt="question Image" className={s.questionImage} />
              )}
              {card?.questionVideo && <video src={card.questionVideo}></video>}
            </span>
          </Typography>
          <Typography variant={'subtitle2'} className={s.description}>
            Количество попыток ответов на вопрос: <span className={s.countTry}>{card?.shots}</span>
          </Typography>
        </div>
        {open ? (
          <form onSubmit={handleSubmit(postGradeHandle)} className={s.answerContainer}>
            <span>
              <strong>Answer: </strong>
              {card?.answer}
              {card?.answerImg && (
                <img src={card.answerImg} alt="answer Image" className={s.answerImage} />
              )}
              {card?.answerVideo && <video src={card.answerVideo}></video>}
            </span>
            <div>
              <strong>Rate yourself:</strong>
              <div className={s.radioWrapper}>
                <ControlledRadio
                  options={options}
                  name={'grade'}
                  control={control}
                  errors={errors}
                />
              </div>
            </div>
            <Button type={'submit'} className={s.cardButton}>
              Next Question
            </Button>
          </form>
        ) : (
          <Button className={s.cardButton} onClick={showAnswer}>
            Show Answer
          </Button>
        )}
      </Card>
    </div>
  )
}

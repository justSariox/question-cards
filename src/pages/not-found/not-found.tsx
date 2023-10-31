import { useNavigate } from 'react-router-dom'

import s from './not-found.module.css'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { NotFoundPicture } from '@/pages/assets'

export const NotFound = () => {
  const navigate = useNavigate()

  const onButtonClick = () => {
    return navigate('/')
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.pageWrapper}>
        <NotFoundPicture />
        <Typography variant={'body1'} className={s.text}>
          Sorry! Page not found!
        </Typography>
        <Button onClick={onButtonClick}>Back to home page</Button>
      </div>
    </div>
  )
}

import { useState } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type SliderProps = {}

export const Slider = ({}: SliderProps) => {
  const [value, setValue] = useState([30, 50])

  const changeValueHandler = (value: number[]) => {
    setValue(value)
  }

  return (
    <form className={s.SliderForm}>
      <div className={s.SliderBoxValue}>{value[0]}</div>
      <SliderRadix.Root
        className={s.SliderRoot}
        defaultValue={value}
        value={value}
        onValueChange={changeValueHandler}
        max={100}
        step={1}
        minStepsBetweenThumbs={1}
      >
        <SliderRadix.Track className={s.SliderTrack}>
          <SliderRadix.Range className={s.SliderRange} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.SliderThumb} aria-label="Volume" />
        <SliderRadix.Thumb className={s.SliderThumb} aria-label="Nevolume" />
      </SliderRadix.Root>
      <div className={s.SliderBoxValue}>{value[1]}</div>
    </form>
  )
}

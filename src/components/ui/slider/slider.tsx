import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type SliderProps = {
  range: Array<number>
  onRangeChange: (range: Array<number>) => void
  value: Array<number>
}

export const Slider = ({ range, onRangeChange }: SliderProps) => {
  const changeValueHandler = (value: Array<number>) => {
    onRangeChange(value)
  }

  return (
    <form className={s.SliderForm}>
      <div className={s.SliderBoxValue}>{range[0]}</div>
      <SliderRadix.Root
        className={s.SliderRoot}
        value={range}
        onValueChange={changeValueHandler}
        step={1}
        minStepsBetweenThumbs={1}
      >
        <SliderRadix.Track className={s.SliderTrack}>
          <SliderRadix.Range className={s.SliderRange} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.SliderThumb} aria-label="rangeMin" />
        <SliderRadix.Thumb className={s.SliderThumb} aria-label="rangeMax" />
      </SliderRadix.Root>
      <div className={s.SliderBoxValue}>{range[1]}</div>
    </form>
  )
}

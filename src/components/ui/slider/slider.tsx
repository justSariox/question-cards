import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type SliderProps = {
  range: Array<number>
  onRangeChange: (range: Array<number>) => void
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
        defaultValue={range}
        value={range}
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
      <div className={s.SliderBoxValue}>{range[1]}</div>
    </form>
  )
}

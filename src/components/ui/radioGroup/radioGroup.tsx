import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type RadioGroupProps = {
  value?: string | number
  onChange?: () => void
  disabled?: boolean
  name?: string
}

export const Radio = ({ name = 'Radio', disabled }: RadioGroupProps) => {
  return (
    <form>
      <RadioGroup.Root
        className={s.RadioGroupRoot}
        defaultValue="default"
        aria-label="View density"
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <RadioGroup.Item className={s.RadioGroupItem} value="default" id="r1" disabled={disabled}>
            <RadioGroup.Indicator className={s.RadioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r1">
            {name}
          </label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <RadioGroup.Item
            className={s.RadioGroupItem}
            value="comfortable"
            id="r2"
            disabled={disabled}
          >
            <RadioGroup.Indicator className={s.RadioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r2">
            {name}
          </label>
        </div>
      </RadioGroup.Root>
    </form>
  )
}

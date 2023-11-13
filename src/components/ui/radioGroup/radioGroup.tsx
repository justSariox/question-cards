import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type Option = {
  label: string
  value: string
}

export type RadioGroupProps = {
  onChange?: () => void
  disabled?: boolean
  options: Option[]
  errors: any
  value: string
}

export const Radio = ({ disabled = false, options, onChange, value }: RadioGroupProps) => {
  return (
    <form>
      <RadioGroup.Root
        className={s.RadioGroupRoot}
        defaultValue={options[0].value}
        value={value}
        onValueChange={onChange}
      >
        {options.map(option => {
          return (
            <div className={s.RadioGroupItemWrapper} key={option.value}>
              <RadioGroup.Item
                className={s.RadioGroupItem}
                value={option.value}
                id={option.value}
                disabled={disabled}
                key={option.value}
              >
                <RadioGroup.Indicator className={s.RadioGroupIndicator} />
              </RadioGroup.Item>
              <label className={s.Label} htmlFor={option.value}>
                {option.label}
              </label>
            </div>
          )
        })}
      </RadioGroup.Root>
    </form>
  )
}

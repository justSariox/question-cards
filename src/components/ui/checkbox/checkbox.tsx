import * as CheckboxRadix from '@radix-ui/react-checkbox'

import checkIcon from '../assets/svg/check-svgrepo-com.svg'

import s from './checkbox.module.scss'

import { Typography } from '@/components/ui/typography'

export type CheckboxProps = {
  className?: string
  checked?: boolean
  disabled?: boolean
  required?: boolean
  onChange?: (checked: boolean) => void
  label?: string
}
export const Checkbox = (props: CheckboxProps) => {
  const { checked, onChange, label, required, disabled, className } = props

  return (
    <div className={`${s.checkbox} ${className}`}>
      <Typography variant={'body2'} as={'label'} className={`${s.label} ${disabled && s.disabled}`}>
        {label}
        <div className={`${s.wrapper} ${disabled && s.disabled}`}>
          <CheckboxRadix.Root
            className={`${s.root} ${checked ? s.checked : ''}`}
            checked={checked}
            required={required}
            onCheckedChange={onChange}
            disabled={disabled}
          >
            {checked && (
              <CheckboxRadix.Indicator className={s.indicator}>
                {checked && <img className={s.checkIcon} src={checkIcon} alt="" />}
              </CheckboxRadix.Indicator>
            )}
          </CheckboxRadix.Root>
        </div>
      </Typography>
    </div>
  )
}

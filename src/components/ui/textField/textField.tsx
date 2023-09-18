import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import searchIcon from '../assets/svg/search-outline.svg'

import s from './textField.module.scss'

export type TextFieldProps = {
  onChangeValue?: (value: string) => void
  error?: string
  disabled?: boolean
  label?: string
  type?: 'text' | 'password' | 'search'
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ onChangeValue, value, error, disabled, onChange, label, type, ...restProps }, ref) => {
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onChangeValue?.(e.currentTarget.value)
    }

    return (
      <div className={s.inputWrapper}>
        <label className={s.label}>{label}</label>
        {type === 'search' && (
          <span className={s.searchIcon}>
            <img src={searchIcon} />
          </span>
        )}
        <div className={s.inputContainer}>
          <input
            id={restProps.id}
            placeholder={restProps.placeholder}
            type={'password' && visiblePassword ? 'text' : type}
            className={`${error ? s.error : s.input} ${type === 'search' ? s.searchInput : ''} `}
            onChange={onChangeHandler}
            disabled={disabled}
            ref={ref}
            value={value}
          />
          {type === 'password' && (
            <a
              className={`${s.passwordControl} ${
                visiblePassword ? s.showPassword : s.hidePassword
              }`}
              onClick={() => {
                setVisiblePassword(prevState => !prevState)
              }}
            ></a>
          )}

          {error && <span className={s.errorMessage}>{error}</span>}
        </div>
      </div>
    )
  }
)

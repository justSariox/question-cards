import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import searchIcon from '../assets/svg/search-outline.svg'

import s from './textField.module.scss'

export type TextFieldProps = {
  onChangeValue?: (value: string) => void
  error?: any
  disabled?: boolean
  label?: string
  type?: 'text' | 'password' | 'search' | 'email'
  className?: string
  value?: string
  defaultValue?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      onChangeValue,
      value,
      error,
      disabled,
      onChange,
      label,
      type = 'text',
      className,
      defaultValue,
      ...restProps
    },
    ref
  ) => {
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onChangeValue?.(e.currentTarget.value)
    }

    return (
      <div className={s.inputWrapper}>
        <label className={s.label}>{label}</label>

        <div className={s.inputContainer}>
          {type === 'search' && (
            <span>
              <img src={searchIcon} className={s.searchIcon} alt={'search icon'} />
            </span>
          )}
          <input
            id={restProps.id}
            placeholder={restProps.placeholder}
            type={'password' && visiblePassword ? 'text' : type}
            className={`${className} ${error ? s.error : s.input}`}
            onChange={onChangeHandler}
            disabled={disabled}
            ref={ref}
            defaultValue={defaultValue}
            autoComplete={'off'}
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

          {error && <span className={s.errorMessage}>{error.message}</span>}
        </div>
      </div>
    )
  }
)

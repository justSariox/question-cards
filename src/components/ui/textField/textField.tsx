import {
  ComponentPropsWithoutRef,
  ReactNode,
  KeyboardEvent,
  FC,
  useState,
  ChangeEvent,
} from 'react'

import s from './textField.module.scss'

export type TextFieldProps = {
  type?: 'text' | 'password' | 'search'
  value?: string
  label?: ReactNode
  error?: string
  iconStart?: ReactNode
  iconEnd?: ReactNode
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
} & ComponentPropsWithoutRef<'input'>

export const TextField: FC<TextFieldProps> = ({ type = 'text', label, error, onEnter }) => {
  const [value, setValue] = useState<string>('')
  /*  const [showPass, setShowPass] = useState<boolean>(false)

    const searchIcon = type === 'search' && '&#128269;'
    const clearIcon = type === 'search' && value && '&times;'
    const showPassIcon = showPass && '&#128065;'*/
  const labelText = label ? label : 'Input'
  const KeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === 'Enter') {
      setValue(e.currentTarget.value)
    }
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
    <div className={s.inputWrapper}>
      <label className={s.label}>{labelText}</label>
      <input
        placeholder={error ? 'Error' : 'Input'}
        type={type}
        className={`${s.input} ${error ? s.error : ''}`}
        onKeyDown={KeyDownHandler}
        onChange={onChangeHandler}
        value={value}
      />
      {error && <span className={s.errorMessage}>{error}</span>}
    </div>
  )
}

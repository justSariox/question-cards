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
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
  disabled?: boolean
} & ComponentPropsWithoutRef<'input'>

export const TextField: FC<TextFieldProps> = ({
  type = 'text',
  label,
  error,
  disabled,
  value,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  // без этого не работает тернарный оператор
  // eslint-disable-next-line no-nested-ternary
  const placeholderTextCheck = type === 'search' ? 'Input search' : error ? 'Error' : 'Input'
  // eslint-disable-next-line no-nested-ternary
  const labelText = type === 'search' ? '' : label ? label : 'Input'
  const searchIcon = type === 'search' && '🔍︎'
  const startValue = value ? value : inputValue
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const showPassword = () => {
    let input = document.getElementById('passwordInput')

    if (input?.getAttribute('type') == 'password') {
      input.removeAttribute('type')
      input.setAttribute('type', 'text')
    } else {
      input?.removeAttribute('type')
      input?.setAttribute('type', 'password')
    }
  }

  return (
    <div className={s.inputWrapper}>
      <label className={s.label}>{labelText}</label>
      <span className={s.searchIcon}>{searchIcon}</span>
      <input
        id={'passwordInput'}
        placeholder={placeholderTextCheck}
        type={type}
        className={`${error ? s.error : s.input} ${type === 'search' ? s.searchInput : ''} `}
        onChange={onChangeHandler}
        value={startValue}
        disabled={disabled}
        onKeyDown={rest.onEnter}
      />
      {type === 'password' && <a className={s.passwordControl} onClick={showPassword}></a>}
      {error && <span className={s.errorMessage}>{error}</span>}
    </div>
  )
}

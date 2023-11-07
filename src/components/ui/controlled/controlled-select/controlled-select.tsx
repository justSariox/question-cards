import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Select, SelectPropsType } from '@/components/ui/select'

export type ControlledSelectProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<SelectPropsType, 'onChange' | 'value' | 'id'>

export const ControlledSelect = <TFieldValues extends FieldValues>({
  name,
  control,
  selectItems,
  defaultValue,
  label,
  ...selectProps
}: ControlledSelectProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue,
  })

  return (
    <Select
      {...selectProps}
      selectItems={selectItems}
      onChange={onChange}
      value={value}
      id={name}
      label={label}
    />
  )
}

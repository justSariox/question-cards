import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Select, SelectPropsType } from '@/components/ui/select'

export type ControlledSelectProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<SelectPropsType, 'onChange' | 'value' | 'id'>

export const ControlledSelect = <TFieldValues extends FieldValues>({
  name,
  control,
  ...selectProps
}: ControlledSelectProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  })

  return <Select {...selectProps} onChange={onChange} value={value} id={name} />
}

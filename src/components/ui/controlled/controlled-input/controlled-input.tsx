import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui/textField'

export type ControlledTextFieldProps<TFieldsValues extends FieldValues> = {
  name: FieldPath<TFieldsValues>
  control: Control<TFieldsValues>
} & Omit<TextFieldProps, 'onChange' | 'value' | 'id'>

export const ControlledTextField = <TFieldValues extends FieldValues>({
  name,
  control,
  error,
  ...restProps
}: ControlledTextFieldProps<TFieldValues>) => {
  const { field } = useController({
    name,
    control,
  })

  return <TextField {...restProps} {...field} error={error} id={name} />
}

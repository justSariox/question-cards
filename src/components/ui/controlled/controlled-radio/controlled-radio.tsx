import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Radio, RadioGroupProps } from '@/components/ui/radioGroup'

export type ControlledRadioProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<RadioGroupProps, 'onChange' | 'value' | 'id'>

export const ControlledRadio = <TFieldValues extends FieldValues>({
  name,
  control,
  disabled,
  errors,
  options,
  ...RadioGroupProps
}: ControlledRadioProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  })

  return (
    <Radio
      {...RadioGroupProps}
      onChange={onChange}
      options={options}
      errors={errors}
      value={value}
    />
  )
}

import * as SelectRadix from '@radix-ui/react-select'

import s from '@/components/ui/select/select.module.scss'

type PropsType = {
  children: any
  value: string
}

export const SelectItem = ({ children, value }: PropsType) => {
  return (
    <SelectRadix.Item className={s.SelectItem} value={value}>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    </SelectRadix.Item>
  )
}

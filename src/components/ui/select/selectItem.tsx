import { CheckIcon } from '@radix-ui/react-icons'
import * as SelectRadix from '@radix-ui/react-select'

export const SelectItem = ({ children, value, ...props }) => {
  return (
    <SelectRadix.Item value={value} {...props}>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      <SelectRadix.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </SelectRadix.ItemIndicator>
    </SelectRadix.Item>
  )
}

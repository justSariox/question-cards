import { useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Label from '@radix-ui/react-label'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

import { SelectItem } from '@/components/ui/select/selectItem.tsx'

type SelectItemType = { label: string; value: string } | { label: number; value: string }

export type SelectPropsType = {
  className?: string
  value?: string | number | null
  onChange?: (itemPerPage: string) => void
  label?: string | number
  selectItems?: SelectItemType[]
  isDisabled?: boolean
}
export const Select = ({ label, selectItems, onChange, isDisabled }: SelectPropsType) => {
  const [upDownIcon, setUpDownIcon] = useState<boolean>(false)
  const selectItem = selectItems.map(i => {
    return (
      <SelectItem key={i.value} value={i.value}>
        {i.label}
      </SelectItem>
    )
  })

  return (
    <div className={s.selectWrapper}>
      <div>
        <Label.Root className={isDisabled ? s.LabelRootDisabled : s.LabelRoot} htmlFor="firstName">
          {label}{' '}
        </Label.Root>
      </div>
      <div>
        <SelectRadix.Root open={upDownIcon} onOpenChange={setUpDownIcon} onValueChange={onChange}>
          <SelectRadix.Trigger className={s.SelectTrigger}>
            <SelectRadix.Value placeholder={selectItems[0].value} />
            <SelectRadix.Icon className={s.SelectDownIcon} asChild>
              {upDownIcon ? (
                <ChevronUpIcon />
              ) : (
                <ChevronDownIcon className={s.SelectChevron} aria-hidden />
              )}
            </SelectRadix.Icon>
          </SelectRadix.Trigger>
          <SelectRadix.Portal>
            <SelectRadix.Content className={s.SelectContent} position="popper" sideOffset={-1}>
              <SelectRadix.Viewport className={s.SelectViewport}>
                <SelectRadix.Group>{selectItem}</SelectRadix.Group>
              </SelectRadix.Viewport>
            </SelectRadix.Content>
          </SelectRadix.Portal>
        </SelectRadix.Root>
      </div>
    </div>
  )
}

import { useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Label from '@radix-ui/react-label'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

import { SelectItem } from '@/components/ui/select/selectItem.tsx'

type SelectItemType = {
  id: string
  option: string
}

type SelectPropsType = {
  label?: string
  selectItems: SelectItemType[]
}
export const Select = ({ label, selectItems }: SelectPropsType) => {
  const [upDownIcon, setUpDownIcon] = useState<boolean>(false)
  const selectItem = selectItems.map(i => {
    return (
      <SelectItem key={i.id} value={i.option}>
        {i.option}
      </SelectItem>
    )
  })

  return (
    <div className={s.selectWrapper}>
      <div>
        <Label.Root className={s.LabelRoot} htmlFor="firstName">
          {label}
        </Label.Root>
      </div>
      <div>
        <SelectRadix.Root open={upDownIcon} onOpenChange={setUpDownIcon}>
          <SelectRadix.Trigger className={s.SelectTrigger}>
            <SelectRadix.Value placeholder="Select-box" />
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

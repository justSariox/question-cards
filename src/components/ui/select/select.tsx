import { ComponentPropsWithoutRef, useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as LabelRadix from '@radix-ui/react-label'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

import { SelectItem } from '@/components/ui/select/selectItem.tsx'

type SelectItemType = { label: string; value: string } | { label: number; value: string }

export type SelectPropsType = {
  className?: string
  value?: string | number | null
  onChange?: (itemPerPage: string) => void
  label?: string | number
  selectItems: SelectItemType[]
  isDisabled?: boolean
  isPagination?: boolean
} & ComponentPropsWithoutRef<'select'>

export const Select = ({
  selectItems,
  onChange,
  isPagination = false,
  value = selectItems[0].value,
  label,
}: SelectPropsType) => {
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
      <LabelRadix.Root className={s.LabelRoot}>{label}</LabelRadix.Root>
      <SelectRadix.Root
        open={upDownIcon}
        onOpenChange={setUpDownIcon}
        onValueChange={onChange}
        defaultValue={selectItems[0].value}
      >
        <SelectRadix.Trigger className={` ${isPagination ? '' : s.selectSize} ${s.SelectTrigger}`}>
          <SelectRadix.Value placeholder={selectItems[0].value} defaultValue={value} />
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
              <SelectRadix.Group className={s.selectItem}>{selectItem}</SelectRadix.Group>
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}

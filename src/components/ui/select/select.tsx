import { useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Label from '@radix-ui/react-label'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

import { SelectItem } from '@/components/ui/select/selectItem.tsx'

export type SelectProps = {
  isDisabled?: boolean
}

export const Select = ({ isDisabled }: SelectProps) => {
  const [upDownIcon, setUpDownIcon] = useState<boolean>(false)

  return (
    <div className={s.selectWrapper}>
      <div>
        <Label.Root className={isDisabled ? s.LabelRootDisabled : s.LabelRoot} htmlFor="firstName">
          First name
        </Label.Root>
      </div>
      <div>
        <SelectRadix.Root open={upDownIcon} onOpenChange={setUpDownIcon} disabled={isDisabled}>
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
                <SelectRadix.Group>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectRadix.Group>
              </SelectRadix.Viewport>
            </SelectRadix.Content>
          </SelectRadix.Portal>
        </SelectRadix.Root>
      </div>
    </div>
  )
}

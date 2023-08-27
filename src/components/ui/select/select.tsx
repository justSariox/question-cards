import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as SelectRadix from '@radix-ui/react-select'

import { SelectItem } from '@/components/ui/select/selectItem.tsx'
// import s from './select.module.scss'

export type SelectProps<T extends ElementType = 'select'> = {
  as?: T
  children?: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  fullWidth?: boolean
  className?: string
} & ComponentPropsWithoutRef<T>

export const Select = <T extends ElementType = 'select'>(
  props: SelectProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof SelectProps<T>>
) => {
  // const { ...rest } = props

  return (
    <SelectRadix.Root>
      <SelectRadix.Trigger>
        <SelectRadix.Value />
        <SelectRadix.Icon>
          <ChevronDownIcon />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>
      <SelectRadix.Portal>
        <SelectRadix.Content>
          <SelectRadix.ScrollUpButton>
            <ChevronUpIcon />
          </SelectRadix.ScrollUpButton>
          <SelectRadix.Viewport className="SelectViewport">
            <SelectRadix.Group>
              <SelectRadix.Label className="SelectLabel">Fruits</SelectRadix.Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectRadix.Group>
          </SelectRadix.Viewport>
          <SelectRadix.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </SelectRadix.ScrollDownButton>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  )
}

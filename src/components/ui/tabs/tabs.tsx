import { ReactNode } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'

import s from './tabs.module.css'

export type TabType = {
  value: string
  title: string
  disabled?: boolean
}

type PropsType = {
  tabs: TabType[]
  value?: string
  defaultValue?: string
  onValueChange: (value: string) => void
  children?: ReactNode
}

export const Tabs = ({ tabs, defaultValue, onValueChange, children }: PropsType) => {
  return (
    <TabsRadix.Root
      className={s.TabsRoot}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <TabsRadix.List className={s.TabsList} aria-label="Manage your choice">
        {tabs.map(tab => (
          <TabsRadix.Trigger
            key={tab.value}
            className={s.TabsTrigger}
            value={tab.value}
            disabled={tab.disabled}
          >
            {tab.title}
          </TabsRadix.Trigger>
        ))}
      </TabsRadix.List>
      {children}
    </TabsRadix.Root>
  )
}

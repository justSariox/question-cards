import * as React from 'react'

import * as SwitchPrimitives from '@radix-ui/react-switch'

import s from './tabs.module.scss'

export const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitives.Root className={`${s.root} ${className}`} {...props} ref={ref}>
      <SwitchPrimitives.Thumb className={s.thumb} />
    </SwitchPrimitives.Root>
  )
})

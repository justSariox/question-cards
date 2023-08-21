import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { Checkbox } from '@/components/ui/checkbox/checkbox.tsx'
export function App() {
  const [checked, setChecked] = useState<boolean>(false)
  const handleChange = () => {
    setChecked(prevState => !prevState)
  }

  return (
    <div>
      <Card>
        <Button as={'a'} href={'https://google.com/'} variant={'link'}>
          go to google
        </Button>
        <div>fdikgdkfg</div>
        <div>fdikgdkfg</div>
        <div>fdikgdkfg</div>
        <div>fdikgdkfg</div>
        <Checkbox label={'check it'} checked={checked} onChange={handleChange} />
      </Card>
    </div>
  )
}

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { Select } from '@/components/ui/select'
export function App() {
  return (
    <div>
      <Card>
        <Button as={'a'} href={'https://google.com/'} variant={'link'}>
          go to google
        </Button>
        <Select />
      </Card>
    </div>
  )
}

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
export function App() {
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
      </Card>
    </div>
  )
}

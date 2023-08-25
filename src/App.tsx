import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'

export function App() {
  return (
    <div>
      <Card>
        <Button as={'a'} href={'https://google.com/'} variant={'link'}>
          go to google
        </Button>
        <br />
        <Button>go to yandex</Button>
        <br />
        <Button variant={'secondary'}>go to yahoo</Button>
        <br />
        <Button variant={'tertiary'}>go to home</Button>
        <br />
        <Button>go away</Button>
      </Card>
    </div>
  )
}

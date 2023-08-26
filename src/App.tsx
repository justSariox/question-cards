import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { Header } from '@/components/ui/header'
export function App() {
  return (
    <div>
      <Header isLoggedIn={false} />
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

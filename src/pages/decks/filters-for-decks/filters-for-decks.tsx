import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textField'
import s from '@/pages/decks/decks.module.css'

type PropsType = {
  setShowUserDecks: (show: boolean) => void
  setRange: (range: number[]) => void
  setSearch: (search: string) => void
  showUserDecks: boolean
  search: string
  range: number[]
}

export const FiltersForDecks = ({
  setShowUserDecks,
  showUserDecks,
  setRange,
  setSearch,
  search,
  range,
}: PropsType) => {
  const cardsOption = [
    { value: 'My Cards', title: 'My Cards' },
    { value: 'All Cards', title: 'All Cards' },
  ]

  const changeAuthor = () => {
    setShowUserDecks(!showUserDecks)
  }

  const clearFilters = () => {
    setRange([0, 100])
    setShowUserDecks(false)
    setSearch('')
  }

  return (
    <div className={s.decksWrapper}>
      <TextField type={'search'} value={search} onChangeValue={setSearch} placeholder={'Search'} />
      <Tabs
        tabs={cardsOption}
        value={showUserDecks ? cardsOption[0].value : cardsOption[1].value}
        defaultValue={cardsOption[1].value}
        onValueChange={changeAuthor}
      />
      <Slider range={range} onRangeChange={setRange} value={range} />
      <Button onClick={clearFilters} variant={'secondary'} remove={true}>
        Clear Filter
      </Button>
    </div>
  )
}

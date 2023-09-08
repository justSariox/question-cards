import { Button } from '@/components/ui/button'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks/decks.ts'

export const Decks = () => {
  const decks = useGetDecksQuery()
  const [createDeck] = useCreateDeckMutation()

  if (decks.isLoading) return <div>Loading</div>
  if (decks.isError) return <div>Error</div>

  return (
    <div>
      <Button
        onClick={() => {
          createDeck({ name: '123' })
        }}
      >
        Create deck
      </Button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Updated</th>
            <th>Created by</th>
          </tr>
        </thead>
        <tbody>
          {decks.data?.items?.map(deck => {
            return (
              <tr key={deck.id}>
                <td>{deck.name}</td>
                <td>{deck.cardsCount}</td>
                <td>{deck.updated}</td>
                <td>{deck.author.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

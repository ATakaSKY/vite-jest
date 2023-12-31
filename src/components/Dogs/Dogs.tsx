import { gql, useQuery } from '@apollo/client'
import { Dog } from '../../gql/graphql'

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`

export function Dogs({
  onDogSelected,
}: {
  onDogSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  const { loading, error, data } = useQuery(GET_DOGS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.dogs.map((dog: Dog) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  )
}

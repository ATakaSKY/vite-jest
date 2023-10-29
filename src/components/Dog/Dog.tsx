import { gql, useQuery, useLazyQuery } from '@apollo/client'

const GET_DOG_PHOTO = gql`
  query dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`

export function DelayedDogQuery() {
  const [getDog, { loading, error, data }] = useLazyQuery(GET_DOG_PHOTO, {
    fetchPolicy: 'network-only', // by default it is cache-first
  })

  if (loading) return <p>Loading ...</p>
  if (error) return `Error! ${error}`

  return (
    <div>
      {data?.dog && <img src={data.dog.displayImage} />}
      <button onClick={() => getDog({ variables: { breed: 'bulldog' } })}>Click me!</button>
    </div>
  )
}

export function DogPhoto({ breed }: { breed: string }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
    notifyOnNetworkStatusChange: true,
    // pollInterval: 500
  })

  if (networkStatus === 4) return <p>Refetching!</p>
  if (loading) return null
  if (error) return `Error!: ${error}`

  return (
    <div>
      <div>
        <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      </div>
      <button onClick={() => refetch()}>Refetch!</button>
    </div>
  )
}

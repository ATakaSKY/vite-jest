/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** The `Upload` scalar type represents a file upload promise that resolves an object containing `stream`, `filename`, `mimetype` and `encoding`. */
  Upload: { input: any; output: any }
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type Dog = {
  __typename?: 'Dog'
  breed: Scalars['String']['output']
  displayImage?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  images?: Maybe<Array<Maybe<Image>>>
  subbreeds?: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type Image = {
  __typename?: 'Image'
  id: Scalars['String']['output']
  url: Scalars['String']['output']
}

export type Query = {
  __typename?: 'Query'
  dog?: Maybe<Dog>
  dogs?: Maybe<Array<Maybe<Dog>>>
}

export type QueryDogArgs = {
  breed: Scalars['String']['input']
}

export type DogQueryVariables = Exact<{
  breed: Scalars['String']['input']
}>

export type DogQuery = {
  __typename?: 'Query'
  dog?: { __typename?: 'Dog'; id: string; displayImage?: string | null } | null
}

export type GetDogsQueryVariables = Exact<{ [key: string]: never }>

export type GetDogsQuery = {
  __typename?: 'Query'
  dogs?: Array<{ __typename?: 'Dog'; id: string; breed: string } | null> | null
}

export const DogDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'dog' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'breed' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dog' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'breed' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'breed' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayImage' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DogQuery, DogQueryVariables>
export const GetDogsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetDogs' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dogs' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'breed' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDogsQuery, GetDogsQueryVariables>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** The `Upload` scalar type represents a file upload promise that resolves an object containing `stream`, `filename`, `mimetype` and `encoding`. */
  Upload: { input: any; output: any }
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type Dog = {
  __typename?: 'Dog'
  breed: Scalars['String']['output']
  displayImage?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  images?: Maybe<Array<Maybe<Image>>>
  subbreeds?: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type Image = {
  __typename?: 'Image'
  id: Scalars['String']['output']
  url: Scalars['String']['output']
}

export type Query = {
  __typename?: 'Query'
  dog?: Maybe<Dog>
  dogs?: Maybe<Array<Maybe<Dog>>>
}

export type QueryDogArgs = {
  breed: Scalars['String']['input']
}

export type DogQueryVariables = Exact<{
  breed: Scalars['String']['input']
}>

export type DogQuery = {
  __typename?: 'Query'
  dog?: { __typename?: 'Dog'; id: string; displayImage?: string | null } | null
}

export type GetDogsQueryVariables = Exact<{ [key: string]: never }>

export type GetDogsQuery = {
  __typename?: 'Query'
  dogs?: Array<{ __typename?: 'Dog'; id: string; breed: string } | null> | null
}

export const DogDocument = gql`
  query dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`

/**
 * __useDogQuery__
 *
 * To run a query within a React component, call `useDogQuery` and pass it any options that fit your needs.
 * When your component renders, `useDogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDogQuery({
 *   variables: {
 *      breed: // value for 'breed'
 *   },
 * });
 */
export function useDogQuery(baseOptions: Apollo.QueryHookOptions<DogQuery, DogQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<DogQuery, DogQueryVariables>(DogDocument, options)
}
export function useDogLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DogQuery, DogQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<DogQuery, DogQueryVariables>(DogDocument, options)
}
export function useDogSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<DogQuery, DogQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<DogQuery, DogQueryVariables>(DogDocument, options)
}
export type DogQueryHookResult = ReturnType<typeof useDogQuery>
export type DogLazyQueryHookResult = ReturnType<typeof useDogLazyQuery>
export type DogSuspenseQueryHookResult = ReturnType<typeof useDogSuspenseQuery>
export type DogQueryResult = Apollo.QueryResult<DogQuery, DogQueryVariables>
export const GetDogsDocument = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`

/**
 * __useGetDogsQuery__
 *
 * To run a query within a React component, call `useGetDogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDogsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetDogsQuery, GetDogsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetDogsQuery, GetDogsQueryVariables>(GetDogsDocument, options)
}
export function useGetDogsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetDogsQuery, GetDogsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetDogsQuery, GetDogsQueryVariables>(GetDogsDocument, options)
}
export function useGetDogsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetDogsQuery, GetDogsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetDogsQuery, GetDogsQueryVariables>(GetDogsDocument, options)
}
export type GetDogsQueryHookResult = ReturnType<typeof useGetDogsQuery>
export type GetDogsLazyQueryHookResult = ReturnType<typeof useGetDogsLazyQuery>
export type GetDogsSuspenseQueryHookResult = ReturnType<typeof useGetDogsSuspenseQuery>
export type GetDogsQueryResult = Apollo.QueryResult<GetDogsQuery, GetDogsQueryVariables>

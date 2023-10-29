import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://71z1g.sse.codesandbox.io/',
  documents: 'src/**/*.tsx',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
}

export default config

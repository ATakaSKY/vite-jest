// src/mocks/handlers.js
import { graphql, HttpResponse } from 'msw'

export const handlers = [
  // rest.post('/login', (req, res, ctx) => {
  //   // Persist user's authentication in the session
  //   sessionStorage.setItem('is-authenticated', 'true')
  //   return res(
  //     // Respond with a 200 status code
  //     ctx.status(200),
  //   )
  // }),
  // rest.get('/user', (req, res, ctx) => {
  //   // Check if the user is authenticated in this session
  //   const isAuthenticated = sessionStorage.getItem('is-authenticated')
  //   if (!isAuthenticated) {
  //     // If not authenticated, respond with a 403 error
  //     return res(
  //       ctx.status(403),
  //       ctx.json({
  //         errorMessage: 'Not authorized',
  //       }),
  //     )
  //   }
  //   // If authenticated, return a mocked user details
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       username: 'admin',
  //     }),
  //   )
  // }),

  // TODO: mocking graphql queries is not working at the moment, visit this later
  graphql.query('GetLocations', ({ query, operationName, variables }) => {
    console.log('Intercepted a "GetLocations" GraphQL query:', query, operationName, variables)
    return HttpResponse.json({
      data: {
        id: 1,
        name: 'sdfs',
        description: 'desc',
        photo: 'src',
      },
    })
  }),
]

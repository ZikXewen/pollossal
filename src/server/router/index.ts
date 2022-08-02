// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import pollsRouter from './poll'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('poll.', pollsRouter)

// export type definition of API
export type AppRouter = typeof appRouter

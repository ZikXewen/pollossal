import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import superjson from 'superjson'

import { prisma } from '../../../utils/db'

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .query('getPolls', {
    async resolve() {
      return await prisma.poll.findMany()
    },
  })

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
})

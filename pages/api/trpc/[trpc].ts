import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import superjson from 'superjson'
import { z } from 'zod'

import { prisma } from '@/db'

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .query('getPolls', {
    async resolve() {
      return await prisma.poll.findMany()
    },
  })
  .mutation('addPoll', {
    input: z.object({ question: z.string().min(5).max(600) }),
    async resolve({ input }) {
      return await prisma.poll.create({ data: { question: input.question } })
    },
  })

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
})

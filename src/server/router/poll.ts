import { createRouter } from './context'
import { z } from 'zod'

export default createRouter().query('getMyPolls', {
  async resolve({ ctx }) {
    if (!ctx.token) return []
    return await ctx.prisma.poll.findMany({ where: { ownerToken: ctx.token } })
    // return await ctx.prisma.poll.findMany() // Debugging
  },
})

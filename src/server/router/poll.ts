import { createPollValidator } from '../../utils/sharedValidators'
import { createRouter } from './context'

export default createRouter()
  .query('getMyPolls', {
    async resolve({ ctx }) {
      if (!ctx.token) return []
      return await ctx.prisma.poll.findMany({
        where: { ownerToken: ctx.token },
      })
    },
  })
  .mutation('create', {
    input: createPollValidator,
    async resolve({ input, ctx }) {
      console.log(input, ctx)
      if (!ctx.token) throw new Error('Unauthorized')
      return await ctx.prisma.poll.create({
        data: {
          question: input.question,
          ownerToken: ctx.token,
          choices: { create: input.choices },
        },
      })
    },
  })

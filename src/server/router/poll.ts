import { z } from 'zod'
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
  .query('getById', {
    input: z.string(),
    async resolve({ input: id, ctx }) {
      const poll = await ctx.prisma.poll.findFirst({
        where: { id },
        select: {
          choices: {
            select: { name: true, _count: true, id: true },
          },
          createdAt: true,
          endsAt: true,
          question: true,
        },
      })
      if (!poll) throw new Error('Poll Not Found')
      const currentVote = await ctx.prisma.vote.findFirst({
        where: { pollId: id, voterToken: ctx.token },
        select: { choiceId: true },
      })
      const voteCount = poll.choices.reduce(
        (x, choice) => choice._count.votes + x,
        0
      )
      return { ...poll, currentVote, voteCount }
    },
  })
  .mutation('create', {
    input: createPollValidator,
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error('Unauthorized')
      return await ctx.prisma.poll.create({
        data: {
          question: input.question,
          ownerToken: ctx.token,
          choices: { create: input.choices },
          endsAt: input.endsAt,
        },
      })
    },
  })
  .mutation('vote', {
    input: z.object({ choiceId: z.string(), pollId: z.string() }),
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error('Unauthorized')
      const poll = await ctx.prisma.poll.findFirst({
        where: { id: input.pollId },
        select: { endsAt: true },
      })
      if (poll?.endsAt && poll.endsAt.getTime() < new Date().getTime())
        throw new Error('Poll Ended')
      return await ctx.prisma.vote.create({
        data: {
          voterToken: ctx.token,
          choiceId: input.choiceId,
          pollId: input.pollId,
        },
      })
    },
  })

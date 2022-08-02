// src/server/router/context.ts
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { prisma } from '../db/client'

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => ({
  token: opts?.req.cookies['pollossal-token'],
  prisma,
})

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()

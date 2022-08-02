import { z } from 'zod'

export const createPollValidator = z.object({
  question: z.string().min(10).max(500),
  choices: z
    .array(z.object({ name: z.string().min(1).max(200) }))
    .min(2)
    .max(20),
})

export type createPollInputType = z.infer<typeof createPollValidator>

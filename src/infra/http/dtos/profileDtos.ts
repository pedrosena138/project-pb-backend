import { z } from 'zod'
import { emailType } from './types'

export const loginBodyDto = z.object({
  email: emailType,
  password: z.string()
})

export type LoginBodyDto = z.infer<typeof loginBodyDto>

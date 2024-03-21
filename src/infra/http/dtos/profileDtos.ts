import { z } from 'zod'
import { emailType, roleType } from './types'

export const loginBodyDto = z.object({
  email: emailType,
  password: z.string(),
  role: roleType
})

export type LoginBodyDto = z.infer<typeof loginBodyDto>

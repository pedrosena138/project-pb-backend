import { z } from 'zod'

export const loginBodyDto = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email(),
  password: z.string(),
  role: z.enum(['client', 'lawyer'], { required_error: 'Role is required' })
})
export type LoginBodyDto = z.infer<typeof loginBodyDto>

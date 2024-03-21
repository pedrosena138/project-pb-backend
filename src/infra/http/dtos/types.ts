import { z } from 'zod'

export const emailType = z
  .string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string'
  })
  .email()

export const passwordType = z.string()

export const roleType = z.enum(['client', 'lawyer'], {
  required_error: 'Role is required'
})
export type RoleType = z.infer<typeof roleType>

export const cpfNumberType = z.string().max(11).regex(/[0-9]/g)
export const rgNumberType = z.string().min(7).max(9).regex(/[0-9]/g)

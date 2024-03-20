import { z } from 'zod'
import { cpfNumberType, emailType, passwordType, rgNumberType } from './types'

export const createClientBodyDto = z.object({
  name: z.string(),
  email: emailType,
  password: passwordType,
  cpfNumber: cpfNumberType,
  rgNumber: rgNumberType
})
export type CreateClientBodyDto = z.infer<typeof createClientBodyDto>

export const updateClientBodyDto = z.object({
  name: z.string(),
  cpfNumber: cpfNumberType,
  rgNumber: rgNumberType
})
export type UpdateClientBodyDto = z.infer<typeof updateClientBodyDto>

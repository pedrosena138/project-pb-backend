import bcrypt from 'bcrypt'
import {} from 'node:crypto'

export const hashPassword = async (password: string): Promise<string> => {
  const hash = bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
  return await hash
}

export const comparePassword = async (password: string, hashPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword)
}

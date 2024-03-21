import { type JWT } from '@fastify/jwt'

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }
  export interface FastifyInstance {
    authenticate: any
  }
}

interface ProfilePayload {
  id: string
  email: string
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    profile: ProfilePayload
  }
}

export type Replace<T, R> = Omit<T, keyof R> & R

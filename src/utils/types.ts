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
  profileId: string
  role: string
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    profile: ProfilePayload
  }
}

import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify'
import fjwt, { type FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import { UNAUTHORIZED } from 'http-status'
import { clientRoutes, profileRoutes } from './routes'
import dotenv from 'dotenv'
dotenv.config()

const fastify = Fastify({ logger: process.env.ENV === 'dev' ?? true })

// @ts-expect-error
fastify.register(fjwt, { secret: process.env.SECRET_KEY })
fastify.addHook('preHandler', (req, res, next) => {
  req.jwt = fastify.jwt
  next()
})

fastify.register(fCookie, {
  secret: process.env.SECRET_KEY,
  hook: 'preHandler'
})

fastify.decorate(
  'authenticate',
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token

    if (token === null || token === undefined) {
      return await reply
        .status(UNAUTHORIZED)
        .send({ message: 'Authentication required' })
    }

    const decoded = req.jwt.verify<FastifyJWT['profile']>(token)
    req.user = decoded
  }
)

fastify.get('/api/healthcheck', (req, res) => {
  res.send({ message: 'Successful' })
})

fastify.register(profileRoutes, { prefix: '/api' })
fastify.register(clientRoutes, { prefix: '/api/clients' })

// @ts-expect-error
fastify.listen({ port: process.env.APP_PORT }).then(() => {
  console.log(`Server listening on port ${process.env.APP_PORT}`)
}).catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})

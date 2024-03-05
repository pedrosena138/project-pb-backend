import { ProfilesController } from './infra/http/controlers/profilesController'
import { LoginUseCase } from './app/useCases/loginUseCase'
import { prismaProfilesRepository } from './infra/database'
import { type FastifyInstance } from 'fastify'

const loginUseCase = new LoginUseCase(prismaProfilesRepository)

const profilesController = new ProfilesController(loginUseCase)

export async function profileRoutes (fastify: FastifyInstance): Promise<void> {
  fastify.post('/login', async (request, reply) => {
    await profilesController.login(request, reply)
  })

  fastify.delete(
    '/logout',
    {
      preHandler: [fastify.authenticate]
    },
    async (request, reply) => {
      await profilesController.logout(request, reply)
    }
  )
}

export async function clientRoutes (fastify: FastifyInstance): Promise<void> {
  fastify.get('/', { preHandler: fastify.authenticate }, async (request, reply) => {
    return await reply.send({ message: 'ok' })
  })
}

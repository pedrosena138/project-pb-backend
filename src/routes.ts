import { ProfilesController } from './infra/http/controlers/profilesController'
import { LoginUseCase } from './app/useCases/login'
import { prismaClientsRepository, prismaProfilesRepository } from './infra/database'
import { type FastifyInstance } from 'fastify'
import { CreateClientUseCase } from './app/useCases/createClient'
import { ClientsController } from './infra/http/controlers/clientsController'
import { UploadFilesUseCase } from './app/useCases/uploadFiles'

const loginUseCase = new LoginUseCase(prismaProfilesRepository)
const createClientUseCase = new CreateClientUseCase(
  prismaClientsRepository,
  prismaProfilesRepository
)
const uploadFilesUseCase = new UploadFilesUseCase()

const profilesController = new ProfilesController(loginUseCase)
const clientsController = new ClientsController(createClientUseCase, uploadFilesUseCase)

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
  fastify.post('/clients', async (request, reply) => {
    await clientsController.create(request, reply)
  })

  fastify.patch('/clients', async (request, reply) => {
    await clientsController.update(request, reply)
  })

  fastify.get('/clients/:id', async (request, reply) => {
    await clientsController.create(request, reply)
  })

  fastify.post('/clients/upload', async (request, reply) => {
    await clientsController.uploadFiles(request, reply)
  })
}

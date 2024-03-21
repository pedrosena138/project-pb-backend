import { ProfilesController } from './infra/http/controlers/profilesController'
import { LoginUseCase } from './app/useCases/login'
import { prismaClientsRepository, prismaProfilesRepository } from './infra/database'
import { type FastifyInstance } from 'fastify'
import { CreateClientUseCase } from './app/useCases/createClient'
import { ClientsController } from './infra/http/controlers/clientsController'
import { UploadIdentityFilesUseCase } from './app/useCases/uploadIdentityFiles'

const loginUseCase = new LoginUseCase(prismaProfilesRepository)
const createClientUseCase = new CreateClientUseCase(
  prismaClientsRepository,
  prismaProfilesRepository
)
const uploadIdentityFilesUseCase = new UploadIdentityFilesUseCase(
  prismaClientsRepository)

const profilesController = new ProfilesController(loginUseCase)
const clientsController = new ClientsController(
  createClientUseCase,
  uploadIdentityFilesUseCase
)

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

  fastify.post(
    '/clients/upload',
    {
      preHandler: [fastify.authenticate]
    },
    async (request, reply) => {
      await clientsController.uploadFiles(request, reply)
    }
  )
}

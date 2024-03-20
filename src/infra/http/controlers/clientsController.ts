import { type FastifyRequest, type FastifyReply } from 'fastify'
import { INTERNAL_SERVER_ERROR, CREATED, OK } from 'http-status'
import { type CreateClientUseCase } from '../../../app/useCases/createClient'
import { createClientBodyDto } from '../dtos/clientDtos'
import { type UploadFilesUseCase } from 'src/app/useCases/uploadFiles'

export class ClientsController {
  constructor (
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly uploadFilesUseCase: UploadFilesUseCase
  ) {}

  async create (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    try {
      const { name, email, password, cpfNumber, rgNumber } =
        createClientBodyDto.parse(request.body)
      await this.createClientUseCase.execute({
        name,
        email,
        password,
        cpfNumber,
        rgNumber
      })
      return await reply.status(CREATED).send()
    } catch (err: any) {
      console.error(err)
      const statusCode = err.statusCode ?? INTERNAL_SERVER_ERROR
      return await reply.status(statusCode).send({ error: err.message })
    }
  }

  async update (
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    reply.clearCookie('access_token')
    return await reply.send({ message: 'Logout successful' })
  }

  async getById (
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    return await reply.send({ message: 'Logout successful' })
  }

  async uploadFiles (
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    try {
      const parts = req.files()
      await this.uploadFilesUseCase.execute(parts)
      return await reply.status(OK).send()
    } catch (err: any) {
      console.error(err)
      const statusCode = err.statusCode ?? INTERNAL_SERVER_ERROR
      return await reply.status(statusCode).send({ error: err.message })
    }
  }
}

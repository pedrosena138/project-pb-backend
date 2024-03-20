import { type FastifyRequest, type FastifyReply } from 'fastify'
import { INTERNAL_SERVER_ERROR, CREATED } from 'http-status'
import { type CreateClientUseCase } from '../../../app/useCases/createClient'
import { createClientBodyDto } from '../dtos/clientDtos'

export class ClientsController {
  constructor (private readonly createClientUseCase: CreateClientUseCase) {}
  async create (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    try {
      const { name, email, password, cpfNumber, rgNumber } = createClientBodyDto.parse(request.body)
      await this.createClientUseCase.execute({
        name,
        email,
        password,
        cpfNumber,
        rgNumber
      })
      return await reply.status(CREATED).send()
    } catch (err) {
      console.log(err)
      return await reply.status(INTERNAL_SERVER_ERROR).send({ err })
    }
  }

  async update (
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    reply.clearCookie('access_token')
    return await reply.send({ message: 'Logout successful' })
  }

  async getById (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    return await reply.send({ message: 'Logout successful' })
  }
}

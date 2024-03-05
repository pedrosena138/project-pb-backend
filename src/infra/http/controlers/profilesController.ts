import { type FastifyRequest, type FastifyReply } from 'fastify'
import { INTERNAL_SERVER_ERROR, OK, NOT_FOUND } from 'http-status'
import { loginBodyDto } from '../dtos/profileDtos'
import { type LoginUseCase } from '../../../app/useCases/loginUseCase'

export class ProfilesController {
  constructor (private readonly loginUseCase: LoginUseCase) {}
  async login (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    try {
      const { email, password, role } = loginBodyDto.parse(request.body)
      const payload = await this.loginUseCase.execute({
        email,
        password,
        role
      })
      if (payload == null) {
        return await reply
          .status(NOT_FOUND)
          .send({ message: 'Usuário não encontrado' })
      }
      const token = request.jwt.sign(payload)
      reply.setCookie('access_token', token, {
        path: '/api/',
        httpOnly: true,
        secure: true
      })
      return await reply.status(OK).send({ accessToken: token })
    } catch (err) {
      return await reply.status(INTERNAL_SERVER_ERROR).send({ err })
    }
  }

  async logout (
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    reply.clearCookie('access_token')
    return await reply.send({ message: 'Logout successful' })
  }
}

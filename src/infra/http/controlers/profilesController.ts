import { type FastifyRequest, type FastifyReply } from 'fastify'
import { INTERNAL_SERVER_ERROR, OK } from 'http-status'
import { loginBodyDto } from '../dtos/profileDtos'
import { type LoginUseCase } from '../../../app/useCases/login'

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

      const token = request.jwt.sign({
        id: payload.id,
        email: payload.email,
        role
      })
      reply.setCookie('access_token', token, {
        path: '/api/',
        httpOnly: true,
        secure: true
      })
      return await reply.status(OK).send({ accessToken: token })
    } catch (err: any) {
      console.error(err)
      const statusCode = err.statusCode ?? INTERNAL_SERVER_ERROR
      return await reply.status(statusCode).send({ error: err.message })
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

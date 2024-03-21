import { type CreateClientBodyDto } from '../../infra/http/dtos/clientDtos'
import { hashPassword } from '../../utils/encoder'
import { ClientEntity } from '../entities/client'
import { ProfileEntity } from '../entities/profile'
import { type ClientsRepository } from '../repositories/clientsRepository'
import { type ProfilesRepository } from '../repositories/profilesRepository'

export class CreateClientUseCase {
  constructor (
    private readonly clientsRepository: ClientsRepository,
    private readonly profilesRepository: ProfilesRepository
  ) {}

  async execute (createClientBodyDto: CreateClientBodyDto): Promise<void> {
    const password = await hashPassword(createClientBodyDto.password)

    const profile = new ProfileEntity({
      email: createClientBodyDto.email,
      password
    })
    const client = new ClientEntity({
      name: createClientBodyDto.name,
      rgNumber: createClientBodyDto.rgNumber,
      cpfNumber: createClientBodyDto.cpfNumber,
      profile
    })

    await this.clientsRepository.create(client)
  }
}

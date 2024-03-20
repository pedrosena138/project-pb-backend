import { type PrismaClient } from '@prisma/client'
import { type ClientEntity } from '../../../app/entities/client'
import { type ClientsRepository } from 'src/app/repositories/clientsRepository'

export class PrismaClientsRepository implements ClientsRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async create (client: ClientEntity): Promise<void> {
    await this.prisma.client.create({
      data: {
        id: client.id,
        name: client.name,
        rgNumber: client.rgNumber,
        cpfNumber: client.cpfNumber,
        profile: {
          create: {
            id: client.profile.id,
            email: client.profile.email,
            password: client.profile.password
          }
        }
      }
    })
  }
}

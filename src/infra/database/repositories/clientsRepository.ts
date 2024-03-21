/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type PrismaClient } from '@prisma/client'
import { ClientEntity } from '../../../app/entities/client'
import { type ClientsRepository } from 'src/app/repositories/clientsRepository'

class ClientMapper {
  static toDomain (data: any): ClientEntity | null {
    if (data === null) {
      return null
    }

    const client = new ClientEntity({
      cpfNumber: data.cpfNumber,
      name: data.name,
      rgNumber: data.rgNumber,
      profile: data.profile,
      createdAt: data.createdAt
    }, data.id)

    return client
  }
}
export class PrismaClientsRepository implements ClientsRepository {
  constructor (private readonly prisma: PrismaClient) {}
  async saveFiles (paths: string[], profileId: string): Promise<void> {
    const strPaths = paths.join(';')
    await this.prisma.client.update({
      where: { profileId },
      data: {
        documentsPaths: strPaths,
        updatedAt: new Date()
      }
    })
  }

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

  async getByProfileId (profileId: string): Promise<ClientEntity | null> {
    const query = await this.prisma.client.findFirst({
      where: {
        profileId
      }
    })

    return ClientMapper.toDomain(query)
  }
}

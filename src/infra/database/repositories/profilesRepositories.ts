import { type PrismaClient } from '@prisma/client'
import { type ProfilesRepository } from '../../../app/repositories/profilesRepositories'

class ProfileMapper {
  static toDomain (data: any, role: string) {
    const profile = role === 'client' ? data.client : data.lawyer

    return {
      id: data.id,
      email: data.email,
      profileId: profile.id,
      role
    }
  }
}

export class PrismaProfilesRepository implements ProfilesRepository {
  constructor (private readonly client: PrismaClient) {}
  async findByEmailAndPassword (email: string, password: string, role: string): Promise<{ active: boolean, id: string } | null> {
    const profile = await this.client.profile.findFirst({
      select: {
        id: true,
        email: true,
        client: role === 'client',
        lawyer: role === 'lawyer'
      },
      where: {
        email,
        password
      }
    })

    return ProfileMapper.toDomain(profile, role)
  }
}

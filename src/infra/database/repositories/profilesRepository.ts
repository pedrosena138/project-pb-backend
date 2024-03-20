/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type PrismaClient } from '@prisma/client'
import { type ProfilesRepository } from '../../../app/repositories/profilesRepository'
import {
  ProfileEntity
} from '../../../app/entities/profile'

class ProfileMapper {
  static toDomain (data: any): ProfileEntity | null {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (data === null) {
      return null
    }

    return new ProfileEntity({
      email: data.email,
      password: data.password,
      active: data.active,
      lastLogin: data.lastLogin,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }, data.id)
  }
}

export class PrismaProfilesRepository implements ProfilesRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async findByEmail (email: string): Promise<ProfileEntity | null> {
    const query = await this.prisma.profile.findFirst({
      where: {
        email
      }
    })

    return ProfileMapper.toDomain(query)
  }
}

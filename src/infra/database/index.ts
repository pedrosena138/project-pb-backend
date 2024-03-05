import { PrismaClient } from '@prisma/client'
import { PrismaProfilesRepository } from './repositories/profilesRepositories'

const prismaClient = new PrismaClient()
export const prismaProfilesRepository = new PrismaProfilesRepository(prismaClient)

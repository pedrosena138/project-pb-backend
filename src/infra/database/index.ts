import { PrismaClient } from '@prisma/client'
import { PrismaProfilesRepository } from './repositories/profilesRepository'
import { PrismaClientsRepository } from './repositories/clientsRepository'

const prismaClient = new PrismaClient()
export const prismaProfilesRepository = new PrismaProfilesRepository(prismaClient)
export const prismaClientsRepository = new PrismaClientsRepository(prismaClient)

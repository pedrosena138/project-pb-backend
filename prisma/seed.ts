import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { hashPassword } from '../src/utils/encoder'
const prisma = new PrismaClient()

async function populateDatabase (): Promise<void> {
  const caseTypes = [{ description: 'event' }, { description: 'trip' }]
  await Promise.all(caseTypes.map(async type => await prisma.caseType.create({ data: type })))

  const status = [{ description: 'opened' }, { description: 'closed' }]
  await Promise.all(
    status.map(async (s) => prisma.caseStatus.create({ data: s }))
  )
  const client = {
    id: randomUUID(),
    name: 'name',
    rgNumber: '12345678901',
    cpfNumber: '12345678901',
    phoneNumber: '8199639398',
    profile: {
      create: {
        id: randomUUID(),
        email: 'jonh@gmail.com',
        password: await hashPassword('12345')
      }
    }
  }
  await prisma.client.create({
    data: client
  })

  const lawyer = {
    id: randomUUID(),
    name: 'bob',
    oabId: '1234',
    office: 'office 1',
    profile: {
      create: {
        id: randomUUID(),
        email: 'bob@gmail.com',
        password: await hashPassword('12345')
      }
    }
  }

  await prisma.lawyer.create({
    data: lawyer
  })

  const [eventType, tripType] = await prisma.caseType.findMany()
  const openedStatus = await prisma.caseStatus.findFirstOrThrow({ where: { description: 'opened' } })

  const cases = [
    {
      id: randomUUID(),
      description: 'event description',
      clientId: client.id,
      lawyerId: lawyer.id,
      typeId: eventType.id,
      statusId: openedStatus.id,
      company: 'Company 1',
      city: 'Recife',
      state: 'Pernambuco',
      ocurrenceDate: new Date('2024-01-20T15:00:00')
    },
    {
      id: randomUUID(),
      description: 'event description',
      clientId: client.id,
      lawyerId: lawyer.id,
      typeId: tripType.id,
      statusId: openedStatus.id,
      company: 'Company 2',
      city: 'Natal',
      state: 'Rio Grande do Norte',
      ocurrenceDate: new Date('2024-02-20T15:00:00')
    }
  ]
  await Promise.all(cases.map(async c => await prisma.case.create({ data: c })))
}

async function cleanDatabase (): Promise<void> {
  await prisma.case.deleteMany()
  await prisma.caseType.deleteMany()
  await prisma.caseStatus.deleteMany()
  await prisma.lawyer.deleteMany()
  await prisma.client.deleteMany()
  await prisma.profile.deleteMany()
}

async function main (): Promise<void> {
  try {
    await prisma.$connect()
    await cleanDatabase()
    await populateDatabase()
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

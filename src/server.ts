import fastify from 'fastify'
import dotnev from 'dotenv'
import { PrismaClient } from '@prisma/client'
import httpStatus from 'http-status'

dotnev.config()

const app = fastify()
const prisma = new PrismaClient()

app.get('/', () => {
  return { message: 'Hello world!' }
})

app.get('/lawyers', async (request, response) => {
  const lawyers = await prisma.lawyer.findMany()
  return await response.status(httpStatus.OK).send({ lawyers })
})

// @ts-expect-error
app.listen({ port: 3000 }).then(() => {
  console.log(`Server listening on port ${process.env.APP_PORT}`)
})

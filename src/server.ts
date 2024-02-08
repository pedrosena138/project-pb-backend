import fastify from 'fastify'
import dotnev from 'dotenv'
dotnev.config()
const app = fastify()

app.get('/', (req, res) => {
  return { message: 'Hello world!' }
})

// @ts-expect-error
app.listen({ port: process.env.APP_PORT }).then(() => {
  console.log(`Server listening on port ${process.env.APP_PORT}`)
})

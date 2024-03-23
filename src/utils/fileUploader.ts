import { type MultipartFile } from '@fastify/multipart'
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'
import path from 'node:path'

export async function upload (parts: AsyncIterableIterator<MultipartFile>): Promise<string[]> {
  const paths = []
  const pump = util.promisify(pipeline)
  for await (const part of parts) {
    const filepath = path.resolve(`./temp/${part.filename}`)
    await pump(part.file, fs.createWriteStream(filepath))
    paths.push(filepath)
  }
  return paths
}

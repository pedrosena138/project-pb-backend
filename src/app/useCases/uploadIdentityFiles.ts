import { type MultipartFile } from '@fastify/multipart'
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'
import path from 'node:path'
import { type ClientsRepository } from '../repositories/clientsRepository'

export class UploadIdentityFilesUseCase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor (private readonly clientsRepository: ClientsRepository) {}

  async execute (
    parts: AsyncIterableIterator<MultipartFile>,
    profileId: string
  ): Promise<void> {
    const paths = []
    const pump = util.promisify(pipeline)
    for await (const part of parts) {
      const filepath = path.resolve(`./temp/${part.filename}`)
      await pump(part.file, fs.createWriteStream(filepath))
      paths.push(filepath)
    }

    await this.clientsRepository.saveFiles(paths, profileId)
  }
}

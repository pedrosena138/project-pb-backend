import { type MultipartFile } from '@fastify/multipart'
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'

export class UploadFilesUseCase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor () {}

  async execute (
    parts: AsyncIterableIterator<MultipartFile>
  ): Promise<void> {
    const pump = util.promisify(pipeline)
    for await (const part of parts) {
      await pump(part.file, fs.createWriteStream(`./temp/${part.filename}`))
    }
  }
}

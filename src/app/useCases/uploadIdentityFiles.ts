import { type MultipartFile } from '@fastify/multipart'
import { type ClientsRepository } from '../repositories/clientsRepository'
import { upload } from '../../utils/fileUploader'

export class UploadIdentityFilesUseCase {
  constructor (private readonly clientsRepository: ClientsRepository) {}

  async execute (
    parts: AsyncIterableIterator<MultipartFile>,
    profileId: string
  ): Promise<void> {
    const paths = await upload(parts)
    await this.clientsRepository.saveFiles(paths, profileId)
  }
}

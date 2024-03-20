import { type ClientEntity } from '../entities/client'

export interface ClientsRepository {
  create: (client: ClientEntity) => Promise<void>
  saveFiles: (paths: string[], profileId: string) => Promise<void>
}

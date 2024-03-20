import { type ClientEntity } from '../entities/client'

export interface ClientsRepository {
  create: (client: ClientEntity) => Promise<void>
}

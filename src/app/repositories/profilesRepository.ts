import { type ProfileEntity } from '../entities/profile'

export interface ProfilesRepository {
  findByEmail: (email: string) => Promise<ProfileEntity | null>
}
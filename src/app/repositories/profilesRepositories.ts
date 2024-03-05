export interface ProfilesRepository {
  findByEmailAndPassword: (email: string, password: string, role: string) => Promise<{ id: string, active: boolean } | null>
}

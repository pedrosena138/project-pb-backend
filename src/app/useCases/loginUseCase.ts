import { type LoginBodyDto } from 'src/infra/http/dtos/profileDtos'
import { type ProfilesRepository } from '../repositories/profilesRepositories'
export class LoginUseCase {
  constructor (private readonly profileRepository: ProfilesRepository) {}

  async execute (loginBodyDto: LoginBodyDto): Promise<any | null> {
    const profile = await this.profileRepository.findByEmailAndPassword(
      loginBodyDto.email,
      loginBodyDto.password,
      loginBodyDto.role
    )

    if (profile === null) {
      return null
    }

    return profile
  }
}

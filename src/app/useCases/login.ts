import { comparePassword } from '../../utils/encoder'
import { type LoginBodyDto } from '../../infra/http/dtos/profileDtos'
import { type ProfilesRepository } from '../repositories/profilesRepository'
import { badRequestError } from '../../utils/exceptions'
import { type ProfileEntity } from '../entities/profile'

export class LoginUseCase {
  constructor (private readonly profileRepository: ProfilesRepository) {}

  async execute (
    loginBodyDto: LoginBodyDto
  ): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findByEmail(
      loginBodyDto.email
    )

    if (profile === null) {
      throw badRequestError
    }

    const isMatch = await comparePassword(loginBodyDto.password, profile.password)

    if (!isMatch) {
      throw badRequestError
    }
    await this.profileRepository.updateLastLogin(profile.id)
    return profile
  }
}

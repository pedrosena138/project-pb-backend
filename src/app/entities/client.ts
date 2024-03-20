import { type Replace } from '../../utils/types'
import { BaseEntity } from './baseEntity'
import { type ProfileEntity } from './profile'

interface ClientProps {
  name: string
  rgNumber: string
  cpfNumber: string
  profile: ProfileEntity
  identityFile?: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export class ClientEntity extends BaseEntity {
  private readonly props: ClientProps
  constructor (props: Replace<ClientProps, { createdAt?: Date }>, id?: string) {
    super(id)
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date()
    }
  }

  get name (): string {
    return this.props.name
  }

  get rgNumber (): string {
    return this.props.rgNumber
  }

  get cpfNumber (): string {
    return this.props.cpfNumber
  }

  get profile (): ProfileEntity {
    return this.props.profile
  }

  get createdAt (): Date {
    return this.props.createdAt
  }

  get updatedAt (): Date | null | undefined {
    return this.props.updatedAt
  }
}

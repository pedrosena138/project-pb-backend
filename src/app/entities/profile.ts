import { type Replace } from '../../utils/types'
import { BaseEntity } from './baseEntity'

interface ProfileProps {
  email: string
  password: string
  active?: boolean | null
  createdAt: Date
  updatedAt?: Date | null
  lastLogin?: Date | null
}

export class ProfileEntity extends BaseEntity {
  private readonly props: ProfileProps

  constructor (props: Replace<ProfileProps, { createdAt?: Date }>, id?: string) {
    super(id)
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date()
    }
  }

  get email (): string {
    return this.props.email
  }

  get password (): string {
    return this.props.password
  }

  get active (): boolean | null | undefined {
    return this.props.active
  }

  get lastLogin (): Date | null | undefined {
    return this.props.lastLogin
  }

  get createdAt (): Date {
    return this.props.createdAt
  }

  get updatedAt (): Date | null | undefined {
    return this.props.updatedAt
  }
}

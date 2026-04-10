import type { User } from '@/payload-types.js'
import type { AccessArgs } from 'payload'


type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}

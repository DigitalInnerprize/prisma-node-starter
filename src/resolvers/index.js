import { extractFragmentReplacements } from 'prisma-binding'
import Query from './Query'
import User from './User'
// import { Subscription } from './Subscription'
// import { auth } from './Mutation/auth'
import user from './Mutation/user'

const resolvers = {
  Query,
  Mutation: {
    ...user
  },
  User
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }

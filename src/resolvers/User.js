import getUserId from '../utils/getUserId'

const User = {
  email: {
      fragment: 'fragment userId on User { id }',
      resolve: (root, args, { request }) => {
      const userId = getUserId(request)

      if (userId && userId === root.id) {
        return root.email
      }

      return null
    }
  }
}

export { User as default }

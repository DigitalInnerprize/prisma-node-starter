import getUserId from '../utils/getUserId'

const Query = {
  user: async (_, __, { prisma, request }) => { 
    const userId = getUserId(request);
    return prisma.query.user({ where: { id: userId }});
  },
  users: async (_, { query }, { prisma }, info) => { 
    const opArgs = {};

    if (query) {
      opArgs.where = {
        OR: [
          {
            email_contains: query
          }
        ]
      }
    }
    return prisma.query.users(opArgs, info);
  }
}

export { Query as default }

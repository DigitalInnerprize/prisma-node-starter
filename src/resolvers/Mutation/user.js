export const user = {
  createUser(root, { data }, ctx) {
    return ctx.prisma.createUser({ data })
  },
}

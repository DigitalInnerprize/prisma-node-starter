import { makePasswordHash,
  passwordMatchesHash } from '../../utils/password'
import { generateToken } from '../../utils/token';
import getUserId from '../../utils/getUserId';

const user = {
  createUser: async (_, args, { prisma }) => {
    const password= await makePasswordHash(args.data.password);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });

    return { 
      user,
      token: generateToken({ userId: user.id }) 
    };
  },
  login: async (_, args, { prisma })  => {
    const { data: { email, password } } = args;
    const user = await prisma.query.user({ where: { email }})

    if (!user) throw new Error('Unable to Login');
    const isMatch = await passwordMatchesHash(password, user.password);
    if (!isMatch) throw new Error('Unable to Login');

    return { 
      user,
      token: generateToken({ userId: user.id }) 
    }
  },
  updateUser: async (_, { data }, { prisma, request }, info)  => {
    const userId = getUserId(request);
    
    if (typeof data.password === 'string') {
      data.password = await makePasswordHash(data.password)
    }

    return prisma.mutation.updateUser({
      where: {
        id: userId
      },
      data
    }, info);
  },
  deleteUser: async (_, args, { prisma, request }, info)  => {
    const userId = getUserId(request)
    return prisma.mutation.deleteUser({
      where: {
        id: userId
      }
    }, info)
  },
}

export { user as default }

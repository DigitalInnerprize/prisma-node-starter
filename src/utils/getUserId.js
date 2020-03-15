import { verifyToken } from '../utils/token'

const getUserId = (request, requireAuth = true) => {
  const header = request.headers.authorization
  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = verifyToken(token);
    return decoded.userId;
  }

  if (requireAuth) {
    throw new Error('Authentication required');
  }

  return null
}

export { getUserId as default }

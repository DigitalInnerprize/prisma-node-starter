import ms from 'ms';
import { sign, verify } from 'jsonwebtoken';


const generateToken = userId => sign({ userId }, process.env.JWT_SECRET, {
  expiresIn: ms('7 days')
});

const verifyToken = token => verify(token, process.env.JWT_SECRET);

export { generateToken, verifyToken }

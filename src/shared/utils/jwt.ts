import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../../config/env';

export interface JwtPayload {
  id: string;
  email: string;
  rol: string;
}

export function generateToken(payload: JwtPayload, expiresIn: SignOptions['expiresIn'] = '24h'): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}

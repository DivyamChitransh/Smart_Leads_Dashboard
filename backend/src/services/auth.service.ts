import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { User, IUser } from '../models/User';
import { ApiError } from '../utils/ApiError';
import { JwtPayload } from '../types';
import { RegisterInput, LoginInput } from '../validators/auth.validator';

const SALT_ROUNDS = 12;

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

const generateToken = (user: IUser): string => {
  const payload: JwtPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  });
};

const formatUser = (user: IUser): AuthResponse['user'] => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
});

export const registerUser = async (input: RegisterInput): Promise<AuthResponse> => {
  const existingUser = await User.findOne({ email: input.email });
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }

  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

  // public signup is sales only — use scripts/seedAdmin.ts for a local admin
  const user = await User.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
    role: 'sales',
  });

  const token = generateToken(user);

  return { user: formatUser(user), token };
};

export const loginUser = async (input: LoginInput): Promise<AuthResponse> => {
  const user = await User.findOne({ email: input.email }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user);

  return { user: formatUser(user), token };
};

export const getCurrentUser = async (userId: string): Promise<AuthResponse['user']> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return formatUser(user);
};

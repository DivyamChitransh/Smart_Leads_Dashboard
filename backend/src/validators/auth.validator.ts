import { EMAIL_RE, ValidationResult, fieldError } from '../utils/validation';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export function validateRegister(body: unknown): ValidationResult<RegisterInput> {
  if (!body || typeof body !== 'object') {
    return { ok: false, errors: fieldError('root', 'Invalid request body') };
  }

  const { name, email, password } = body as Record<string, unknown>;
  const errors: Record<string, string[]> = {};

  if (typeof name !== 'string' || name.trim().length < 2) {
    Object.assign(errors, fieldError('name', 'Name must be at least 2 characters'));
  } else if (name.length > 100) {
    Object.assign(errors, fieldError('name', 'Name cannot exceed 100 characters'));
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    Object.assign(errors, fieldError('email', 'Invalid email address'));
  }

  if (typeof password !== 'string' || password.length < 6) {
    Object.assign(errors, fieldError('password', 'Password must be at least 6 characters'));
  } else if (password.length > 128) {
    Object.assign(errors, fieldError('password', 'Password cannot exceed 128 characters'));
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name: (name as string).trim(),
      email: (email as string).trim().toLowerCase(),
      password: password as string,
    },
  };
}

export function validateLogin(body: unknown): ValidationResult<LoginInput> {
  if (!body || typeof body !== 'object') {
    return { ok: false, errors: fieldError('root', 'Invalid request body') };
  }

  const { email, password } = body as Record<string, unknown>;
  const errors: Record<string, string[]> = {};

  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    Object.assign(errors, fieldError('email', 'Invalid email address'));
  }

  if (typeof password !== 'string' || !password) {
    Object.assign(errors, fieldError('password', 'Password is required'));
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      email: (email as string).trim().toLowerCase(),
      password: password as string,
    },
  };
}

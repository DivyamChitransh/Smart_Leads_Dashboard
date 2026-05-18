export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export function validateLogin(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!email.trim()) errors.email = 'Email is required';
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email';
  if (!password) errors.password = 'Password is required';
  return errors;
}

export function validateRegister(name: string, email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim() || name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
  if (!email.trim()) errors.email = 'Email is required';
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email';
  if (password.length < 6) errors.password = 'Password must be at least 6 characters';
  return errors;
}

export function validateLead(name: string, email: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim() || name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
  if (!email.trim()) errors.email = 'Email is required';
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email';
  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

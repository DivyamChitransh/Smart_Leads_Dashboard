export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: Record<string, string[]> };

export const EMAIL_RE = /^\S+@\S+\.\S+$/;
export const MONGO_ID_RE = /^[0-9a-fA-F]{24}$/;

export function fieldError(field: string, message: string): Record<string, string[]> {
  return { [field]: [message] };
}

export function mergeErrors(...parts: Record<string, string[]>[]): Record<string, string[]> {
  return parts.reduce((acc, part) => ({ ...acc, ...part }), {});
}

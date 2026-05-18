import { LeadSource, LeadStatus, SortOrder } from '../types';
import {
  EMAIL_RE,
  MONGO_ID_RE,
  ValidationResult,
  fieldError,
} from '../utils/validation';

const STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
const SOURCES: LeadSource[] = ['Website', 'Instagram', 'Referral'];
const SORT_ORDERS: SortOrder[] = ['latest', 'oldest'];

export interface CreateLeadInput {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface UpdateLeadInput {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
}

export interface LeadQueryInput {
  page?: number;
  limit?: number;
  search?: string;
  status?: LeadStatus;
  source?: LeadSource;
  sortBy: SortOrder;
}

function parsePositiveInt(value: unknown): number | undefined {
  if (value === undefined || value === '') return undefined;
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1) return undefined;
  return n;
}

export function validateCreateLead(body: unknown): ValidationResult<CreateLeadInput> {
  if (!body || typeof body !== 'object') {
    return { ok: false, errors: fieldError('root', 'Invalid request body') };
  }

  const raw = body as Record<string, unknown>;
  const errors: Record<string, string[]> = {};

  if (typeof raw.name !== 'string' || raw.name.trim().length < 2) {
    Object.assign(errors, fieldError('name', 'Name must be at least 2 characters'));
  }

  if (typeof raw.email !== 'string' || !EMAIL_RE.test(raw.email.trim())) {
    Object.assign(errors, fieldError('email', 'Invalid email address'));
  }

  const status =
    raw.status === undefined ? 'New' : (raw.status as LeadStatus);
  if (!STATUSES.includes(status)) {
    Object.assign(errors, fieldError('status', 'Invalid status'));
  }

  if (typeof raw.source !== 'string' || !SOURCES.includes(raw.source as LeadSource)) {
    Object.assign(errors, fieldError('source', 'Invalid source'));
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name: (raw.name as string).trim(),
      email: (raw.email as string).trim().toLowerCase(),
      status,
      source: raw.source as LeadSource,
    },
  };
}

export function validateUpdateLead(body: unknown): ValidationResult<UpdateLeadInput> {
  if (!body || typeof body !== 'object') {
    return { ok: false, errors: fieldError('root', 'Invalid request body') };
  }

  const raw = body as Record<string, unknown>;
  const data: UpdateLeadInput = {};
  const errors: Record<string, string[]> = {};

  if (raw.name !== undefined) {
    if (typeof raw.name !== 'string' || raw.name.trim().length < 2) {
      Object.assign(errors, fieldError('name', 'Name must be at least 2 characters'));
    } else {
      data.name = raw.name.trim();
    }
  }

  if (raw.email !== undefined) {
    if (typeof raw.email !== 'string' || !EMAIL_RE.test(raw.email.trim())) {
      Object.assign(errors, fieldError('email', 'Invalid email address'));
    } else {
      data.email = raw.email.trim().toLowerCase();
    }
  }

  if (raw.status !== undefined) {
    if (!STATUSES.includes(raw.status as LeadStatus)) {
      Object.assign(errors, fieldError('status', 'Invalid status'));
    } else {
      data.status = raw.status as LeadStatus;
    }
  }

  if (raw.source !== undefined) {
    if (!SOURCES.includes(raw.source as LeadSource)) {
      Object.assign(errors, fieldError('source', 'Invalid source'));
    } else {
      data.source = raw.source as LeadSource;
    }
  }

  if (Object.keys(data).length === 0) {
    Object.assign(errors, fieldError('root', 'At least one field is required'));
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}

export function validateLeadQuery(query: unknown): ValidationResult<LeadQueryInput> {
  const raw = (query && typeof query === 'object' ? query : {}) as Record<string, unknown>;
  const errors: Record<string, string[]> = {};

  const page = parsePositiveInt(raw.page);
  const limit = parsePositiveInt(raw.limit);
  if (raw.page !== undefined && page === undefined) {
    Object.assign(errors, fieldError('page', 'Page must be a positive number'));
  }
  if (raw.limit !== undefined && (limit === undefined || limit > 50)) {
    Object.assign(errors, fieldError('limit', 'Limit must be between 1 and 50'));
  }

  let status: LeadStatus | undefined;
  if (raw.status !== undefined && raw.status !== '') {
    if (!STATUSES.includes(raw.status as LeadStatus)) {
      Object.assign(errors, fieldError('status', 'Invalid status'));
    } else {
      status = raw.status as LeadStatus;
    }
  }

  let source: LeadSource | undefined;
  if (raw.source !== undefined && raw.source !== '') {
    if (!SOURCES.includes(raw.source as LeadSource)) {
      Object.assign(errors, fieldError('source', 'Invalid source'));
    } else {
      source = raw.source as LeadSource;
    }
  }

  let sortBy: SortOrder = 'latest';
  if (raw.sortBy !== undefined && raw.sortBy !== '') {
    if (!SORT_ORDERS.includes(raw.sortBy as SortOrder)) {
      Object.assign(errors, fieldError('sortBy', 'Sort must be latest or oldest'));
    } else {
      sortBy = raw.sortBy as SortOrder;
    }
  }

  const search = typeof raw.search === 'string' ? raw.search.trim() : undefined;

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: { page, limit, search, status, source, sortBy },
  };
}

export function validateLeadId(params: unknown): ValidationResult<{ id: string }> {
  if (!params || typeof params !== 'object') {
    return { ok: false, errors: fieldError('id', 'Invalid lead ID') };
  }

  const id = (params as Record<string, unknown>).id;
  if (typeof id !== 'string' || !MONGO_ID_RE.test(id)) {
    return { ok: false, errors: fieldError('id', 'Invalid lead ID') };
  }

  return { ok: true, data: { id } };
}

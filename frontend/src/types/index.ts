export type UserRole = 'admin' | 'sales';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';
export type SortOrder = 'latest' | 'oldest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  pagination?: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface LeadFilters {
  page: number;
  search: string;
  status: LeadStatus | '';
  source: LeadSource | '';
  sortBy: SortOrder;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  status?: LeadStatus;
  source: LeadSource;
}

export interface UpdateLeadInput {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
}

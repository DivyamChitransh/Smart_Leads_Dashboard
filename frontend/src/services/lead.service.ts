import { api } from './api';
import { ApiSuccessResponse, CreateLeadInput, Lead, LeadFilters, PaginationMeta } from '../types';

function toParams(filters: Partial<LeadFilters>) {
  const params: Record<string, string | number> = {};
  if (filters.page) params.page = filters.page;
  if (filters.search) params.search = filters.search;
  if (filters.status) params.status = filters.status;
  if (filters.source) params.source = filters.source;
  if (filters.sortBy) params.sortBy = filters.sortBy;
  return params;
}

export async function fetchLeads(filters: LeadFilters) {
  const res = await api.get<ApiSuccessResponse<{ leads: Lead[]; totalLeads: number }>>(
    '/leads',
    {
      params: toParams(filters),
    }
  );
  return {
    leads: res.data.data.leads,
    pagination: res.data.pagination as PaginationMeta,
    totalLeads: res.data.data.totalLeads,
  };
}

export async function fetchLead(id: string) {
  const res = await api.get<ApiSuccessResponse<{ lead: Lead }>>(`/leads/${id}`);
  return res.data.data.lead;
}

export async function addLead(data: CreateLeadInput) {
  const res = await api.post<ApiSuccessResponse<{ lead: Lead }>>('/leads', data);
  return res.data.data.lead;
}

export async function editLead(id: string, data: Partial<CreateLeadInput>) {
  const res = await api.put<ApiSuccessResponse<{ lead: Lead }>>(`/leads/${id}`, data);
  return res.data.data.lead;
}

export async function removeLead(id: string) {
  await api.delete(`/leads/${id}`);
}

export async function downloadLeadsCsv(filters: Omit<LeadFilters, 'page'>) {
  const res = await api.get('/leads/export', {
    params: toParams(filters),
    responseType: 'blob',
  });
  return res.data as Blob;
}

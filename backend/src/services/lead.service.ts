import { FilterQuery } from 'mongoose';
import { Lead, ILead } from '../models/Lead';
import { ApiError } from '../utils/ApiError';
import { getPaginationMeta, parsePagination } from '../utils/pagination';
import { PaginationMeta, UserRole } from '../types';
import {
  CreateLeadInput,
  UpdateLeadInput,
  LeadQueryInput,
} from '../validators/lead.validator';

// sales users only see their own leads
const withOwnership = (
  base: FilterQuery<ILead>,
  userId: string,
  role: UserRole
): FilterQuery<ILead> => {
  if (role === 'sales') {
    return { ...base, createdBy: userId };
  }
  return base;
};

const buildFilter = (query: LeadQueryInput, userId: string, role: UserRole) => {
  const filter: FilterQuery<ILead> = {};

  if (query.status) filter.status = query.status;
  if (query.source) filter.source = query.source;

  if (query.search) {
    const rx = { $regex: query.search, $options: 'i' };
    filter.$or = [{ name: rx }, { email: rx }];
  }

  return withOwnership(filter, userId, role);
};

export const createLead = async (input: CreateLeadInput, userId: string) => {
  return Lead.create({ ...input, createdBy: userId });
};

export const getLeads = async (
  query: LeadQueryInput,
  userId: string,
  role: UserRole
): Promise<{ leads: ILead[]; pagination: PaginationMeta; totalLeads: number }> => {
  const { page, limit, skip } = parsePagination(query.page, query.limit);
  const filter = buildFilter(query, userId, role);
  const sort = query.sortBy === 'oldest' ? 1 : -1;

  const [leads, totalRecords, totalLeads] = await Promise.all([
    Lead.find(filter).sort({ createdAt: sort }).skip(skip).limit(limit),
    Lead.countDocuments(filter),
    Lead.countDocuments(withOwnership({}, userId, role)),
  ]);

  return {
    leads,
    pagination: getPaginationMeta(totalRecords, page, limit),
    totalLeads,
  };
};

export const getLeadById = async (leadId: string, userId: string, role: UserRole) => {
  const lead = await Lead.findOne(withOwnership({ _id: leadId }, userId, role));
  if (!lead) throw new ApiError(404, 'Lead not found');
  return lead;
};

export const updateLead = async (
  leadId: string,
  input: UpdateLeadInput,
  userId: string,
  role: UserRole
) => {
  const lead = await Lead.findOneAndUpdate(
    withOwnership({ _id: leadId }, userId, role),
    input,
    { new: true, runValidators: true }
  );
  if (!lead) throw new ApiError(404, 'Lead not found');
  return lead;
};

export const deleteLead = async (leadId: string, userId: string, role: UserRole) => {
  const lead = await Lead.findOneAndDelete(withOwnership({ _id: leadId }, userId, role));
  if (!lead) throw new ApiError(404, 'Lead not found');
};

export const exportLeadsCsv = async (
  query: LeadQueryInput,
  userId: string,
  role: UserRole
) => {
  const filter = buildFilter(query, userId, role);
  const sort = query.sortBy === 'oldest' ? 1 : -1;
  return Lead.find(filter).sort({ createdAt: sort }).limit(1000);
};

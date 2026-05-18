import { AuthRequest } from '../types';
import { LeadQueryInput } from '../validators/lead.validator';

export function getLeadQuery(req: AuthRequest): LeadQueryInput {
  return req.query as unknown as LeadQueryInput;
}

export function getLeadId(req: AuthRequest): string {
  return req.params.id as string;
}

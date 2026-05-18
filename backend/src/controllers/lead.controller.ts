import { Response } from 'express';
import { AuthRequest } from '../types';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response';
import { leadsToCsv } from '../utils/csv';
import { getLeadId, getLeadQuery } from '../utils/request';
import * as leadService from '../services/lead.service';

export const createLead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const lead = await leadService.createLead(req.body, req.user!.userId);
  sendSuccess(res, 201, 'Created', { lead });
});

export const getLeads = asyncHandler(async (req: AuthRequest, res: Response) => {
  const query = getLeadQuery(req);
  const { leads, pagination, totalLeads } = await leadService.getLeads(
    query,
    req.user!.userId,
    req.user!.role
  );
  sendSuccess(res, 200, 'OK', { leads, totalLeads }, pagination);
});

export const getLeadById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const lead = await leadService.getLeadById(getLeadId(req), req.user!.userId, req.user!.role);
  sendSuccess(res, 200, 'OK', { lead });
});

export const updateLead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const lead = await leadService.updateLead(
    getLeadId(req),
    req.body,
    req.user!.userId,
    req.user!.role
  );
  sendSuccess(res, 200, 'Updated', { lead });
});

export const deleteLead = asyncHandler(async (req: AuthRequest, res: Response) => {
  await leadService.deleteLead(getLeadId(req), req.user!.userId, req.user!.role);
  sendSuccess(res, 200, 'Deleted', null);
});

export const exportLeads = asyncHandler(async (req: AuthRequest, res: Response) => {
  const leads = await leadService.exportLeadsCsv(
    getLeadQuery(req),
    req.user!.userId,
    req.user!.role
  );
  const csv = leadsToCsv(leads);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=leads-export.csv');
  res.status(200).send(csv);
});

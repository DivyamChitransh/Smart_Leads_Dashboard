import { ILead } from '../models/Lead';

export const leadsToCsv = (leads: ILead[]): string => {
  const headers = ['Name', 'Email', 'Status', 'Source', 'Created At'];
  const rows = leads.map((lead) => [
    escapeCsvField(lead.name),
    escapeCsvField(lead.email),
    escapeCsvField(lead.status),
    escapeCsvField(lead.source),
    escapeCsvField(lead.createdAt.toISOString()),
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
};

const escapeCsvField = (value: string): string => {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

import { useCallback, useEffect, useState } from 'react';
import { fetchLeads } from '../services/lead.service';
import { getErrorMessage } from '../services/api';
import { Lead, LeadFilters, PaginationMeta } from '../types';

export function useLeads(filters: LeadFilters, debouncedSearch: string) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLeads({ ...filters, search: debouncedSearch });
      setLeads(data.leads);
      setPagination(data.pagination);
      setTotalLeads(data.totalLeads);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [filters, debouncedSearch]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { leads, pagination, totalLeads, loading, error, reload };
}

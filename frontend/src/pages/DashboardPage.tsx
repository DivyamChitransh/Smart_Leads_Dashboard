import { useState } from 'react';
import toast from 'react-hot-toast';
import { addLead, editLead, removeLead, downloadLeadsCsv } from '../services/lead.service';
import { getErrorMessage } from '../services/api';
import { CreateLeadInput, Lead, LeadFilters } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { useLeads } from '../hooks/useLeads';
import { LeadFiltersBar } from '../components/leads/LeadFilters';
import { LeadTable } from '../components/leads/LeadTable';
import { LeadModals } from '../components/leads/LeadModals';
import { Pagination } from '../components/leads/Pagination';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorAlert } from '../components/ui/ErrorAlert';
import { StatsCards } from '../components/dashboard/StatsCards';

const defaultFilters: LeadFilters = {
  page: 1,
  search: '',
  status: '',
  source: '',
  sortBy: 'latest',
};

export function DashboardPage() {
  const [filters, setFilters] = useState<LeadFilters>(defaultFilters);
  const debouncedSearch = useDebounce(filters.search, 500);
  const { leads, pagination, totalLeads, loading, error, reload } = useLeads(filters, debouncedSearch);

  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const [toDelete, setToDelete] = useState<Lead | null>(null);
  const [exporting, setExporting] = useState(false);

  async function handleCreate(data: CreateLeadInput) {
    try {
      await addLead(data);
      toast.success('Lead added');
      setShowCreate(false);
      reload();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleUpdate(data: CreateLeadInput) {
    if (!editing) return;
    try {
      await editLead(editing._id, data);
      toast.success('Saved');
      setEditing(null);
      reload();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleDelete() {
    if (!toDelete) return;
    try {
      await removeLead(toDelete._id);
      toast.success('Deleted');
      setToDelete(null);
      reload();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleExport() {
    setExporting(true);
    try {
      const blob = await downloadLeadsCsv({
        search: debouncedSearch,
        status: filters.status,
        source: filters.source,
        sortBy: filters.sortBy,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-950/90">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Leads</h1>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button variant="secondary" size="sm" onClick={handleExport} loading={exporting}>
              Export CSV
            </Button>
            <Button onClick={() => setShowCreate(true)}>Add lead</Button>
          </div>
        </div>
      </div>

      {!loading && !error && <StatsCards leads={leads} totalLeads={totalLeads} />}

      <LeadFiltersBar
        filters={filters}
        onChange={(partial) => setFilters((prev) => ({ ...prev, ...partial }))}
      />

      {loading && <Spinner />}
      {!loading && error && <ErrorAlert message={error} onRetry={reload} />}

      {!loading && !error && leads.length === 0 && (
        <EmptyState
          title="No leads yet"
          description="Try different filters, add a new lead, or import from CSV."
          action={<Button onClick={() => setShowCreate(true)}>Add lead</Button>}
        />
      )}

      {!loading && !error && leads.length > 0 && (
        <>
          <LeadTable leads={leads} onEdit={setEditing} onDelete={setToDelete} />
          {pagination && (
            <Pagination
              pagination={pagination}
              onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
            />
          )}
        </>
      )}

      <LeadModals
        showCreate={showCreate}
        editing={editing}
        toDelete={toDelete}
        onCloseCreate={() => setShowCreate(false)}
        onCloseEdit={() => setEditing(null)}
        onCloseDelete={() => setToDelete(null)}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onConfirmDelete={handleDelete}
      />
    </div>
  );
}

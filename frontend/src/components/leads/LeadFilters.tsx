import { LeadFilters as Filters, LeadSource, LeadStatus, SortOrder } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { LEAD_SOURCES, LEAD_STATUSES } from '../../constants/lead';

type Props = {
  filters: Filters;
  onChange: (partial: Partial<Filters>) => void;
};

export function LeadFiltersBar({ filters, onChange }: Props) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/95 sm:grid-cols-2 lg:grid-cols-4">
      <Input
        label="Search"
        placeholder="name or email"
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value, page: 1 })}
      />
      <Select
        label="Status"
        value={filters.status}
        onChange={(e) => onChange({ status: e.target.value as LeadStatus | '', page: 1 })}
        options={[{ value: '', label: 'All' }, ...LEAD_STATUSES.map((s) => ({ value: s, label: s }))]}
      />
      <Select
        label="Source"
        value={filters.source}
        onChange={(e) => onChange({ source: e.target.value as LeadSource | '', page: 1 })}
        options={[{ value: '', label: 'All' }, ...LEAD_SOURCES.map((s) => ({ value: s, label: s }))]}
      />
      <Select
        label="Sort"
        value={filters.sortBy}
        onChange={(e) => onChange({ sortBy: e.target.value as SortOrder, page: 1 })}
        options={[
          { value: 'latest', label: 'Newest' },
          { value: 'oldest', label: 'Oldest' },
        ]}
      />
    </div>
  );
}

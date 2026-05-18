import { Lead } from '../../types';

type Props = {
  leads: Lead[];
  totalLeads: number;
};

export function StatsCards({ leads, totalLeads }: Props) {
  const total = totalLeads;
  const qualified = leads.filter((l) => l.status === 'Qualified').length;
  const contacted = leads.filter((l) => l.status === 'Contacted').length;
  const lost = leads.filter((l) => l.status === 'Lost').length;
  const newCount = leads.filter((l) => l.status === 'New').length;

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <Stat label="Total leads" value={total} fullWidth />
      <Stat label="New leads" value={newCount} />
      <Stat label="Contacted leads" value={contacted} />
      <Stat label="Qualified leads" value={qualified} />
      <Stat label="Lost leads" value={lost} />
    </div>
  );
}

function Stat({ label, value, fullWidth }: { label: string; value: number; fullWidth?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 ${
        fullWidth ? 'sm:col-span-2 xl:col-span-1' : ''
      }`}
    >
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

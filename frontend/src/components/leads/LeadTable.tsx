import { Link } from 'react-router-dom';
import { Lead } from '../../types';
import { STATUS_COLORS } from '../../constants/lead';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

type Props = {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
};

export function LeadTable({ leads, onEdit, onDelete }: Props) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
      {/* Desktop / tablet table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto text-left text-sm md:text-sm">
          <thead className="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th className="px-3 py-2 font-medium uppercase tracking-[0.08em]">Name</th>
              <th className="px-3 py-2 font-medium uppercase tracking-[0.08em]">Email</th>
              <th className="px-3 py-2 font-medium uppercase tracking-[0.08em]">Status</th>
              <th className="px-3 py-2 font-medium uppercase tracking-[0.08em]">Source</th>
              <th className="hidden px-3 py-2 font-medium uppercase tracking-[0.08em] md:table-cell">Created</th>
              <th className="px-3 py-2 font-medium uppercase tracking-[0.08em]" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {leads.map((lead) => (
              <tr key={lead._id} className="transition hover:bg-slate-50 dark:hover:bg-slate-900/70">
                <td className="px-3 py-3 text-slate-900 dark:text-slate-100">
                  <Link to={`/leads/${lead._id}`} className="font-medium text-primary-600 hover:underline dark:text-primary-300">
                    {lead.name}
                  </Link>
                </td>
                <td className="px-3 py-3 text-slate-600 dark:text-slate-400">{lead.email}</td>
                <td className="px-3 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[lead.status]}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-slate-600 dark:text-slate-400">{lead.source}</td>
                <td className="hidden px-3 py-3 text-slate-500 dark:text-slate-400 md:table-cell">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(lead)}>
                      Edit
                    </Button>
                    {isAdmin && (
                      <Button variant="danger" size="sm" onClick={() => onDelete(lead)}>
                        Delete
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list view */}
      <div className="md:hidden space-y-3 p-3">
        {leads.map((lead) => (
          <div key={lead._id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-950">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link to={`/leads/${lead._id}`} className="block font-medium text-primary-600 dark:text-primary-300">
                  {lead.name}
                </Link>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{lead.email}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[lead.status]}`}>
                  {lead.status}
                </span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(lead)}>
                    Edit
                  </Button>
                  {isAdmin && (
                    <Button variant="danger" size="sm" onClick={() => onDelete(lead)}>
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">{new Date(lead.createdAt).toLocaleDateString()} • {lead.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

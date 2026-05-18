import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchLead } from '../services/lead.service';
import { getErrorMessage } from '../services/api';
import { Lead } from '../types';
import { STATUS_COLORS } from '../constants/lead';
import { Spinner } from '../components/ui/Spinner';
import { ErrorAlert } from '../components/ui/ErrorAlert';
import { Button } from '../components/ui/Button';

export function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchLead(id)
      .then(setLead)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!lead) return null;

  return (
    <div className="space-y-4">
      <Link to="/">
        <Button variant="ghost" size="sm">
          ← Back
        </Button>
      </Link>

      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{lead.name}</h2>
            <p className="text-gray-500">{lead.email}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-sm ${STATUS_COLORS[lead.status]}`}>
            {lead.status}
          </span>
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-gray-500">Source</dt>
            <dd>{lead.source}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Created</dt>
            <dd>{new Date(lead.createdAt).toLocaleString()}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

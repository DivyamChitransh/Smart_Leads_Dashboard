import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { CreateLeadInput, Lead, LeadSource, LeadStatus } from '../../types';
import { validateLead, hasErrors, FieldErrors } from '../../utils/validation';
import { getErrorMessage } from '../../services/api';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { LEAD_SOURCES, LEAD_STATUSES } from '../../constants/lead';

type Props = {
  initialData?: Lead;
  onSubmit: (data: CreateLeadInput) => Promise<void>;
  onCancel: () => void;
};

export function LeadForm({ initialData, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [email, setEmail] = useState(initialData?.email ?? '');
  const [status, setStatus] = useState<LeadStatus>(initialData?.status ?? 'New');
  const [source, setSource] = useState<LeadSource>(initialData?.source ?? 'Website');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const fieldErrors = validateLead(name, email);
    setErrors(fieldErrors);
    if (hasErrors(fieldErrors)) return;

    setBusy(true);
    try {
      await onSubmit({ name: name.trim(), email: email.trim(), status, source });
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <Select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value as LeadStatus)}
        options={LEAD_STATUSES.map((s) => ({ value: s, label: s }))}
      />
      <Select
        label="Source"
        value={source}
        onChange={(e) => setSource(e.target.value as LeadSource)}
        options={LEAD_SOURCES.map((s) => ({ value: s, label: s }))}
      />
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={busy}>
          {initialData ? 'Save' : 'Add'}
        </Button>
      </div>
    </form>
  );
}

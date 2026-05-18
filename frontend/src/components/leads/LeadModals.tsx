import { Lead, CreateLeadInput } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { LeadForm } from './LeadForm';

type Props = {
  showCreate: boolean;
  editing: Lead | null;
  toDelete: Lead | null;
  onCloseCreate: () => void;
  onCloseEdit: () => void;
  onCloseDelete: () => void;
  onCreate: (data: CreateLeadInput) => Promise<void>;
  onUpdate: (data: CreateLeadInput) => Promise<void>;
  onConfirmDelete: () => void;
};

export function LeadModals({
  showCreate,
  editing,
  toDelete,
  onCloseCreate,
  onCloseEdit,
  onCloseDelete,
  onCreate,
  onUpdate,
  onConfirmDelete,
}: Props) {
  return (
    <>
      <Modal open={showCreate} onClose={onCloseCreate} title="New lead">
        <LeadForm onSubmit={onCreate} onCancel={onCloseCreate} />
      </Modal>

      <Modal open={!!editing} onClose={onCloseEdit} title="Edit lead">
        {editing && (
          <LeadForm initialData={editing} onSubmit={onUpdate} onCancel={onCloseEdit} />
        )}
      </Modal>

      <Modal open={!!toDelete} onClose={onCloseDelete} title="Delete lead?">
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Remove <strong>{toDelete?.name}</strong>? This cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onCloseDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

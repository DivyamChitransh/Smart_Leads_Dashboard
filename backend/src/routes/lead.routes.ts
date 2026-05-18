import { Router } from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  exportLeads,
} from '../controllers/lead.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  validateCreateLead,
  validateUpdateLead,
  validateLeadQuery,
  validateLeadId,
} from '../validators/lead.validator';

const router = Router();

router.use(authenticate);

router.get('/export', validate(validateLeadQuery, 'query'), exportLeads);
router.get('/', validate(validateLeadQuery, 'query'), getLeads);
router.get('/:id', validate(validateLeadId, 'params'), getLeadById);
router.post('/', validate(validateCreateLead), createLead);
router.put(
  '/:id',
  validate(validateLeadId, 'params'),
  validate(validateUpdateLead),
  updateLead
);
router.delete('/:id', validate(validateLeadId, 'params'), authorize('admin'), deleteLead);

export default router;

import { Router } from 'express';
import authRoutes from './auth.routes';
import leadRoutes from './lead.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'API is running', data: { status: 'ok' } });
});

router.use('/auth', authRoutes);
router.use('/leads', leadRoutes);

export default router;

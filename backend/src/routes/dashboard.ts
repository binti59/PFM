import { Router } from 'express';

const router = Router();

// Dashboard route
router.get('/', (req, res) => {
  res.json({ message: 'Dashboard data endpoint' });
});

export default router;

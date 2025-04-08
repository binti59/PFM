import { Router } from 'express';

const router = Router();

// Budget routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all budgets' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create new budget' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get budget with id ${req.params.id}` });
});

router.put('/:id', (req, res) => {
  res.json({ message: `Update budget with id ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.json({ message: `Delete budget with id ${req.params.id}` });
});

export default router;

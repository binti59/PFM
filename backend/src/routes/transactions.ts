import { Router } from 'express';

const router = Router();

// Transactions routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all transactions' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create new transaction' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get transaction with id ${req.params.id}` });
});

router.put('/:id', (req, res) => {
  res.json({ message: `Update transaction with id ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.json({ message: `Delete transaction with id ${req.params.id}` });
});

export default router;

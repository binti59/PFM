import { Router } from 'express';

const router = Router();

// Accounts routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all accounts' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create new account' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get account with id ${req.params.id}` });
});

router.put('/:id', (req, res) => {
  res.json({ message: `Update account with id ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.json({ message: `Delete account with id ${req.params.id}` });
});

export default router;

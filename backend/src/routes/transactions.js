const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Mock transactions data for initial setup
let transactions = [
  { id: 1, date: '2025-04-03', description: 'Grocery Shopping', category: 'Food', amount: -125.40, account: 'Checking Account', userId: 1 },
  { id: 2, date: '2025-04-01', description: 'Salary Deposit', category: 'Income', amount: 4375.00, account: 'Checking Account', userId: 1 },
  { id: 3, date: '2025-04-01', description: 'Rent Payment', category: 'Housing', amount: -1800.00, account: 'Checking Account', userId: 1 },
  { id: 4, date: '2025-03-30', description: 'Restaurant Dinner', category: 'Food', amount: -58.75, account: 'Credit Card', userId: 1 },
  { id: 5, date: '2025-03-28', description: 'Investment Dividend', category: 'Income', amount: 320.50, account: 'Brokerage Account', userId: 1 }
];

// @route   GET api/transactions
// @desc    Get all transactions
// @access  Private
router.get('/', (req, res) => {
  try {
    // In a real app, this would filter transactions by the authenticated user's ID
    // For now, just return all transactions
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/transactions/:id
// @desc    Get transaction by ID
// @access  Private
router.get('/:id', (req, res) => {
  try {
    const transaction = transactions.find(transaction => transaction.id === parseInt(req.params.id));
    
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/transactions
// @desc    Create a new transaction
// @access  Private
router.post(
  '/',
  [
    check('date', 'Date is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('amount', 'Amount is required').isNumeric(),
    check('account', 'Account is required').not().isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { date, description, category, amount, account } = req.body;
      
      const newTransaction = {
        id: transactions.length + 1,
        date,
        description,
        category,
        amount: parseFloat(amount),
        account,
        userId: 1 // In a real app, this would be the authenticated user's ID
      };
      
      transactions.push(newTransaction);
      
      res.json(newTransaction);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/transactions/:id
// @desc    Update a transaction
// @access  Private
router.put(
  '/:id',
  [
    check('date', 'Date is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('amount', 'Amount is required').isNumeric(),
    check('account', 'Account is required').not().isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { date, description, category, amount, account } = req.body;
      
      const transactionIndex = transactions.findIndex(transaction => transaction.id === parseInt(req.params.id));
      
      if (transactionIndex === -1) {
        return res.status(404).json({ msg: 'Transaction not found' });
      }
      
      transactions[transactionIndex] = {
        ...transactions[transactionIndex],
        date,
        description,
        category,
        amount: parseFloat(amount),
        account
      };
      
      res.json(transactions[transactionIndex]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', (req, res) => {
  try {
    const transactionIndex = transactions.findIndex(transaction => transaction.id === parseInt(req.params.id));
    
    if (transactionIndex === -1) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    
    transactions = transactions.filter(transaction => transaction.id !== parseInt(req.params.id));
    
    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

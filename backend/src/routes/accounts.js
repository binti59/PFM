const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Mock accounts data for initial setup
let accounts = [
  { id: 1, name: 'Checking Account', type: 'Bank', balance: 5250.75, institution: 'Chase Bank', userId: 1 },
  { id: 2, name: 'Savings Account', type: 'Bank', balance: 12500.00, institution: 'Bank of America', userId: 1 },
  { id: 3, name: '401(k)', type: 'Investment', balance: 85750.25, institution: 'Vanguard', userId: 1 },
  { id: 4, name: 'Credit Card', type: 'Credit', balance: -1250.50, institution: 'American Express', userId: 1 },
  { id: 5, name: 'Brokerage Account', type: 'Investment', balance: 22250.00, institution: 'Fidelity', userId: 1 }
];

// @route   GET api/accounts
// @desc    Get all accounts
// @access  Private
router.get('/', (req, res) => {
  try {
    // In a real app, this would filter accounts by the authenticated user's ID
    // For now, just return all accounts
    res.json(accounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/accounts/:id
// @desc    Get account by ID
// @access  Private
router.get('/:id', (req, res) => {
  try {
    const account = accounts.find(account => account.id === parseInt(req.params.id));
    
    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    
    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/accounts
// @desc    Create a new account
// @access  Private
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('balance', 'Balance is required').isNumeric(),
    check('institution', 'Institution is required').not().isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, type, balance, institution } = req.body;
      
      const newAccount = {
        id: accounts.length + 1,
        name,
        type,
        balance: parseFloat(balance),
        institution,
        userId: 1 // In a real app, this would be the authenticated user's ID
      };
      
      accounts.push(newAccount);
      
      res.json(newAccount);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/accounts/:id
// @desc    Update an account
// @access  Private
router.put(
  '/:id',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('balance', 'Balance is required').isNumeric(),
    check('institution', 'Institution is required').not().isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, type, balance, institution } = req.body;
      
      const accountIndex = accounts.findIndex(account => account.id === parseInt(req.params.id));
      
      if (accountIndex === -1) {
        return res.status(404).json({ msg: 'Account not found' });
      }
      
      accounts[accountIndex] = {
        ...accounts[accountIndex],
        name,
        type,
        balance: parseFloat(balance),
        institution
      };
      
      res.json(accounts[accountIndex]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/accounts/:id
// @desc    Delete an account
// @access  Private
router.delete('/:id', (req, res) => {
  try {
    const accountIndex = accounts.findIndex(account => account.id === parseInt(req.params.id));
    
    if (accountIndex === -1) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    
    accounts = accounts.filter(account => account.id !== parseInt(req.params.id));
    
    res.json({ msg: 'Account removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Mock budgets data for initial setup
let budgets = [
  { id: 1, category: 'Housing', amount: 2000, spent: 1800, period: 'Monthly', userId: 1 },
  { id: 2, category: 'Food & Groceries', amount: 800, spent: 600, period: 'Monthly', userId: 1 },
  { id: 3, category: 'Transportation', amount: 400, spent: 320, period: 'Monthly', userId: 1 },
  { id: 4, category: 'Entertainment', amount: 300, spent: 250, period: 'Monthly', userId: 1 },
  { id: 5, category: 'Utilities', amount: 500, spent: 450, period: 'Monthly', userId: 1 }
];

// @route   GET api/budgets
// @desc    Get all budgets
// @access  Private
router.get('/', (req, res) => {
  try {
    // In a real app, this would filter budgets by the authenticated user's ID
    // For now, just return all budgets
    res.json(budgets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/budgets/:id
// @desc    Get budget by ID
// @access  Private
router.get('/:id', (req, res) => {
  try {
    const budget = budgets.find(budget => budget.id === parseInt(req.params.id));
    
    if (!budget) {
      return res.status(404).json({ msg: 'Budget not found' });
    }
    
    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/budgets
// @desc    Create a new budget
// @access  Private
router.post(
  '/',
  [
    check('category', 'Category is required').not().isEmpty(),
    check('amount', 'Amount is required').isNumeric(),
    check('spent', 'Spent amount is required').isNumeric(),
    check('period', 'Period is required').not().isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { category, amount, spent, period } = req.body;
      
      const newBudget = {
        id: budgets.length + 1,
        category,
        amount: parseFloat(amount),
        spent: parseFloat(spent),
        period,
        userId: 1 // In a real app, this would be the authenticated user's ID
      };
      
      budgets.push(newBudget);
      
      res.json(newBudget);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/budgets/:id
// @desc    Update a budget
// @access  Private
router.put(
  '/:id',
  [
    check('category', 'Category is required').not().isEmpty(),
    check('amount', 'Amount is required').isNumeric(),
    check('spent', 'Spent amount is required').isNumeric(),
    check('period', 'Period is required').not().isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { category, amount, spent, period } = req.body;
      
      const budgetIndex = budgets.findIndex(budget => budget.id === parseInt(req.params.id));
      
      if (budgetIndex === -1) {
        return res.status(404).json({ msg: 'Budget not found' });
      }
      
      budgets[budgetIndex] = {
        ...budgets[budgetIndex],
        category,
        amount: parseFloat(amount),
        spent: parseFloat(spent),
        period
      };
      
      res.json(budgets[budgetIndex]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/budgets/:id
// @desc    Delete a budget
// @access  Private
router.delete('/:id', (req, res) => {
  try {
    const budgetIndex = budgets.findIndex(budget => budget.id === parseInt(req.params.id));
    
    if (budgetIndex === -1) {
      return res.status(404).json({ msg: 'Budget not found' });
    }
    
    budgets = budgets.filter(budget => budget.id !== parseInt(req.params.id));
    
    res.json({ msg: 'Budget removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

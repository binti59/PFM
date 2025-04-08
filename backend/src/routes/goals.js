const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Mock goals data for initial setup
let goals = [
  { id: 1, name: 'Emergency Fund', targetAmount: 15000, currentAmount: 10000, targetDate: '2025-12-31', priority: 'High', userId: 1 },
  { id: 2, name: 'Down Payment for House', targetAmount: 60000, currentAmount: 25000, targetDate: '2027-06-30', priority: 'Medium', userId: 1 },
  { id: 3, name: 'New Car', targetAmount: 25000, currentAmount: 5000, targetDate: '2026-03-31', priority: 'Low', userId: 1 },
  { id: 4, name: 'Vacation Fund', targetAmount: 5000, currentAmount: 2500, targetDate: '2025-07-31', priority: 'Medium', userId: 1 }
];

// @route   GET api/goals
// @desc    Get all goals
// @access  Private
router.get('/', (req, res) => {
  try {
    // In a real app, this would filter goals by the authenticated user's ID
    // For now, just return all goals
    res.json(goals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/goals/:id
// @desc    Get goal by ID
// @access  Private
router.get('/:id', (req, res) => {
  try {
    const goal = goals.find(goal => goal.id === parseInt(req.params.id));
    
    if (!goal) {
      return res.status(404).json({ msg: 'Goal not found' });
    }
    
    res.json(goal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/goals
// @desc    Create a new goal
// @access  Private
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('targetAmount', 'Target amount is required').isNumeric(),
    check('currentAmount', 'Current amount is required').isNumeric(),
    check('targetDate', 'Target date is required').not().isEmpty(),
    check('priority', 'Priority is required').not().isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, targetAmount, currentAmount, targetDate, priority } = req.body;
      
      const newGoal = {
        id: goals.length + 1,
        name,
        targetAmount: parseFloat(targetAmount),
        currentAmount: parseFloat(currentAmount),
        targetDate,
        priority,
        userId: 1 // In a real app, this would be the authenticated user's ID
      };
      
      goals.push(newGoal);
      
      res.json(newGoal);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/goals/:id
// @desc    Update a goal
// @access  Private
router.put(
  '/:id',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('targetAmount', 'Target amount is required').isNumeric(),
    check('currentAmount', 'Current amount is required').isNumeric(),
    check('targetDate', 'Target date is required').not().isEmpty(),
    check('priority', 'Priority is required').not().isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, targetAmount, currentAmount, targetDate, priority } = req.body;
      
      const goalIndex = goals.findIndex(goal => goal.id === parseInt(req.params.id));
      
      if (goalIndex === -1) {
        return res.status(404).json({ msg: 'Goal not found' });
      }
      
      goals[goalIndex] = {
        ...goals[goalIndex],
        name,
        targetAmount: parseFloat(targetAmount),
        currentAmount: parseFloat(currentAmount),
        targetDate,
        priority
      };
      
      res.json(goals[goalIndex]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/goals/:id
// @desc    Delete a goal
// @access  Private
router.delete('/:id', (req, res) => {
  try {
    const goalIndex = goals.findIndex(goal => goal.id === parseInt(req.params.id));
    
    if (goalIndex === -1) {
      return res.status(404).json({ msg: 'Goal not found' });
    }
    
    goals = goals.filter(goal => goal.id !== parseInt(req.params.id));
    
    res.json({ msg: 'Goal removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

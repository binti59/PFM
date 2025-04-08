const express = require('express');
const router = express.Router();

// Mock data for reports
const mockMonthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  income: [4500, 4500, 4800, 4750, 5000, 5200],
  expenses: [3200, 3400, 3100, 3300, 3500, 3200]
};

const mockCategoryData = {
  labels: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Other'],
  data: [1800, 600, 320, 250, 450, 300]
};

const mockAccountData = {
  labels: ['Checking', 'Savings', '401(k)', 'Brokerage', 'Credit Card'],
  data: [5250, 12500, 85750, 22250, -1250]
};

// @route   GET api/reports/income-expenses
// @desc    Get income vs expenses report data
// @access  Private
router.get('/income-expenses', (req, res) => {
  try {
    res.json(mockMonthlyData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/reports/expense-categories
// @desc    Get expense by category report data
// @access  Private
router.get('/expense-categories', (req, res) => {
  try {
    res.json(mockCategoryData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/reports/net-worth
// @desc    Get net worth report data
// @access  Private
router.get('/net-worth', (req, res) => {
  try {
    // Calculate net worth data based on income and expenses
    const netWorthData = {
      labels: mockMonthlyData.labels,
      data: mockMonthlyData.income.map((income, index) => {
        const expense = mockMonthlyData.expenses[index];
        return (income - expense) * (index + 1);
      })
    };
    
    res.json(netWorthData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/reports/account-balances
// @desc    Get account balances report data
// @access  Private
router.get('/account-balances', (req, res) => {
  try {
    res.json(mockAccountData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/reports/summary
// @desc    Get financial summary report
// @access  Private
router.get('/summary', (req, res) => {
  try {
    const totalIncome = mockMonthlyData.income.reduce((a, b) => a + b, 0);
    const totalExpenses = mockMonthlyData.expenses.reduce((a, b) => a + b, 0);
    const netSavings = totalIncome - totalExpenses;
    const savingsRate = (netSavings / totalIncome) * 100;
    
    const summary = {
      totalIncome,
      totalExpenses,
      netSavings,
      savingsRate: parseFloat(savingsRate.toFixed(2)),
      netWorth: mockAccountData.data.reduce((a, b) => a + b, 0)
    };
    
    res.json(summary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

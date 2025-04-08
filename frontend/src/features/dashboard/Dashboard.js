import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, TextField, MenuItem, InputAdornment, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';

// Enhanced Dashboard component with more interactive elements and better data visualization
const Dashboard = () => {
  // Mock data for initial setup (would come from Redux in a real app)
  const [dashboardData, setDashboardData] = useState({
    netWorth: 124500,
    netWorthChange: 3.2,
    monthlyIncome: 8750,
    monthlyIncomeChange: 5.0,
    monthlyExpenses: 5320,
    monthlyExpensesChange: 2.1,
    savingsRate: 39.2,
    savingsRateChange: 1.5,
    recentTransactions: [
      { id: 1, type: 'expense', category: 'Grocery', date: 'Apr 3, 2025', amount: -125.40, icon: '🛒' },
      { id: 2, type: 'income', category: 'Salary', date: 'Apr 1, 2025', amount: 4375.00, icon: '💼' },
      { id: 3, type: 'expense', category: 'Rent', date: 'Apr 1, 2025', amount: -1800.00, icon: '🏠' },
      { id: 4, type: 'expense', category: 'Restaurant', date: 'Mar 30, 2025', amount: -58.75, icon: '🍔' },
      { id: 5, type: 'income', category: 'Investment', date: 'Mar 28, 2025', amount: 320.50, icon: '💰' }
    ],
    budgets: [
      { category: 'Housing', spent: 1800, total: 2000 },
      { category: 'Food & Groceries', spent: 600, total: 800 },
      { category: 'Transportation', spent: 320, total: 400 }
    ],
    upcomingBills: [
      { id: 1, name: 'Rent', amount: 1800, dueDate: '2025-05-01' },
      { id: 2, name: 'Electricity', amount: 120, dueDate: '2025-04-15' },
      { id: 3, name: 'Internet', amount: 80, dueDate: '2025-04-20' }
    ]
  });

  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date()
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [transactionType, setTransactionType] = useState('all');

  // Calculate days until due for upcoming bills
  const calculateDaysUntil = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = Math.abs(due - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter transactions based on search term and type
  const filteredTransactions = dashboardData.recentTransactions.filter(transaction => {
    const matchesSearch = searchTerm === '' || 
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.date.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = transactionType === 'all' || 
      (transactionType === 'income' && transaction.amount > 0) ||
      (transactionType === 'expense' && transaction.amount < 0);
    
    return matchesSearch && matchesType;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Financial Dashboard</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DatePicker
              label="Start Date"
              value={dateRange.startDate}
              onChange={(newValue) => setDateRange({ ...dateRange, startDate: newValue })}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
            <DatePicker
              label="End Date"
              value={dateRange.endDate}
              onChange={(newValue) => setDateRange({ ...dateRange, endDate: newValue })}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
            <Button variant="outlined" startIcon={<FilterListIcon />}>
              Apply
            </Button>
          </Box>
        </LocalizationProvider>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Net Worth */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Net Worth
              </Typography>
              <Typography variant="h4" component="div">
                ${dashboardData.netWorth.toLocaleString()}
              </Typography>
              <Typography 
                variant="body2" 
                color={dashboardData.netWorthChange >= 0 ? "success.main" : "error.main"}
              >
                {dashboardData.netWorthChange >= 0 ? '↑' : '↓'} {Math.abs(dashboardData.netWorthChange)}% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Monthly Income */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Monthly Income
              </Typography>
              <Typography variant="h4" component="div">
                ${dashboardData.monthlyIncome.toLocaleString()}
              </Typography>
              <Typography 
                variant="body2" 
                color={dashboardData.monthlyIncomeChange >= 0 ? "success.main" : "error.main"}
              >
                {dashboardData.monthlyIncomeChange >= 0 ? '↑' : '↓'} {Math.abs(dashboardData.monthlyIncomeChange)}% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Monthly Expenses */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Monthly Expenses
              </Typography>
              <Typography variant="h4" component="div">
                ${dashboardData.monthlyExpenses.toLocaleString()}
              </Typography>
              <Typography 
                variant="body2" 
                color={dashboardData.monthlyExpensesChange <= 0 ? "success.main" : "error.main"}
              >
                {dashboardData.monthlyExpensesChange >= 0 ? '↑' : '↓'} {Math.abs(dashboardData.monthlyExpensesChange)}% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Savings Rate */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Savings Rate
              </Typography>
              <Typography variant="h4" component="div">
                {dashboardData.savingsRate}%
              </Typography>
              <Typography 
                variant="body2" 
                color={dashboardData.savingsRateChange >= 0 ? "success.main" : "error.main"}
              >
                {dashboardData.savingsRateChange >= 0 ? '↑' : '↓'} {Math.abs(dashboardData.savingsRateChange)}% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        {/* Recent Transactions */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Recent Transactions</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    size="small" 
                    startIcon={<FilterListIcon />}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    Filter
                  </Button>
                  <Button 
                    size="small" 
                    variant="contained" 
                    startIcon={<AddIcon />}
                  >
                    Add Transaction
                  </Button>
                </Box>
              </Box>
              
              {/* Search and filters */}
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 1 }}
                />
                
                {showFilters && (
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <TextField
                      select
                      size="small"
                      label="Type"
                      value={transactionType}
                      onChange={(e) => setTransactionType(e.target.value)}
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="income">Income</MenuItem>
                      <MenuItem value="expense">Expense</MenuItem>
                    </TextField>
                  </Box>
                )}
              </Box>
              
              {/* Transaction list */}
              {filteredTransactions.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                  No transactions found
                </Typography>
              ) : (
                filteredTransactions.map((transaction) => (
                  <Box 
                    key={transaction.id} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      py: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 2, fontSize: '1.5rem' }}>{transaction.icon}</Box>
                      <Box>
                        <Typography variant="body1">{transaction.category}</Typography>
                        <Typography variant="body2" color="text.secondary">{transaction.date}</Typography>
                      </Box>
                    </Box>
                    <Typography 
                      variant="body1" 
                      color={transaction.amount >= 0 ? "success.main" : "error.main"}
                      sx={{ fontWeight: 'medium' }}
                    >
                      {transaction.amount >= 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </Typography>
                  </Box>
                ))
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button color="primary">View All Transactions</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Upcoming Bills */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Upcoming Bills</Typography>
              
              {dashboardData.upcomingBills.map((bill) => {
                const daysUntil = calculateDaysUntil(bill.dueDate);
                return (
                  <Box 
                    key={bill.id} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      py: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <Box>
                      <Typography variant="body1">{bill.name}</Typography>
                      <Typography 
                        variant="body2" 
                        color={daysUntil <= 3 ? "error.main" : daysUntil <= 7 ? "warning.main" : "text.secondary"}
                      >
                        Due in {daysUntil} days
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        ${bill.amount.toLocaleString()}
                      </Typography>
                      <Button size="small" variant="outlined" sx={{ mt: 0.5 }}>
                        Pay Now
                      </Button>
                    </Box>
                  </Box>
                );
              })}
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button color="primary" startIcon={<AddIcon />}>
                  Add Bill
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Monthly Budget */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Monthly Budget</Typography>
                <Button 
                  size="small" 
                  variant="outlined" 
                  startIcon={<AddIcon />}
                >
                  Add Budget
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                {dashboardData.budgets.map((budget, index) => {
                  const progress = (budget.spent / budget.total) * 100;
                  
                  return (
                    <Grid item xs={12} md={4} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body1">{budget.category}</Typography>
                            <Typography variant="body2">
                              ${budget.spent.toLocaleString()} / ${budget.total.toLocaleString()}
                            </Typography>
                          </Box>
                          <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1, overflow: 'hidden' }}>
                            <Box
                              sx={{
                                width: `${progress > 100 ? 100 : progress}%`,
                                bgcolor: progress > 90 ? 'error.main' : progress > 75 ? 'warning.main' : 'primary.main',
                                height: 8,
                              }}
                            />
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {Math.round(progress)}% used
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color={budget.total - budget.spent > 0 ? "text.secondary" : "error.main"}
                            >
                              ${Math.max(0, budget.total - budget.spent).toLocaleString()} left
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button color="primary">View All Budgets</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

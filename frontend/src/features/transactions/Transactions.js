import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Tabs, Tab, InputAdornment } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import { useSelector } from 'react-redux';

// Enhanced Transactions component with more interactive elements and better data visualization
const Transactions = () => {
  // Mock data for initial setup (would come from Redux in a real app)
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2025-04-03', description: 'Grocery Shopping', category: 'Food', amount: -125.40, account: 'Checking Account', notes: 'Weekly groceries' },
    { id: 2, date: '2025-04-01', description: 'Salary Deposit', category: 'Income', amount: 4375.00, account: 'Checking Account', notes: 'Monthly salary' },
    { id: 3, date: '2025-04-01', description: 'Rent Payment', category: 'Housing', amount: -1800.00, account: 'Checking Account', notes: 'Monthly rent' },
    { id: 4, date: '2025-03-30', description: 'Restaurant Dinner', category: 'Food', amount: -58.75, account: 'Credit Card', notes: 'Dinner with friends' },
    { id: 5, date: '2025-03-28', description: 'Investment Dividend', category: 'Income', amount: 320.50, account: 'Brokerage Account', notes: 'Quarterly dividend' },
    { id: 6, date: '2025-03-25', description: 'Gas Station', category: 'Transportation', amount: -45.30, account: 'Credit Card', notes: 'Fuel for car' },
    { id: 7, date: '2025-03-22', description: 'Movie Tickets', category: 'Entertainment', amount: -32.50, account: 'Credit Card', notes: 'Weekend movie' },
    { id: 8, date: '2025-03-20', description: 'Utility Bill', category: 'Utilities', amount: -95.40, account: 'Checking Account', notes: 'Monthly electricity bill' }
  ]);

  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Checking Account' },
    { id: 2, name: 'Savings Account' },
    { id: 3, name: '401(k)' },
    { id: 4, name: 'Credit Card' },
    { id: 5, name: 'Brokerage Account' }
  ]);

  const [categories, setCategories] = useState([
    'Income', 'Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Personal', 'Education', 'Investments', 'Debt', 'Other'
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: '',
    amount: '',
    account: '',
    notes: ''
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [accountFilter, setAccountFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    switch(newValue) {
      case 0: // All
        setTypeFilter('all');
        break;
      case 1: // Income
        setTypeFilter('income');
        break;
      case 2: // Expenses
        setTypeFilter('expense');
        break;
      default:
        setTypeFilter('all');
    }
  };

  const handleOpenDialog = (transaction = null) => {
    if (transaction) {
      setCurrentTransaction(transaction);
      setFormData({
        date: transaction.date,
        description: transaction.description,
        category: transaction.category,
        amount: Math.abs(transaction.amount).toString(),
        account: transaction.account,
        notes: transaction.notes || ''
      });
    } else {
      setCurrentTransaction(null);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: '',
        amount: '',
        account: '',
        notes: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date ? date.toISOString().split('T')[0] : ''
    });
  };

  const handleSubmit = () => {
    // Determine if this is income or expense based on category or user input
    const isIncome = formData.category === 'Income';
    const amount = parseFloat(formData.amount);
    
    const newTransaction = {
      id: currentTransaction ? currentTransaction.id : Date.now(),
      date: formData.date,
      description: formData.description,
      category: formData.category,
      amount: isIncome ? amount : -amount,
      account: formData.account,
      notes: formData.notes
    };

    if (currentTransaction) {
      // Update existing transaction
      setTransactions(transactions.map(transaction => 
        transaction.id === currentTransaction.id ? newTransaction : transaction
      ));
    } else {
      // Add new transaction
      setTransactions([newTransaction, ...transactions]);
    }

    handleCloseDialog();
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const getTotalIncome = () => {
    return transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalExpenses = () => {
    return transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  const getNetCashflow = () => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  };

  // Filter and sort transactions
  const filteredTransactions = transactions.filter(transaction => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.notes && transaction.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Date range filter
    const transactionDate = new Date(transaction.date);
    const matchesDateRange = 
      (!dateRange.startDate || transactionDate >= dateRange.startDate) &&
      (!dateRange.endDate || transactionDate <= dateRange.endDate);
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
    
    // Account filter
    const matchesAccount = accountFilter === 'all' || transaction.account === accountFilter;
    
    // Type filter (income/expense)
    const matchesType = 
      typeFilter === 'all' || 
      (typeFilter === 'income' && transaction.amount > 0) ||
      (typeFilter === 'expense' && transaction.amount < 0);
    
    return matchesSearch && matchesDateRange && matchesCategory && matchesAccount && matchesType;
  }).sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'description':
        comparison = a.description.localeCompare(b.description);
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'account':
        comparison = a.account.localeCompare(b.account);
        break;
      default:
        comparison = new Date(a.date) - new Date(b.date);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Transactions</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Transaction
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', bgcolor: 'success.light' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Income
              </Typography>
              <Typography variant="h4" component="div" color="success.dark">
                ${getTotalIncome().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {transactions.filter(t => t.amount > 0).length} income transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', bgcolor: 'error.light' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Expenses
              </Typography>
              <Typography variant="h4" component="div" color="error.dark">
                ${getTotalExpenses().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {transactions.filter(t => t.amount < 0).length} expense transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', bgcolor: getNetCashflow() >= 0 ? 'primary.light' : 'warning.light' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Net Cashflow
              </Typography>
              <Typography 
                variant="h4" 
                component="div" 
                color={getNetCashflow() >= 0 ? 'primary.dark' : 'warning.dark'}
              >
                ${getNetCashflow().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getNetCashflow() >= 0 ? 'Positive' : 'Negative'} cashflow
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="transaction tabs">
            <Tab label="All Transactions" />
            <Tab label="Income" />
            <Tab label="Expenses" />
          </Tabs>
        </Box>
        
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <TextField
              placeholder="Search transactions..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 250 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                size="small" 
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              <Button 
                size="small" 
                startIcon={<SortIcon />}
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
              </Button>
            </Box>
          </Box>
          
          {showFilters && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="From Date"
                  value={dateRange.startDate}
                  onChange={(newValue) => setDateRange({ ...dateRange, startDate: newValue })}
                  renderInput={(params) => <TextField size="small" {...params} sx={{ width: 150 }} />}
                />
                <DatePicker
                  label="To Date"
                  value={dateRange.endDate}
                  onChange={(newValue) => setDateRange({ ...dateRange, endDate: newValue })}
                  renderInput={(params) => <TextField size="small" {...params} sx={{ width: 150 }} />}
                />
              </LocalizationProvider>
              
              <TextField
                select
                size="small"
                label="Category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </TextField>
              
              <TextField
                select
                size="small"
                label="Account"
                value={accountFilter}
                onChange={(e) => setAccountFilter(e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="all">All Accounts</MenuItem>
                {accounts.map((account) => (
                  <MenuItem key={account.id} value={account.name}>{account.name}</MenuItem>
                ))}
              </TextField>
              
              <TextField
                select
                size="small"
                label="Sort By"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="description">Description</MenuItem>
                <MenuItem value="category">Category</MenuItem>
                <MenuItem value="amount">Amount</MenuItem>
                <MenuItem value="account">Account</MenuItem>
              </TextField>
            </Box>
          )}
          
          {filteredTransactions.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No transactions found matching your criteria
            </Typography>
          ) : (
            filteredTransactions.map((transaction) => (
              <Card key={transaction.id} variant="outlined" sx={{ mb: 2 }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(transaction.date).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {transaction.description}
                      </Typography>
                      {transaction.notes && (
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {transaction.notes}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant="body2" color="text.secondary">
                        {transaction.category}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant="body2" color="text.secondary">
                        {transaction.account}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography 
                        variant="body1" 
                        color={transaction.amount >= 0 ? "success.main" : "error.main"}
                        sx={{ fontWeight: 'bold' }}
                      >
                        {transaction.amount >= 0 ? '+' : ''}
                        ${Math.abs(transaction.amount).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={1} sx={{ textAlign: 'right' }}>
                      <IconButton size="small" onClick={() => handleOpenDialog(transaction)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteTransaction(transaction.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Transaction Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentTransaction ? 'Edit Transaction' : 'Add New Transaction'}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={formData.date ? new Date(formData.date) : null}
              onChange={handleDateChange}
              renderInput={(params) => 
                <TextField 
                  {...params} 
                  margin="dense" 
                  fullWidth 
                  required 
                  sx={{ mb: 2, mt: 1 }} 
                />
              }
            />
          </LocalizationProvider>
          
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            required
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          
          <TextField
            select
            margin="dense"
            name="category"
            label="Category"
            fullWidth
            required
            variant="outlined"
            value={formData.category}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </TextField>
          
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            required
            variant="outlined"
            value={formData.amount}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            select
            margin="dense"
            name="account"
            label="Account"
            fullWidth
            required
            variant="outlined"
            value={formData.account}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            {accounts.map((account) => (
              <MenuItem key={account.id} value={account.name}>{account.name}</MenuItem>
            ))}
          </TextField>
          
          <TextField
            margin="dense"
            name="notes"
            label="Notes"
            type="text"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.date || !formData.description || !formData.category || !formData.amount || !formData.account}
          >
            {currentTransaction ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Transactions;

import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, LinearProgress, InputAdornment } from '@mui/material';
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

// Enhanced Budgets component with more interactive elements and better data visualization
const Budgets = () => {
  // Mock data for initial setup (would come from Redux in a real app)
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Housing', amount: 2000, spent: 1800, period: 'Monthly', startDate: '2025-04-01', endDate: '2025-04-30', notes: 'Rent and utilities' },
    { id: 2, category: 'Food & Groceries', amount: 800, spent: 600, period: 'Monthly', startDate: '2025-04-01', endDate: '2025-04-30', notes: 'Groceries and dining out' },
    { id: 3, category: 'Transportation', amount: 400, spent: 320, period: 'Monthly', startDate: '2025-04-01', endDate: '2025-04-30', notes: 'Gas, parking, and public transit' },
    { id: 4, category: 'Entertainment', amount: 300, spent: 250, period: 'Monthly', startDate: '2025-04-01', endDate: '2025-04-30', notes: 'Movies, events, and subscriptions' },
    { id: 5, category: 'Utilities', amount: 500, spent: 450, period: 'Monthly', startDate: '2025-04-01', endDate: '2025-04-30', notes: 'Electricity, water, internet' },
    { id: 6, category: 'Healthcare', amount: 200, spent: 50, period: 'Monthly', startDate: '2025-04-01', endDate: '2025-04-30', notes: 'Medications and doctor visits' },
    { id: 7, category: 'Personal', amount: 150, spent: 120, period: 'Monthly', startDate: '2025-04-01', endDate: '2025-04-30', notes: 'Personal care items' },
    { id: 8, category: 'Savings', amount: 1000, spent: 1000, period: 'Monthly', startDate: '2025-04-01', endDate: '2025-04-30', notes: 'Emergency fund contribution' }
  ]);

  const [categories, setCategories] = useState([
    'Housing', 'Food & Groceries', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Personal', 'Education', 'Investments', 'Savings', 'Debt', 'Other'
  ]);

  const [periods, setPeriods] = useState([
    'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'Annually'
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    spent: '0',
    period: 'Monthly',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    notes: ''
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('category');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  const handleOpenDialog = (budget = null) => {
    if (budget) {
      setCurrentBudget(budget);
      setFormData({
        category: budget.category,
        amount: budget.amount.toString(),
        spent: budget.spent.toString(),
        period: budget.period,
        startDate: budget.startDate,
        endDate: budget.endDate,
        notes: budget.notes || ''
      });
    } else {
      setCurrentBudget(null);
      setFormData({
        category: '',
        amount: '',
        spent: '0',
        period: 'Monthly',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
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

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date ? date.toISOString().split('T')[0] : ''
    });
  };

  const handleSubmit = () => {
    const newBudget = {
      id: currentBudget ? currentBudget.id : Date.now(),
      category: formData.category,
      amount: parseFloat(formData.amount),
      spent: parseFloat(formData.spent),
      period: formData.period,
      startDate: formData.startDate,
      endDate: formData.endDate,
      notes: formData.notes
    };

    if (currentBudget) {
      // Update existing budget
      setBudgets(budgets.map(budget => 
        budget.id === currentBudget.id ? newBudget : budget
      ));
    } else {
      // Add new budget
      setBudgets([...budgets, newBudget]);
    }

    handleCloseDialog();
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  const getTotalBudgeted = () => {
    return budgets.reduce((sum, budget) => sum + budget.amount, 0);
  };

  const getTotalSpent = () => {
    return budgets.reduce((sum, budget) => sum + budget.spent, 0);
  };

  const getRemainingBudget = () => {
    return getTotalBudgeted() - getTotalSpent();
  };

  const getOverallProgress = () => {
    return (getTotalSpent() / getTotalBudgeted()) * 100;
  };

  // Calculate budget status
  const getBudgetStatus = (budget) => {
    const progress = (budget.spent / budget.amount) * 100;
    if (progress >= 100) return 'Exceeded';
    if (progress >= 90) return 'Warning';
    if (progress >= 75) return 'Caution';
    return 'Good';
  };

  // Filter and sort budgets
  const filteredBudgets = budgets.filter(budget => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      budget.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (budget.notes && budget.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || budget.category === categoryFilter;
    
    // Period filter
    const matchesPeriod = periodFilter === 'all' || budget.period === periodFilter;
    
    // Status filter
    const status = getBudgetStatus(budget);
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'good' && status === 'Good') ||
      (statusFilter === 'caution' && status === 'Caution') ||
      (statusFilter === 'warning' && status === 'Warning') ||
      (statusFilter === 'exceeded' && status === 'Exceeded');
    
    return matchesSearch && matchesCategory && matchesPeriod && matchesStatus;
  }).sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'spent':
        comparison = a.spent - b.spent;
        break;
      case 'remaining':
        comparison = (a.amount - a.spent) - (b.amount - b.spent);
        break;
      case 'progress':
        comparison = (a.spent / a.amount) - (b.spent / b.amount);
        break;
      default:
        comparison = a.category.localeCompare(b.category);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Get progress color based on percentage
  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'error.main';
    if (percentage >= 90) return 'warning.main';
    if (percentage >= 75) return 'info.main';
    return 'success.main';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Budgets</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Budget
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Budgeted
              </Typography>
              <Typography variant="h4" component="div">
                ${getTotalBudgeted().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {budgets.length} active budgets
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Spent
              </Typography>
              <Typography variant="h4" component="div" color="primary.main">
                ${getTotalSpent().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round((getTotalSpent() / getTotalBudgeted()) * 100)}% of total budget
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Remaining Budget
              </Typography>
              <Typography 
                variant="h4" 
                component="div" 
                color={getRemainingBudget() >= 0 ? "success.main" : "error.main"}
              >
                ${Math.abs(getRemainingBudget()).toLocaleString()}
              </Typography>
              <Typography 
                variant="body2" 
                color={getRemainingBudget() >= 0 ? "success.main" : "error.main"}
              >
                {getRemainingBudget() >= 0 ? 'Under budget' : 'Over budget'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Overall Progress
              </Typography>
              <Typography 
                variant="h4" 
                component="div" 
                color={getProgressColor(getOverallProgress())}
              >
                {Math.round(getOverallProgress())}%
              </Typography>
              <Box sx={{ width: '100%', mt: 1 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(getOverallProgress(), 100)} 
                  color={getOverallProgress() >= 90 ? "error" : getOverallProgress() >= 75 ? "warning" : "primary"}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <TextField
              placeholder="Search budgets..."
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
                {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              </Button>
            </Box>
          </Box>
          
          {showFilters && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
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
                label="Period"
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="all">All Periods</MenuItem>
                {periods.map((period) => (
                  <MenuItem key={period} value={period}>{period}</MenuItem>
                ))}
              </TextField>
              
              <TextField
                select
                size="small"
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="caution">Caution</MenuItem>
                <MenuItem value="warning">Warning</MenuItem>
                <MenuItem value="exceeded">Exceeded</MenuItem>
              </TextField>
              
              <TextField
                select
                size="small"
                label="Sort By"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="category">Category</MenuItem>
                <MenuItem value="amount">Budget Amount</MenuItem>
                <MenuItem value="spent">Amount Spent</MenuItem>
                <MenuItem value="remaining">Remaining</MenuItem>
                <MenuItem value="progress">Progress</MenuItem>
              </TextField>
            </Box>
          )}
          
          <Grid container spacing={3}>
            {filteredBudgets.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  No budgets found matching your criteria
                </Typography>
              </Grid>
            ) : (
              filteredBudgets.map((budget) => {
                const progress = (budget.spent / budget.amount) * 100;
                const remaining = budget.amount - budget.spent;
                const progressColor = getProgressColor(progress);
                
                return (
                  <Grid item xs={12} sm={6} md={4} key={budget.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="h6" component="div" noWrap sx={{ maxWidth: '70%' }}>
                            {budget.category}
                          </Typography>
                          <Box>
                            <IconButton size="small" onClick={() => handleOpenDialog(budget)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleDeleteBudget(budget.id)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        
                        <Typography color="text.secondary" gutterBottom>
                          {budget.period} ({budget.startDate} to {budget.endDate})
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                          <Typography variant="body2">
                            ${budget.spent.toLocaleString()} of ${budget.amount.toLocaleString()}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color={remaining >= 0 ? "success.main" : "error.main"}
                          >
                            {remaining >= 0 ? `$${remaining.toLocaleString()} left` : `$${Math.abs(remaining).toLocaleString()} over`}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ mt: 1, mb: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min(progress, 100)} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 1,
                              bgcolor: 'background.paper',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: progressColor
                              }
                            }}
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            {Math.round(progress)}% used
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color={progressColor}
                            sx={{ fontWeight: 'medium' }}
                          >
                            {getBudgetStatus(budget)}
                          </Typography>
                        </Box>
                        
                        {budget.notes && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                            {budget.notes}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Add/Edit Budget Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentBudget ? 'Edit Budget' : 'Add New Budget'}</DialogTitle>
        <DialogContent>
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
            sx={{ mb: 2, mt: 1 }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </TextField>
          
          <TextField
            margin="dense"
            name="amount"
            label="Budget Amount"
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
            margin="dense"
            name="spent"
            label="Amount Spent"
            type="number"
            fullWidth
            required
            variant="outlined"
            value={formData.spent}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            select
            margin="dense"
            name="period"
            label="Budget Period"
            fullWidth
            required
            variant="outlined"
            value={formData.period}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            {periods.map((period) => (
              <MenuItem key={period} value={period}>{period}</MenuItem>
            ))}
          </TextField>
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <DatePicker
                label="Start Date"
                value={formData.startDate ? new Date(formData.startDate) : null}
                onChange={(date) => handleDateChange('startDate', date)}
                renderInput={(params) => 
                  <TextField 
                    {...params} 
                    margin="dense" 
                    fullWidth 
                    required 
                  />
                }
              />
              
              <DatePicker
                label="End Date"
                value={formData.endDate ? new Date(formData.endDate) : null}
                onChange={(date) => handleDateChange('endDate', date)}
                renderInput={(params) => 
                  <TextField 
                    {...params} 
                    margin="dense" 
                    fullWidth 
                    required 
                  />
                }
              />
            </Box>
          </LocalizationProvider>
          
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
            disabled={!formData.category || !formData.amount || !formData.period || !formData.startDate || !formData.endDate}
          >
            {currentBudget ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Budgets;

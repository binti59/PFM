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
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useSelector } from 'react-redux';

// Enhanced Goals component with more interactive elements and better data visualization
const Goals = () => {
  // Mock data for initial setup (would come from Redux in a real app)
  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency Fund', targetAmount: 15000, currentAmount: 10000, targetDate: '2025-12-31', priority: 'High', category: 'Savings', notes: 'Build 3-month emergency fund' },
    { id: 2, name: 'Down Payment for House', targetAmount: 60000, currentAmount: 25000, targetDate: '2027-06-30', priority: 'Medium', category: 'Housing', notes: 'Save for 20% down payment' },
    { id: 3, name: 'New Car', targetAmount: 25000, currentAmount: 5000, targetDate: '2026-03-31', priority: 'Low', category: 'Transportation', notes: 'Replace current vehicle' },
    { id: 4, name: 'Vacation Fund', targetAmount: 5000, currentAmount: 2500, targetDate: '2025-07-31', priority: 'Medium', category: 'Travel', notes: 'Summer vacation to Europe' },
    { id: 5, name: 'Pay Off Student Loans', targetAmount: 18000, currentAmount: 12000, targetDate: '2026-01-31', priority: 'High', category: 'Debt', notes: 'Eliminate student loan debt' }
  ]);

  const [categories, setCategories] = useState([
    'Savings', 'Housing', 'Transportation', 'Travel', 'Education', 'Retirement', 'Debt', 'Other'
  ]);

  const [priorities, setPriorities] = useState([
    'High', 'Medium', 'Low'
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    priority: '',
    category: '',
    notes: ''
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  const handleOpenDialog = (goal = null) => {
    if (goal) {
      setCurrentGoal(goal);
      setFormData({
        name: goal.name,
        targetAmount: goal.targetAmount.toString(),
        currentAmount: goal.currentAmount.toString(),
        targetDate: goal.targetDate,
        priority: goal.priority,
        category: goal.category,
        notes: goal.notes || ''
      });
    } else {
      setCurrentGoal(null);
      setFormData({
        name: '',
        targetAmount: '',
        currentAmount: '0',
        targetDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        priority: '',
        category: '',
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
      targetDate: date ? date.toISOString().split('T')[0] : ''
    });
  };

  const handleSubmit = () => {
    const newGoal = {
      id: currentGoal ? currentGoal.id : Date.now(),
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
      targetDate: formData.targetDate,
      priority: formData.priority,
      category: formData.category,
      notes: formData.notes
    };

    if (currentGoal) {
      // Update existing goal
      setGoals(goals.map(goal => 
        goal.id === currentGoal.id ? newGoal : goal
      ));
    } else {
      // Add new goal
      setGoals([...goals, newGoal]);
    }

    handleCloseDialog();
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const getTotalTargetAmount = () => {
    return goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  };

  const getTotalCurrentAmount = () => {
    return goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  };

  const getOverallProgress = () => {
    return (getTotalCurrentAmount() / getTotalTargetAmount()) * 100;
  };

  // Calculate days until target date
  const getDaysUntil = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate goal status
  const getGoalStatus = (goal) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const daysUntil = getDaysUntil(goal.targetDate);
    
    if (progress >= 100) return 'Completed';
    if (daysUntil <= 0) return 'Overdue';
    if (daysUntil <= 30 && progress < 90) return 'At Risk';
    if (progress >= 75) return 'On Track';
    
    // Calculate expected progress based on time elapsed
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1); // Assume goal was set 1 year ago
    const totalDays = (new Date(goal.targetDate) - startDate) / (1000 * 60 * 60 * 24);
    const daysElapsed = totalDays - daysUntil;
    const expectedProgress = (daysElapsed / totalDays) * 100;
    
    if (progress >= expectedProgress - 10) return 'On Track';
    return 'Behind';
  };

  // Filter and sort goals
  const filteredGoals = goals.filter(goal => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      goal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (goal.notes && goal.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || goal.category === categoryFilter;
    
    // Priority filter
    const matchesPriority = priorityFilter === 'all' || goal.priority === priorityFilter;
    
    // Status filter
    const status = getGoalStatus(goal);
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'completed' && status === 'Completed') ||
      (statusFilter === 'on-track' && status === 'On Track') ||
      (statusFilter === 'behind' && status === 'Behind') ||
      (statusFilter === 'at-risk' && status === 'At Risk') ||
      (statusFilter === 'overdue' && status === 'Overdue');
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  }).sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'targetAmount':
        comparison = a.targetAmount - b.targetAmount;
        break;
      case 'currentAmount':
        comparison = a.currentAmount - b.currentAmount;
        break;
      case 'progress':
        comparison = (a.currentAmount / a.targetAmount) - (b.currentAmount / b.targetAmount);
        break;
      case 'targetDate':
        comparison = new Date(a.targetDate) - new Date(b.targetDate);
        break;
      case 'priority':
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      default:
        comparison = a.name.localeCompare(b.name);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Get progress color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success.main';
      case 'On Track':
        return 'primary.main';
      case 'Behind':
        return 'warning.main';
      case 'At Risk':
        return 'error.main';
      case 'Overdue':
        return 'error.dark';
      default:
        return 'primary.main';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error.main';
      case 'Medium':
        return 'warning.main';
      case 'Low':
        return 'info.main';
      default:
        return 'text.secondary';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Financial Goals</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Goal
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Goal Amount
              </Typography>
              <Typography variant="h4" component="div">
                ${getTotalTargetAmount().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {goals.length} active goals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Current Savings
              </Typography>
              <Typography variant="h4" component="div" color="primary.main">
                ${getTotalCurrentAmount().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round((getTotalCurrentAmount() / getTotalTargetAmount()) * 100)}% of total goals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Amount Needed
              </Typography>
              <Typography variant="h4" component="div" color="warning.main">
                ${(getTotalTargetAmount() - getTotalCurrentAmount()).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Remaining to reach all goals
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
              <Typography variant="h4" component="div" color="primary.main">
                {Math.round(getOverallProgress())}%
              </Typography>
              <Box sx={{ width: '100%', mt: 1 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(getOverallProgress(), 100)} 
                  color="primary"
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
              placeholder="Search goals..."
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
                label="Priority"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="all">All Priorities</MenuItem>
                {priorities.map((priority) => (
                  <MenuItem key={priority} value={priority}>{priority}</MenuItem>
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
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="on-track">On Track</MenuItem>
                <MenuItem value="behind">Behind</MenuItem>
                <MenuItem value="at-risk">At Risk</MenuItem>
                <MenuItem value="overdue">Overdue</MenuItem>
              </TextField>
              
              <TextField
                select
                size="small"
                label="Sort By"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="targetAmount">Target Amount</MenuItem>
                <MenuItem value="currentAmount">Current Amount</MenuItem>
                <MenuItem value="progress">Progress</MenuItem>
                <MenuItem value="targetDate">Target Date</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
              </TextField>
            </Box>
          )}
          
          <Grid container spacing={3}>
            {filteredGoals.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  No goals found matching your criteria
                </Typography>
              </Grid>
            ) : (
              filteredGoals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                const remaining = goal.targetAmount - goal.currentAmount;
                const status = getGoalStatus(goal);
                const daysUntil = getDaysUntil(goal.targetDate);
                
                return (
                  <Grid item xs={12} sm={6} md={4} key={goal.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6" component="div" noWrap sx={{ maxWidth: '90%' }}>
                              {goal.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: getPriorityColor(goal.priority),
                                  fontWeight: 'medium',
                                  mr: 1,
                                  px: 1,
                                  py: 0.25,
                                  borderRadius: 1,
                                  bgcolor: `${getPriorityColor(goal.priority)}15`
                                }}
                              >
                                {goal.priority} Priority
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {goal.category}
                              </Typography>
                            </Box>
                          </Box>
                          <Box>
                            <IconButton size="small" onClick={() => handleOpenDialog(goal)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleDeleteGoal(goal.id)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                          <Typography variant="body2">
                            ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ${remaining.toLocaleString()} to go
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
                                bgcolor: getStatusColor(status)
                              }
                            }}
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            {Math.round(progress)}% complete
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color={getStatusColor(status)}
                            sx={{ fontWeight: 'medium', display: 'flex', alignItems: 'center' }}
                          >
                            {status === 'Completed' && <CelebrationIcon fontSize="small" sx={{ mr: 0.5 }} />}
                            {status}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Target Date: {new Date(goal.targetDate).toLocaleDateString()}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color={daysUntil <= 30 ? "error.main" : daysUntil <= 90 ? "warning.main" : "text.secondary"}
                          >
                            {daysUntil <= 0 ? 'Overdue' : `${daysUntil} days left`}
                          </Typography>
                        </Box>
                        
                        {goal.notes && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                            {goal.notes}
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

      {/* Add/Edit Goal Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentGoal ? 'Edit Goal' : 'Add New Goal'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Goal Name"
            type="text"
            fullWidth
            required
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
            sx={{ mb: 2, mt: 1 }}
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
            name="targetAmount"
            label="Target Amount"
            type="number"
            fullWidth
            required
            variant="outlined"
            value={formData.targetAmount}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            name="currentAmount"
            label="Current Amount"
            type="number"
            fullWidth
            required
            variant="outlined"
            value={formData.currentAmount}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ mb: 2 }}
          />
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Target Date"
              value={formData.targetDate ? new Date(formData.targetDate) : null}
              onChange={handleDateChange}
              renderInput={(params) => 
                <TextField 
                  {...params} 
                  margin="dense" 
                  fullWidth 
                  required 
                  sx={{ mb: 2 }}
                />
              }
            />
          </LocalizationProvider>
          
          <TextField
            select
            margin="dense"
            name="priority"
            label="Priority"
            fullWidth
            required
            variant="outlined"
            value={formData.priority}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>{priority}</MenuItem>
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
            disabled={!formData.name || !formData.targetAmount || !formData.targetDate || !formData.priority || !formData.category}
          >
            {currentGoal ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Goals;

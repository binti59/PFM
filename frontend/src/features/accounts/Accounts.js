import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Tabs, Tab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import { useSelector } from 'react-redux';

// Enhanced Accounts component with more interactive elements and better data visualization
const Accounts = () => {
  // Mock data for initial setup (would come from Redux in a real app)
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Checking Account', type: 'Bank', balance: 5250.75, institution: 'Chase Bank', lastUpdated: '2025-04-05' },
    { id: 2, name: 'Savings Account', type: 'Bank', balance: 12500.00, institution: 'Bank of America', lastUpdated: '2025-04-05' },
    { id: 3, name: '401(k)', type: 'Investment', balance: 85750.25, institution: 'Vanguard', lastUpdated: '2025-04-01' },
    { id: 4, name: 'Credit Card', type: 'Credit', balance: -1250.50, institution: 'American Express', lastUpdated: '2025-04-03' },
    { id: 5, name: 'Brokerage Account', type: 'Investment', balance: 22250.00, institution: 'Fidelity', lastUpdated: '2025-04-02' }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    balance: '',
    institution: ''
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [accountType, setAccountType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (account = null) => {
    if (account) {
      setCurrentAccount(account);
      setFormData({
        name: account.name,
        type: account.type,
        balance: account.balance.toString(),
        institution: account.institution
      });
    } else {
      setCurrentAccount(null);
      setFormData({
        name: '',
        type: '',
        balance: '',
        institution: ''
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

  const handleSubmit = () => {
    const newAccount = {
      id: currentAccount ? currentAccount.id : Date.now(),
      name: formData.name,
      type: formData.type,
      balance: parseFloat(formData.balance),
      institution: formData.institution,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (currentAccount) {
      // Update existing account
      setAccounts(accounts.map(account => 
        account.id === currentAccount.id ? newAccount : account
      ));
    } else {
      // Add new account
      setAccounts([...accounts, newAccount]);
    }

    handleCloseDialog();
  };

  const handleDeleteAccount = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  const getNetWorth = () => {
    return accounts.reduce((total, account) => {
      // For credit accounts, we subtract the balance if it's negative
      if (account.type === 'Credit' && account.balance < 0) {
        return total + account.balance;
      } else {
        return total + account.balance;
      }
    }, 0);
  };

  const getAssetTotal = () => {
    return accounts.reduce((total, account) => {
      if (account.balance > 0) {
        return total + account.balance;
      }
      return total;
    }, 0);
  };

  const getLiabilityTotal = () => {
    return accounts.reduce((total, account) => {
      if (account.balance < 0) {
        return total + Math.abs(account.balance);
      }
      return total;
    }, 0);
  };

  // Filter and sort accounts
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = searchTerm === '' || 
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.institution.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = accountType === 'all' || account.type === accountType;
    
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'balance':
        comparison = a.balance - b.balance;
        break;
      case 'institution':
        comparison = a.institution.localeCompare(b.institution);
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
      default:
        comparison = a.name.localeCompare(b.name);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Accounts</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Account
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Net Worth
              </Typography>
              <Typography variant="h4" component="div">
                ${getNetWorth().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Assets - Liabilities
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Assets
              </Typography>
              <Typography variant="h4" component="div" color="primary.main">
                ${getAssetTotal().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sum of all positive balances
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Liabilities
              </Typography>
              <Typography variant="h4" component="div" color="error.main">
                ${getLiabilityTotal().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sum of all negative balances
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Number of Accounts
              </Typography>
              <Typography variant="h4" component="div">
                {accounts.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {accounts.filter(a => a.type === 'Bank').length} Bank, {accounts.filter(a => a.type === 'Investment').length} Investment, {accounts.filter(a => a.type === 'Credit').length} Credit
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="account tabs">
            <Tab label="All Accounts" />
            <Tab label="Bank Accounts" />
            <Tab label="Investment Accounts" />
            <Tab label="Credit Accounts" />
          </Tabs>
        </Box>
        
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <TextField
              placeholder="Search accounts..."
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
                Filter
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
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                select
                size="small"
                label="Account Type"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="Bank">Bank</MenuItem>
                <MenuItem value="Investment">Investment</MenuItem>
                <MenuItem value="Credit">Credit</MenuItem>
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
                <MenuItem value="balance">Balance</MenuItem>
                <MenuItem value="institution">Institution</MenuItem>
                <MenuItem value="type">Type</MenuItem>
              </TextField>
            </Box>
          )}
          
          <Grid container spacing={3}>
            {filteredAccounts.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  No accounts found matching your criteria
                </Typography>
              </Grid>
            ) : (
              filteredAccounts.map((account) => (
                <Grid item xs={12} sm={6} md={4} key={account.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="div" noWrap sx={{ maxWidth: '70%' }}>
                          {account.name}
                        </Typography>
                        <Box>
                          <IconButton size="small" onClick={() => handleOpenDialog(account)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleDeleteAccount(account.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography color="text.secondary" gutterBottom>
                        {account.institution}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          {account.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Updated: {account.lastUpdated}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="h6" 
                        color={account.balance >= 0 ? "primary.main" : "error.main"}
                        sx={{ mt: 2, textAlign: 'right' }}
                      >
                        ${Math.abs(account.balance).toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Add/Edit Account Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentAccount ? 'Edit Account' : 'Add New Account'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Account Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            select
            margin="dense"
            name="type"
            label="Account Type"
            fullWidth
            variant="outlined"
            value={formData.type}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Bank">Bank</MenuItem>
            <MenuItem value="Investment">Investment</MenuItem>
            <MenuItem value="Credit">Credit</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            name="balance"
            label="Balance"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.balance}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="institution"
            label="Institution"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.institution}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentAccount ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Accounts;

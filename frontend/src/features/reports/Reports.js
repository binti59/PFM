import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, TextField, MenuItem, Tabs, Tab, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Enhanced Reports component with more interactive elements and better data visualization
const Reports = () => {
  // Mock data for initial setup (would come from Redux in a real app)
  const [reportData, setReportData] = useState({
    incomeVsExpenses: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      income: [4500, 4500, 4800, 4750, 5000, 5200],
      expenses: [3200, 3400, 3100, 3300, 3500, 3200]
    },
    expensesByCategory: {
      labels: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Other'],
      data: [1800, 600, 320, 250, 450, 300]
    },
    netWorth: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [125000, 127500, 130000, 132500, 135000, 138000]
    },
    accountBalances: {
      labels: ['Checking', 'Savings', '401(k)', 'Brokerage', 'Credit Card'],
      data: [5250, 12500, 85750, 22250, -1250]
    },
    cashFlow: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [1300, 1100, 1700, 1450, 1500, 2000]
    },
    savingsRate: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [28.9, 24.4, 35.4, 30.5, 30.0, 38.5]
    }
  });

  const [tabValue, setTabValue] = useState(0);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    endDate: new Date()
  });
  const [showFilters, setShowFilters] = useState(false);
  const [reportType, setReportType] = useState('monthly');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDateChange = (name, date) => {
    setDateRange({
      ...dateRange,
      [name]: date
    });
  };

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  // Income vs Expenses Chart
  const incomeExpensesData = {
    labels: reportData.incomeVsExpenses.labels,
    datasets: [
      {
        label: 'Income',
        data: reportData.incomeVsExpenses.income,
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
      },
      {
        label: 'Expenses',
        data: reportData.incomeVsExpenses.expenses,
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Expense by Category Chart
  const expenseByCategoryData = {
    labels: reportData.expensesByCategory.labels,
    datasets: [
      {
        data: reportData.expensesByCategory.data,
        backgroundColor: [
          'rgba(30, 58, 138, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Net Worth Chart
  const netWorthData = {
    labels: reportData.netWorth.labels,
    datasets: [
      {
        label: 'Net Worth',
        data: reportData.netWorth.data,
        backgroundColor: 'rgba(30, 58, 138, 0.2)',
        borderColor: 'rgba(30, 58, 138, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Account Balance Chart
  const accountBalanceData = {
    labels: reportData.accountBalances.labels,
    datasets: [
      {
        label: 'Account Balance',
        data: reportData.accountBalances.data,
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(30, 58, 138, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Cash Flow Chart
  const cashFlowData = {
    labels: reportData.cashFlow.labels,
    datasets: [
      {
        label: 'Cash Flow',
        data: reportData.cashFlow.data,
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Savings Rate Chart
  const savingsRateData = {
    labels: reportData.savingsRate.labels,
    datasets: [
      {
        label: 'Savings Rate (%)',
        data: reportData.savingsRate.data,
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  // Calculate summary data
  const getTotalIncome = () => {
    return reportData.incomeVsExpenses.income.reduce((a, b) => a + b, 0);
  };

  const getTotalExpenses = () => {
    return reportData.incomeVsExpenses.expenses.reduce((a, b) => a + b, 0);
  };

  const getNetSavings = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  const getAverageSavingsRate = () => {
    return reportData.savingsRate.data.reduce((a, b) => a + b, 0) / reportData.savingsRate.data.length;
  };

  const getNetWorthChange = () => {
    const firstValue = reportData.netWorth.data[0];
    const lastValue = reportData.netWorth.data[reportData.netWorth.data.length - 1];
    return lastValue - firstValue;
  };

  const getNetWorthChangePercentage = () => {
    const firstValue = reportData.netWorth.data[0];
    const lastValue = reportData.netWorth.data[reportData.netWorth.data.length - 1];
    return ((lastValue - firstValue) / firstValue) * 100;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Financial Reports</Typography>
        <Button 
          variant="contained" 
          startIcon={<DownloadIcon />}
        >
          Export Reports
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={dateRange.startDate}
                onChange={(date) => handleDateChange('startDate', date)}
                renderInput={(params) => <TextField size="small" fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={dateRange.endDate}
                onChange={(date) => handleDateChange('endDate', date)}
                renderInput={(params) => <TextField size="small" fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label="Report Type"
              value={reportType}
              onChange={handleReportTypeChange}
              size="small"
              fullWidth
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" fullWidth>
                Apply Filter
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide' : 'More'}
              </Button>
            </Box>
          </Grid>
          
          {showFilters && (
            <Grid item xs={12}>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Additional Filters
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      label="Account"
                      size="small"
                      fullWidth
                      defaultValue="all"
                    >
                      <MenuItem value="all">All Accounts</MenuItem>
                      {reportData.accountBalances.labels.map((label) => (
                        <MenuItem key={label} value={label}>{label}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      label="Category"
                      size="small"
                      fullWidth
                      defaultValue="all"
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      {reportData.expensesByCategory.labels.map((label) => (
                        <MenuItem key={label} value={label}>{label}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      label="Transaction Type"
                      size="small"
                      fullWidth
                      defaultValue="all"
                    >
                      <MenuItem value="all">All Types</MenuItem>
                      <MenuItem value="income">Income</MenuItem>
                      <MenuItem value="expense">Expense</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Income
              </Typography>
              <Typography variant="h4" component="div" color="success.main">
                ${getTotalIncome().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                For selected period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Expenses
              </Typography>
              <Typography variant="h4" component="div" color="error.main">
                ${getTotalExpenses().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                For selected period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Net Savings
              </Typography>
              <Typography variant="h4" component="div" color={getNetSavings() >= 0 ? "primary.main" : "error.main"}>
                ${getNetSavings().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Income - Expenses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Average Savings Rate
              </Typography>
              <Typography variant="h4" component="div" color="primary.main">
                {getAverageSavingsRate().toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Savings / Income
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="report tabs">
          <Tab label="Income vs Expenses" />
          <Tab label="Expense Categories" />
          <Tab label="Net Worth" />
          <Tab label="Account Balances" />
          <Tab label="Cash Flow" />
          <Tab label="Savings Rate" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Income vs Expenses</Typography>
          <Box sx={{ height: 400, mb: 3 }}>
            <Bar data={incomeExpensesData} options={chartOptions} />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    Total Income
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    ${getTotalIncome().toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    Total Expenses
                  </Typography>
                  <Typography variant="h5" color="error.main">
                    ${getTotalExpenses().toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    Net Savings
                  </Typography>
                  <Typography variant="h5" color={getNetSavings() >= 0 ? "primary.main" : "error.main"}>
                    ${getNetSavings().toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Expense by Category</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 400 }}>
                <Pie data={expenseByCategoryData} options={chartOptions} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 400 }}>
                <Doughnut data={expenseByCategoryData} options={chartOptions} />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {reportData.expensesByCategory.labels.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" color="text.secondary">
                      {category}
                    </Typography>
                    <Typography variant="h5">
                      ${reportData.expensesByCategory.data[index].toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Math.round((reportData.expensesByCategory.data[index] / reportData.expensesByCategory.data.reduce((a, b) => a + b, 0)) * 100)}% of total
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {tabValue === 2 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Net Worth Trend</Typography>
          <Box sx={{ height: 400, mb: 3 }}>
            <Line data={netWorthData} options={chartOptions} />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    Current Net Worth
                  </Typography>
                  <Typography variant="h5">
                    ${reportData.netWorth.data[reportData.netWorth.data.length - 1].toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    Net Worth Change
                  </Typography>
                  <Typography variant="h5" color={getNetWorthChange() >= 0 ? "success.main" : "error.main"}>
                    {getNetWorthChange() >= 0 ? '+' : ''}${getNetWorthChange().toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    Percentage Change
                  </Typography>
                  <Typography variant="h5" color={getNetWorthChangePercentage() >= 0 ? "success.main" : "error.main"}>
                    {getNetWorthChangePercentage() >= 0 ? '+' : ''}{getNetWorthChangePercentage().toFixed(2)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}

      {tabValue === 3 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Account Balances</Typography>
          <Box sx={{ height: 400, mb: 3 }}>
            <Pie data={accountBalanceData} options={chartOptions} />
          </Box>
          <Grid container spacing={2}>
            {reportData.accountBalances.labels.map((account, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" color="text.secondary">
                      {account}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      color={reportData.accountBalances.data[index] >= 0 ? "primary.main" : "error.main"}
                    >
                      ${reportData.accountBalances.data[index].toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Math.round((Math.abs(reportData.accountBalances.data[index]) / reportData.accountBalances.data.reduce((a, b) => a + Math.abs(b), 0)) * 100)}% of total
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {tabValue === 4 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Cash Flow Trend</Typography>
          <Box sx={{ height: 400, mb: 3 }}>
            <Bar data={cashFlowData} options={chartOptions} />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    Average Monthly Cash Flow
                  </Typography>
                  <Typography variant="h5" color="primary.main">
                    ${(reportData.cashFlow.data.reduce((a, b) => a + b, 0) / reportData.cashFlow.data.length).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    Highest Cash Flow
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    ${Math.max(...reportData.cashFlow.data).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    Lowest Cash Flow
                  </Typography>
                  <Typography variant="h5" color={Math.min(...reportData.cashFlow.data) >= 0 ? "primary.main" : "error.main"}>
                    ${Math.min(...reportData.cashFlow.data).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}

      {tabValue === 5 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Savings Rate Trend</Typography>
          <Box sx={{ height: 400, mb: 3 }}>
            <Line data={savingsRateData} options={chartOptions} />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    Average Savings Rate
                  </Typography>
                  <Typography variant="h5" color="primary.main">
                    {getAverageSavingsRate().toFixed(1)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    Highest Savings Rate
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    {Math.max(...reportData.savingsRate.data).toFixed(1)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">
                    Lowest Savings Rate
                  </Typography>
                  <Typography variant="h5" color={Math.min(...reportData.savingsRate.data) >= 0 ? "primary.main" : "error.main"}>
                    {Math.min(...reportData.savingsRate.data).toFixed(1)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default Reports;

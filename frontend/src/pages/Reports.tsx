import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';
import PageHeader from '../components/PageHeader';

const Reports = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageHeader title="Reports" />
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300, flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Income vs Expenses
            </Typography>
            <Typography variant="body2">
              This is a placeholder for the income vs expenses chart.
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300, flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Spending by Category
            </Typography>
            <Typography variant="body2">
              This is a placeholder for the spending by category chart.
            </Typography>
          </Paper>
        </Stack>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            Monthly Cash Flow
          </Typography>
          <Typography variant="body2">
            This is a placeholder for the monthly cash flow chart.
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            Net Worth Trend
          </Typography>
          <Typography variant="body2">
            This is a placeholder for the net worth trend chart.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default Reports;

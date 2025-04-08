import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';
import PageHeader from '../components/PageHeader';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageHeader title="Dashboard" />
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Account Summary
            </Typography>
            <Typography variant="body2">
              This is a placeholder for the account summary widget.
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <Typography variant="body2">
              This is a placeholder for the recent transactions widget.
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Budget Overview
            </Typography>
            <Typography variant="body2">
              This is a placeholder for the budget overview widget.
            </Typography>
          </Paper>
        </Stack>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            Financial Overview
          </Typography>
          <Typography variant="body2">
            This is a placeholder for the financial overview chart.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default Dashboard;

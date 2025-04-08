import React from 'react';
import { Box, Typography, Paper, Stack, Button } from '@mui/material';
import PageHeader from '../components/PageHeader';

const Accounts = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageHeader title="Accounts" />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button variant="contained" color="primary">
          Add Account
        </Button>
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 200, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Checking Account
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            $2,500.00
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last updated: Today
          </Typography>
          <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="small" color="primary">View Details</Button>
          </Box>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 200, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Savings Account
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            $10,000.00
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last updated: Yesterday
          </Typography>
          <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="small" color="primary">View Details</Button>
          </Box>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 200, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Credit Card
          </Typography>
          <Typography variant="h4" color="error" gutterBottom>
            -$1,250.00
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last updated: 2 days ago
          </Typography>
          <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="small" color="primary">View Details</Button>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default Accounts;

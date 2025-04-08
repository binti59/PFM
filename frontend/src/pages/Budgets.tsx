import React from 'react';
import { Box, Typography, Paper, Stack, Button, LinearProgress } from '@mui/material';
import PageHeader from '../components/PageHeader';

const Budgets = () => {
  // Sample budget data
  const budgets = [
    { id: 1, name: 'Groceries', category: 'Food', amount: 500, spent: 320, period: 'Monthly' },
    { id: 2, name: 'Entertainment', category: 'Leisure', amount: 200, spent: 150, period: 'Monthly' },
    { id: 3, name: 'Transportation', category: 'Travel', amount: 300, spent: 250, period: 'Monthly' },
    { id: 4, name: 'Dining Out', category: 'Food', amount: 250, spent: 200, period: 'Monthly' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageHeader title="Budgets" />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button variant="contained" color="primary">
          Add Budget
        </Button>
      </Box>
      
      <Stack spacing={3}>
        {budgets.map((budget) => {
          const progress = (budget.spent / budget.amount) * 100;
          const isOverBudget = progress > 100;
          
          return (
            <Paper key={budget.id} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6">{budget.name}</Typography>
                <Typography variant="body2" color="text.secondary">{budget.category}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                  ${budget.spent.toFixed(2)} of ${budget.amount.toFixed(2)}
                </Typography>
                <Typography variant="body2" color={isOverBudget ? 'error.main' : 'success.main'}>
                  {isOverBudget ? 'Over budget' : `${(100 - progress).toFixed(0)}% remaining`}
                </Typography>
              </Box>
              
              <LinearProgress 
                variant="determinate" 
                value={Math.min(progress, 100)} 
                color={isOverBudget ? 'error' : 'primary'}
                sx={{ height: 8, borderRadius: 4, mb: 1 }}
              />
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Period: {budget.period}
              </Typography>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button size="small" color="primary">Edit</Button>
                <Button size="small" color="error" sx={{ ml: 1 }}>Delete</Button>
              </Box>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Budgets;

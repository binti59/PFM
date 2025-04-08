import React from 'react';
import { Box, Typography, Paper, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PageHeader from '../components/PageHeader';

const Transactions = () => {
  // Sample transaction data
  const transactions = [
    { id: 1, date: '2025-04-08', description: 'Grocery Store', category: 'Food', amount: -120.50, account: 'Checking' },
    { id: 2, date: '2025-04-07', description: 'Salary', category: 'Income', amount: 3000.00, account: 'Checking' },
    { id: 3, date: '2025-04-06', description: 'Restaurant', category: 'Dining', amount: -45.80, account: 'Credit Card' },
    { id: 4, date: '2025-04-05', description: 'Gas Station', category: 'Transportation', amount: -35.40, account: 'Credit Card' },
    { id: 5, date: '2025-04-04', description: 'Interest', category: 'Income', amount: 12.50, account: 'Savings' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageHeader title="Transactions" />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button variant="contained" color="primary">
          Add Transaction
        </Button>
      </Box>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Account</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell sx={{ color: transaction.amount < 0 ? 'error.main' : 'success.main' }}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  <TableCell align="right">
                    <Button size="small" color="primary">Edit</Button>
                    <Button size="small" color="error">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Transactions;

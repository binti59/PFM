import React from 'react';
import { Box, Typography, Paper, Stack, TextField, Button, Switch, FormControlLabel, Divider } from '@mui/material';
import PageHeader from '../components/PageHeader';
import FormLayout from '../components/FormLayout';

const Settings = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageHeader title="Settings" />
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Profile Settings
        </Typography>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="First Name"
            defaultValue="John"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Last Name"
            defaultValue="Doe"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Email"
            defaultValue="john.doe@example.com"
            variant="outlined"
          />
          <Box sx={{ mt: 1 }}>
            <Button variant="contained" color="primary">
              Update Profile
            </Button>
          </Box>
        </Stack>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Application Settings
        </Typography>
        <FormLayout>
          <FormControlLabel 
            control={<Switch defaultChecked />} 
            label="Enable email notifications" 
          />
          <FormControlLabel 
            control={<Switch defaultChecked />} 
            label="Enable budget alerts" 
          />
          <FormControlLabel 
            control={<Switch />} 
            label="Dark mode" 
          />
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" gutterBottom>
            Default Currency
          </Typography>
          <TextField
            select
            fullWidth
            defaultValue="USD"
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
          </TextField>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary">
              Save Settings
            </Button>
          </Box>
        </FormLayout>
      </Paper>
    </Box>
  );
};

export default Settings;

import React from 'react';
import { Box, Stack } from '@mui/material';

interface FormLayoutProps {
  children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {children}
      </Stack>
    </Box>
  );
};

export default FormLayout;

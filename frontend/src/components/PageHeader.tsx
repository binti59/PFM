import React from 'react';
import { Box, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const location = useLocation();
  
  // Generate breadcrumbs based on current path
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  // Map of path segments to readable names
  const pathMap: { [key: string]: string } = {
    '': 'Dashboard',
    'accounts': 'Accounts',
    'transactions': 'Transactions',
    'budgets': 'Budgets',
    'reports': 'Reports',
    'settings': 'Settings'
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
      >
        <MuiLink 
          component={RouterLink} 
          underline="hover" 
          color="inherit" 
          to="/"
        >
          Home
        </MuiLink>
        
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          
          return last ? (
            <Typography color="text.primary" key={to}>
              {pathMap[value] || value}
            </Typography>
          ) : (
            <MuiLink
              component={RouterLink}
              underline="hover"
              color="inherit"
              to={to}
              key={to}
            >
              {pathMap[value] || value}
            </MuiLink>
          );
        })}
      </Breadcrumbs>
      
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;

import React from 'react';
import Box from '@mui/material/Box';
import '../../styles/footer/Footer.module.css';

const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      position: 'static', // Now in normal flow instead of fixed
      width: '100%',
      backgroundColor: '#1976d2',
      color: 'white',
      textAlign: 'center',
      padding: '10px 0',
    }}
  >
    © 2025 My Company
  </Box>
);

export default Footer;

import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => (
  <Box mt="80px" bgcolor="#FFF3F4" py="40px" ml="220px">
    <Stack gap="40px" sx={{ alignItems: 'center' }} flexWrap="wrap" px="40px" pt="24px">
      <Typography variant="h4" color="#FF2625">
        Stay Fit
      </Typography>
    </Stack>
    <Typography variant="h5" sx={{ fontSize: { lg: '28px', xs: '20px' } }} mt="20px" textAlign="center" px="20px" color="#FF2625">
      "The only bad workout is the one that didn't happen."
    </Typography>
    <Stack direction="row" justifyContent="center" gap="20px" mt="20px">
      <Facebook sx={{ color: '#3b5998', fontSize: '30px', cursor: 'pointer' }} />
      <Twitter sx={{ color: '#00acee', fontSize: '30px', cursor: 'pointer' }} />
      <Instagram sx={{ color: '#C13584', fontSize: '30px', cursor: 'pointer' }} />
    </Stack>
    <Typography variant="body2" sx={{ fontSize: { lg: '16px', xs: '14px' } }} mt="20px" textAlign="center" pb="40px" color="gray">
      © 2024 FitnessTracker. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;

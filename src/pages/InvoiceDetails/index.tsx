import Box from '@mui/system/Box';
import React from 'react';
import {InvoiceCardSection} from './InvoiceCardSection';
import {InvoiceDetailsSection} from './InvoiceDetailsSection';

export const InvoiceDetails = () => (
  <Box mb={2}>
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        backgroundColor: '#fff',
        paddingTop: 2,
        paddingBottom: 1,
        gap: 2,
        paddingLeft: '15px',
        boxShadow: '0px 4px 15px  rgba(144, 144, 144, 0.2)',
        borderRadius: '4px',
        mt: 10,
      }}
    >
      <InvoiceCardSection />
      <InvoiceDetailsSection />
    </Box>
  </Box>
);

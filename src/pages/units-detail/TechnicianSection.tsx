import React from 'react';
import {Box, Stack} from '@mui/material';
import {ServiceOrderView} from '../../models/service-order';

export interface TechnicianSectionProp {
  serviceOrder: ServiceOrderView;
}

export const TechnicianSection = ({serviceOrder}: TechnicianSectionProp) => {
  const technician = serviceOrder.schedules[0]?.technician;
  if (!technician) {
    return <Box>No Technician</Box>;
  }

  return (
    <Box>
      <h2>Technician</h2>
      <Stack spacing={1}>
        <div>{`${technician.userAccount.firstName} ${technician.userAccount.lastName}`}</div>
        <div>{technician.address.fullName}</div>
        <div>{technician.userAccount.contact.phone}</div>
        <div>{technician.userAccount.contact.email}</div>
      </Stack>
    </Box>
  );
};

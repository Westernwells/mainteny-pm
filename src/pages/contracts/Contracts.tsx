import React, {useEffect, useState} from 'react';
import {Box, Stack} from '@mui/material';

export interface ContractsProp {
  stopLoading: () => void;
}

export const Contracts = ({stopLoading}: ContractsProp) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    stopLoading();
  }, []);

  if (isLoading) {
    return <Box>Loading</Box>;
  }

  return (
    <Box>
      <Stack>This is the contract page</Stack>
    </Box>
  );
};

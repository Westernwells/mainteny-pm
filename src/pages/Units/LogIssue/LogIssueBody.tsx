import {ReactNode} from 'react';
import Box from '@mui/material/Box';

interface Props {
  children: ReactNode;
}

export const LogIssueBody = ({children}: Props) => (
  <Box sx={{overflowY: 'scroll', height: '80%', width: '100%', px: 2, pt: 3}}>
    {children}
  </Box>
);

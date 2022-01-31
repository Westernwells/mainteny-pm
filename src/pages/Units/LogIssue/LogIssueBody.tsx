import {ReactNode} from 'react';
import Box from '@mui/material/Box';

interface Props {
  children: ReactNode;
}

export const LogIssueBody = ({children}: Props) => (
  <Box sx={{overflowY: 'scroll', maxHeight: '80%', width: '100%', pt: 3}}>
    {children}
  </Box>
);

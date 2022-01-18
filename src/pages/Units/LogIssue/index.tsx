import {ReactNode} from 'react';
import Box from '@mui/material/Box';
import {LogIssueHeader} from './LogIssueHeader';
import {LogIssueAction} from './LogIssueAction';

interface Props {
  children: ReactNode;
  disabled: boolean;
  handleCancel: () => void;
}

export const LogIssue = ({children, disabled, handleCancel}: Props) => (
  <Box
    height="100%"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
  >
    <LogIssueHeader />
    {children}
    <LogIssueAction disabled={disabled} handleCancel={handleCancel} />
  </Box>
);

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
  // TODO: to be refactored and improved after VFA
  <Box
    height="100%"
    display="flex"
    flexDirection="column"
    justifyContent="space-between">
    <LogIssueHeader handleCancel={handleCancel} />
    <Box sx={{px: '1.5em'}}>{children}</Box>
    <LogIssueAction disabled={disabled} handleCancel={handleCancel} />
  </Box>
);

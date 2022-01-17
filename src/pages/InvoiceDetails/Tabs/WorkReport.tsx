import {Typography} from '@mui/material';

interface WorkReportProps {
  text: string;
}

export const WorkReport = ({text}: WorkReportProps) => (
  <Typography variant="subtitle1" style={{whiteSpace: 'pre-line'}}>
    {text}
  </Typography>
);

import {useState} from 'react';
import Box from '@mui/material/Box';
import {LogIssueUnitInput} from './LogIssueUnitInput';
import {LogIssueDescription} from './LogIssueDescription';
import {LogIssueDateTime} from './LogIssueDateTime';
import {LogIssueHeader} from './LogIssueHeader';
import {LogIssueAction} from './LogIssueAction';

export const LogIssue = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date | null>(
    new Date('2018-01-01T00:00:00.000Z'),
  );

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <LogIssueHeader />

      <Box
        sx={{overflowY: 'scroll', height: '80%', width: '100%', px: 2, pt: 3}}
      >
        <LogIssueDescription label=" Tell us what happened" />

        <LogIssueUnitInput />

        <LogIssueDateTime
          time={time}
          setTime={setTime}
          date={date}
          setDate={setDate}
        />

        <LogIssueDescription label="Add special instructions, if any " />
      </Box>
      <LogIssueAction />
    </Box>
  );
};

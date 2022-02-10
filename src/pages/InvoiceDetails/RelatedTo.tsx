import {ReactNode} from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {OpenInNew} from '@mui/icons-material';
import {ServiceOrderView} from 'models/service-order';
import {HistoryCard} from 'pages/UnitDetails/Tabs/ServiceHistoryTab/HistoryCard';

interface Props {
  children: ReactNode;
}

export const RelatedTo = ({children}: Props) => {
  const theme = useTheme();
  return <Box>{children}</Box>;
};

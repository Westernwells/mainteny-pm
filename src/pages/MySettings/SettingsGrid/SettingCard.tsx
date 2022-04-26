import {SxProps} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import {ReactNode} from 'react';

interface Props {
  header: string | ReactNode;
  children: ReactNode;
  containerStyles?: SxProps;
}

export const SettingCard = ({header, children, containerStyles}: Props) => (
  <Card
    sx={{
      boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.2)',
      ...containerStyles,
    }}>
    <CardHeader
      sx={{textTransform: 'capitalize'}}
      title={
        <Typography variant="h6" pt={2}>
          {header}
        </Typography>
      }
    />
    <CardContent>{children}</CardContent>
  </Card>
);

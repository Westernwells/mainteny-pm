import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import {ReactNode} from 'react';

interface Props {
  header: string;
  children: ReactNode;
}

export const SettingCard = ({header, children}: Props) => (
    <Card
      sx={{
        boxShadow: 'none',
      }}
    >
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

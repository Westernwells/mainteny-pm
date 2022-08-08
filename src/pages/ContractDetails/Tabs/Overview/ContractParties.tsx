import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import {ServiceCompanyView} from 'models/service-company';
import {PropertyOwnerView} from 'models/propertyManager';
import {useTranslation} from 'react-i18next';

interface Props {
  name?: string;
  address?: string;
  phoneNumber?: string;
  partyType?: 'CONTRACTOR' | 'CUSTOMER';
  occupation?: string;
  containerStyle?: {[key: string]: string | number};
}

export interface Parties {
  [key: string]: ServiceCompanyView | PropertyOwnerView | undefined;
}

export const ContractParties = ({
  name,
  occupation,
  address,
  phoneNumber,
  partyType,
  containerStyle,
}: Props) => {
  const {t} = useTranslation();

  return (
    <Grid container sx={{...containerStyle, marginBottom: 2}}>
      <Grid item xs={5}>
        <Box display="flex" alignItems="center">
          <Avatar sx={{width: '3rem', height: '3rem', mr: '1em'}}>H</Avatar>

          <Box display="flex" flexDirection="column">
            <Typography variant="subtitle1" sx={{display: 'block'}}>
              {name || ''}
            </Typography>
            <Typography variant="body2" sx={{display: 'block'}}>
              {typeof occupation === 'string' ? t(occupation) : ''}
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={5} alignSelf="center">
        <Box>
          <Typography variant="body2" color="textSecondary">
            {address || ''}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {phoneNumber ? `(${phoneNumber})` : ''}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2} alignSelf="center">
        <Chip
          label={t(partyType || '')}
          sx={{
            backgroundColor:
              partyType === 'CONTRACTOR'
                ? 'warning.outlinedHoverBg'
                : 'info.outlinedHoverBg',
            color: partyType === 'CONTRACTOR' ? 'warning.dark' : 'info.dark',
          }}
          variant="filled"
          size="medium"
        />
      </Grid>
    </Grid>
  );
};

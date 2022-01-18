import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import useTheme from '@mui/material/styles/useTheme';
import Avatar from '@mui/material/Avatar';
import {ContractView} from 'models/contract';
import {CustomCard} from 'components/CustomCard';
import {ServiceCompanyView} from 'models/service-company';
import {ClientView} from 'models/client';

interface Props {
  contractDetails?: ContractView;
}

export interface Parties {
  [key: string]: ServiceCompanyView | ClientView | undefined;
}

export const ContractParties = ({contractDetails}: Props) => {
  const theme = useTheme();

  const parties: Parties = {
    contractor: contractDetails?.serviceCompany,
    customer: contractDetails?.propertyOwner,
  };
  return (
    <>
      <Box width="100%" mt={6}>
        <Typography
          variant="h6"
          color="primary"
          sx={{
            background: theme.palette.inputBackground.main,
            mt: 2,
            pt: 3,
            pl: 2,
            py: 2,
          }}
        >
          Parties
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{mt: 2}}>
        {Object.keys(parties).map((key) => (
          <Grid item xs={6}>
            <CustomCard
              containerStyles={{
                boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.2)',
                px: 2,
                width: '100%',
                border: 'none',
                py: 2,
                display: 'flex',
                justifyContent: 'space-between',
                borderRadius: '16px',
              }}
            >
              <Box display="flex" maxWidth="70%">
                <Box sx={{mr: 2}}>
                  <Avatar sx={{width: '80px', height: '80px'}}>H</Avatar>
                </Box>
                <Box sx={{}}>
                  <Box>
                    <Typography variant="h6" sx={{display: 'block'}}>
                      {parties[key]?.name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="mediumBtnText" color="textSecondary">
                      {parties[key]?.contact?.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box maxWidth="30%">
                <Chip
                  color={key === 'contractor' ? 'warning' : 'info'}
                  variant="outlined"
                  sx={{
                    py: 3,
                    background:
                      key === 'contractor'
                        ? theme.palette.warning.outlinedHoverBg
                        : theme.palette.info.outlinedHoverBg,
                    border: `none`,
                    borderRadius: '8px',
                  }}
                  label={
                    <Typography variant="h6" sx={{textTransform: 'capitalize'}}>
                      {key.toUpperCase()}
                    </Typography>
                  }
                  size="medium"
                />
              </Box>
            </CustomCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

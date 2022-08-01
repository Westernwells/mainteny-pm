import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Alert from '@mui/material/Alert';
import useTheme from '@mui/material/styles/useTheme';
import {differenceInDays, isBefore} from 'date-fns';
import {ContractCard} from '../ContractCard';
import {StatusChip} from '../../../components/StatusChip';
import {ContractBasic} from '../ContractBasic';
import {ContractScope} from '../ContractScope';
import {ContractParties} from '../ContractParties';
import {ContractTimeline} from '../ContractTimeline';
import {ContractView} from '../../../models/contract';
import {toDate} from '../../../utils/datetime';

interface Props {
  contract: ContractView;
}

export const Overview = ({contract}: Props) => {
  const theme = useTheme();
  const totalContractDays = differenceInDays(
    toDate(contract?.endTime),
    toDate(contract?.startTime),
  );

  const usedContractDays = isBefore(new Date(), toDate(contract?.endTime))
    ? differenceInDays(new Date(), toDate(contract?.startTime))
    : differenceInDays(toDate(contract?.endTime), toDate(contract?.startTime));

  const unUsedContractDays = isBefore(new Date(), toDate(contract?.endTime))
    ? differenceInDays(toDate(contract?.endTime), new Date())
    : 0;
  return (
    <Grid
      container
      spacing={2}
      sx={{
        pb: '1em',
      }}>
      <Grid xs={8} item>
        <ContractCard
          minHeight="12rem"
          containerStyles={{pt: '1em'}}
          header={
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">#{contract.number}</Typography>
              <StatusChip
                color="success"
                label="Running"
                textColor={theme.palette.success.main}
                bgColor={theme.palette.success.outlinedHoverBg}
              />
            </Box>
          }>
          <ContractBasic contract={contract} />
        </ContractCard>

        <ContractCard
          containerStyles={{mt: '1em', pt: '1em'}}
          minHeight="13rem"
          header={
            <Box display="flex">
              <Typography variant="subtitle1" mr="0.5em">
                Scope of Work
              </Typography>
              <Tooltip
                title="All the work and materials that are included in the contract"
                placement="bottom-start"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'common.black',
                      '& .MuiTooltip-arrow': {
                        color: 'common.black',
                      },
                    },
                  },
                }}
                arrow>
                <ErrorOutlineIcon
                  sx={{
                    mt: '0.25em',
                    width: '1.04rem',
                    height: '1.04rem',
                    color: theme.palette.action.active,
                  }}
                />
              </Tooltip>
            </Box>
          }>
          <ContractScope />
        </ContractCard>

        <ContractCard
          containerStyles={{mt: '1em', py: '1em'}}
          header={
            <Box display="flex">
              <Typography variant="subtitle1" mr="0.5em">
                Parties
              </Typography>
              <Tooltip
                title="Entities signing the contract"
                placement="bottom-start"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'common.black',
                      '& .MuiTooltip-arrow': {
                        color: 'common.black',
                      },
                    },
                  },
                }}
                arrow>
                <ErrorOutlineIcon
                  sx={{
                    mt: '0.25em',
                    width: '1.04rem',
                    height: '1.04rem',
                    color: theme.palette.action.active,
                  }}
                />
              </Tooltip>
            </Box>
          }>
          <ContractParties
            companyName=""
            personName={contract?.serviceCompany.name}
            email=""
            partyRole="Service Company"
            partyType="Contractor"
            chipColor="info"
            chipTextColor={theme.palette.info.main}
            chipBgColor={theme.palette.info.outlinedHoverBg}
          />
          <ContractParties
            companyName=""
            personName={contract?.propertyOwner.name}
            email={contract?.propertyOwner.contact.email}
            partyRole="Property Manager"
            partyType="Customer"
            chipColor="info"
            chipTextColor={theme.palette.info.main}
            chipBgColor={theme.palette.info.outlinedHoverBg}
            containerStyle={{mt: '3em'}}
          />
        </ContractCard>
      </Grid>
      <Grid xs={4} item>
        <ContractCard
          containerStyles={{minHeight: '100%', py: '1em'}}
          header={
            <Typography variant="subtitle1">Contract Timeline</Typography>
          }>
          {unUsedContractDays > 0 && unUsedContractDays <= 30 ? (
            <Alert
              variant="filled"
              severity="warning"
              sx={{
                mb: '1em',
                background: theme.palette.warning.outlinedHoverBg,
                color: theme.palette.warning.main,
              }}>
              Contract expires in {unUsedContractDays} days!
            </Alert>
          ) : null}

          <ContractTimeline
            contractDetails={contract}
            unUsedContractDays={unUsedContractDays}
            usedContractDays={usedContractDays}
            totalContractDays={totalContractDays}
          />
        </ContractCard>
      </Grid>
    </Grid>
  );
};

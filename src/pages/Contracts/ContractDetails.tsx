import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import {ScrollableCard} from 'components/ScrollableCard';
import {useFetchContractDetails} from 'hooks/reactQuery/useContract';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useTheme from '@mui/material/styles/useTheme';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {CustomCard} from 'components/CustomCard';
import {toDate} from 'utils/datetime';
import {differenceInDays, intervalToDuration} from 'date-fns';

import {ContractBasic} from './ContractBasic';
import {ContractParties} from './ContractParties';
import {ContractCosts} from './ContractCosts';
import {ContractScope} from './ContractScope';
import {ContractPaymentDetails} from './ContractPaymentDetails';
import {ContractTimeline} from './ContractTimeline';

export const ContractDetails = () => {
  const {id: contractId} = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const {data: contractDetails, isLoading} = useFetchContractDetails(
    contractId!,
  );
  const {years, months, days} = !isLoading
    ? intervalToDuration({
        start: toDate(contractDetails?.startTime),
        end: toDate(contractDetails?.endTime),
      })
    : {years: undefined, months: undefined, days: undefined};

  const totalContractDays =
    !isLoading &&
    differenceInDays(
      toDate(contractDetails?.endTime),
      toDate(contractDetails?.startTime),
    );

  const usedContractDays =
    !isLoading &&
    differenceInDays(new Date(), toDate(contractDetails?.startTime));

  const unUsedContractDays =
    !isLoading &&
    differenceInDays(toDate(contractDetails?.endTime), new Date());

  return (
    <Box mb={5}>
      <Grid container spacing={2} sx={{mt: 2}}>
        <Grid item xs={9}>
          {unUsedContractDays > 0 && unUsedContractDays <= 30 ? (
            <Alert variant="filled" severity="warning" sx={{mb: 3}}>
              Contract expires in {unUsedContractDays} days!
            </Alert>
          ) : null}
          <ScrollableCard
            disableScroll
            minHeight="20%"
            contentHeight="100%"
            renderHeaderText={() => (
              <Box
                onClick={() => navigate(-1)}
                sx={{cursor: 'pointer', mt: 1, display: 'flex'}}
              >
                <KeyboardArrowLeftIcon
                  fontSize="large"
                  sx={{
                    fontSize: '50px',
                    color: theme.palette.action.active,
                    mr: '10px',
                  }}
                />
                <Typography variant="h4" mt="3px">
                  {contractDetails ? contractDetails?.number : null}
                </Typography>
              </Box>
            )}
          >
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <ContractBasic
                  years={years}
                  months={months}
                  days={days}
                  contractDetails={contractDetails}
                />
              </Grid>

              <Grid item xs={3}>
                <ContractCosts
                  price={contractDetails?.price}
                  currency={contractDetails?.currency}
                />
              </Grid>
            </Grid>

            <ContractParties contractDetails={contractDetails} />
          </ScrollableCard>

          <Grid container spacing={2} sx={{mt: 2}}>
            <Grid item xs={6}>
              <ContractScope />
            </Grid>

            <Grid item xs={6}>
              <ContractPaymentDetails />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <CustomCard
            containerStyles={{
              background: '#fff',
              display: 'flex',
              justifyContent: 'center',
              py: 2,
            }}
          >
            <Button variant="contained" startIcon={<FileDownloadIcon />}>
              Download Contract
            </Button>
          </CustomCard>

          <ContractTimeline
            contractDetails={contractDetails}
            unUsedContractDays={unUsedContractDays}
            usedContractDays={usedContractDays}
            totalContractDays={totalContractDays}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

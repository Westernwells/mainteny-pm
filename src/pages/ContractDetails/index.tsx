import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import {ScrollableCard} from 'components/ScrollableCard';
import {useFetchContractDetails} from 'hooks/reactQuery/useContract';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useTheme from '@mui/material/styles/useTheme';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {CustomCard} from 'components/CustomCard';
import {StatusChip} from 'components/StatusChip';
import {toDate} from 'utils/datetime';
import {differenceInDays, intervalToDuration} from 'date-fns';

import {ContractBasic} from './ContractBasic';
import {ContractParties} from './ContractParties';
import {ContractCosts} from './ContractCosts';
import {ContractScope} from './ContractScope';
import {ContractPaymentDetails} from './ContractPaymentDetails';
import {ContractTimeline} from './ContractTimeline';
import {ContractCard} from './ContractCard';

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
    <Grid
      container
      spacing={2}
      sx={{
        pb: '1em',
      }}
    >
      <Grid xs={8} item>
        <ContractCard
          minHeight="12rem"
          containerStyles={{pt: '1em'}}
          header={
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">{`#${
                contractDetails?.number || ''
              }`}</Typography>
              <StatusChip
                color="success"
                label="In Effect"
                textColor={theme.palette.success.main}
                bgColor={theme.palette.success.outlinedHoverBg}
              />
            </Box>
          }
        >
          <ContractBasic
            startTime={contractDetails?.startTime}
            endTime={contractDetails?.endTime}
            costPerYear={contractDetails?.price}
            type={contractDetails?.type}
          />
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
                arrow
              >
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
          }
        >
          <ContractScope />
        </ContractCard>

        <ContractCard
          containerStyles={{mt: '1em', pt: '1em'}}
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
                arrow
              >
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
          }
        >
          {/* contractor: contractDetails?.serviceCompany,
    customer: contractDetails?.propertyOwner, */}
          <ContractParties
            companyName={contractDetails?.serviceCompany.name}
            personName={contractDetails?.serviceCompany.name}
            email={contractDetails?.serviceCompany.contact.email}
            partyType="Contractor"
            chipColor="warning"
            chipTextColor={theme.palette.warning.main}
            chipBgColor={theme.palette.warning.outlinedHoverBg}
          />
          <ContractParties
            companyName={contractDetails?.propertyOwner.name}
            personName={contractDetails?.propertyOwner.name}
            email={contractDetails?.propertyOwner.contact.email}
            partyType="Customer"
            chipColor="info"
            chipTextColor={theme.palette.info.main}
            chipBgColor={theme.palette.info.outlinedHoverBg}
            containerStyle={{mt: '3em'}}
          />
        </ContractCard>
      </Grid>
      <Grid xs={4} item>
        <div />
      </Grid>
    </Grid>
    // <Box mb={5}>
    //   <Grid container spacing={2} sx={{mt: 2}}>
    //     <Grid item xs={9}>
    //       {unUsedContractDays > 0 && unUsedContractDays <= 30 ? (
    //         <Alert variant="filled" severity="warning" sx={{mb: 3}}>
    //           Contract expires in {unUsedContractDays} days!
    //         </Alert>
    //       ) : null}
    //       <ScrollableCard
    //         disableScroll
    //         minHeight="20%"
    //         cardHeight={500}
    //         contentHeight="100%"
    //         renderHeaderText={() => (
    //           <Box sx={{mt: 1, display: 'flex'}}>
    //             <KeyboardArrowLeftIcon
    //               onClick={() => navigate(-1)}
    //               fontSize="large"
    //               sx={{
    //                 fontSize: '50px',
    //                 color: theme.palette.action.active,
    //                 cursor: 'pointer',
    //                 mr: '10px',
    //               }}
    //             />
    //             <Typography variant="h4" mt="3px">
    //               {contractDetails ? contractDetails?.number : null}
    //             </Typography>
    //           </Box>
    //         )}
    //       >
    //         <Grid container spacing={2}>
    //           <Grid item xs={9}>
    //             <ContractBasic
    //               years={years}
    //               months={months}
    //               days={days}
    //               contractDetails={contractDetails}
    //             />
    //           </Grid>

    //           <Grid item xs={3}>
    //             <ContractCosts
    //               price={contractDetails?.price}
    //               currency={contractDetails?.currency}
    //             />
    //           </Grid>
    //         </Grid>

    //         <ContractParties contractDetails={contractDetails} />
    //       </ScrollableCard>

    //       <Grid container spacing={2} sx={{mt: 2}}>
    //         <Grid item xs={6}>
    //           <ContractScope />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <ContractPaymentDetails />
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //     <Grid item xs={3}>
    //       <CustomCard
    //         containerStyles={{
    //           background: '#fff',
    //           display: 'flex',
    //           justifyContent: 'center',
    //           py: 2,
    //         }}
    //       >
    //         <Button variant="contained" startIcon={<FileDownloadIcon />}>
    //           Download Contract
    //         </Button>
    //       </CustomCard>

    //       <ContractTimeline
    //         contractDetails={contractDetails}
    //         unUsedContractDays={unUsedContractDays}
    //         usedContractDays={usedContractDays}
    //         totalContractDays={totalContractDays}
    //       />
    //     </Grid>
    //   </Grid>
    // </Box>
  );
};

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import {grey} from '@mui/material/colors';
import ReportProblem from '@mui/icons-material/ReportProblem';
import {ContractView} from 'models/contract';
import {useTranslation} from 'react-i18next';
import {useFormatDate} from 'hooks/useFormatDate';
import {differenceInDays, isBefore} from 'date-fns';
import {toDate} from 'utils/datetime';
import {CardAlert} from 'components/CardAlert';

interface Props {
  contract?: ContractView;
}

export const ContractTimeline = ({contract}: Props) => {
  const {t} = useTranslation();
  const formatDate = useFormatDate();
  const theme = useTheme();
  const unUsedContractDays =
    contract && isBefore(new Date(), toDate(contract?.endTime))
      ? differenceInDays(toDate(contract?.endTime), new Date())
      : 0;

  return (
    <>
      {!!unUsedContractDays && (
        <CardAlert
          alertIcon={<ReportProblem />}
          message={`Contract expires in ${unUsedContractDays} days`}
          status="warning"
        />
      )}
      <Box display="flex" alignItems="center" pt="1rem">
        <Box
          sx={{
            mr: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '.75rem',
            height: '.75rem',
            borderRadius: '50%',
            backgroundColor: unUsedContractDays
              ? grey[400]
              : theme.palette.success.dark,
          }}
        />
        <Box>
          <Typography variant="subtitle1">{t('Contract ends')}</Typography>
          <Typography variant="body1">
            {formatDate(contract?.endTime)}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: '2.25rem',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '0.125em',
          marginLeft: '.375rem',
          transform: 'translateX(-50%)',
          position: 'relative',
          backgroundColor: grey[400],
        }}
      />
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            backgroundColor: unUsedContractDays
              ? theme.palette.success.dark
              : grey[400],
            mr: '1em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '.75rem',
            height: '.75rem',
            borderRadius: '50%',
          }}
        />
        <Box>
          <Typography variant="subtitle1">{t('Contract signed')}</Typography>
          <Typography variant="body1">
            {formatDate(contract?.startTime)}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

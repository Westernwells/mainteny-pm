import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {getDay, toDate} from 'utils/datetime';
import useTheme from '@mui/material/styles/useTheme';
import {ContractView} from 'models/contract';
import {CustomCard} from 'components/CustomCard';

const fields = ['Contract Type', 'Effective Dates', 'Duration', 'Status'];

interface Props {
  years?: number;
  months?: number;
  days?: number;
  contractDetails?: ContractView;
}

export const ContractBasic = ({
  years,
  months,
  days,
  contractDetails,
}: Props) => {
  const theme = useTheme();
  const basicDetails = (field: string) => {
    const renderDuration = () => (
      <Typography variant="largeBtnText" mr={2}>
        {years && years > 0 ? years : null}{' '}
        {years ? (years === 1 ? 'year' : 'years') : null}{' '}
        {months ? (months > 0 ? months : null) : null}{' '}
        {months ? (months === 1 ? 'month' : 'months') : null}{' '}
        {(!years || !months) && days ? days : null}{' '}
        {(!years || !months) && days ? (days === 1 ? 'day' : 'days') : null}
      </Typography>
    );

    switch (field) {
      case 'Contract Type':
        return (
          <Typography
            variant="largeBtnText"
            mr={2}
            sx={{textTransform: 'capitalize'}}
          >
            {contractDetails?.type.toLowerCase()}
          </Typography>
        );
      case 'Effective Dates':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {contractDetails &&
              getDay(toDate(contractDetails?.startTime), 'dd MMM YYY')}{' '}
            -{' '}
            {contractDetails &&
              getDay(toDate(contractDetails?.endTime), 'dd MMM YYY')}
          </Typography>
        );
      case 'Duration':
        return renderDuration();
      case 'Status':
        return (
          <Box>
            <Chip
              color="success"
              variant="outlined"
              sx={{
                py: 3,
                background: theme.palette.success.outlinedHoverBg,
                border: `none`,
              }}
              label={
                <Typography variant="h6" sx={{textTransform: 'capitalize'}}>
                  in effect
                </Typography>
              }
              size="medium"
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <CustomCard
      containerStyles={{
        display: 'flex',
        px: 2,
        width: '100%',
        border: 'none',
        boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.2)',
        justifyContent: 'space-between',
      }}
    >
      {fields.map((field) => (
        <Box key={`${field}-issue`} display="flex" flexDirection="column">
          <Typography
            variant="largeBtnText"
            mr={7}
            py={1}
            color="textSecondary"
          >
            {field}
          </Typography>
          <Box py={1} sx={{mt: field !== 'Status' ? '5px' : null}}>
            {basicDetails(field)}
          </Box>
        </Box>
      ))}
    </CustomCard>
  );
};

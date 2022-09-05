import useTheme from '@mui/material/styles/useTheme';
import {CardProps} from 'components/CardProps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import TodayIcon from '@mui/icons-material/Today';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ElevatorIcon from '@mui/icons-material/Elevator';
import {Grid} from '@mui/material';
import {StatusChip} from 'components/StatusChip';
import {convertToText} from 'utils/utils';
import {useTranslation} from 'react-i18next';

interface Props {
  contractStatus?: string;
  contractStatusColor: 'success' | 'error';
  type?: string;
  numberOfVisits?: number;
  costPerYear?: string | number;
  spendingLimit?: string;
  renewalPeriod?: number;
  invoiceDue?: string;
  numberOfUnits?: number;
}

export const ContractBasic = ({
  contractStatus,
  contractStatusColor,
  costPerYear,
  type,
  spendingLimit,
  invoiceDue,
  numberOfUnits,
  numberOfVisits,
  renewalPeriod,
}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  return (
    <>
      <StatusChip
        color={contractStatusColor}
        label={contractStatus}
        style={{mb: '1em', float: 'right'}}
      />
      <Grid container rowGap={2}>
        <Grid item xs={4}>
          <CardProps
            label="CONTRACT TYPE"
            bodyTextVariant="subtitle1"
            icon={<FileCopyIcon color="info" />}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            bodyText={convertToText(type || '-')}
            bodyStyle={{textTransform: 'uppercase'}}
          />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            label="NUMBER OF VISITS"
            bodyTextVariant="subtitle1"
            icon={<TodayIcon color="info" />}
            containerStyles={{mr: '0.5em'}}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            bodyText={`${numberOfVisits}` || '-'}
          />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            label="PRICE/YEAR (excl VAT)"
            bodyTextVariant="subtitle1"
            icon={<EuroSymbolIcon color="info" />}
            containerStyles={{mr: '0.5em'}}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            bodyText={`${costPerYear}` || '-'}
          />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            label="SPENDING LIMIT"
            bodyTextVariant="subtitle1"
            icon={<EuroSymbolIcon color="info" />}
            containerStyles={{mr: '0.5em'}}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            bodyText={spendingLimit || '-'}
          />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            label="RENEWAL PERIOD"
            bodyTextVariant="subtitle1"
            icon={<CalendarViewWeekIcon color="info" />}
            containerStyles={{mr: '0.5em'}}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            bodyText={
              renewalPeriod
                ? renewalPeriod > 1
                  ? `${renewalPeriod} months`
                  : `${renewalPeriod} month`
                : '0'
            }
          />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            label="INVOICE DUE"
            bodyTextVariant="subtitle1"
            icon={<DateRangeIcon color="info" />}
            containerStyles={{mr: '0.5em'}}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            bodyText={typeof invoiceDue === 'string' ? t(invoiceDue) : '-'}
          />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            label="NUMBER OF UNITS"
            bodyTextVariant="subtitle1"
            icon={<ElevatorIcon color="info" />}
            containerStyles={{mr: '0.5em'}}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            bodyText={`${numberOfUnits}` || '-'}
          />
        </Grid>
      </Grid>
    </>
  );
};

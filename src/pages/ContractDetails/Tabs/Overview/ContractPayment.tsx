import useTheme from '@mui/material/styles/useTheme';
import PersonIcon from '@mui/icons-material/Person';
import MoneyIcon from '@mui/icons-material/Money';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {CardProps} from 'components/CardProps';

import {convertToText} from 'utils/utils';

interface Props {
  name?: string;
  iban?: string;
  bic?: string;
}

export const ContractPayment = ({name, iban, bic}: Props) => {
  const theme = useTheme();
  return (
    <>
      <CardProps
        label="NAME"
        bodyTextVariant="subtitle1"
        icon={<PersonIcon color="info" />}
        iconBackground={theme.palette.info.outlinedHoverBg}
        iconMaxHeight="3rem"
        bodyText={convertToText(name || '-')}
      />
      <CardProps
        label="IBAN"
        bodyTextVariant="subtitle1"
        icon={<MoneyIcon color="info" />}
        iconBackground={theme.palette.info.outlinedHoverBg}
        iconMaxHeight="3rem"
        bodyText={convertToText(iban || '-')}
        containerStyles={{my: '1.5em'}}
      />
      <CardProps
        label="BIC"
        bodyTextVariant="subtitle1"
        icon={<AccountBalanceIcon color="info" />}
        iconBackground={theme.palette.info.outlinedHoverBg}
        iconMaxHeight="3rem"
        bodyText={convertToText(bic || '-')}
      />
    </>
  );
};

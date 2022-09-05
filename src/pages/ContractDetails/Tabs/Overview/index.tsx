import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {InfoCard} from 'components/InfoCard';
import {useUserSession} from 'hooks/reactQuery/useUserSession';
import {useDownloadUrl} from 'hooks/reactQuery/useDownloadUrl';
import {ContractView} from 'models/contract';
import {formatCurrency, formatNetAmount} from 'utils/currency';
import {convertToText} from 'utils/utils';
import {useTranslation} from 'react-i18next';
import {ContractBasic} from './ContractBasic';
import {ContractParties} from './ContractParties';
import {ContractPayment} from './ContractPayment';
import {ContractTimeline} from './ContractTimeline';

interface Props {
  contract?: ContractView;
  downloadUrl?: any[];
  fileName?: string;
}

export const Overview = ({contract, downloadUrl, fileName}: Props) => {
  const {t} = useTranslation();
  const {user} = useUserSession();
  const serviceCompanyLogoPath =
    user?.userAccount.serviceCompany.settings.whiteLabel?.logoPath ?? '';
  const {data: serviceCompanyLogoUrl} = useDownloadUrl(
    serviceCompanyLogoPath ? [serviceCompanyLogoPath] : [],
  );

  return contract ? (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          pb: '1em',
        }}>
        <Grid xs={8} item>
          <Grid container spacing={2}>
            <Grid item>
              <InfoCard
                header={
                  <Typography variant="subtitle1">{contract.number}</Typography>
                }
                showHeaderBackground>
                <ContractBasic
                  contractStatus={convertToText(
                    contract?.status === 'VALID' ? 'ACTIVE' : contract.status,
                  )}
                  contractStatusColor={
                    contract?.status === 'VALID' ? 'success' : 'error'
                  }
                  numberOfVisits={contract?.visitsNumber}
                  costPerYear={
                    formatNetAmount(contract.additionalInfo?.price) || '-'
                  }
                  spendingLimit={formatCurrency(
                    contract ? contract.spendingLimit : 0,
                    {
                      currency: contract?.currency || 'EUR',
                    },
                  )}
                  renewalPeriod={contract?.additionalInfo?.renewalTerms}
                  invoiceDue={convertToText(
                    contract?.additionalInfo?.invoiceDue || '',
                  )}
                  numberOfUnits={contract?.elevators?.length}
                  type={contract?.type.toLowerCase()}
                />
              </InfoCard>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item sx={{bgColor: 'green'}} xs={12} md={9}>
                  <InfoCard
                    header={
                      <Typography variant="subtitle1">
                        {t('Contract Parties')}
                      </Typography>
                    }
                    showHeaderBackground>
                    <ContractParties
                      name={contract.serviceCompany.name}
                      occupation="Service Company"
                      address={
                        user?.userAccount.serviceCompany.postalAddress?.fullName
                      }
                      phoneNumber={
                        user?.userAccount.serviceCompany.contact.phone
                      }
                      partyType="CONTRACTOR"
                      logoUrl={
                        serviceCompanyLogoUrl ? serviceCompanyLogoUrl[0] : ''
                      }
                    />
                    <ContractParties
                      name={contract?.propertyOwner.name}
                      occupation="Property Manager"
                      address={contract?.propertyOwner.postalAddress.fullName}
                      phoneNumber={contract?.propertyOwner.contact.phone}
                      partyType="CUSTOMER"
                    />
                  </InfoCard>
                </Grid>
                <Grid item xs={12} md={3}>
                  <InfoCard
                    containerStyles={{height: '100%'}}
                    bodyContainerStyle={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '1em',
                      flexDirection: 'column',
                    }}
                    header={
                      <Typography variant="subtitle1">
                        {t('Document')}
                      </Typography>
                    }
                    showHeaderBackground>
                    <Box
                      border="1px solid"
                      borderRadius=".25em"
                      borderColor="text.secondary"
                      color="text.secondary"
                      p="1em 2em"
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '.5em',
                        flexDirection: 'column',
                        cursor: 'pointer',
                      }}>
                      <FileCopyIcon
                        fontSize="large"
                        onClick={() => {
                          if (downloadUrl && downloadUrl.length > 0)
                            window.open(downloadUrl[0], '_blank');
                        }}
                      />
                      <Typography variant="subtitle2" color="textSecondary">
                        File.pdf
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      textAlign="center">
                      {fileName}
                    </Typography>
                  </InfoCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={4} item>
          <InfoCard
            header={
              <Typography variant="subtitle1">
                {t('Contract Timeline')}
              </Typography>
            }
            containerStyles={{height: '100%'}}
            showHeaderBackground>
            <ContractTimeline contract={contract} />
          </InfoCard>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={8}>
          <InfoCard
            header={
              <Typography variant="subtitle1">
                {t('Payment Details')}
              </Typography>
            }
            showHeaderBackground>
            <ContractPayment
              name={contract?.propertyOwner.name}
              iban={
                user?.userAccount.serviceCompany.settings?.paymentInfo?.iban ||
                '-'
              }
              bic={
                user?.userAccount.serviceCompany.settings?.paymentInfo?.bic ||
                '-'
              }
            />
          </InfoCard>
        </Grid>
      </Grid>
    </>
  ) : null;
};

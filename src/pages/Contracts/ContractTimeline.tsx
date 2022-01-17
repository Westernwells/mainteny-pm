import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import useTheme from '@mui/material/styles/useTheme';
import {CustomCard} from 'components/CustomCard';
import {getDay, toDate} from 'utils/datetime';
import {ContractView} from 'models/contract';

interface Props {
  contractDetails?: ContractView;
  usedContractDays: number | false;
  unUsedContractDays: number | false;
  totalContractDays: number | false;
}

export const ContractTimeline = ({
  contractDetails,
  totalContractDays,
  usedContractDays,
  unUsedContractDays,
}: Props) => {
  const theme = useTheme();
  return (
    <CustomCard
      containerStyles={{
        background: '#fff',
        mt: 2,
        px: 2,
        minHeight: '50vh',
      }}
    >
      <Box width="100%" mt={1}>
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
          Timeline
        </Typography>
      </Box>

      <Box display="flex" mt={2}>
        <Box
          sx={{
            border: `2px solid #00D68F`,
            mr: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
          }}
        >
          <AssignmentOutlinedIcon color="success" />
        </Box>
        <Box>
          <Typography variant="subtitle1">Contract signed</Typography>
          <Typography variant="body1">
            {getDay(contractDetails?.startTime, 'dd MMM YYY')}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          height: '20vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '3rem',
        }}
      >
        <Box
          sx={{
            borderLeft: `3px solid ${theme.palette.primary.main}`,
            minHeight:
              usedContractDays && totalContractDays
                ? `${(usedContractDays / totalContractDays) * 100}%`
                : null,
          }}
        />
        <Box
          sx={{
            borderLeft: '3px dotted green',
            height:
              unUsedContractDays && totalContractDays
                ? `${(unUsedContractDays / totalContractDays) * 100}%`
                : null,
          }}
        />
      </Box>

      <Box display="flex">
        <Box
          sx={{
            border: `3px solid ${theme.palette.text.secondary}`,
            mr: 2,
            py: 2,
            px: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
          }}
        >
          <DownloadDoneIcon sx={{color: theme.palette.text.secondary}} />
        </Box>
        <Box>
          <Typography variant="subtitle1">Contract ends</Typography>
          <Typography variant="body1">
            {getDay(contractDetails?.endTime, 'dd MMM YYY')}
          </Typography>
        </Box>
      </Box>
    </CustomCard>
  );
};

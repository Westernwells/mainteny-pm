import {SvgIconProps} from '@mui/material';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/system';

interface HistoryInfoArgs {
  title: string;
  value: string;
  Icon: (props: SvgIconProps) => JSX.Element;
}

const HistoryInfo = ({Icon, title, value}: HistoryInfoArgs) => (
  <Box
    display="flex"
    flexDirection="row"
    alignItems="center"
    justifyContent="center"
  >
    <Box
      alignItems="center"
      justifyContent="center"
      sx={{p: 2, backgroundColor: 'secondary'}}
    >
      <Icon />
    </Box>

    <Box display="flex" flexDirection="column">
      <Typography variant="tableHeaderText">{title}</Typography>
      <Typography variant="subtitle1">{value}</Typography>
    </Box>
  </Box>
);

export {HistoryInfo};

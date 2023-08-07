import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect} from 'react';
import useTheme from '@mui/material/styles/useTheme';
import {useNavigate} from 'react-router-dom';
import {CustomButtonUnstyled} from 'components/CustomButtonUnstyled';
import {ReactComponent as PersonSpannerIcon} from 'assets/icons/PersonSpanner.svg';
import {Mixpanel} from 'mixpanel/mixpanel';
import {mixpanelEvents} from 'mixpanel/constants';

export const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    Mixpanel.identifyAndTrack(mixpanelEvents['404_PAGE_SHOWN']);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh">
      <Box>
        <PersonSpannerIcon />
      </Box>
      <Box>
        <Typography variant="h4">
          Sorry, this page doesn&lsquo;t exist
        </Typography>
      </Box>
      <CustomButtonUnstyled
        label="Home"
        size="small"
        onClick={async () => navigate('/')}
        styles={{
          background: theme.palette.primary.main,
          color: '#fff',
          mt: '2em',
          ml: '1em',
          '&:hover': {
            background: theme.palette.primary.main,
          },
        }}
      />
    </Box>
  );
};

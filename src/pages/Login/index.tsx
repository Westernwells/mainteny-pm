import {Container, Grid, Paper, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Box} from '@mui/system';
import {ReactComponent as PolygonTop} from '../../assets/icons/polygon-top.svg';
import {ReactComponent as PolygonBottom} from '../../assets/icons/polygon-bottom.svg';
// import loginBg from '../../assets/images/login-bg.png';

const useStyles = makeStyles({
  leftBackground: {
    background: 'linear-gradient(180deg, #095369 0%, #043146 100%)',
  },
  leftContentText: {
    color: '#fff',
  },
});

export const Login = () => {
  const classes = useStyles();
  return (
    <Box display="flex" height="100vh">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        className={classes.leftBackground}
        width="38vw"
        height="100%"
      >
        <Box ml={15}>
          <PolygonTop width="115%" />
        </Box>

        <Box>
          <Typography sx={{color: '#fff'}} variant="h2" textAlign="center">
            Mainteny CX
          </Typography>

          <Typography
            color="textSecondary"
            variant="h6"
            width="100%"
            textAlign="center"
            mt={3}
          >
            Transparent, fast & real-time communication with your maintenance
            company
          </Typography>
        </Box>
        <Box>
          <PolygonBottom width="100%" />
        </Box>
      </Box>

      <Box>
        <Typography variant="h1">Login</Typography>
      </Box>
    </Box>
  );
};

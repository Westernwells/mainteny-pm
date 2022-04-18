import React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import {ReactComponent as PolygonTop} from '../assets/icons/polygonTop.svg';
import {ReactComponent as PolygonBottom} from '../assets/icons/polygonBottom.svg';
import {ReactComponent as Logo} from '../assets/icons/Logo.svg';

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles({
  leftBackground: {
    background: 'linear-gradient(180deg, #095369 0%, #043146 100%)',
  },
  leftContentText: {
    color: '#fff',
  },
});

export const AuthLayout = ({children}: Props) => {
  const classes = useStyles();

  return (
    <Box display="flex" minHeight="100vh" sx={{backgroundColor: '#fff'}}>
      <Box
        className={classes.leftBackground}
        width="38vw"
        minHeight="100%"
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center">
        <Box style={{position: 'absolute', top: 0, left: 0, right: 0}}>
          <PolygonTop width="100%" />
        </Box>

        <Box>
          <Box marginBottom="5rem">
            <Typography variant="h3" color="#fff" textAlign="center">
              {' '}
              Mainteny
            </Typography>
            <Typography color="#fff" variant="h4" textAlign="center">
              Property Manager Portal
            </Typography>
          </Box>
          <Typography
            color="textSecondary"
            variant="h6"
            width="100%"
            textAlign="center"
            paddingLeft={4}
            paddingRight={4}>
            All your physical assets and their maintenance data unified to
            provide you transparency, easier reporting!
          </Typography>
        </Box>
        <Box style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
          <PolygonBottom width="100%" />
        </Box>
      </Box>

      <Box
        display="flex"
        flexGrow={1}
        justifyContent="center"
        alignItems="center">
        <Box>
          <Box display="flex" justifyContent="center">
            <Logo />
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

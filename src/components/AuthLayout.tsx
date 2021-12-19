import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import {useFormik} from 'formik';
import * as Yup from 'yup';
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
    <Box display="flex" height="100vh" sx={{backgroundColor: '#fff'}}>
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
          <Typography color="#fff" variant="h2" textAlign="center">
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

      <Box ml={10} flexGrow={1} pt={27}>
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

import {useState} from 'react';
import {Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Box} from '@mui/system';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {ReactComponent as PolygonTop} from '../../assets/icons/polygonTop.svg';
import {ReactComponent as PolygonBottom} from '../../assets/icons/polygonBottom.svg';
import {ReactComponent as Logo} from '../../assets/icons/Logo.svg';
import {LoginForm} from './components/LoginForm';
import {PasswordResetForm} from './components/ResetPasswordForm';
import {ReactComponent as CheckMark} from '../../assets/icons/CheckMark.svg';

const useStyles = makeStyles({
  leftBackground: {
    background: 'linear-gradient(180deg, #095369 0%, #043146 100%)',
  },
  leftContentText: {
    color: '#fff',
  },
});

const validationSchema = Yup.object().shape({
  resetPassword: Yup.string()
    .required('field is required')
    .min(6, 'must be atleast 6 characters')
    .matches(/\d/, 'must contain 1 digit'),

  password: Yup.string().required('field is required'),
});

export const Login = () => {
  const classes = useStyles();
  const [resetPasswordDone, setPasswordResetDone] = useState<boolean>();
  const formik = useFormik({
    initialValues: {
      resetPassword: '',
      password: '',
      confirmResetPassword: '',
      email: '',
    },
    onSubmit: () => {
      // (values) => {}
    },
    validationSchema,
  });

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

      <Box ml={10} flexGrow={1} pt={14}>
        <Box>
          <Box display="flex" justifyContent="center">
            <Logo />
          </Box>
          {resetPasswordDone ? (
            <Box display="flex" justifyContent="center">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                mr={2}
              >
                <CheckMark />
              </Box>
              <Typography variant="h4" mt={7}>
                Awesome, password created successfully
              </Typography>
            </Box>
          ) : (
            <Typography variant="h4" mt={7} textAlign="center">
              Hi John, let’s activate your account
            </Typography>
          )}

          {resetPasswordDone ? (
            <Typography variant="h6" mt={5} textAlign="center">
              Login
            </Typography>
          ) : (
            <Typography variant="h6" mt={5} textAlign="center">
              Set a new password
            </Typography>
          )}

          {resetPasswordDone ? (
            <LoginForm
              handleChange={formik.handleChange}
              handleSubmit={formik.handleSubmit}
              password={formik.values.password}
              passwordError={formik.errors.password}
              handleBlur={formik.handleBlur}
              email={formik.values.email}
              emailError={formik.errors.email}
            />
          ) : (
            <PasswordResetForm
              handleChange={formik.handleChange}
              handleSubmit={formik.handleSubmit}
              password={formik.values.resetPassword}
              passwordError={formik.errors.resetPassword}
              handleBlur={formik.handleBlur}
              confirmPassword={formik.values.confirmResetPassword}
              setPasswordResetDone={setPasswordResetDone}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

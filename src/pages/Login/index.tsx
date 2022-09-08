import {useTranslation} from 'react-i18next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useFormik} from 'formik';
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';
import * as Yup from 'yup';

import {ReactComponent as CheckMark} from 'assets/icons/CheckMark.svg';
import {useAuth} from 'hooks/useAuth';
import {Mixpanel} from 'mixpanel/mixpanel';
import {mixpanelEvents} from 'mixpanel/constants';
import {AuthLayout} from 'components/AuthLayout';
import {LoginForm} from './components/LoginForm';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string().required('field is required'),
});

export const Login = () => {
  const {t} = useTranslation();
  const {search} = useLocation();
  const {authType} = queryString.parse(search);
  const {signin, loading} = useAuth();

  const formik = useFormik({
    initialValues: {
      password: '',
      email: localStorage.getItem('email') || '',
    },
    onSubmit: (values) => {
      localStorage.setItem('email', values.email);
      Mixpanel.identifyAndTrack(mixpanelEvents.LOGIN);
      signin(values.email, values.password);
    },
    validationSchema,
  });

  return (
    <AuthLayout>
      {authType ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
          <Box display="flex" mr={2}>
            <CheckMark />
          </Box>
          <Typography variant="h4" component="div">
            {authType === 'reset'
              ? t('Password created successfully')
              : authType === 'accountActivated'
              ? t('Account activated successfully')
              : ''}
          </Typography>
        </Box>
      ) : null}

      <Typography variant="h6" mt={5} mb="2.5rem" textAlign="center">
        Login
      </Typography>

      <LoginForm
        handleChange={formik.handleChange}
        handleSubmit={formik.handleSubmit}
        password={formik.values.password}
        passwordError={formik.errors.password}
        handleBlur={formik.handleBlur}
        email={formik.values.email}
        emailError={formik.errors.email}
        emailTouched={formik.touched.email}
        loading={loading}
      />
    </AuthLayout>
  );
};

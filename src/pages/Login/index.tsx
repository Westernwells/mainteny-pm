import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useFormik} from 'formik';
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';
import * as Yup from 'yup';
import {LoginForm} from './components/LoginForm';
import {ReactComponent as CheckMark} from '../../assets/icons/CheckMark.svg';
import {AuthLayout} from '../../components/AuthLayout';

interface Props {
  startPageLoad: () => void;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string().required('field is required'),
});

export const Login = ({startPageLoad}: Props) => {
  const {search} = useLocation();
  const {authType} = queryString.parse(search);

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    onSubmit: (value) => {
      console.log(value, '?????????>>>>>.');
      // (values) => {}
    },
    validationSchema,
  });

  return (
    <AuthLayout>
      {authType === 'reset' ? (
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
      ) : null}

      <Typography variant="h6" mt={5} textAlign="center">
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
        startPageLoad={startPageLoad}
      />
    </AuthLayout>
  );
};

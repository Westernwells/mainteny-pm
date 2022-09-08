import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'notistack';
import {useFormik} from 'formik';
import {useLocation, useNavigate} from 'react-router-dom';
import queryString from 'query-string';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import ArrowForward from '@mui/icons-material/ArrowForward';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';

import {AuthLayout} from 'components/AuthLayout';
import {axiosClient} from 'utils/axios-utils';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('This field is required')
    .test(
      'password',
      'Invalid password',
      (value = '') =>
        value.length >= 8 &&
        !!value.match(/[!@#$%^&*(),.?":{}|<>_]/g) &&
        !!value.match(/\d/),
    ),
  confirmPassword: Yup.string()
    .required('This field is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

export const Invitation = () => {
  const {t} = useTranslation();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const {search} = useLocation();
  const {token} = queryString.parse(search);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const verify = async (password: string): Promise<void> => {
    setLoading(true);
    try {
      const {status} = await axiosClient.post(
        '/api/invitations/propertyContactPerson',
        {token, password},
      );
      setLoading(false);

      if (status === 200) {
        enqueueSnackbar('Account activated successfully', {
          variant: 'success',
        });
        navigate('/login?authType=accountActivated');
      }
    } catch (error: any) {
      if (error?.response.status === 400) {
        enqueueSnackbar('The token is invalid', {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(
          'Sorry, we failed to fulfill the request at this time. Please try again.',
          {
            variant: 'error',
          },
        );
      }
      setLoading(false);
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => verify(values.password),
    validationSchema,
  });

  return (
    <AuthLayout>
      <Typography variant="h4" py={5} textAlign="center">
        {t('Hi, let’s activate your account')}
      </Typography>

      <Typography variant="h6" pb="2.5rem" textAlign="center">
        {t('Set a new password')}
      </Typography>

      <Box display="flex" justifyContent="center" width="100%">
        <form style={{width: '18rem'}} onSubmit={formik.handleSubmit}>
          <TextField
            id="password"
            name="password"
            label="Password"
            size="medium"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            error={!!(formik.touched.password && formik.errors.password)}
            helperText={
              formik.touched.password && formik.errors.password
                ? t(formik.errors.password)
                : ''
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{cursor: 'pointer'}}>
                  <RemoveRedEye />
                </InputAdornment>
              ),
            }}
          />

          <Box mt={0.5} display="flex">
            <CheckCircleRounded
              fontSize="small"
              color={
                formik.values.password.length >= 8 ? 'success' : 'disabled'
              }
            />
            <Typography
              variant="caption"
              ml={1}
              color={
                formik.values.password.length >= 8
                  ? 'text.primary'
                  : 'text.secondary'
              }>
              {t('8 characters')}
            </Typography>
          </Box>
          <Box mt={0.5} display="flex">
            <CheckCircleRounded
              fontSize="small"
              color={
                formik.values.password.match(/[!@#$%^&*(),.?":{}|<>_]/g)
                  ? 'success'
                  : 'disabled'
              }
            />
            <Typography
              variant="caption"
              ml={1}
              color={
                formik.values.password.match(/[!@#$%^&*(),.?":{}|<>_]/g)
                  ? 'text.primary'
                  : 'text.secondary'
              }>
              {t('1 symbol')}
            </Typography>
          </Box>
          <Box mt={0.5} display="flex">
            <CheckCircleRounded
              fontSize="small"
              color={
                formik.values.password.match(/\d/) ? 'success' : 'disabled'
              }
            />
            <Typography
              variant="caption"
              ml={1}
              color={
                formik.values.password.match(/\d/)
                  ? 'text.primary'
                  : 'text.secondary'
              }>
              {t('1 number')}
            </Typography>
          </Box>

          <TextField
            sx={{marginTop: 3}}
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            size="medium"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            error={
              !!(
                formik.touched.confirmPassword && formik.errors.confirmPassword
              )
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? t(formik.errors.confirmPassword)
                : ''
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{cursor: 'pointer'}}>
                  <RemoveRedEye />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            disabled={
              !!(
                !formik.values.password ||
                !formik.values.confirmPassword ||
                formik.errors.password ||
                formik.errors.confirmPassword ||
                loading
              )
            }
            sx={{marginTop: 5, width: '100%'}}
            variant="contained"
            size="large"
            endIcon={
              loading ? (
                <CircularProgress size={20} sx={{color: 'gray'}} />
              ) : (
                <ArrowForward />
              )
            }>
            {t('Next')}
          </Button>
        </form>
      </Box>
    </AuthLayout>
  );
};

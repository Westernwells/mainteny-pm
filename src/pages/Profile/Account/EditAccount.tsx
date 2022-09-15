import {useState} from 'react';
import {FormikProps} from 'formik';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import {FormInput} from 'components/form/FormInput';
import {AccountFormModel} from './model';

interface Props {
  formik: FormikProps<AccountFormModel>;
}

export const EditAccount = ({formik}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const defaultProps = {
    InputLabelProps: {shrink: true},
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  return (
    <Grid container sx={{mt: '0.5em'}} component="form" spacing={2}>
      <Grid item xs={12}>
        <FormInput
          props={{
            size: 'small',
            label: 'Email',
            name: 'email',
            value: formik.values.email,
            sx: {mb: '1em'},
            disabled: true,
            ...defaultProps,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          props={{
            type: showPassword ? 'text' : 'password',
            size: 'small',
            placeholder: '*************',
            label: 'Old Password',
            name: 'oldPassword',
            helperText: formik.touched.oldPassword && formik.errors.oldPassword,
            error: !!formik.errors.oldPassword && formik.touched.oldPassword,
            required: true,
            value: formik.values.oldPassword,
            sx: {mb: '1em'},
            InputProps: {
              startAdornment: (
                <InputAdornment
                  position="start"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{cursor: 'pointer'}}>
                  <RemoveRedEye />
                </InputAdornment>
              ),
            },
            ...defaultProps,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          props={{
            type: showPassword ? 'text' : 'password',
            size: 'small',
            placeholder: '*************',
            label: 'New Password',
            name: 'newPassword',
            helperText: formik.touched.newPassword && formik.errors.newPassword,
            error: !!formik.errors.newPassword && formik.touched.newPassword,
            required: true,
            value: formik.values.newPassword,
            sx: {mb: '1em'},
            InputProps: {
              startAdornment: (
                <InputAdornment
                  position="start"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{cursor: 'pointer'}}>
                  <RemoveRedEye />
                </InputAdornment>
              ),
            },
            ...defaultProps,
          }}
        />
      </Grid>
    </Grid>
  );
};

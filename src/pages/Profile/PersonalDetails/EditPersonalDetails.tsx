import {FormikProps} from 'formik';
import Grid from '@mui/material/Grid';
import {FormInput} from 'components/form/FormInput';
import {FormSelect} from 'components/form/FormSelect';
import {PersonalDetailsFormModel, roles} from './model';

interface Props {
  formik: FormikProps<PersonalDetailsFormModel>;
}

export const EditPersonalDetails = ({formik}: Props) => {
  const defaultProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  return (
    <Grid container sx={{mt: '0.5em'}} component="form" spacing={2}>
      <Grid item xs={12}>
        <FormInput
          props={{
            size: 'small',
            label: 'Name',
            name: 'name',
            helperText: formik.touched.name && formik.errors.name,
            error: !!formik.errors.name && formik.touched.name,
            required: true,
            value: formik.values.name,
            sx: {mb: '1em'},
            InputLabelProps: {shrink: true},
            ...defaultProps,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormSelect
          labelId="roleSelect-label"
          label="Role"
          options={roles.map(({label, value}) => ({
            label,
            value,
          }))}
          selectProps={{
            id: 'roleSelect',
            value: formik.values.role,
            error: !!(formik.touched.role && formik.errors.role),
            name: 'role',
            sx: {mb: '1em'},
            ...defaultProps,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          props={{
            type: 'tel',
            size: 'small',
            placeholder: '+49***********',
            label: 'Phone',
            name: 'phone',
            helperText: formik.touched.phone && formik.errors.phone,
            error: !!formik.errors.phone && formik.touched.phone,
            required: true,
            value: formik.values.phone,
            sx: {mb: '1em'},
            InputLabelProps: {shrink: true},
            ...defaultProps,
          }}
        />
      </Grid>
    </Grid>
  );
};

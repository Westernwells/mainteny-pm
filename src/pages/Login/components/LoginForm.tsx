import React from 'react';
import {useNavigate} from 'react-router-dom';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EmailSharp from '@mui/icons-material/EmailSharp';

interface Props {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  email: string;
  emailTouched: boolean | undefined;
  emailError: string | undefined;
  password: string;
  passwordError: string | undefined;
  startPageLoad: () => void;
}

export const LoginForm = ({
  handleSubmit,
  handleChange,
  password,
  passwordError,
  email,
  emailError,
  handleBlur,
  emailTouched,
  startPageLoad,
}: Props) => {
  const navigate = useNavigate();
  return (
    <Box mt={3} display="flex" justifyContent="center" width="100%">
      <form style={{width: '34%'}} onSubmit={handleSubmit}>
        <TextField
          sx={{}}
          id="email"
          name="email"
          label="Email address"
          size="medium"
          fullWidth
          type="email"
          error={!!(emailTouched && emailError)}
          helperText={emailTouched && emailError ? emailError : ''}
          onChange={handleChange}
          onBlur={handleBlur}
          value={email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailSharp />
              </InputAdornment>
            ),
          }}
        />
        <Box>
          <TextField
            sx={{marginTop: 4}}
            id="password"
            name="password"
            label="Password"
            size="medium"
            fullWidth
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RemoveRedEye />
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Button
              variant="text"
              color="info"
              sx={{textTransform: 'capitalize'}}
            >
              Forgot Password?
            </Button>
          </Box>
        </Box>

        <Button
          onClick={() => {
            startPageLoad();
            navigate('/units');
          }}
          disabled={!!(!password || !email || emailError || passwordError)}
          sx={{marginTop: 5, width: '100%'}}
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

import {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';
import {BackAction} from 'components/BackAction';
import {SettingCard} from './SettingCard';
import {FormTextInput} from './FormTextInput';
import {BottomDrawer} from './BottomDrawer';
import {user} from './dummyData';

export const MySettings = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
    <Box sx={{mb: 2, mt: 12, px: 4}}>
      <BackAction label="My Settings" />
      <Grid
        columnSpacing={2}
        sx={{
          width: '991px',
          mx: 'auto',
          mt: '2em',
          mb: '7em',
        }}
        container
      >
        <Grid xs={7} item>
          <Box display="flex" flexDirection="column" gap={2}>
            <SettingCard header="Personal Details">
              <Box display="flex" gap={4}>
                <Avatar
                  alt={user.personal.fullName}
                  src={user.personal.avatar}
                  variant="circular"
                  sx={{width: '120px', height: '120px', aspectRatio: '1'}}
                />
                <Box flexGrow={1}>
                  <FormTextInput
                    setDrawerOpen={setDrawerOpen}
                    label="Name"
                    defaultValue={user.personal.fullName}
                  />
                  <FormTextInput
                    setDrawerOpen={setDrawerOpen}
                    label="Designation"
                    defaultValue={user.personal.designation}
                    disabled
                  />
                  <FormTextInput
                    setDrawerOpen={setDrawerOpen}
                    label="Phone"
                    defaultValue={user.personal.phone}
                  />
                </Box>
              </Box>
            </SettingCard>
            <SettingCard header="Language & Region">
              <FormTextInput
                setDrawerOpen={setDrawerOpen}
                label="Language"
                defaultValue={user.locale.language}
              />
              <FormTextInput
                setDrawerOpen={setDrawerOpen}
                label="Timezone"
                defaultValue={user.locale.timezone}
              />
            </SettingCard>
          </Box>
        </Grid>
        <Grid xs={5} item>
          <Box display="flex" flexDirection="column" gap={2}>
            <SettingCard header="Account">
              <FormTextInput
                setDrawerOpen={setDrawerOpen}
                label="Email"
                defaultValue={user.account.email}
                type="email"
                disabled
              />
              <Typography
                variant="helperText"
                sx={{color: theme.palette.secondary.main, py: '0'}}
              >
                Cannot change email as it is tied to the account
              </Typography>
              <FormTextInput
                setDrawerOpen={setDrawerOpen}
                label="Password"
                defaultValue={user.account.password}
                type="password"
              />
            </SettingCard>
            <SettingCard header="Date Format">
              <FormControl onChange={() => setDrawerOpen(true)}>
                <FormLabel id="date-format-radio-buttons-group" />
                <RadioGroup
                  aria-labelledby="date-format-radio-buttons-group"
                  defaultValue="dd MM yyyy"
                  name="radio-buttons-group"
                >
                  {user.dateFormat.available.map((date) => (
                    <FormControlLabel
                      key={date.format}
                      value={date.format}
                      control={<Radio color="secondary" />}
                      label={`${date.format} - ${date.example}`}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </SettingCard>
          </Box>
        </Grid>
      </Grid>
      <BottomDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </Box>
  );
};

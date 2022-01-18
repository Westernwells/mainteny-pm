import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface Props {
  disabled: boolean;
  handleCancel: () => void;
}

export const LogIssueAction = ({disabled, handleCancel}: Props) => (
  <Box
    sx={{
      py: 4,
      display: 'flex',
      justifyContent: 'flex-end',
      pr: 3,
      boxShadow:
        '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
    }}
  >
    <Button size="large" variant="outlined" sx={{mr: 2}} onClick={handleCancel}>
      Cancel
    </Button>
    <Button disabled={disabled} type="submit" size="large" variant="contained">
      Submit
    </Button>
  </Box>
);

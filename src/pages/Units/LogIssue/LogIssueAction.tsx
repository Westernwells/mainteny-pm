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
      justifyContent: 'flex-start',
      pl: 3,
    }}>
    <Button
      size="small"
      variant="outlined"
      sx={{mr: 2, px: '6em'}}
      onClick={handleCancel}>
      Cancel
    </Button>
    <Button
      disabled={disabled}
      type="submit"
      size="small"
      sx={{px: '6em'}}
      variant="contained">
      Submit
    </Button>
  </Box>
);

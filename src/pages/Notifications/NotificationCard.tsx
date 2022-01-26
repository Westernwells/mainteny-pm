import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Button from '@mui/material/Button';

export const NotificationCard = () => {
  const theme = useTheme();
  return (
    <Box
      // width="80vw"
      mx="auto"
      mt={2}
      sx={{
        backgroundColor: '#fff',
        py: 3,
        boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.2)',
        borderRadius: '4px',
        px: 3,
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <Box
            mr={3}
            flexGrow={1}
            sx={{
              background: theme.palette.info.outlinedHoverBg,
              borderRadius: 10,
              padding: '11px',
              width: 45,
              height: 45,
            }}
          >
            <FileCopyIcon />
          </Box>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography variant="body1">Contract expiring soon!</Typography>
            <Typography
              variant="body1"
              sx={{color: theme.palette.text.secondary}}
            >
              Your annual maintenance contract with AstraLifts is expiring in 3
              days
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="helperText"
          mt={1}
          color={theme.palette.text.secondary}
          minWidth="12ch"
          textAlign="right"
        >
          3 min ago
        </Typography>
      </Box>
      <Box ml={11}>
        <Box mt={6} display="flex" justifyContent="space-between">
          <Button
            size="small"
            sx={{backgroundColor: theme.palette.primary.outlinedHoverBg}}
          >
            <Typography
              variant="smallBtnText"
              sx={{
                color: theme.palette.primary.main,
                textTransform: 'capitalize',
                px: 0.5,
              }}
            >
              View Contract
            </Typography>
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: theme.palette.error.light,
              borderRadius: '16px',
              '&:hover': {
                backgroundColor: theme.palette.error.light,
              },
            }}
          >
            <Typography
              variant="smallBtnText"
              sx={{
                color: theme.palette.primary.main,
                textTransform: 'capitalize',
              }}
            >
              Contrat Expiry
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

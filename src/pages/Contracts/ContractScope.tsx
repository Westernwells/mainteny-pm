import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import {CustomCard} from 'components/CustomCard';

export const ContractScope = () => {
  const theme = useTheme();
  return (
    <CustomCard containerStyles={{background: '#fff', px: 2}}>
      <Box width="100%" mt={1}>
        <Typography
          variant="h6"
          color="primary"
          sx={{
            background: theme.palette.inputBackground.main,
            mt: 2,
            pt: 3,
            pl: 2,

            py: 2,
          }}
        >
          Scope of Work
        </Typography>
      </Box>

      <Typography variant="subtitle1" mt={2}>
        The Contractor shall diligently undertake, perform and complete all
        preventative and routine maintenance including all material, labor,
        supervision, tools, supplies and all other expenses necessary to provide
        service, preventative maintenance, inspections, adjustments, testing and
        repairs as set forth in Exhibit A, Scope of Work, to the City’s
        satisfaction (“Preventative and Routine Maintenance”)
      </Typography>
    </CustomCard>
  );
};

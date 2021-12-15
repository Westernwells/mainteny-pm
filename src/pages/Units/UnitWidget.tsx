import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {Searchnput} from '../../components/SearchInput';

export const UnitWidget = () => (
  <Box mb={5} display="flex" justifyContent="space-between">
    <Typography variant="h4">Units</Typography>

    <Box display="flex">
      <Box display="flex" mr={3} mt={1}>
        <FilterListIcon sx={{color: '#8F9BB3'}} />
        <Typography variant="body1" ml="5px">
          Filter
        </Typography>
      </Box>
      <Box display="flex" mr={3} mt={1}>
        <SortIcon sx={{color: '#8F9BB3'}} />
        <Typography variant="body1" ml="5px">
          Sort
        </Typography>
      </Box>

      <Box mr={3}>
        <Searchnput />
      </Box>
      <Box>
        <ButtonGroup variant="outlined" size="large" sx={{height: 48}}>
          <Button
            variant="outlined"
            sx={{background: (theme) => theme.state.hover}}
          >
            <Typography
              variant="largeBtnText"
              sx={{textTransform: 'capitalize'}}
            >
              List View
            </Typography>
          </Button>

          <Button variant="outlined">
            <Typography
              variant="largeBtnText"
              sx={{textTransform: 'capitalize'}}
            >
              Map View
            </Typography>
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  </Box>
);

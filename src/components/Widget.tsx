import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Theme} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import makeStyles from '@mui/styles/makeStyles';
import useTheme from '@mui/material/styles/useTheme';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import Button from '@mui/material/Button';
import {Searchnput} from './SearchInput';
import {BtnGroupType} from '../models/misc';

interface Props {
  btnGroupType?: BtnGroupType;
  searchPlaceholder?: string;
  onSearchTextChanged?: (text: string) => void;
  openMapView?: () => void;
  closeMapView?: () => void;
  mapViewActive?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  filter: {
    backgroundColor: theme.palette.primary.outlinedHoverBg,
    border: 'none',
    py: 1,
    height: 48,
    '&:hover': {
      border: 'none',
    },
  },
}));

export const Widget = ({
  btnGroupType,
  searchPlaceholder,
  onSearchTextChanged,
  openMapView,
  closeMapView,
  mapViewActive,
}: Props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Box>
      <Box display="flex">
        <Box display="flex" mr={3}>
          <Button
            size="large"
            className={classes.filter}
            variant="outlined"
            startIcon={<FilterListIcon />}
          >
            <Typography variant="body1" sx={{textTransform: 'capitalize'}}>
              Filter
            </Typography>
          </Button>
        </Box>

        <Box mr={3}>
          <Searchnput
            placeholder={searchPlaceholder}
            onValueChanged={onSearchTextChanged}
          />
        </Box>
        <Box>
          <ButtonGroup variant="outlined" size="large" sx={{height: 48}}>
            {btnGroupType && btnGroupType === BtnGroupType.ICON ? (
              <>
                <Button
                  variant="outlined"
                  sx={{background: theme.state?.hover}}
                >
                  <FormatListBulletedIcon />
                </Button>

                <Button variant="outlined">
                  <GridViewIcon />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => (closeMapView ? closeMapView() : () => {})}
                  sx={{
                    background: !mapViewActive ? theme.state?.hover : '',
                  }}
                >
                  <Typography
                    variant="largeBtnText"
                    sx={{textTransform: 'capitalize'}}
                  >
                    List View
                  </Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    background: mapViewActive ? theme.state?.hover : '',
                  }}
                  onClick={() => (openMapView ? openMapView() : () => {})}
                >
                  <Typography
                    variant="largeBtnText"
                    sx={{textTransform: 'capitalize'}}
                  >
                    Map View
                  </Typography>
                </Button>
              </>
            )}
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  placeholder?: string;
}

export const Searchnput = ({placeholder}: Props) => (
  <Paper
    component="form"
    sx={{
      p: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 368,
      boxShadow: 0,
      border: '1px solid #E4E9F2',
    }}
  >
    <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
      <SearchIcon />
    </IconButton>
    <InputBase
      sx={{ml: 1, flex: 1}}
      placeholder={placeholder && placeholder}
      inputProps={{'aria-label': 'Type ‘Schindler’ or ‘Blue Plaza’'}}
    />
  </Paper>
);

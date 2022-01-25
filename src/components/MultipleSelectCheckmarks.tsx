import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {maxHeight} from '@mui/system';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: string[];
  getSelectedValue?: (item: string[]) => any;
  label: string;
}

export const MultipleSelectCheckmarks = ({
  options,
  getSelectedValue,
  label,
}: Props) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
    const {
      target: {value},
    } = event;
    setSelectedItems(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  React.useEffect(() => {
    if (getSelectedValue) {
      getSelectedValue(selectedItems);
    }
  }, [selectedItems]);

  return (
    <Box mb={3}>
      <FormControl sx={{m: 1, width: '13.75rem'}}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          id={label}
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput sx={{background: '#fff'}} label={label} />}
          renderValue={(selected) => selectedItems.join(',')}
          MenuProps={MenuProps}
          // sx={{maxHeight: 30}}
          size="small"
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedItems.includes(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

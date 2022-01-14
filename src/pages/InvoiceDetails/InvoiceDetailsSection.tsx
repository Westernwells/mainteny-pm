import * as React from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import {WorkReport} from './Tabs/WorkReport';
import {Invoice} from './Tabs/Invoice';
import {RelatedTo} from './Tabs/RelatedTo';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{p: 3}}>{children}</Box>}
    </div>
  );
};

const workReportText = `10 / 6-2020: Secured lift and counterweight for disconnection of engine and brake. Disassembled engine with brake and
delivered it to a workshop in Råde.

22 / 6-2020: Picked up engine at workshop. Mounted motor with brake and removed securing of lift and counterweight. Refilled oil on the gear unit between the hoist and the shaft for chains. Controlled brake, ok. Controlled stop length in the
event of a breakdown of photocells. Average stop length: 7.5 cm. Max stop length: 16.5 cm. Elevator put into operation

10 / 6-2020: Secured lift and counterweight for disconnection of engine and brake. Disassembled engine with brake and
delivered it to a workshop in Råde.

22 / 6-2020: Picked up engine at workshop. Mounted motor with brake and removed securing of lift and counterweight. Refilled oil on the gear unit between the hoist and the shaft for chains. Controlled brake, ok. Controlled stop length in the
event of a breakdown of photocells. Average stop length: 7.5 cm. Max stop length: 16.5 cm. Elevator put into operation`;

export const InvoiceDetailsSection = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      borderRadius={2}
      sx={{
        flexBasis: '70%',
        background: theme.palette.common.white,
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          background: 'linear-gradient(180deg, #095369 0%, #043146 100%)',
          color: theme.palette.common.white,
          py: 2,
          px: 2,
        }}
      >
        Invoice Details
      </Typography>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Related To" {...a11yProps(0)} />
          <Tab label="Work Report" {...a11yProps(1)} />
          <Tab label="Invoice" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <RelatedTo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WorkReport text={workReportText} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Invoice />
      </TabPanel>
    </Box>
  );
};

import * as React from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import {WorkReport} from './Tabs/WorkReport';
import {Invoice} from './Tabs/Invoice';
import {RelatedTo} from './RelatedTo';
import {invoiceUrl, serviceOrder, workReportText} from './data';

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
      {/* <TabPanel value={value} index={0}>
        <RelatedTo serviceOrder={serviceOrder} />
      </TabPanel> */}
      <TabPanel value={value} index={1}>
        <WorkReport text={workReportText} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Invoice url={invoiceUrl} />
      </TabPanel>
    </Box>
  );
};

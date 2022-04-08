import Tab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

interface TabItem {
  label: string;
  icon: React.ReactNode;
}

interface Props {
  index: number;
  setIndex: (index: number) => void;
  items: TabItem[];
}

export const Tabs = ({index, setIndex, items}: Props) => (
  <MuiTabs
    sx={{
      '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      },
    }}
    value={index}
    onChange={(e: any, newValue: number) => setIndex(newValue)}
    textColor="secondary">
    {items.map((item) => (
      <Tab
        key={`${item.label}`}
        disableRipple
        label={
          <Box
            display="flex"
            className="item-label"
            sx={{
              position: 'relative',
              alignItems: 'center',
              px: 1,
              '&::before': {
                content: '""',
                position: 'absolute',
                backgroundColor: 'transparent',
                borderRadius: '3px',
                width: '124px',
                height: '3px',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
              },
            }}>
            <Box className="item-icon">{item.icon}</Box>
            <Typography mb={1} sx={{ml: 1}} variant="subtitle1">
              {item.label}
            </Typography>
          </Box>
        }
        sx={(theme) => ({
          height: 30,
          textTransform: 'capitalize',
          '&.MuiTab-textColorPrimary': {
            color: theme.palette.primary.main,
          },
          '&.Mui-selected': {
            color: theme.palette.primary.main,
            '& .item-label': {
              '&::before': {
                backgroundColor: theme.palette.primary.main,
              },
              '& .item-icon': {
                color: theme.palette.secondary.main,
              },
            },
          },
        })}
      />
    ))}
  </MuiTabs>
);

import {ReactChild, ReactNode} from 'react';
import Box from '@mui/material/Box';
import {Elevator} from 'models/elevator';
import {ReactComponent as Elevation} from 'assets/icons/Elevation.svg';

export interface Props {
  renderIcon?: () => ReactChild;
  renderHeaderText?: () => ReactChild;
  addShadowToCard?: boolean;
  showAll?: boolean;
  hideMoreDetailArrow?: boolean;
  cardHeight?: number;
  contentHeight?: number | string;
  children: ReactNode;
  disableScroll?: boolean;
}

export const ScrollableCard = ({
  renderIcon,
  renderHeaderText,
  addShadowToCard,
  showAll,
  hideMoreDetailArrow,
  cardHeight = 650,
  contentHeight = '90%',
  children,
  disableScroll,
}: Props) => (
  <Box
    sx={{
      background: '#fff',
      borderRadius: '8px',
      height: cardHeight,
      px: '20px',
      boxShadow: addShadowToCard
        ? '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'
        : null,
    }}
    pt={2}
    pb={3}
    px={2}
  >
    <Box display="flex" justifyContent="space-between">
      {renderHeaderText ? renderHeaderText() : null}:
      {renderIcon ? renderIcon() : <Elevation />}
    </Box>

    <Box
      pt={2}
      height={contentHeight}
      sx={{overflowY: disableScroll ? 'visible' : 'scroll'}}
    >
      {children}
    </Box>
  </Box>
);

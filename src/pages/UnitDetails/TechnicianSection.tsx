import {Fragment, useEffect, useState} from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import Avatar from '@mui/material/Avatar';
import useTheme from '@mui/material/styles/useTheme';
import * as _ from 'lodash';
import technicianImage from '../../assets/images/tech.png';
import {MaintainerView, TechnicianView} from '../../models/technician';

export interface TechnicianSectionProp {
  maintainers: MaintainerView[];
}

export const TechnicianSection = ({maintainers}: TechnicianSectionProp) => {
  const theme = useTheme();

  const [technician, setTechnician] = useState<TechnicianView>();

  useEffect(() => {
    if (maintainers && maintainers.length > 0) {
      const maintainer = _.sortBy(maintainers, (item) => [
        -item.weight,
        item.technician.userAccount.firstName,
        item.technician.userAccount.lastName,
      ])[0];

      setTechnician(maintainer.technician);
    }
  }, [maintainers]);
  return (
    <Box
      sx={{background: '#fff', borderRadius: '8px', height: 500}}
      pt={2}
      pb={3}
      px={2}
    >
      <Box>
        <Box display="flex" mt={1}>
          <Typography
            variant="h6"
            mt={1}
            mr={8}
            flexGrow={1}
            color={theme.palette.primary.main}
          >
            Technician (1)
          </Typography>
        </Box>
        {technician ? (
          <Fragment>
            <Box display="flex" justifyContent="center" mt={3}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  alt="Tech"
                  src={technicianImage}
                  sx={{width: 120, height: 120}}
                />
                <Typography variant="h6">{`${technician.userAccount.firstName} ${technician.userAccount.lastName}`}</Typography>
                <Typography
                  variant="subtitle2"
                  textAlign="center"
                  color={theme.palette.text.secondary}
                >
                  Sr. Technician
                </Typography>
              </Box>
            </Box>

            <Box display="flex" mr={3} mt={2}>
              <Box
                sx={{background: theme.palette.background.default}}
                width={35}
                height={35}
              >
                <BadgeOutlinedIcon
                  sx={{
                    width: '18px',
                    height: '18px',
                    ml: 1,
                    mt: 1,
                    color: theme.palette.text.primary,
                  }}
                />
              </Box>
              <Typography
                variant="tableHeaderText"
                mt={1}
                ml={2}
                sx={{color: theme.palette.text.secondary}}
              >
                astralift.nl
              </Typography>
            </Box>

            <Box display="flex" mr={3} mt={2}>
              <Box
                sx={{background: theme.palette.background.default}}
                width={35}
                height={35}
              >
                <EmailOutlinedIcon
                  sx={{
                    width: '18px',
                    height: '18px',
                    ml: 1,
                    mt: 1,
                    color: theme.palette.text.primary,
                  }}
                />
              </Box>
              <Typography
                variant="tableHeaderText"
                mt={1}
                ml={2}
                sx={{color: theme.palette.text.secondary}}
              >
                {technician.userAccount.contact.email}
              </Typography>
            </Box>

            <Box display="flex" mr={3} mt={2}>
              <Box
                sx={{background: theme.palette.background.default}}
                width={35}
                height={35}
              >
                <CallOutlinedIcon
                  sx={{
                    width: '18px',
                    height: '18px',
                    ml: 1,
                    mt: 1,
                    color: theme.palette.text.primary,
                  }}
                />
              </Box>
              <Typography
                variant="tableHeaderText"
                mt={1}
                ml={2}
                sx={{color: theme.palette.text.secondary}}
              >
                {technician.userAccount.contact.phone}
              </Typography>
            </Box>
          </Fragment>
        ) : (
          <Box>
            <Typography>
              No technician is currently running a service order
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

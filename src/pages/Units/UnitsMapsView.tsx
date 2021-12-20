import React from 'react';
import GoogleMapReact from 'google-map-react';
import Box from '@mui/system/Box';
import {LocationPin} from '../../components/LocationPin';
import {Location} from '../../models/misc';

interface Props {
  centerCoord?: Location;
  viewPorts?: Location[];
}

export const UnitsMapsView = ({centerCoord, viewPorts}: Props) => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  return (
    <Box height="100vh" width="99%">
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_KEY!}}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={
          centerCoord && {lat: centerCoord.latitude, lng: centerCoord.longitude}
        }
        zoom={12}
      >
        {viewPorts?.map((view) => (
          <LocationPin lat={view.latitude} lng={view.longitude} />
        ))}
      </GoogleMapReact>
    </Box>
  );
};

import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import Box from '@mui/system/Box';
import {LocationPin} from '../../components/LocationPin';
import {Location} from '../../models/misc';
import {ElevatorView} from '../../models/elevator';

interface Props {
  centerCoord?: Location;
  elevators?: ElevatorView[];
}

export const UnitsMapsView = ({centerCoord, elevators}: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<Location>();
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
        {elevators?.map((elevator) => (
          <LocationPin
            lat={elevator.address.location.latitude}
            lng={elevator.address.location.longitude}
            model={elevator.model}
            number={elevator.number}
            id={elevator.id}
            onPinClick={() =>
              setSelectedLocation({
                latitude: elevator.address.location.latitude,
                longitude: elevator.address.location.longitude,
              })
            }
            selectedLocation={selectedLocation}
          />
        ))}
      </GoogleMapReact>
    </Box>
  );
};

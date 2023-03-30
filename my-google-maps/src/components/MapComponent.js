import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import Geocode from "react-geocode";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

Geocode.setApiKey("AIzaSyAna6TCxWwJWPlZHb4wDPQHZX_POtQxqOo");

export default () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (map) => {
    setMap(map);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      Geocode.fromLatLng(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      ).then(
        (response) => {
          const address = response.results[0].formatted_address;
          setLocation(address);
          setMarker({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
          map.panTo({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.warn("Autocomplete is not loaded yet!");
    }
  };

  const onLoadAutocomplete = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onLoadMarker = (marker) => {
    setMarker(marker);
  };

  return (
    <div style={{ position: "relative" }}>
      <LoadScript
        googleMapsApiKey="AIzaSyAna6TCxWwJWPlZHb4wDPQHZX_POtQxqOo"
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
        >
          {marker && <Marker position={marker} onLoad={onLoadMarker} />}
          <div style={{ position: "relative", zIndex: 1 }}>
            <Autocomplete
              onLoad={onLoadAutocomplete}
              onPlaceChanged={onPlaceChanged}
            >
              <input type="text" placeholder="Enter a location" />
            </Autocomplete>
          </div>
        </GoogleMap>
        {location && <p>Location: {location}</p>}
      </LoadScript>
    </div>
  );
};

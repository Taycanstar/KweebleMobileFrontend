import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      minLength={0}
      GooglePlacesDetailsQuery={{fields: 'geometry'}}
      fetchDetails={true}
      placeholder="Location"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        console.log(JSON.stringify(details?.geometry?.location));
        console.log(details?.geometry?.location);
      }}
      query={{
        key: 'AIzaSyD7CuWeLRadLWtFKXr58ZXLqAd_jRrIAXY',
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;

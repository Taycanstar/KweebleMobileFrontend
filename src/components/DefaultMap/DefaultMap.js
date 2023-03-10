import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Marker} from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import Colors from '../../constants/Colors';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const MapScreen = () => {
  const [markers, setMarkers] = useState([]);
  const [marker, setMarker] = useState('');
  const ref = useRef();
  const mapRef = useRef();
  // console.log(markers);
  const [region, setRegion] = useState({
    latitude: 27.713011386872324,
    longitude: -82.68764074523352,
    latitudeDelta: 0.000005,
    longitudeDelta: 0.0055,
  });

  const [defRegion, setDefRegion] = useState({
    latitude: 27.713011386872324,
    longitude: -82.68764074523352,
    latitudeDelta: 0.000005,
    longitudeDelta: 0.0055,
  });

  const moveTo = async position => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      // mapRef.current?.animateCamera(camera, {duration: 1000});
      mapRef.current?.animateCamera(
        {center: position, altitude: 2500, zoom: 40, heading: 20, pitch: 2},
        {duration: 1000},
      );
    }
  };

  const onPlaceSelected = details => {
    // const set = flag === 'origin' ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    // set(position);
    moveTo(position);
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <GooglePlacesAutocomplete
        // ref={ref}
        styles={{
          container: {
            flex: 0,
            position: 'absolute',
            width: '100%',
            zIndex: 1,
            top: -4,
            borderRadius: 5,
          },
          textInput: {
            borderBottomWidth: 1,
            borderColor: 'lightgray',
            // marginBottom: 15,
            fontSize: 16,
            paddingBottom: 15,
            paddingTop: 10,
            paddingHorizontal: 10,
            justifyContent: 'center',
            fontWeight: '400',
            marginHorizontal: 5,
            marginTop: 10,
            borderRadius: 5,
          },
          listView: {
            // overflow: 'visible',
            // zIndex: 99,
          },
        }}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        fetchDetails={true}
        placeholder="Search"
        onPress={async (info, details = null) => {
          setRegion({
            latitude: details?.geometry?.location?.lat,
            longitude: details?.geometry?.location?.lng,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
          });
          onPlaceSelected(details);
        }}
        query={{
          key: 'AIzaSyD7CuWeLRadLWtFKXr58ZXLqAd_jRrIAXY',
          language: 'en',
          // components: 'country: us',
          radius: 30000,
          location: `${region.latitude}, ${region.longitude}`,
        }}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 27.713011386872324,
          longitude: -82.68764074523352,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.005,
        }}
        onPress={e => {
          setMarker({latlng: e.nativeEvent.coordinate});
        }}>
        {marker?.latlng?.latitude !== undefined ? (
          <Marker
            // key={index}
            // image={require('../../../assets/images/iconface.png')}
            coordinate={{
              latitude: marker?.latlng?.latitude,
              longitude: marker?.latlng?.longitude,
            }}
          />
        ) : null}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

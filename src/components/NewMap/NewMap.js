import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Marker} from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import Colors from '../../constants/Colors';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Callout} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';

const NewMap = ({evs}) => {
  const navigation = useNavigation();
  const [markers, setMarkers] = useState([]);
  const [refresh, setRefresh] = useState([]);
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

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [events, setEvents] = useState([]);
  const today = new Date();
  const tomorrow = new Date();
  const yesterday = new Date();
  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);

  useEffect(() => {
    let mounted = true;
    const loadEvents = async () => {
      try {
        const {data} = await axios.get('https://kweeble.herokuapp.com/events/');
        if (mounted) {
          setEvents(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadEvents();
    return () => {
      mounted = false;
    };
  }, [events, refresh]);

  const filteredEvents = evs.filter(
    e => e.datetime > yesterday.getTime() && e.datetime < tomorrow.getTime(),
  );

  useEffect(() => {
    const reff = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action

      setRefresh(true);

      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    });

    return reff;
  }, [navigation]);

  // function CustomMarker() {
  //   return (
  //     <View>
  //       <Image
  //         style={{width: 50, height: 50}}
  //         source={require('../../../assets/images/iconstar.png')}
  //       />
  //     </View>
  //   );
  // }
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
        {filteredEvents.map((event, i) => {
          const lat = event.latitude;
          const lng = event.longitude;
          const icn = event.icon;

          if (event.latitude !== null || event.longitude !== null) {
            while (icn === 'Blue') {
              return (
                <Marker
                  key={i}
                  pinColor={Colors.pinBlue}
                  description={`${event.name} ${months[event.month - 1]} ${
                    event.day
                  }, ${event.year}`}
                  coordinate={{
                    latitude: lat,
                    longitude: lng,
                  }}>
                  <Callout
                    style={{
                      padding: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          fontWeight: '500',
                          textAlign: 'center',
                        }}>
                        {event.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          // fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        {event.location}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        @ {event.startTime}
                      </Text>

                      {/* <Text
                        style={{
                          fontSize: 10,
                          textAlign: 'center',
                          fontStyle: 'italic',
                        }}>
                        {event.day}
                        {months[event.month - 1]} {event.year}
                      </Text> */}
                    </View>
                  </Callout>
                </Marker>
              );
            }
            while (icn === 'Navy') {
              return (
                <Marker
                  key={i}
                  pinColor={Colors.pinNavy}
                  // image={require('../../../assets/images/iconstar.png')}
                  description={`${event.name} ${months[event.month - 1]} ${
                    event.day
                  }, ${event.year}`}
                  coordinate={{
                    latitude: lat,
                    longitude: lng,
                  }}>
                  <Callout
                    style={{
                      padding: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          fontWeight: '500',
                          textAlign: 'center',
                        }}>
                        {event.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          // fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        {event.location}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        @ {event.startTime}
                      </Text>
                      {/* <Text
                        style={{
                          fontSize: 10,
                          textAlign: 'center',
                          fontStyle: 'italic',
                        }}>
                        {event.day}
                        {months[event.month - 1]} {event.year}
                      </Text> */}
                    </View>
                  </Callout>
                </Marker>
              );
            }

            while (icn === 'Yellow') {
              return (
                <Marker
                  key={i}
                  pinColor={Colors.pinYellow}
                  // image={require('../../../assets/images/greenicon.png')}
                  description={`${event.name} ${event.month - 1} ${
                    event.day
                  }, ${event.year}`}
                  coordinate={{
                    latitude: lat,
                    longitude: lng,
                  }}>
                  <Callout
                    style={{
                      padding: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          fontWeight: '500',
                          textAlign: 'center',
                        }}>
                        {event.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          // fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        {event.location}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        @ {event.startTime}
                      </Text>
                      {/* <Text
                        style={{
                          fontSize: 10,
                          textAlign: 'center',
                          fontStyle: 'italic',
                        }}>
                        {event.day}
                        {months[event.month - 1]} {event.year}
                      </Text> */}
                    </View>
                  </Callout>
                </Marker>
              );
            }

            while (icn === 'Red') {
              return (
                <Marker
                  key={i}
                  pinColor={Colors.pinRed}
                  description={`${event.name} ${event.month} ${event.day}, ${event.year}`}
                  coordinate={{
                    latitude: lat,
                    longitude: lng,
                  }}>
                  <Callout
                    style={{
                      padding: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          fontWeight: '500',
                          textAlign: 'center',
                        }}>
                        {event.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          // fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        {event.location}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        @ {event.startTime}
                      </Text>
                      {/* <Text
                        style={{
                          fontSize: 10,
                          textAlign: 'center',
                          fontStyle: 'italic',
                        }}>
                        {event.day}
                        {months[event.month - 1]} {event.year}
                      </Text> */}
                    </View>
                  </Callout>
                </Marker>
              );
            }

            while (icn === 'Purple') {
              return (
                <Marker
                  key={i}
                  pinColor={Colors.pinPurple}
                  description={`${event.name} ${event.month} ${event.day}, ${event.year}`}
                  coordinate={{
                    latitude: lat,
                    longitude: lng,
                  }}>
                  <Callout
                    style={{
                      padding: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          fontWeight: '500',
                          textAlign: 'center',
                        }}>
                        {event.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          // fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        {event.location}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        @ {event.startTime}
                      </Text>
                      {/* <Text
                        style={{
                          fontSize: 10,
                          textAlign: 'center',
                          fontStyle: 'italic',
                        }}>
                        {event.day}
                        {months[event.month - 1]} {event.year}
                      </Text> */}
                    </View>
                  </Callout>
                </Marker>
              );
            }

            while (icn === 'Green') {
              return (
                <Marker
                  key={i}
                  pinColor={Colors.pinGreen}
                  description={`${event.name} ${event.month} ${event.day}, ${event.year}`}
                  coordinate={{
                    latitude: lat,
                    longitude: lng,
                  }}>
                  <Callout
                    style={{
                      padding: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          fontWeight: '500',
                          textAlign: 'center',
                        }}>
                        {event.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          // fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        {event.location}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        @ {event.startTime}
                      </Text>

                      {/* <Text
                        style={{
                          fontSize: 10,
                          textAlign: 'center',
                          fontStyle: 'italic',
                        }}>
                        {event.day}
                        {months[event.month - 1]} {event.year}
                      </Text> */}
                    </View>
                  </Callout>
                </Marker>
              );
            }

            while (icn === 'Orange') {
              return (
                <Marker
                  key={i}
                  pinColor={Colors.pinOrange}
                  description={`${event.name} ${event.month} ${event.day}, ${event.year}`}
                  coordinate={{
                    latitude: lat,
                    longitude: lng,
                  }}>
                  <Callout
                    style={{
                      padding: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          fontWeight: '500',
                          textAlign: 'center',
                        }}>
                        {event.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          // fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        {event.location}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        @ {event.startTime}
                      </Text>
                      {/* <Text
                        style={{
                          fontSize: 10,
                          textAlign: 'center',
                          fontStyle: 'italic',
                        }}>
                        {event.day}
                        {months[event.month - 1]} {event.year}
                      </Text> */}
                    </View>
                  </Callout>
                </Marker>
              );
            }
          }
        })}
      </MapView>
    </View>
  );
};

export default NewMap;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

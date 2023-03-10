import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';
import axios from 'axios';

const MapScreen = () => {
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
  }, [events]);

  const filteredEvents = events.filter(e => e.datetime > yesterday.getTime());

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 27.714711386872324,
          longitude: -82.68644074523382,
          latitudeDelta: 0.0053,
          longitudeDelta: 0.0056,
        }}>
        {filteredEvents.reverse().map((event, i) => {
          const lat = event.latitude;
          const lng = event.longitude;
          const icn = event.icon;

          while (icn === 'Home') {
            return (
              <Marker
                key={i}
                image={require('../../../assets/images/iconhome.png')}
                description={`${event.name} ${months[event.month - 1]} ${
                  event.day
                }, ${event.year}`}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
              />
            );
          }
          while (icn === 'Star') {
            return (
              <Marker
                key={i}
                image={require('../../../assets/images/iconstar.png')}
                description={`${event.name} ${months[event.month - 1]} ${
                  event.day
                }, ${event.year}`}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
              />
            );
          }

          while (icn === 'Basic') {
            return (
              <Marker
                key={i}
                image={require('../../../assets/images/greenicon.png')}
                description={`${event.name} ${months[event.month - 1]} ${
                  event.day
                }, ${event.year}`}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
              />
            );
          }

          while (icn === 'Heart') {
            return (
              <Marker
                key={i}
                image={require('../../../assets/images/iconheart.png')}
                description={`${event.name} ${months[event.month - 1]} ${
                  event.day
                }, ${event.year}`}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
              />
            );
          }

          while (icn === 'Health') {
            return (
              <Marker
                key={i}
                image={require('../../../assets/images/iconplus.png')}
                description={`${event.name} ${months[event.month - 1]} ${
                  event.day
                }, ${event.year}`}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
              />
            );
          }

          while (icn === 'User') {
            return (
              <Marker
                key={i}
                image={require('../../../assets/images/iconface.png')}
                description={`${event.name} ${months[event.month - 1]} ${
                  event.day
                }, ${event.year}`}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
              />
            );
          }

          while (icn === 'Person') {
            return (
              <Marker
                key={i}
                image={require('../../../assets/images/iconperson.png')}
                description={`${event.name} ${months[event.month - 1]} ${
                  event.day
                }, ${event.year}`}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
              />
            );
          }

          while (icn === 'Network') {
            return (
              <Marker
                key={i}
                image={require('../../../assets/images/iconwifi.png')}
                description={`${event.name} ${months[event.month - 1]} ${
                  event.day
                }, ${event.year}`}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
              />
            );
          }

          while (icn === 'Food') {
            return (
              <Marker
                key={i}
                image={require('../../../assets/images/iconfood.png')}
                description={`${event.name} ${months[event.month - 1]} ${
                  event.day
                }, ${event.year}`}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
              />
            );
          }

          while (icn === 'Flag') {
            return (
              <Marker
                key={i}
                image={require('../../../assets/images/iconflag.png')}
                description={`${event.name} \n ${months[event.month - 1]} ${
                  event.day
                }, ${event.year}`}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
              />
            );
          }
        })}
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

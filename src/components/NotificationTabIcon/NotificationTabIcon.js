import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';

const NotificationTabIcon = ({color, route}) => {
  const navigation = useNavigation();
  const [counter, setCounter] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filteredNotifications2, setFilteredNotifications2] = useState([]);
  const me = useSelector(state => state.Reducers.userData);

  // console.log(counter, 'count');
  // console.log(route, 'route');
  // console.log(route !== 'Notifications');

  useEffect(() => {
    let mounted = true;
    const loadNotifications = async () => {
      try {
        const {data} = await axios.get(
          'https://kweeble.herokuapp.com/notifications',
        );
        if (mounted) {
          setNotifications(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadNotifications();
    const interval = setInterval(() => {
      loadNotifications();
    }, 5000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (route !== 'Notifications') {
      let mounted = true;

      try {
        const not1 = notifications.filter(
          e => e.to === me._id && e.seen === false,
        );
        // const not2 = not1.filter(i => i.seen === false);
        if (mounted) {
          setFilteredNotifications(not1);
          // setFilteredNotifications2(not2);
          setCounter(filteredNotifications.length);
        }
        return () => {
          mounted = false;
        };
      } catch (error) {
        console.log(error);
      }
    }
    setCounter(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  const onBellPress = async () => {
    setCounter(0);
    filteredNotifications.forEach(async not => {
      try {
        const res = await axios.put(
          `https://kweeble.herokuapp.com/notifications/${not._id}`,
          {
            id: not._id,
            seen: true,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        console.log(res, '<==res from press');
      } catch (error) {
        console.log(error);
      }
    });
    navigation.navigate('Notifications');
  };

  return (
    <View>
      {counter > 0 ? (
        <View
          style={{
            backgroundColor: 'red',
            borderRadius: 100,
            width: 10,
            height: 10,
            position: 'absolute',
            left: 12,
            zIndex: 2,
            top: -2,
          }}></View>
      ) : null}
      <Feather onPress={onBellPress} name="bell" size={25} color={color} />
    </View>
  );
};

export default NotificationTabIcon;

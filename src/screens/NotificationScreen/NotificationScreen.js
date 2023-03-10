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
import {CustomButton} from '../../components/CustomButton';
import {useDispatch} from 'react-redux';
import {Logout} from '../../store/actions';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-snap-carousel';
import {sliderData} from '../../model/data.js';
import BannerSlider from '../../components/BannerSlider';
import {windowWidth} from '../../utils/Dimensions';
import CustomSwitch from '../../components/CustomSwitch';
import ListView from '../../screens/ListView';
import MapScreen from '../../screens/MapScreen';
import EventNotificationCard from '../../components/EventNotificationCard';
import AddPopup from '../../components/AddPopup';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import DefaultMap from '../../components/DefaultMap';
import ScopesPopup from '../../components/ScopesPopup';
import {
  FacebookLoader,
  InstagramLoader,
  Bullets,
} from 'react-native-easy-content-loader';

const deviceHeight = Dimensions.get('window').height;

const NotificationsScreen = ({navigation, event, route}) => {
  const data = useSelector(state => state.Reducers.userData);
  const [eventsTab, setEventsTab] = useState(1);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [catherine, setCatherine] = useState('Home');
  const [events, setEvents] = useState([]);
  const [scopes, setScopes] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [isScopeSelected, setIsScopeSelected] = useState(false);
  const [selEvents, setSelEvents] = useState([]);
  const [isScopeVisible, setIsScopeVisible] = useState(false);
  const [load, setLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeScopeVisible = bool => {
    setIsScopeVisible(bool);
  };

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeModal = (bool, info) => {
    changeModalVisible(bool);
  };

  const pullMe = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  const onLogoutPressed = () => {
    //validate user
    dispatch(Logout());
  };

  const navigation2 = useNavigation();

  const onNotificationsPress = () => {
    navigation.navigate('Notifications', {title: data.name});
  };

  useEffect(() => {
    const ref = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action

      setRefresh(true);

      setTimeout(() => {
        setRefresh(false);
      }, 500);
    });

    return ref;
  }, [navigation]);

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
    // const interval = setInterval(() => {
    //   loadEvents();
    // }, 2000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [refresh]);

  useEffect(() => {
    let mounted = true;
    const loadScopes = async () => {
      try {
        const {data} = await axios.get('https://kweeble.herokuapp.com/scopes/');
        if (mounted) {
          setScopes(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadScopes();
    // const interval = setInterval(() => {
    //   loadScopes();
    // }, 2000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [refresh]);
  useEffect(() => {
    let mounted = true;
    const loadNotifications = async () => {
      try {
        setIsLoading(true);
        const {data} = await axios.get(
          'https://kweeble.herokuapp.com/notifications/',
        );
        if (mounted) {
          setNotifications(data);

          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);

        setIsLoading(false);
      }
    };
    loadNotifications();
    // const interval = setInterval(() => {
    //   // loadNotifications();
    // }, 2000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadNotifications = async () => {
      try {
        const {data} = await axios.get(
          'https://kweeble.herokuapp.com/notifications/',
        );
        if (mounted) {
          setNotifications(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadNotifications();
    // const interval = setInterval(() => {
    //   loadNotifications();
    // }, 2000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [refresh]);

  let today = new Date();
  let tomorrow = new Date();
  let yesterday = new Date();
  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);

  const [filteredEvents, setFilteredEvents] = useState([]);

  const myScopes = scopes.filter(item => {
    return item.members.indexOf(data._id) >= 0;
  });

  useEffect(() => {
    const fev = events.filter(e => e.datetime > yesterday.getTime());

    //maybe add for each
    const myScopeEvents = myScopes.map(sc => {
      return fev.filter(ev => sc._id === ev.scope);
    });

    const mySE = myScopeEvents.flat(1);

    setFilteredEvents(mySE);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, events, load]);

  useEffect(() => {
    const not1 = notifications.filter(e => e.to === data._id);

    setFilteredNotifications(not1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, notifications]);

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <View style={styles.container}>
        <View style={{flex: 0.15, justifyContent: 'flex-end'}}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="arrow-back-ios"
            size={20}
            color="black"
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Notifications</Text>
        </View>

        <View>
          <Text>{'       '}</Text>
        </View>
      </View>
      {isLoading ? (
        <Bullets active listSize={7} />
      ) : (
        <>
          <ScrollView
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
            }
            showsVerticalScrollIndicator={false}>
            <View>
              {filteredNotifications.map(notification => {
                return (
                  <View
                    style={{
                      borderBottomWidth: 0.8,
                      paddingBottom: 5,
                      paddingTop: 5,
                      borderBottomColor: 'lightgray',
                    }}
                    key={notification._id}>
                    <EventNotificationCard
                      refresh={refresh}
                      notification={notification}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};
export default NotificationsScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapper: {
    paddingHorizontal: 20,
    // paddingVertical: 10,
  },
  container: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent: 'space-between',
    // marginBottom: 20,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.8,
  },
  topLogo: {
    width: 31.5,
    height: 31.5,
  },
  topProfilePic: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
});

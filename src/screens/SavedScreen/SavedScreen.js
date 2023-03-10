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
  ActivityIndicator,
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
import EventCard from '../../components/EventCard';
import ProductCard from '../../components/ProductCard';
const deviceHeight = Dimensions.get('window').height;

const SavedScreen = ({navigation, event, route}) => {
  const data = useSelector(state => state.Reducers.userData);
  const [eventsTab, setEventsTab] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selEvents, setSelEvents] = useState([]);
  const [isScopeVisible, setIsScopeVisible] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const navigation2 = useNavigation();

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
    const interval = setInterval(() => {
      loadEvents();
    }, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [refresh, events]);

  useEffect(() => {
    let mounted = true;
    const loadEvents = async () => {
      setIsLoading(true);
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
    const interval = setInterval(() => {
      setIsLoading(false);
    }, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadProducts = async () => {
      try {
        const {data} = await axios.get(
          'https://kweeble.herokuapp.com/products/',
        );
        if (mounted) {
          setProducts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadProducts();
    const interval = setInterval(() => {
      loadProducts();
    }, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [refresh]);

  let today = new Date();
  let tomorrow = new Date();
  let yesterday = new Date();
  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);

  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    let mounted = true;
    const filterEvents = () => {
      if (mounted) {
        const fev = events.filter(e => e.datetime > yesterday.getTime());

        //maybe add for each
        const mySavedEvents = data.savedEvents.map(e => {
          return fev.filter(ev => e === ev._id);
        });

        const mySE = mySavedEvents.flat(1);
        // console.log(mySE);
        setFilteredEvents(mySE);
      }
    };

    filterEvents();
    const interval = setInterval(() => {
      filterEvents();
    }, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, events]);

  useEffect(() => {
    let mounted = true;
    const loadUsers = async () => {
      try {
        const {data} = await axios.get('https://kweeble.herokuapp.com/api');
        if (mounted) {
          setUsers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadUsers();

    const interval = setInterval(() => {
      loadUsers();
    }, 3000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadDimi = async () => {
      if (mounted) {
        const y = users.filter(u => u._id === data._id)[0];
        setMe(y);
      }
    };

    loadDimi();

    const interval = setInterval(() => {
      //   loadDimi();
    }, 3000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [data._id, users]);

  useEffect(() => {
    //maybe add for each
    const mySavedProducts = me?.savedProducts?.map(e => {
      return products.filter(ev => e === ev._id);
    });

    const mySE = mySavedProducts?.flat(1);
    // console.log(mySE);
    setFilteredProducts(mySE);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, products]);

  useEffect(() => {
    let mounted = true;
    const filterEvents = () => {
      if (mounted) {
        const fev = events.filter(e => e.datetime > yesterday.getTime());

        //maybe add for each
        const mySavedEvents = me?.savedEvents?.map(e => {
          return fev.filter(ev => e === ev._id);
        });

        const mySE = mySavedEvents?.flat(1);
        // console.log(mySE);
        setFilteredEvents(mySE);
      }
    };

    filterEvents();
    const interval = setInterval(() => {
      filterEvents();
    }, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, events]);

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
          <Text style={{fontSize: 18, fontWeight: '600'}}>Saved</Text>
        </View>

        <View>
          <Text>{'            '}</Text>
        </View>
      </View>

      {isLoading ? (
        <View style={{marginTop: 15}}>
          <ActivityIndicator size="small" color={Colors.primary} />
        </View>
      ) : (
        <>
          <ScrollView
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
            }
            showsVerticalScrollIndicator={false}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15,
                  paddingRight: 5,
                  justifyContent: 'space-around',
                  paddingVertical: 8,
                }}>
                <TouchableOpacity
                  onPress={() => setIsTabActive(true)}
                  style={{
                    // backgroundColor: 'blue',
                    paddingBottom: 6,
                    borderBottomWidth: isTabActive ? 3 : 0,
                    borderColor: isTabActive ? Colors.primary : null,
                  }}>
                  <Text style={{fontWeight: '700', fontSize: 16}}>Events</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    // backgroundColor: 'blue',
                    paddingBottom: 6,
                    borderBottomWidth: isTabActive === false ? 3 : 0,
                    borderColor: isTabActive === false ? Colors.primary : null,
                  }}
                  onPress={() => setIsTabActive(false)}>
                  <Text style={{fontWeight: '700', fontSize: 16}}>
                    Products
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                {isTabActive ? (
                  <>
                    {filteredEvents
                      ?.sort(function (a, b) {
                        const dateOfA = new Date(
                          `${a.month}-${a.year}-${a.day}`,
                        );
                        const dateOfB = new Date(
                          `${b.month}-${b.year}-${b.day}`,
                        );
                        return dateOfA < dateOfB;
                      })
                      .map(evt => {
                        return (
                          <View
                            style={{paddingHorizontal: 15, paddingVertical: 8}}
                            key={evt._id}>
                            <TouchableOpacity key={evt._id}>
                              <EventCard
                                key={evt._id}
                                hostName={evt.hostName}
                                event={evt}
                                name={evt.name}
                                startDay={evt.startDay}
                                year={evt.year}
                                day={evt.day}
                                month={evt.month}
                                endDay={evt.endDay}
                                location={evt.location}
                                startTime={evt.startTime}
                                endTime={evt.endTime}
                                image={evt.image}
                                id={evt._id}
                                host={evt.host}
                                user={evt.user}
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        paddingLeft: 15,
                      }}>
                      {filteredProducts
                        ?.sort(function (a, b) {
                          return a.createdAt > b.createdAt;
                        })
                        .map(product => {
                          return (
                            <View key={product._id}>
                              <ProductCard product={product} />
                            </View>
                          );
                        })}
                    </View>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};
export default SavedScreen;

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

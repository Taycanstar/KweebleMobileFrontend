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
  // Animated,
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
import EventCard from '../../components/EventCard';
import AddPopup from '../../components/AddPopup';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import DefaultMap from '../../components/DefaultMap';
import NewMap from '../../components/NewMap';
import ScopesPopup from '../../components/ScopesPopup';
import {
  FacebookLoader,
  InstagramLoader,
} from 'react-native-easy-content-loader';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  SlideInDown,
  SlideInUp,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useDerivedValue,
  useAnimatedGestureHandler,
  withTiming,
  Easing,
  timing,
} from 'react-native-reanimated';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Home = ({navigation, event, props}) => {
  const data = useSelector(state => state.Reducers.userData);
  const [eventsTab, setEventsTab] = useState(1);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [catherine, setCatherine] = useState('All Scopes');
  const [events, setEvents] = useState([]);
  const [scopes, setScopes] = useState([]);
  const [users, setUsers] = useState([]);
  const [isScopeSelected, setIsScopeSelected] = useState(false);
  const [selEvents, setSelEvents] = useState([]);
  const [isScopeVisible, setIsScopeVisible] = useState(false);
  const [me, setMe] = useState('');
  const setRef = props?.route?.params?.data;
  const [isTabActive, setIsTabActive] = useState(true);
  // const [myScopes, setMyScopes] = useState([]);
  const [forYou, setForYou] = useState(true);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const x = useSharedValue(0);

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

  useEffect(() => {
    const ref = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action

      pullMe();
    });

    return ref;
  }, [navigation]);

  // useEffect(() => {
  //   setRefresh(true);

  //   setTimeout(() => {
  //     setRefresh(false);
  //   }, 1000);
  // }, []);

  useEffect(() => {
    let mounted = true;
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const {data} = await axios.get('https://kweeble.herokuapp.com/api');
        if (mounted) {
          setUsers(data);

          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadUsers();

    // const interval = setInterval(() => {
    // loadUsers();

    // }, 3000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, []);

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

    // const interval = setInterval(() => {
    //   loadUsers();
    // }, 3000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [refresh]);

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
  }, [refresh, events]);

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

    return () => {
      mounted = false;
    };
  }, [refresh, scopes]);

  let today = new Date();
  let tomorrow = new Date();
  let yesterday = new Date();
  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);

  const myScopes = scopes.filter(item => {
    return item.members.indexOf(data._id) >= 0;
  });

  useEffect(() => {
    let mounted = true;

    const loadDimi = async () => {
      if (mounted) {
        const y = users.filter(u => u._id === data._id)[0];

        setMe(y);
      }
    };

    loadDimi();

    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [data._id, users, refresh]);

  useEffect(() => {
    const fev = events.filter(
      //edited for customization purposes
      e => new Date(e.date) >= yesterday && e.modOnly === false,
    );

    const todayE = fev.filter(
      e => new Date(e.date) <= tomorrow && e.modOnly === false,
    );

    //maybe add for each
    const myScopeEvents = myScopes.map(sc => {
      return fev.filter(ev => sc._id === ev.scope);
    });

    const mySE = myScopeEvents?.flat(1);

    const sex = mySE.sort(
      (a, b) =>
        new Date(`${a.year}-${a.month}-${a.day}`) -
        new Date(`${b.year}-${b.month}-${b.day}`),
    );

    if (filteredEvents !== undefined && me?.blockedUsers?.length > 0) {
      const se = me?.blockedUsers?.map(s => {
        return mySE?.filter(my => my.user !== s);
      });

      const sev = se?.flat(1);

      const si = me?.blockedUsers?.map(s => {
        return todayE?.filter(my => my.user !== s);
      });

      const siv = si?.flat(1);

      const sex2 = sev.sort(
        (a, b) =>
          new Date(`${a.year}-${a.month}-${a.day}`) -
          new Date(`${b.year}-${b.month}-${b.day}`),
      );

      const to = todayE.sort(function (a, b) {
        const dateOfA = new Date(`${a.year}-${a.month}-${a.day}`);
        const dateOfB = new Date(`${b.year}-${b.month}-${b.day}`);
        return dateOfA > dateOfB;
      });
      setFilteredEvents(sex2);
      setTodaysEvents(siv);
    } else {
      // const to = todayE.sort(function (a, b) {
      //   const dateOfA = new Date(`${a.year}-${a.month}-${a.day}`);
      //   const dateOfB = new Date(`${b.year}-${b.month}-${b.day}`);
      //   return dateOfA > dateOfB;
      // });

      const to = todayE.sort(
        (a, b) =>
          new Date(`${a.year}-${a.month}-${a.day}`) -
          new Date(`${b.year}-${b.month}-${b.day}`),
      );
      // const dateOfA = new Date(`${a.year}-${a.month}-${a.day}`);
      // const dateOfB = new Date(`${b.year}-${b.month}-${b.day}`);

      // new Date(a.activitydate) - new Date(b.activitydate))
      setFilteredEvents(sex);
      setTodaysEvents(to);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, events]);

  const onMapPress = () => {
    setForYou(false);
  };

  const onSelPress = scope => {
    const evnts = events.filter(
      e => e.scope === scope._id && e.datetime > yesterday.getTime(),
    );
    // .sort(function (a, b) {
    //   const dateOfA = new Date(`${a.year}-${a.month}-${a.day}`);
    //   const dateOfB = new Date(`${b.year}-${b.month}-${b.day}`);
    //   return dateOfA > dateOfB;
    // });

    setSelEvents(evnts);
    setIsScopeSelected(true);
    setIsModalVisible(false);
    setCatherine(`${scope.name}`);
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{translateX: x.value}],
  }));

  const onSwipeGesture2 = useAnimatedGestureHandler(
    {
      onStart: e => {
        x.value = withTiming(0, {duration: 1000, useNativeDriver: false});
      },
      onActive: e => {
        x.value = e.translationX;
      },
      onEnd: e => {
        if (x.value < -5) {
          //unlock
          x.value = withTiming(0, {duration: 700, useNativeDriver: false});

          setIsTabActive(false);
        } else {
          //reset
          x.value = withTiming(0, {duration: 700, useNativeDriver: false});
          // setIsTabActive(true);
        }
      },
    },
    [],
  );

  const onSwipeGesture3 = useAnimatedGestureHandler(
    {
      onStart: e => {
        x.value = withTiming(0, {duration: 1000, useNativeDriver: false});
      },
      onActive: e => {
        x.value = e.translationX;
      },
      onEnd: e => {
        if (x.value > 5) {
          //unlock
          x.value = withTiming(0, {duration: 700, useNativeDriver: false});

          setIsTabActive(true);
        } else {
          //reset
          x.value = withTiming(0, {duration: 700, useNativeDriver: false});
          // setIsTabActive(true);
          // setIsTabActive(true);
        }
      },
    },
    [],
  );

  return (
    <SafeAreaView style={styles.mainWrapper}>
      {isLoading ? (
        <InstagramLoader active />
      ) : (
        <>
          <View style={styles.container}>
            <TouchableOpacity
              style={{flex: 0.15}}
              onPress={() => navigation.openDrawer()}>
              <Image
                style={styles.topProfilePic}
                source={
                  me?.photo
                    ? {uri: me?.photo}
                    : require('../../../assets/images/user.png')
                }
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
          style={{justifyContent: 'center', flex: 0.37}}
          onPress={onNotificationsPress}>
          <Feather name="bell" size={28} color={'black'} />
        </TouchableOpacity> */}

            {isTabActive === false ? (
              <View style={styles.rightCorner}>
                <TouchableOpacity
                  style={styles.cathView}
                  onPress={() => setIsModalVisible(true)}>
                  <Text style={styles.cathText}>{catherine}</Text>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={23}
                    color={'gray'}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              // <View style={styles.rightCorner}>
              //   <TouchableOpacity
              //     style={{
              //       backgroundColor: Colors.redditDarkerGray,
              //       borderRadius: 6,
              //       justifyContent: 'center',
              //       marginRight: 10,
              //       flexDirection: 'row',
              //       alignItems: 'center',
              //       paddingLeft: 10,
              //       paddingRight: 10,
              //     }}
              //     // onPress={() => setIsModalVisible(true)}
              //   >
              //     <MaterialCommunityIcons
              //       name="map"
              //       size={23}
              //       color={Colors.primary}
              //     />
              //     <Text
              //       style={{
              //         fontWeight: '600',
              //         marginLeft: 5,
              //         color: Colors.primary,
              //       }}>
              //       Map View
              //     </Text>
              //   </TouchableOpacity>
              // </View>
              <View style={styles.rightCorner}>
                <TouchableOpacity
                  onPress={onMapPress}
                  style={{
                    backgroundColor: Colors.primary,
                    borderRadius: 6,
                    justifyContent: 'center',
                    marginRight: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                  // onPress={() => setIsModalVisible(true)}
                >
                  <MaterialCommunityIcons name="map" size={23} color="white" />
                  <Text
                    style={{
                      fontWeight: '600',
                      marginLeft: 5,
                      color: 'white',
                    }}>
                    Map View
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 15,
              paddingRight: 5,
              justifyContent: 'space-around',
              // paddingVertical: 8,
              paddingTop: 10,
              borderBottomWidth: 1,
              borderBottomColor: Colors.subtleGray,
            }}>
            <TouchableOpacity
              onPress={() => {
                setForYou(true);
                setIsTabActive(true);
              }}
              style={{
                // backgroundColor: 'blue',
                paddingBottom: 6,
                borderBottomWidth: isTabActive ? 3 : 0,
                borderColor: isTabActive ? Colors.primary : null,
              }}>
              <Text style={{fontWeight: '700', fontSize: 16}}>For you</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // backgroundColor: 'blue',
                paddingBottom: 6,
                borderBottomWidth: isTabActive === false ? 3 : 0,
                borderColor: isTabActive === false ? Colors.primary : null,
              }}
              onPress={() => {
                setForYou(true);
                setIsTabActive(false);
              }}>
              <Text style={{fontWeight: '700', fontSize: 16}}>Following</Text>
            </TouchableOpacity>
          </View>
          {/* 
      <View style={styles.switchTab}>
        <CustomSwitch
          selectionMode={1}
          option1="List view"
          option2="Map view"
          onSelectSwitch={onSelectSwitch}
        />
      </View> */}
          {forYou ? (
            isTabActive ? (
              <View style={{flex: 1, width: '100%', height: '100%'}}>
                <PanGestureHandler onGestureEvent={onSwipeGesture2}>
                  <Animated.View
                    style={[
                      {
                        flex: 1,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        // backgroundColor: 'red',
                        minHeight: 650,
                        // top: 135,
                        // bottom: 0,
                      },
                      animatedContainerStyle,
                    ]}>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      refreshControl={
                        <RefreshControl
                          refreshing={refresh}
                          onRefresh={() => pullMe()}
                        />
                      }
                      style={styles.wrapper}>
                      <View style={{flex: 1, width: '100%', height: '100%'}}>
                        {todaysEvents?.map((evt, index) => {
                          const sc = scopes.filter(d => d._id === evt.scope)[0];
                          return (
                            <View key={evt._id}>
                              <TouchableOpacity key={evt._id}>
                                <EventCard
                                  key={evt._id}
                                  event={evt}
                                  host={evt.host}
                                  name={evt.name}
                                  hostName={evt.hostName}
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
                                  user={evt.user}
                                  scp={sc}
                                  date={evt.date}
                                  endDate={evt.endDate}
                                  link={evt.link}
                                  description={evt.description}
                                />
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                      </View>
                    </ScrollView>
                  </Animated.View>
                </PanGestureHandler>
              </View>
            ) : (
              <View style={{flex: 1, width: '100%', height: '100%'}}>
                <PanGestureHandler onGestureEvent={onSwipeGesture3}>
                  <Animated.View
                    style={[
                      {
                        flex: 1,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        // backgroundColor: 'red',
                        minHeight: 650,
                        // top: 135,
                        // bottom: 0,
                      },
                      animatedContainerStyle,
                    ]}>
                    <ScrollView
                      refreshControl={
                        <RefreshControl
                          refreshing={refresh}
                          onRefresh={() => pullMe()}
                        />
                      }
                      style={styles.wrapper}>
                      <>
                        {isScopeSelected ? (
                          <>
                            {selEvents
                              // .sort(
                              //   (a, b) =>
                              //     new Date(`${a.year}-${a.month}-${a.day}`) -
                              //     new Date(`${b.year}-${b.month}-${b.day}`),
                              // )
                              .map((ev, index) => {
                                const sc = scopes.filter(
                                  d => d._id === ev.scope,
                                )[0];
                                return (
                                  <View key={ev._id}>
                                    <TouchableOpacity key={ev._id}>
                                      <EventCard
                                        key={ev._id}
                                        event={ev}
                                        hostName={ev.hostName}
                                        name={ev.name}
                                        startDay={ev.startDay}
                                        year={ev.year}
                                        day={ev.day}
                                        host={ev.host}
                                        month={ev.month}
                                        endDay={ev.endDay}
                                        location={ev.location}
                                        startTime={ev.startTime}
                                        endTime={ev.endTime}
                                        image={ev.image}
                                        id={ev._id}
                                        user={ev.user}
                                        scp={sc}
                                        date={ev.date}
                                        endDate={ev.endDate}
                                        link={ev.link}
                                        description={ev.description}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                );
                              })}
                          </>
                        ) : (
                          <>
                            {filteredEvents
                              // .sort(
                              //   (a, b) =>
                              //     new Date(`${a.year}-${a.month}-${a.day}`) -
                              //     new Date(`${b.year}-${b.month}-${b.day}`),
                              // )
                              .map((evt, index) => {
                                const sc = scopes.filter(
                                  d => d._id === evt.scope,
                                )[0];
                                return (
                                  <View key={evt._id}>
                                    <TouchableOpacity key={evt._id}>
                                      <EventCard
                                        key={evt._id}
                                        event={evt}
                                        host={evt.host}
                                        name={evt.name}
                                        hostName={evt.hostName}
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
                                        user={evt.user}
                                        scp={sc}
                                        date={evt.date}
                                        endDate={evt.endDate}
                                        link={evt.link}
                                        description={evt.description}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                );
                              })}
                          </>
                        )}
                      </>
                    </ScrollView>
                  </Animated.View>
                </PanGestureHandler>
              </View>
            )
          ) : (
            <NewMap evs={todaysEvents} />
          )}

          {/* <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
            }
            style={styles.wrapper}>
            {isTabActive === 'cat' && (
              <>
                {isScopeSelected ? (
                  <>
                    {selEvents
                      // .sort(
                      //   (a, b) =>
                      //     new Date(`${a.year}-${a.month}-${a.day}`) -
                      //     new Date(`${b.year}-${b.month}-${b.day}`),
                      // )
                      .map((ev, index) => {
                        return (
                          <View key={ev._id}>
                            <TouchableOpacity key={ev._id}>
                              <EventCard
                                key={ev._id}
                                event={ev}
                                hostName={ev.hostName}
                                name={ev.name}
                                startDay={ev.startDay}
                                year={ev.year}
                                day={ev.day}
                                host={ev.host}
                                month={ev.month}
                                endDay={ev.endDay}
                                location={ev.location}
                                startTime={ev.startTime}
                                endTime={ev.endTime}
                                image={ev.image}
                                id={ev._id}
                                user={ev.user}
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {filteredEvents
                      // .sort(
                      //   (a, b) =>
                      //     new Date(`${a.year}-${a.month}-${a.day}`) -
                      //     new Date(`${b.year}-${b.month}-${b.day}`),
                      // )
                      .map((evt, index) => {
                        return (
                          <View key={evt._id}>
                            <TouchableOpacity key={evt._id}>
                              <EventCard
                                key={evt._id}
                                event={evt}
                                host={evt.host}
                                name={evt.name}
                                hostName={evt.hostName}
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
                                user={evt.user}
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </>
                )}
              </>
            )}
          </ScrollView> */}
        </>
      )}

      {/* {isTabActive && (
        <NewMap evs={isScopeSelected ? selEvents : filteredEvents} />
      )} */}

      <TouchableWithoutFeedback onPress={closeModal}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={closeModal}
            style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#000000AA',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  paddingHorizontal: 16,
                  // maxHeight: deviceHeight * 0.4,
                  paddingBottom: 12,
                  marginTop: 60,
                  height: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{'        '}</Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      textAlign: 'center',
                      fontWeight: '600',
                      margin: 5,
                      paddingTop: 5,
                    }}>
                    Select scope
                  </Text>

                  <TouchableOpacity
                    onPress={() => setIsModalVisible(false)}
                    style={{paddingTop: 10}}>
                    <Feather
                      name="x"
                      size={25}
                      color="black"
                      backgroundColor="white"
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      paddingBottom: 70,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsModalVisible(false);
                        setIsScopeSelected(false);
                        setCatherine('All Scopes');
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        marginBottom: 8,
                      }}>
                      <Ionicons name="home-outline" size={30} color={'black'} />
                      <View
                        style={{
                          marginLeft: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#182e44',
                            fontSize: 16,
                            fontWeight: '600',
                          }}>
                          All Scopes
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {myScopes.map(scope => {
                      return (
                        <View key={scope._id}>
                          <ScrollView>
                            <TouchableOpacity
                              onPress={() => onSelPress(scope)}
                              key={scope.id}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 3,
                                marginBottom: 8,
                                height: '100%',
                              }}>
                              <Image
                                source={
                                  scope.photo
                                    ? {uri: scope.photo}
                                    : require('../../../assets/images/logo3.jpg')
                                }
                                style={{
                                  width: 35,
                                  height: 35,
                                  borderRadius: 100,
                                  borderWidth: 0,
                                }}
                              />
                              <View
                                style={{
                                  marginLeft: 15,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: '#182e44',
                                    fontSize: 16,
                                    fontWeight: '600',
                                  }}>
                                  {scope.name}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </ScrollView>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingVertical: 10,
  },
  container: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent: 'space-between',
    // marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: 8,
    // paddingBottom: 15,
  },
  topLogo: {
    width: 31.5,
    height: 31.5,
  },
  topProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  rightIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    // flex: 0.72,
  },
  singleLeftIcon: {marginHorizontal: 5},
  upcomingTextView: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upcomingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  smallUpcomingText: {
    color: Colors.primary,
  },
  switchTab: {
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // marginBottom: 10,
  },
  cathView: {
    backgroundColor: Colors.redditDarkerGray,
    borderRadius: 6,
    justifyContent: 'center',
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 3,
    // flex: 1,
  },
  cathText: {
    fontWeight: '600',
    fontSize: 14,
  },
  rightCorner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // marginRight: 5,
    // flex: 0.5,
  },
});

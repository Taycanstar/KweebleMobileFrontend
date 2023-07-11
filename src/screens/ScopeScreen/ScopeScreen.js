import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Button,
  ImageBackground,
  StyleSheet,
  Platform,
  Animated,
  RefreshControl,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserProfile} from '../../store/actions';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EventCard from '../../components/EventCard';
import ProductCard from '../../components/ProductCard';
import {
  FacebookLoader,
  InstagramLoader,
} from 'react-native-easy-content-loader';
import ECard from '../../components/ECard';
import SearchCard from '../../components/SearchCard/';
import {BlurView} from '@react-native-community/blur';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 300;
const screenWidth = Dimensions.get('window').width;
const SCREEN_WIDTH = Dimensions.get('window').width;

// const MAX_HEIGHT = 250;
const TITLE_MIN_HEIGHT = 30;
const TITLE_MAX_HEIGHT = 70;

// const MAX_HEIGHT = 250;
// const TITLE_MIN_HEIGHT = 30;
// const TITLE_MAX_HEIGHT = 70;

const scrollY = new Animated.Value(0);

const headerTitle = scrollY.interpolate({
  inputRange: [
    0,
    MAX_HEIGHT - MIN_HEIGHT,
    MAX_HEIGHT - MIN_HEIGHT + 0 + TITLE_MIN_HEIGHT,
    MAX_HEIGHT - MIN_HEIGHT + 0 + TITLE_MIN_HEIGHT + 26,
  ],
  outputRange: [-20, -20, -20, 0],
  extrapolate: 'clamp',
});

const ScopeScreen = props => {
  const data = props?.route?.params?.data;
  const datx = props?.route?.params?.joined;
  const photo = data?.photo;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [result, setResult] = useState(undefined);
  const [res, setRes] = useState(undefined);
  const [activeTab, setActiveTab] = useState('events');
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState(false);
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [joined, setJoined] = useState(false);
  const [members, setMembers] = useState([]);
  const [scopeEvents, setScopeEvents] = useState([]);
  const [scopeProducts, setScopeProducts] = useState([]);
  const [currScope, setCurrScope] = useState('');
  const [scopes, setScopes] = useState([]);
  const me = useSelector(state => state.Reducers.userData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [popupSelection, setPopupSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModView, setIsModView] = useState(false);
  const [pubEvents, setPubEvents] = useState([]);

  const pullMe = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  // const pullLoad = () => {
  //   setLoad(true);

  //   setTimeout(() => {
  //     setLoad(false);
  //   }, 1000);
  // };

  useEffect(() => {
    let mounted = true;
    const loadScopes = async () => {
      try {
        setIsLoading(true);
        const {data} = await axios.get('https://kweeble.herokuapp.com/scopes');
        if (mounted) {
          setScopes(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadScopes();

    const interval = setInterval(() => {
      setIsLoading(false);
    }, 3000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadScopes = async () => {
      try {
        const {data} = await axios.get('https://kweeble.herokuapp.com/scopes');
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
  }, [refresh]);

  useEffect(() => {
    let mounted = true;
    const loadUsers = async () => {
      if (mounted) {
        try {
          const {data} = await axios.get('https://kweeble.herokuapp.com/api');

          setUsers(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    loadUsers();
    // const interval = setInterval(() => {
    //   loadUsers();
    // }, 5000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [refresh]);

  useEffect(() => {
    let mounted = true;
    const loadProducts = async () => {
      if (mounted) {
        try {
          const {data} = await axios.get(
            'https://kweeble.herokuapp.com/products/',
          );

          setProducts(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    loadProducts();
    // const interval = setInterval(() => {
    //   loadProducts();
    // }, 5000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [refresh, load]);

  useEffect(() => {
    let mounted = true;
    const loadEvents = async () => {
      if (mounted) {
        try {
          const {data} = await axios.get(
            'https://kweeble.herokuapp.com/events/',
          );
          if (mounted) {
            setEvents(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    loadEvents();
    // const interval = setInterval(() => {
    //   loadEvents();
    // }, 5000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [refresh]);

  const onBackPress = () => {
    navigation.goBack();
  };

  let today = new Date();
  let tomorrow = new Date();
  let yesterday = new Date();
  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);

  useEffect(() => {
    const usrs = data.members.map(mem => {
      return users.filter(u => u._id === mem);
    });

    const newArray = usrs.flat(1);

    setMembers(newArray);
  }, [data.members, users, refresh]);

  useEffect(() => {
    const fev = events.filter(e => e.datetime > yesterday.getTime());
    const scopeEv = fev
      .filter(ev => ev.scope === data._id)
      .sort(
        (a, b) =>
          new Date(`${a.year}-${a.month}-${a.day}`) -
          new Date(`${b.year}-${b.month}-${b.day}`),
      );

    const pubEvs = scopeEv.filter(v => v.modOnly === false);

    setPubEvents(pubEvs);
    setScopeEvents(scopeEv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, events]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const scopePr = products.filter(pr => pr.scope === data._id);
      setScopeProducts(scopePr);
    }
    return () => {
      mounted = false;
    };
  }, [data._id, products, refresh]);

  const onJoinPress = async () => {
    if (joined === false) {
      try {
        const response = await axios.put(
          `https://kweeble.herokuapp.com/auth/${me._id}`,
          // `http://localhost:3000/auth/${me._id}`,
          {
            id: me._id,
            scope: data._id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const res = await axios.put(
          `https://kweeble.herokuapp.com/scopes/${data._id}`,
          // `http://localhost:3000/scopes/${data._id}`,
          {
            id: data._id,
            member: me._id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        setJoined(true);
        // pullLoad();
      } catch (error) {
        console.log(error, 'nobitch');
      }
    } else {
      try {
        const res = await axios.put(
          `https://kweeble.herokuapp.com/scopes/del/${data._id}`,
          // `http://localhost:3000/scopes/del/${data._id}`,
          {
            id: data._id,
            mem: me._id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const resp = await axios.put(
          `https://kweeble.herokuapp.com/auth/del/${me._id}`,
          // `http://localhost:3000/scopes/del/${data._id}`,
          {
            id: me._id,
            scope: data._id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        // pullLoad();
        setJoined(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const mys = scopes.filter(sc => sc._id === data._id);
      const mys2 = mys[0];
      // console.log(scopes, 'ji');
      setCurrScope(mys2);
    }
    return () => {
      mounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, scopes]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      data.members.map((memb, i) => {
        if (memb === me._id) {
          setJoined(true);
        }
      });
    }
    return () => {
      mounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

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

  const psex = async () => {
    try {
      const response = await axios.post(
        `https://kweeble.herokuapp.com/events/modonly`,
        // `http://localhost:3000/auth/${data._id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(response, 'hey');
    } catch (error) {
      console.log(error);
    }
  };

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const blurOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
    outputRange: [MAX_HEIGHT, MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-MAX_HEIGHT, 0],
    outputRange: [2, 1], // Scale up by 2 when scrolled down by MAX_HEIGHT
    extrapolateLeft: 'extend', // Allow extrapolation when scrolled down
    extrapolateRight: 'clamp', // Don't extrapolate when scrolled up
  });
  const [imageAspectRatio, setImageAspectRatio] = useState(1);

  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    // Get the screen width
    const screenWidth = Dimensions.get('window').width;

    // Set the max width to a slightly larger value than the screen width
    setMaxWidth(screenWidth + 100);
  }, []);

  // Inside your component, after fetching the image source, calculate the aspect ratio
  useEffect(() => {
    if (currScope?.photo) {
      Image.getSize(currScope?.photo, (width, height) => {
        const aspectRatio = width / height;
        setImageAspectRatio(aspectRatio);
      });
    }
  }, [currScope?.photo]);

  const [textColor, setTextColor] = useState('white');

  const [scale, setScale] = useState(1);

  const [imageWidth, setImageWidth] = useState(SCREEN_WIDTH * 1.15 * scale);

  const handleScroll = event => {
    // const {contentOffset} = event.nativeEvent;
    // const scrollY = contentOffset.y;

    const {contentOffset} = event.nativeEvent;

    // Update the scrollY value using setValue
    scrollY.setValue(contentOffset.y);

    // Determine the new width based on the scroll position
    const newWidth = contentOffset.y >= 0 ? SCREEN_WIDTH : SCREEN_WIDTH * 2.15;
    setImageWidth(newWidth);

    const newColor = scrollY <= 150 ? 'white' : 'rgba(52,52,52,0)';
    setTextColor(newColor);
  };

  return (
    // <ScrollView style={styles.container}>
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {isLoading ? (
        <View style={{marginTop: 50}}>
          <InstagramLoader active />
        </View>
      ) : (
        <>
          <Animated.View
            style={[
              {
                paddingHorizontal: 10,
                paddingTop: 50,
                paddingBottom: 5,
                backgroundColor: 'rgba(52,52,52,52,0)',
                flexDirection: 'row',
                zIndex: 5,
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}>
            <Pressable onPress={onBackPress} style={styles.backarrow}>
              <MaterialIcons name="arrow-back-ios" size={17} color="white" />
            </Pressable>

            <View style={styles.threeDots}>
              <MaterialCommunityIcons
                onPress={() => changeModalVisible(true)}
                name="dots-horizontal"
                size={17}
                color="white"
              />
            </View>
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: headerHeight,
              zIndex: 3,
              overflow: 'visible',
              flex: 1,
            }}>
            <ScrollView
              style={{height: 350, overflow: 'visible', flex: 1}}
              scrollEventThrottle={1}
              onScroll={handleScroll}>
              <Animated.Image
                resizeMode="cover"
                source={
                  photo
                    ? {uri: currScope?.photo}
                    : require('../../../assets/images/primary.png')
                }
                style={{
                  width: imageWidth,
                  aspectRatio: imageAspectRatio,
                  transform: [{scale: imageScale}],
                }}
              />
              <AnimatedBlurView
                style={{
                  position: 'absolute',
                  top: 0,
                  height: '100%',
                  width: '100%',
                  opacity: blurOpacity,
                }}
                blurType="light"
                blurAmount={10}
                blurRadius={10}
                overlayColor={'rgba(255, 255, 255, 0.3)'}
              />
            </ScrollView>
          </Animated.View>
          <Animated.View
            style={{
              bottom: headerTitle,
              //   bottom: 0,
              zIndex: 13,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Text
              style={{
                color: textColor,
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 10,
                textAlign: 'center',
                position: 'absolute',
                top: -33,
              }}>
              {currScope?.name}
            </Text>
          </Animated.View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
            }
            showsVerticalScrollIndicator={false}
            style={{flex: 1, zIndex: 10, marginTop: 0}}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {nativeEvent: {contentOffset: {y: scrollY}}},
            ])}>
            <Animated.View style={styles.profileInfo}>
              <View style={styles.titlefame}>
                <Text style={styles.fame}>{currScope?.name}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  justifyContent: 'space-between',
                  paddingTop: 10,
                  // marginTop: 10,
                  marginBottom: 10,
                  borderBottomColor: Colors.subtleGray,
                  borderBottomWidth: 1,
                  zIndex: 12,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setActiveTab('events');
                    // pullLoad();
                  }}
                  style={{
                    // paddingTop: 5,
                    borderBottomWidth: 3,
                    borderBottomColor:
                      activeTab === 'events' ? Colors.primary : 'white',
                    paddingBottom: 10,
                  }}>
                  <Text style={{fontWeight: '600', fontSize: 16}}>Events</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => {
                    setActiveTab('products');
                    // pullLoad();
                  }}
                  style={{
                    // paddingTop: 5,
                    borderBottomWidth: 3,
                    borderBottomColor:
                      activeTab === 'products' ? Colors.primary : 'white',
                    paddingBottom: 10,
                  }}>
                  <Text style={{fontWeight: '600', fontSize: 16}}>
                    Products
                  </Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={() => {
                    setActiveTab('about');
                  }}
                  style={{
                    // paddingTop: 5,
                    borderBottomWidth: 3,
                    borderBottomColor:
                      activeTab === 'about' ? Colors.primary : 'white',
                    paddingBottom: 10,
                  }}>
                  <Text style={{fontWeight: '600', fontSize: 16}}>About</Text>
                </TouchableOpacity>
                {currScope?.membership === 'Private' &&
                joined === false ? null : (
                  <TouchableOpacity
                    onPress={onJoinPress}
                    style={joined ? styles.editBtn : styles.editBtn2}>
                    <Text style={joined ? styles.editTxt : styles.editTxt2}>
                      {joined ? 'Joined' : 'Join'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={{zIndex: 14}}>
                {(() => {
                  switch (activeTab) {
                    case 'about':
                      return (
                        <>
                          {currScope?.membership === 'Private' &&
                          joined === false ? (
                            <>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: '100%',
                                  width: '100%',
                                }}>
                                <MaterialCommunityIcons
                                  name="eye-off"
                                  size={60}
                                  color="black"
                                />
                                <Text
                                  style={{
                                    paddingHorizontal: 25,
                                    fontSize: 16,
                                    fontWeight: '600',
                                    marginTop: 15,
                                    marginBottom: 15,
                                    textAlign: 'center',
                                  }}>
                                  {currScope?.name} is a private Scope
                                </Text>
                                <Text
                                  style={{
                                    paddingHorizontal: 25,
                                    textAlign: 'center',
                                    fontSize: 14,
                                    color: 'gray',
                                  }}>
                                  Only moderators or approved members can view,
                                  post and interact with the scope. You can join
                                  this scope by invitation only.{' '}
                                </Text>
                              </View>
                            </>
                          ) : (
                            <View>
                              <View
                                style={{
                                  // borderBottomWidth: 2.5,
                                  borderBottomColor: Colors.redditDarkerGray,
                                  marginHorizontal: 15,
                                }}>
                                <Text
                                  style={{
                                    paddingBottom: 10,
                                    fontSize: 16,
                                    fontWeight: '600',
                                  }}>
                                  Scope info
                                </Text>
                              </View>
                              <View
                                style={{
                                  borderBottomWidth: 1.5,
                                  marginBottom: 10,
                                  borderBottomColor: Colors.redditDarkerGray,
                                }}>
                                <Text
                                  style={{
                                    paddingTop: 10,
                                    paddingHorizontal: 15,
                                    paddingBottom: 10,
                                    lineHeight: 22,
                                  }}>
                                  {/* {currScope !== undefined
                              ? currScope.details
                              : data.details} */}
                                  {currScope?.info}
                                </Text>
                              </View>

                              <View
                                style={{
                                  // borderBottomWidth: 2.5,
                                  borderBottomColor: Colors.redditDarkerGray,
                                  marginHorizontal: 15,
                                  // marginBottom: 10,
                                }}>
                                <Text
                                  style={{
                                    paddingBottom: 10,
                                    fontSize: 16,
                                    fontWeight: '600',
                                  }}>
                                  Members
                                </Text>
                              </View>
                              <View style={{marginHorizontal: 5}}>
                                {members.map(person => {
                                  return (
                                    <View key={person._id}>
                                      <SearchCard person={person} />
                                    </View>
                                  );
                                })}
                              </View>
                            </View>
                          )}
                        </>
                      );

                    case 'events':
                      return (
                        <>
                          {currScope?.membership === 'Private' &&
                          joined === false ? (
                            <>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: '100%',
                                  width: '100%',
                                }}>
                                <MaterialCommunityIcons
                                  name="eye-off"
                                  size={60}
                                  color="black"
                                />
                                <Text
                                  style={{
                                    paddingHorizontal: 25,
                                    fontSize: 16,
                                    fontWeight: '600',
                                    marginTop: 15,
                                    marginBottom: 15,
                                    textAlign: 'center',
                                  }}>
                                  {currScope?.name} is a private Scope
                                </Text>
                                <Text
                                  style={{
                                    paddingHorizontal: 25,
                                    textAlign: 'center',
                                    fontSize: 14,
                                    color: 'gray',
                                  }}>
                                  Only moderators or approved members can view,
                                  post and interact with the scope. You can join
                                  this scope by invitation only.{' '}
                                </Text>
                              </View>
                            </>
                          ) : isModView ? (
                            <>
                              <View style={{paddingHorizontal: 15}}>
                                {scopeEvents
                                  // .sort(function (a, b) {
                                  //   const dateOfA = new Date(
                                  //     `${a.month}-${a.year}-${a.day}`,
                                  //   );
                                  //   const dateOfB = new Date(
                                  //     `${b.month}-${b.year}-${b.day}`,
                                  //   );
                                  //   return dateOfA < dateOfB;
                                  // })
                                  .map((ev, i) => {
                                    return (
                                      <View key={ev._id}>
                                        <TouchableOpacity key={ev._id}>
                                          <EventCard
                                            key={ev._id}
                                            event={ev}
                                            name={ev.name}
                                            startDay={ev.startDay}
                                            year={ev.year}
                                            day={ev.day}
                                            month={ev.month}
                                            endDay={ev.endDay}
                                            location={ev.location}
                                            startTime={ev.startTime}
                                            endTime={ev.endTime}
                                            image={ev.image}
                                            id={ev._id}
                                            user={ev.user}
                                            // scp={sc}
                                            date={ev.date}
                                            endDate={ev.endDate}
                                            link={ev.link}
                                            description={ev.description}
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    );
                                  })}
                              </View>
                            </>
                          ) : (
                            <>
                              <View style={{paddingHorizontal: 15}}>
                                {pubEvents
                                  // .sort(function (a, b) {
                                  //   const dateOfA = new Date(
                                  //     `${a.month}-${a.year}-${a.day}`,
                                  //   );
                                  //   const dateOfB = new Date(
                                  //     `${b.month}-${b.year}-${b.day}`,
                                  //   );
                                  //   return dateOfA < dateOfB;
                                  // })
                                  .map((ev, i) => {
                                    return (
                                      <View key={ev._id}>
                                        <TouchableOpacity key={ev._id}>
                                          <EventCard
                                            key={ev._id}
                                            event={ev}
                                            name={ev.name}
                                            startDay={ev.startDay}
                                            year={ev.year}
                                            day={ev.day}
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
                              </View>
                            </>
                          )}
                        </>
                      );

                    case 'products':
                      return (
                        <>
                          {currScope?.membership === 'Private' &&
                          joined === false ? (
                            <>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: '100%',
                                  width: '100%',
                                }}>
                                <MaterialCommunityIcons
                                  name="eye-off"
                                  size={60}
                                  color="black"
                                />
                                <Text
                                  style={{
                                    paddingHorizontal: 25,
                                    fontSize: 16,
                                    fontWeight: '600',
                                    marginTop: 15,
                                    marginBottom: 15,
                                    textAlign: 'center',
                                  }}>
                                  {currScope?.name} is a private Scope
                                </Text>
                                <Text
                                  style={{
                                    paddingHorizontal: 25,
                                    textAlign: 'center',
                                    fontSize: 14,
                                    color: 'gray',
                                  }}>
                                  Only moderators or approved members can view,
                                  post and interact with the scope. You can join
                                  this scope by invitation only.{' '}
                                </Text>
                              </View>
                            </>
                          ) : (
                            <View
                              style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                paddingLeft: 15,
                              }}>
                              {scopeProducts
                                .sort(function (a, b) {
                                  return a.createdAt > b.createdAt;
                                })
                                .map(product => {
                                  return (
                                    <View key={product._id}>
                                      <ProductCard product={product} />
                                      {/* <TouchableOpacity
                                        onPress={() =>
                                          navigation.navigate(
                                            'MarketplaceStack',
                                            {
                                              screen: 'Product',
                                              params: {
                                                title: product.title,
                                                id: product._id,
                                                price: product.price,
                                                seller: product.seller,
                                                description:
                                                  product.description,
                                                photos: product.photos,
                                                condition: product.condition,
                                                sellerPhoto:
                                                  product.sellerPhoto,
                                                sellerUsername:
                                                  product.username,
                                                sellerName: product.sellerName,
                                                sellerGradeLevel:
                                                  product.sellerGradeLevel,
                                                sellerMajor:
                                                  product.sellerMajor,
                                                users,
                                              },
                                            },
                                          )
                                        }
                                        style={{
                                          marginRight: 10,
                                          borderRadius: 10,
                                          backgroundColor: 'white',
                                          marginBottom: 10,
                                          justifyContent: 'center',
                                          shadowColor: '#000',
                                          shadowOffset: {
                                            width: 0,
                                            height: 2,
                                          },
                                          shadowOpacity: 0.25,
                                          shadowRadius: 3.84,

                                          elevation: 5,
                                        }}>
                                        <Image
                                          style={{
                                            width: 175,
                                            height: 210,
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10,
                                          }}
                                          source={{uri: product.photos[0]}}
                                        />
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 10,
                                            paddingVertical: 10,
                                          }}>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: 18,
                                                fontWeight: '700',
                                                letterSpacing: 1,
                                              }}>
                                              {`$${product.price}.00`}
                                            </Text>
                                          </View>
                                    
                                        </View>
                                      </TouchableOpacity> */}
                                    </View>
                                  );
                                })}
                            </View>
                          )}
                        </>
                      );
                    default:
                      return null;
                  }
                })()}
              </View>
            </Animated.View>
            {/* <View style={{height: 1000}}></View> */}
          </ScrollView>
          <Modal
            visible={isModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => changeModalVisible(false)}>
            <View style={{height: '100%', flex: 1}}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{
                  // flex: 1,
                  height: '100%',
                  // paddingTop: 60,
                  width: '100%',
                  backgroundColor: '#000000AA',
                  // justifyContent: 'flex-start',
                }}>
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      marginTop: 60,
                      backgroundColor: '#fff',
                      width: '100%',
                      borderTopRightRadius: 20,
                      borderTopLeftRadius: 20,
                      paddingHorizontal: 15,
                      height: '100%',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // paddingHorizontal: 5,
                        alignItems: 'center',
                        paddingBottom: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() => setIsModalVisible(false)}
                        style={{paddingTop: 10, borderRadius: 100}}>
                        <MaterialIcons
                          // onPress={() => navigation.goBack()}
                          name="arrow-back-ios"
                          size={20}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>

                    <ScrollView vertical showsVerticalScrollIndicator={false}>
                      <TouchableOpacity
                        onPress={() => {
                          setIsModalVisible(false);
                          setActiveTab('about');
                        }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 15,
                        }}>
                        <View
                          style={{
                            // marginLeft: 50,
                            marginRight: 10,
                            backgroundColor: Colors.subtleGray,
                            height: 45,
                            width: 45,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Feather name="info" size={28} color="black" />
                        </View>
                        <Text style={{fontSize: 16, fontWeight: '500'}}>
                          Scope info
                        </Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                    onPress={() => setIsModalVisible(false)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        // marginLeft: 50,
                        marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        height: 45,
                        width: 45,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="google-circles-communities"
                        size={28}
                        color="black"
                      />
                    </View>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>
                      Learn more about Scopes
                    </Text>
                  </TouchableOpacity> */}
                      {joined === true ? (
                        <TouchableOpacity
                          onPress={async () => {
                            setIsModalVisible(false);
                            try {
                              const res = await axios.put(
                                `https://kweeble.herokuapp.com/scopes/del/${data._id}`,
                                // `http://localhost:3000/scopes/del/${data._id}`,
                                {
                                  id: data._id,
                                  mem: me._id,
                                },
                                {
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                },
                              );
                              setJoined(false);
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 15,
                          }}>
                          <View
                            style={{
                              // marginLeft: 50,
                              marginRight: 10,
                              backgroundColor: Colors.subtleGray,
                              height: 45,
                              width: 45,
                              borderRadius: 100,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Feather
                              name="minus-circle"
                              size={28}
                              color="black"
                            />
                          </View>
                          <Text style={{fontSize: 16, fontWeight: '500'}}>
                            Leave Scope
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <>
                          <TouchableOpacity
                            onPress={async () => {
                              setIsModalVisible(false);
                              try {
                                const response = await axios.put(
                                  `https://kweeble.herokuapp.com/auth/${me._id}`,
                                  // `http://localhost:3000/auth/${me._id}`,
                                  {
                                    id: me._id,
                                    scope: data._id,
                                  },
                                  {
                                    headers: {
                                      'Content-Type': 'application/json',
                                    },
                                  },
                                );

                                const res = await axios.put(
                                  `https://kweeble.herokuapp.com/scopes/${data._id}`,
                                  // `http://localhost:3000/scopes/${data._id}`,
                                  {
                                    id: data._id,
                                    member: me._id,
                                  },
                                  {
                                    headers: {
                                      'Content-Type': 'application/json',
                                    },
                                  },
                                );
                                setJoined(true);
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 15,
                            }}>
                            <View
                              style={{
                                // marginLeft: 50,
                                marginRight: 10,
                                backgroundColor: Colors.subtleGray,
                                height: 45,
                                width: 45,
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Feather
                                name="arrow-right-circle"
                                size={28}
                                color="black"
                              />
                            </View>
                            <Text style={{fontSize: 16, fontWeight: '500'}}>
                              Join Scope
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}

                      {data.moderators.includes(me._id) ? (
                        <>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 15,
                            }}
                            onPress={() => {
                              setIsModalVisible(false);
                              navigation.navigate('EditScopeDetailsScreen', {
                                data: data,
                              });
                            }}>
                            <View
                              style={{
                                // marginLeft: 50,
                                marginRight: 10,
                                backgroundColor: Colors.subtleGray,
                                height: 45,
                                width: 45,
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Ionicons
                                name="shield"
                                size={28}
                                color={Colors.primary}
                              />
                            </View>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: Colors.primary,
                              }}>
                              Mod tools
                            </Text>
                          </TouchableOpacity>

                          {isModView ? (
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 15,
                              }}
                              onPress={() => {
                                setIsModalVisible(false);
                                setIsModView(false);
                              }}>
                              <View
                                style={{
                                  // marginLeft: 50,
                                  marginRight: 10,
                                  backgroundColor: Colors.subtleGray,
                                  height: 45,
                                  width: 45,
                                  borderRadius: 100,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  style={{
                                    height: 35,
                                    width: 35,
                                    borderRadius: 100,
                                  }}
                                  source={require('../../../assets/images/logo3.jpg')}
                                />
                              </View>

                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: '500',
                                  color: Colors.primary,
                                }}>
                                Public View
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 15,
                              }}
                              onPress={() => {
                                setIsModalVisible(false);
                                setIsModView(true);
                              }}>
                              <View
                                style={{
                                  // marginLeft: 50,
                                  marginRight: 10,
                                  backgroundColor: Colors.subtleGray,
                                  height: 45,
                                  width: 45,
                                  borderRadius: 100,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  style={{
                                    height: 35,
                                    width: 35,
                                    borderRadius: 100,
                                  }}
                                  source={require('../../../assets/images/dark.jpg')}
                                />
                                {/* <Image
                                style={{
                                  height: 35,
                                  width: 35,
                                  borderRadius: 100,
                                }}
                                source={require('../../../assets/images/logo3.jpg')}
                              /> */}
                              </View>

                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: '500',
                                  color: Colors.primary,
                                }}>
                                Mod View
                              </Text>
                            </TouchableOpacity>
                          )}
                        </>
                      ) : null}
                    </ScrollView>
                  </View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    </View>
    // </ScrollView>
  );
};

export default ScopeScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
  },
  max: {
    // position: 'relative',
    width: '100%',
    // minHeight: 300,
    // maxHeight: 450,
    height: 350,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: Colors.white,
    // width: '100%',
    flex: 1,
  },
  titlefame: {
    zIndex: 11,
    position: 'absolute',
    // top: -10,
    width: '100%',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-start',
    // flexWrap: 'wrap',
    paddingTop: 62,
  },
  //   titlefame: {
  //     zIndex: 11,
  //     position: 'absolute',
  //     // top: -10,
  //     width: null,
  //     height: null,
  //     justifyContent: 'center',
  //   },
  fame: {
    color: 'white',
    fontWeight: '700',
    fontSize: 40,
    paddingLeft: 7,
    paddingRight: 7,

    // position: 'absolute',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    top: -230,
  },
  backarrow: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'flex-end',
    height: 26,
    width: 26,
    justifyContent: 'center',
    borderRadius: 100,
  },
  threeDots: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center',
    height: 26,
    width: 26,
    justifyContent: 'center',
    borderRadius: 100,
  },
  topNav: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    // backgroundColor: 'rgba(52, 52, 52, 0)',
    flexDirection: 'row',
    zIndex: 2,
    justifyContent: 'space-between',
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    overflow: 'visible',
    width: '100%',
    height: '100%',
    minHeight: 500,
    // height: titleHeight,
    // marginTop: MAX_HEIGHT + 90,
    marginTop: MAX_HEIGHT,
    zIndex: 99,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  imageWrapper: {
    zIndex: 10,
    // flex: 1,
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  vector: {
    marginLeft: 50,
    marginRight: 40,
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 100,
  },

  userDetails: {
    // flex: 1,
    flexDirection: 'column',
  },
  infoPrimaryText: {
    color: 'black',
    flexWrap: 'wrap',
    fontWeight: '400',
  },
  infoSecondaryText: {
    color: 'gray',
    fontSize: 12,
  },
  text: {
    // flex: 1,
  },
  gradeLevel: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 10,
  },
  editBtn: {
    borderColor: Colors.primary,
    borderWidth: 2,
    // marginHorizontal: 20,
    // flex: 1,
    justifyContent: 'center',
    borderRadius: 100,
    paddingVertical: 4,
    marginBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary,
  },
  editBtn2: {
    borderColor: Colors.primary,
    borderWidth: 2,
    // marginHorizontal: 20,
    // flex: 1,
    justifyContent: 'center',
    borderRadius: 100,
    paddingVertical: 4,
    marginBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  editTxt: {
    // fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
  },
  editTxt2: {
    // fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.primary,
  },
  dmc: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
    // backgroundColor: Colors.subtleGray,
  },
  dm: {
    backgroundColor: Colors.subtleGray,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginTop: 5,
    marginBottom: 5,
  },
});

/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Button,
  ImageBackground,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  Animated,
  Modal,
  RefreshControl,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserProfile} from '../../store/actions';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 250;
const TITLE_MIN_HEIGHT = 30;
const TITLE_MAX_HEIGHT = 70;
const scrollY = new Animated.Value(0);

const headerHeight = scrollY.interpolate({
  inputRange: [0, MAX_HEIGHT + 10 - MIN_HEIGHT],
  outputRange: [MAX_HEIGHT, MIN_HEIGHT],
  extrapolate: 'clamp',
});

const titleHeight = scrollY.interpolate({
  inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
  outputRange: [TITLE_MAX_HEIGHT, TITLE_MIN_HEIGHT],
  extrapolate: 'clamp',
});

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

const initialState = {
  colorOne: {value: '', name: ''},
  colorTwo: {value: '', name: ''},
  colorThree: {value: '', name: ''},
  colorFour: {value: '', name: ''},
  rawResult: '',
};

const OtherUserProfile = props => {
  const data = props?.route?.params?.data;
  const photo = data?.photo;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [colors, setColors] = useState(initialState);
  const [result, setResult] = useState(undefined);
  const [res, setRes] = useState(undefined);
  const [activeTab, setActiveTab] = useState('info');
  const [refresh, setRefresh] = useState(false);
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [users, setUsers] = useState();
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [font, setFont] = useState(0);
  const [nameLength, setNameLength] = useState(0);
  const [me, setMe] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [areDotsVisible, setAreDotsVisible] = useState(false);
  const dimi = useSelector(state => state.Reducers.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [followText, setFollowText] = useState('Following');
  const [meth, setMeth] = useState(false);

  const pullMe = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

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

    return () => {
      mounted = false;
    };
  }, [refresh]);
  useEffect(() => {
    let mounted = true;
    const loadUsers = async () => {
      try {
        //uncomment
        // setIsLoading(true);
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
      setIsLoading(false);
    }, 3000);
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
    return () => {
      mounted = false;
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
  }, [refresh]);

  useEffect(() => {
    const filteredProducts = products.filter(e => e.seller === data._id);
    const newProducts = filteredProducts.reverse();
    setMyProducts(newProducts);
  }, [products]);

  useEffect(() => {
    const filteredEvents = events.filter(e => e.user === data._id);
    const newEvents = filteredEvents.reverse();
    setMyEvents(newEvents);
  }, [events]);

  const myId = props.route.key;

  const progress = useDerivedValue(() => {
    return result > 185 ? withTiming(1) : withTiming(0);
  }, [result, scrollY]);

  const onBackPress = () => {
    navigation.goBack();
  };

  const onEditProfilePress = () => {
    navigation.navigate('EditProfile');
  };

  useEffect(() => {
    scrollY.addListener(({value}) => setResult(value));
  }, [scrollY]);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(scrollY, {
      toValue: 1,
      duration: 5000,
    }).start();
  };

  useEffect(() => {
    if (result > 185) {
      fadeIn();
    }
  }, [scrollY]);

  useEffect(() => {
    if (data.name.length === 14) {
      setFont(50);
    } else if (data.name.length > 14 && data.name.length <= 17) {
      setFont(45);
    } else if (data.name.length === 18) {
      setFont(40);
    } else if (data.name.length > 18 && data.name.length <= 20) {
      setFont(35);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadDimi = async () => {
      if (mounted) {
        const y = users?.filter(u => u._id === dimi._id)[0];

        setMe(y);
      }
    };

    loadDimi();

    return () => {
      mounted = false;
    };
  }, [data._id, users, refresh, meth]);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      if (mounted) {
        const y = users?.filter(u => u._id === data._id)[0];

        setCurrentUser(y);
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, [data._id, users, refresh]);

  const onUnblock = async () => {
    try {
      const response = await axios.put(
        `https://kweeble.herokuapp.com/auth/unblock/${dimi._id}`,
        // `http://localhost:3000/auth/${data._id}`,
        {
          id: dimi._id,
          person: data._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      pullMe();
      setAreDotsVisible(false);
      console.log(response, 'del');
    } catch (error) {
      console.log(error);
    }
  };

  const onBlock = async () => {
    try {
      const response = await axios.put(
        `https://kweeble.herokuapp.com/auth/block/${dimi._id}`,
        // `http://localhost:3000/auth/${data._id}`,
        {
          id: dimi._id,
          person: data._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setAreDotsVisible(false);
      pullMe();
      console.log(response, 'del');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted;

    if (mounted) {
      const ref = navigation.addListener('focus', () => {
        // The screen is focused
        // Call any action

        setRefresh(true);

        setTimeout(() => {
          setRefresh(false);
        }, 1000);
      });

      return ref;
    }

    return () => {
      mounted = false;
    };
  }, [navigation]);

  const onFollow = async () => {
    try {
      const response = await axios.put(
        `https://kweeble.herokuapp.com/auth/follow/${data._id}`,
        // `http://localhost:3000/auth/${data._id}`,
        {
          id: data._id,
          person: me?._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setRefresh(true);

      setTimeout(() => {
        setRefresh(false);
      }, 1);
      console.log(response, 'fol');
    } catch (error) {
      console.log(error);
    }
  };

  const onUnfollow = async () => {
    try {
      const response = await axios.put(
        `https://kweeble.herokuapp.com/auth/unfollow/${data._id}`,
        // `http://localhost:3000/auth/${data._id}`,
        {
          id: data._id,
          person: me?._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setRefresh(true);

      setTimeout(() => {
        setRefresh(false);
      }, 1);
      console.log(response, 'unfol');
    } catch (error) {
      console.log(error);
    }
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
                backgroundColor: scrollY,
                flexDirection: 'row',
                justifyContent: 'space-between',
                zIndex: 5,
                alignItems: 'center',
              },
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Pressable onPress={onBackPress} style={styles.backarrow}>
                <MaterialIcons name="arrow-back-ios" size={17} color="white" />
              </Pressable>
              <Text
                style={{
                  color: result < 185 ? 'white' : 'rgba(52, 52, 52, 0)',
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  marginLeft: 10,
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: {width: -1, height: 1},
                  textShadowRadius: 4,
                }}>
                {data.username}
              </Text>
            </View>

            <Pressable
              onPress={() => setAreDotsVisible(true)}
              style={styles.more}>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={17}
                color="white"
              />
            </Pressable>
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
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {
                  useNativeDriver: false,
                },
              )}>
              <Animated.Image
                resizeMode="cover"
                source={
                  photo
                    ? {uri: photo}
                    : require('../../../assets/images/hx.png')
                }
                style={[
                  styles.max,
                  {
                    transform: [
                      {
                        translateY: scrollY.interpolate({
                          inputRange: [-1000, 0],
                          outputRange: [-100, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                      {
                        scale: scrollY.interpolate({
                          inputRange: [-3000, 0],
                          outputRange: [20, 1],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}
              />
            </ScrollView>
          </Animated.View>
          <Animated.View
            style={{
              bottom: headerTitle,
              zIndex: 90,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: result > 185 ? 'white' : 'rgba(52, 52, 52, 0)',
                fontSize: 26,
                fontWeight: 'bold',
                marginLeft: 10,
                textAlign: 'center',
                position: 'absolute',
                top: -33,
              }}>
              {data.username}
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
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '700',
                    fontSize: data.name.length < 14 ? 55 : font,
                    paddingLeft: 7,
                    paddingRight: 7,

                    // position: 'absolute',
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: {width: -1, height: 1},
                    textShadowRadius: 10,
                    top: -66,
                  }}>
                  {data.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingTop: 0,
                  marginBottom: 5,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', paddingTop: 8}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold', marginRight: 2}}>
                      {currentUser?.following?.length}
                    </Text>
                    <Text style={{color: 'rgba(0,0,0,0.75)', fontSize: 13}}>
                      Following
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10}}>
                    <Text style={{fontWeight: 'bold', marginRight: 2}}>
                      {currentUser?.followers?.length}
                    </Text>
                    <Text style={{color: 'rgba(0,0,0,0.75)', fontSize: 13}}>
                      Followers
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={
                    me?.following?.includes(data._id) ? onUnfollow : onFollow
                  }
                  style={{
                    marginTop: 7,
                    justifyContent: 'center',
                    borderRadius: 100,
                    paddingVertical: 6,

                    paddingHorizontal: 25,
                    backgroundColor: me?.following?.includes(data._id)
                      ? Colors.subtleGray
                      : Colors.primary,
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '600',
                      color: me?.following?.includes(data._id)
                        ? 'black'
                        : 'white',
                    }}>
                    {me?.following?.includes(data._id) ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  justifyContent: 'space-around',
                  paddingTop: 10,
                  // marginTop: 10,
                  marginBottom: 10,
                  borderBottomColor: Colors.subtleGray,
                  borderBottomWidth: 1,
                  zIndex: 12,
                }}>
                {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('Dm', {
                  itemId: data._id,
                  msgName: data.name,
                });
              }}
              style={styles.editBtn}>
              <Text style={styles.editTxt}>Send message</Text>
            </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={() => setActiveTab('info')}
                  style={{
                    // paddingTop: 5,
                    borderBottomWidth: 3,
                    borderBottomColor:
                      activeTab === 'info' ? Colors.primary : 'white',
                    paddingBottom: 10,
                  }}>
                  <Text style={{fontWeight: '700', fontSize: 16}}>Info</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveTab('events')}
                  style={{
                    // paddingTop: 5,
                    borderBottomWidth: 3,
                    borderBottomColor:
                      activeTab === 'events' ? Colors.primary : 'white',
                    paddingBottom: 10,
                  }}>
                  <Text style={{fontWeight: '700', fontSize: 16}}>Events</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveTab('products')}
                  style={{
                    // paddingTop: 5,
                    borderBottomWidth: 3,
                    borderBottomColor:
                      activeTab === 'products' ? Colors.primary : 'white',
                    paddingBottom: 10,
                  }}>
                  <Text style={{fontWeight: '700', fontSize: 16}}>
                    Products
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                {(() => {
                  switch (activeTab) {
                    case 'info':
                      return data.blockedUsers?.includes(me?._id) ? (
                        <View style={{paddingTop: 30, alignItems: 'center'}}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 24,
                              fontWeight: 'bold',
                              marginBottom: 10,
                            }}>
                            @{data.username} blocked you
                          </Text>
                          <Text
                            style={{
                              textAlign: 'center',
                              paddingHorizontal: 35,
                              color: 'gray',
                            }}>
                            You are blocked from viewing @{data.username}
                            {"'s "}
                            information.
                          </Text>
                        </View>
                      ) : me?.blockedUsers?.includes(data._id) ? (
                        <View style={{paddingTop: 30, alignItems: 'center'}}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 22,
                              fontWeight: 'bold',
                              marginBottom: 10,
                            }}>
                            @{data.username} is blocked
                          </Text>
                          <Text
                            style={{
                              textAlign: 'center',
                              paddingHorizontal: 20,
                            }}>
                            You won't be able to see @{data.username} personal
                            information. Click below to unblock
                          </Text>
                          <TouchableOpacity
                            onPress={onUnblock}
                            style={{
                              marginTop: 25,
                              borderWidth: 1,
                              borderColor: Colors.pinRed,
                              borderRadius: 100,
                              width: 200,
                              paddingVertical: 11,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: Colors.pinRed,
                              }}>
                              Unblock
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <ScrollView>
                          {data.email !== '' && data.email !== undefined ? (
                            <View>
                              <View style={styles.icons}>
                                <View
                                  style={{
                                    marginLeft: 50,
                                    marginRight: 40,
                                    backgroundColor: 'rgba(255, 193, 0, 0.15)',
                                    paddingHorizontal: 10,
                                    paddingTop: 5,
                                    paddingBottom: 10,
                                    borderRadius: 100,
                                  }}>
                                  <MaterialCommunityIcons
                                    name="email"
                                    size={25}
                                    color="rgba(255, 193, 0, 1)"
                                  />
                                </View>
                                <View style={styles.text}>
                                  <Text style={styles.infoPrimaryText}>
                                    {data.email}
                                  </Text>
                                  <Text style={styles.infoSecondaryText}>
                                    Email
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : null}
                          {data.phoneNumber !== '' &&
                          data.phoneNumber !== undefined ? (
                            <View style={styles.view}>
                              <View style={styles.icons}>
                                <View
                                  style={{
                                    marginLeft: 50,
                                    marginRight: 40,
                                    backgroundColor: 'rgba(37,211,102,0.16)',
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    borderRadius: 100,
                                  }}>
                                  <Ionicons
                                    name="md-phone-portrait-outline"
                                    size={25}
                                    color="rgb(37, 211, 102)"
                                  />
                                </View>
                                <View style={styles.text}>
                                  {/* <Text
                                style={
                                  styles.infoPrimaryText
                                }>{`(${data.phoneNumber[0]}${data.phoneNumber[1]}${data.phoneNumber[2]}) ${data.phoneNumber[3]}${data.phoneNumber[4]}${data.phoneNumber[5]}-${data.phoneNumber[6]}${data.phoneNumber[7]}${data.phoneNumber[8]}${data.phoneNumber[9]}`}</Text> */}
                                  <Text style={styles.infoPrimaryText}>
                                    {data?.phoneNumber}
                                  </Text>
                                  <Text style={styles.infoSecondaryText}>
                                    Phone number
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : null}
                          {data.major !== '' && data.major !== undefined ? (
                            <View>
                              <View style={styles.icons}>
                                <View
                                  style={{
                                    marginLeft: 50,
                                    marginRight: 40,
                                    backgroundColor: 'rgba(0,0,128,0.15)',
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    borderRadius: 100,
                                  }}>
                                  <Ionicons
                                    name="md-school"
                                    size={25}
                                    color="rgb(0,0,128)"
                                  />
                                </View>
                                <View style={styles.text}>
                                  <Text style={styles.infoPrimaryText}>
                                    {data.major}
                                  </Text>
                                  <Text style={styles.infoSecondaryText}>
                                    Major
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : null}
                          {data.position !== '' &&
                          data.position !== undefined ? (
                            <View>
                              <View style={styles.icons}>
                                <View
                                  style={{
                                    marginLeft: 50,
                                    marginRight: 40,
                                    backgroundColor: 'rgba(40,51,53, 0.15)',
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    borderRadius: 100,
                                  }}>
                                  <MaterialIcons
                                    name="work"
                                    size={25}
                                    color="rgb(40,51,53)"
                                  />
                                </View>
                                <View style={styles.text}>
                                  <Text style={styles.infoPrimaryText}>
                                    {data.position}
                                  </Text>
                                  <Text style={styles.infoSecondaryText}>
                                    Position
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : null}
                          {data.interests !== '' &&
                          data.interests !== undefined ? (
                            <View>
                              <View style={styles.icons}>
                                <View
                                  style={{
                                    marginLeft: 50,
                                    marginRight: 40,
                                    backgroundColor: 'rgba(230, 0, 35,0.15)',
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    borderRadius: 100,
                                  }}>
                                  <Ionicons
                                    name="md-game-controller"
                                    size={25}
                                    color={'rgb(230,0,35)'}
                                  />
                                </View>
                                <View style={styles.text}>
                                  <Text style={styles.infoPrimaryText}>
                                    {data.interests}
                                  </Text>

                                  <Text style={styles.infoSecondaryText}>
                                    Interests
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : null}
                          {data.instagram !== '' &&
                          data.instagram !== undefined ? (
                            <View>
                              <View style={styles.icons}>
                                <View
                                  style={{
                                    marginLeft: 50,
                                    marginRight: 40,
                                    backgroundColor: 'rgba(225, 48, 108,0.15)',
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    borderRadius: 100,
                                  }}>
                                  <LinearGradient
                                    style={{borderRadius: 8}}
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 1}}
                                    colors={[
                                      '#5851DB',
                                      '#C13584',
                                      '#E1306C',
                                      '#FD1D1D',
                                      '#F77737',
                                    ]}>
                                    <Ionicons
                                      name="ios-logo-instagram"
                                      size={25}
                                      color="white"
                                    />
                                  </LinearGradient>
                                </View>
                                <View style={styles.text}>
                                  <Text style={styles.infoPrimaryText}>
                                    {data.instagram}
                                  </Text>
                                  <Text style={styles.infoSecondaryText}>
                                    Instagram
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : null}
                          {data.snapchat !== '' &&
                          data.snapchat !== undefined ? (
                            <View>
                              <View style={styles.icons}>
                                <View
                                  style={{
                                    marginLeft: 50,
                                    marginRight: 40,
                                    backgroundColor: 'rgba(255, 252, 0,0.4)',
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    borderRadius: 100,
                                  }}>
                                  {/* <FontAwesome name="snapchat-ghost" size={35} color="black" /> */}
                                  <MaterialCommunityIcons
                                    name="snapchat"
                                    size={25}
                                    color="black"
                                    backgroundColor="white"
                                  />
                                </View>
                                <View style={styles.text}>
                                  <Text style={styles.infoPrimaryText}>
                                    {data.snapchat}
                                  </Text>
                                  <Text style={styles.infoSecondaryText}>
                                    Snapchat
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : null}
                        </ScrollView>
                      );

                    case 'events':
                      return data.blockedUsers?.includes(me?._id) ? (
                        <View style={{paddingTop: 30, alignItems: 'center'}}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 24,
                              fontWeight: 'bold',
                              marginBottom: 10,
                            }}>
                            @{data.username} blocked you
                          </Text>
                          <Text
                            style={{
                              textAlign: 'center',
                              paddingHorizontal: 35,
                              color: 'gray',
                            }}>
                            You are blocked from viewing @{data.username}
                            {"'s "}
                            information.
                          </Text>
                        </View>
                      ) : me?.blockedUsers?.includes(data._id) ? (
                        <View style={{paddingTop: 30, alignItems: 'center'}}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 22,
                              fontWeight: 'bold',
                              marginBottom: 10,
                            }}>
                            @{data.username} is blocked
                          </Text>
                          <Text
                            style={{
                              textAlign: 'center',
                              paddingHorizontal: 20,
                            }}>
                            You won't be able to see @{data.username} personal
                            information. Click below to unblock
                          </Text>
                          <TouchableOpacity
                            onPress={onUnblock}
                            style={{
                              marginTop: 25,
                              borderWidth: 1,
                              borderColor: Colors.pinRed,
                              borderRadius: 100,
                              width: 200,
                              paddingVertical: 11,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: Colors.pinRed,
                              }}>
                              Unblock
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <>
                          <View style={{paddingHorizontal: 15}}>
                            {myEvents.map((event, i) => {
                              return (
                                <TouchableOpacity key={i}>
                                  <EventCard
                                    key={i}
                                    event={event}
                                    name={event.name}
                                    startDay={event.startDay}
                                    year={event.year}
                                    day={event.day}
                                    month={event.month}
                                    endDay={event.endDay}
                                    location={event.location}
                                    startTime={event.startTime}
                                    endTime={event.endTime}
                                    image={event.image}
                                    user={event.user}
                                    id={event._id}
                                  />
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </>
                      );

                    case 'products':
                      return data.blockedUsers?.includes(me?._id) ? (
                        <View style={{paddingTop: 30, alignItems: 'center'}}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 24,
                              fontWeight: 'bold',
                              marginBottom: 10,
                            }}>
                            @{data.username} blocked you
                          </Text>
                          <Text
                            style={{
                              textAlign: 'center',
                              paddingHorizontal: 35,
                              color: 'gray',
                            }}>
                            You are blocked from viewing @{data.username}
                            {"'s "}
                            information.
                          </Text>
                        </View>
                      ) : me?.blockedUsers?.includes(data._id) ? (
                        <View style={{paddingTop: 30, alignItems: 'center'}}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 22,
                              fontWeight: 'bold',
                              marginBottom: 10,
                            }}>
                            @{data.username} is blocked
                          </Text>
                          <Text
                            style={{
                              textAlign: 'center',
                              paddingHorizontal: 20,
                            }}>
                            You won't be able to see @{data.username} personal
                            information. Click below to unblock
                          </Text>
                          <TouchableOpacity
                            onPress={onUnblock}
                            style={{
                              marginTop: 25,
                              borderWidth: 1,
                              borderColor: Colors.pinRed,
                              borderRadius: 100,
                              width: 200,
                              paddingVertical: 11,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: Colors.pinRed,
                              }}>
                              Unblock
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              paddingLeft: 15,
                            }}>
                            {myProducts.reverse().map(product => {
                              return (
                                <View key={product._id}>
                                  <ProductCard product={product} />
                                </View>
                              );
                            })}
                          </View>
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
            animationType={'fade'}
            transparent={true}
            visible={areDotsVisible}
            onRequestClose={() => setAreDotsVisible(false)}>
            <TouchableOpacity
              style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.1)'}}
              onPress={() => setAreDotsVisible(false)}
              activeOpacity={1}>
              <View
                style={{
                  position: 'absolute',
                  zIndex: 100,
                  left: 180,
                  width: 200,
                  top: 80,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 3.84,

                  elevation: 5,
                  borderRadius: 8,
                  backgroundColor: 'rgba(255,255,355,0.96)',
                }}>
                <TouchableOpacity
                  onPress={
                    me?.blockedUsers?.includes(data._id) ? onUnblock : onBlock
                  }
                  style={{
                    // backgroundColor: 'white',
                    paddingVertical: 11,
                    paddingHorizontal: 16,
                    // borderBottomWidth: 1,
                    borderBottomColor: 'lightgray',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'black',
                      }}>
                      {me?.blockedUsers?.includes(data._id)
                        ? `Unblock @${data.username}`
                        : `Block @${data.username}`}
                    </Text>
                    <FontAwesome name="ban" size={18} color="black" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setAreDotsVisible(false)}
                  style={{
                    // backgroundColor: 'white',
                    paddingVertical: 11,
                    paddingHorizontal: 16,
                    // borderBottomWidth: 1,
                    borderBottomColor: 'lightgray',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'black',
                      }}>
                      Report @{data.username}
                    </Text>
                    <FontAwesome name="flag-o" size={18} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </>
      )}
    </View>
    // </ScrollView>
  );
};

export default OtherUserProfile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
  },
  max: {
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
    width: null,
    height: null,
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  fame: {
    color: 'white',
    fontWeight: '700',
    fontSize: 50,
    paddingLeft: 7,
    paddingRight: 7,

    // position: 'absolute',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    top: -66,
  },
  backarrow: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'flex-end',
    height: 25,
    width: 25,
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 3,
  },
  more: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center',
    height: 25,
    width: 25,
    marginTop: 3,
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
    // height: titleHeight,
    // marginTop: MAX_HEIGHT - 75 / 2,
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
    borderColor: Colors.subtleGray,
    borderWidth: 1,
    // marginHorizontal: 20,
    // flex: 1,
    justifyContent: 'center',
    borderRadius: 100,
    padding: 7,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.subtleGray,
  },
  editTxt: {
    // fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
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

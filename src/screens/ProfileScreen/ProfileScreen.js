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
  StyleSheet,
  Platform,
  Animated,
  RefreshControl,
  Dimensions,
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
import EventCard from '../../components/EventCard';
import ProductCard from '../../components/ProductCard/';
import {
  FacebookLoader,
  InstagramLoader,
} from 'react-native-easy-content-loader';
import {BlurView} from '@react-native-community/blur';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 300;
const screenWidth = Dimensions.get('window').width;
const SCREEN_WIDTH = Dimensions.get('window').width;

// const MAX_HEIGHT = 250;
const TITLE_MIN_HEIGHT = 30;
const TITLE_MAX_HEIGHT = 70;
const scrollY = new Animated.Value(0);
// const headerHeight = scrollY.interpolate({
//   inputRange: [0, MAX_HEIGHT + 10 - MIN_HEIGHT],
//   outputRange: [MAX_HEIGHT, MIN_HEIGHT],
//   extrapolate: 'clamp',
// });

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

const ProfileScreen = props => {
  const me = useSelector(state => state.Reducers.userData);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [result, setResult] = useState(undefined);
  const [activeTab, setActiveTab] = useState('info');
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [font, setFont] = useState(40);

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const pullMe = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  useEffect(() => {
    const ref = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action

      setRefresh(true);

      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    });

    return ref;
  }, [navigation]);

  const myId = props.route.key;

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
        setIsLoading(true);
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
    const filteredProducts = products.filter(e => e.seller === me._id);
    const newProducts = filteredProducts.reverse();
    setMyProducts(newProducts);
  }, [products]);

  useEffect(() => {
    const filteredEvents = events.filter(e => e.user === me._id);
    const newEvents = filteredEvents.reverse();
    setMyEvents(newEvents);
  }, [events]);

  const onBackPress = () => {
    navigation.goBack();
  };

  const onEditProfilePress = () => {
    navigation.navigate('EditProfile', {data: data});
  };

  useEffect(() => {
    let mounted = true;

    const loadDimi = async () => {
      if (mounted) {
        const y = users?.filter(u => u._id === me._id)[0];

        setData(y);
      }
    };

    loadDimi();

    const interval = setInterval(() => {
      loadDimi();
    }, 3000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [users, refresh]);

  useEffect(() => {
    if (data?.name?.length === 14) {
      setFont(50);
    } else if (data?.name?.length > 14 && data?.name?.length <= 17) {
      setFont(45);
    } else if (data?.name?.length === 18) {
      setFont(40);
    } else if (data?.name?.length > 18 && data?.name?.length <= 20) {
      setFont(35);
    }
  }, []);

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
    if (data?.photo) {
      Image.getSize(data.photo, (width, height) => {
        const aspectRatio = width / height;
        setImageAspectRatio(aspectRatio);
      });
    }
  }, [data?.photo]);

  const [textColor, setTextColor] = useState('white');

  const [scale, setScale] = useState(1);

  const [imageWidth, setImageWidth] = useState(SCREEN_WIDTH * 1.15 * scale);

  const handleScroll = event => {
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
                backgroundColor: 'rgba(0, 0, 0, 0)',
                flexDirection: 'row',
                zIndex: 5,

                alignItems: 'center',
              },
            ]}>
            <Pressable onPress={onBackPress} style={styles.backarrow}>
              <MaterialIcons name="arrow-back-ios" size={17} color="white" />
            </Pressable>

            <Text
              style={{
                color: textColor,
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'left',
                marginLeft: 10,
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 4,
              }}>
              {data?.username}
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: headerHeight,
              zIndex: -300,
              overflow: 'visible',
              flex: 1,
            }}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => pullMe()}
                />
              }
              // style={{height: 350, overflow: 'visible'}}
              style={{flex: 1, overflow: 'visible'}}
              scrollEventThrottle={1}
              onScroll={handleScroll}>
              <Animated.Image
                resizeMode="cover"
                source={
                  data?.photo
                    ? {uri: data?.photo}
                    : require('../../../assets/images/hx.png')
                }
                style={{
                  height: '100%',
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
                blurType="transparent"
                blurAmount={10}
                blurRadius={10}
                overlayColor={'rgba(255, 255, 255, 0.3)'}
              />
            </ScrollView>
          </Animated.View>
          <Animated.View
            style={{
              bottom: headerTitle,
              zIndex: 9,
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
              {data?.username}
            </Text>
          </Animated.View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
            }
            showsVerticalScrollIndicator={false}
            style={{flex: 1, zIndex: 100, marginTop: 0}}
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
                    fontSize: data?.name?.length < 14 ? 55 : font,
                    // fontSize: 55,
                    paddingLeft: 7,
                    paddingRight: 7,

                    // position: 'absolute',
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: {width: -1, height: 1},
                    textShadowRadius: 10,
                    top: -66,
                  }}>
                  {data?.name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  justifyContent: 'space-between',
                  paddingTop: 10,
                  marginBottom: 10,
                  borderBottomColor: Colors.subtleGray,
                  borderBottomWidth: 1,
                  zIndex: 12,
                }}>
                <TouchableOpacity
                  onPress={onEditProfilePress}
                  style={styles.editBtn}>
                  <Text style={styles.editTxt}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setActiveTab('info')}
                  style={{
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
                    borderBottomWidth: 3,
                    borderBottomColor:
                      activeTab === 'events' ? Colors.primary : 'white',
                    paddingBottom: 10,
                  }}>
                  <Text style={{fontWeight: '700', fontSize: 16}}>Events</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => setActiveTab('products')}
                  style={{
                    borderBottomWidth: 3,
                    borderBottomColor:
                      activeTab === 'products' ? Colors.primary : 'white',
                    paddingBottom: 10,
                  }}>
                  <Text style={{fontWeight: '700', fontSize: 16}}>
                    Products
                  </Text>
                </TouchableOpacity> */}
              </View>
              <View>
                {(() => {
                  switch (activeTab) {
                    case 'info':
                      return (
                        <ScrollView>
                          {data?.email !== undefined &&
                          data?.email !== '' &&
                          data?.email !== null ? (
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
                                    {data?.email}
                                  </Text>
                                  <Text style={styles.infoSecondaryText}>
                                    Email
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : null}
                          {data?.phoneNumber !== '' &&
                          data?.phoneNumber !== undefined &&
                          data?.phoneNumber !== null ? (
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
                                  }>{`(${data?.phoneNumber[0]}${data?.phoneNumber[1]}${data?.phoneNumber[2]}) ${data?.phoneNumber[3]}${data?.phoneNumber[4]}${data?.phoneNumber[5]}-${data?.phoneNumber[6]}${data?.phoneNumber[7]}${data?.phoneNumber[8]}${data?.phoneNumber[9]}`}</Text> */}
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
                          {data?.major !== undefined &&
                          data?.major !== '' &&
                          data?.major !== null ? (
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
                                    {data?.major}
                                  </Text>
                                  <Text style={styles.infoSecondaryText}>
                                    Major
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : null}
                          {data?.position !== undefined &&
                            (data?.position !== '' &&
                            data?.position !== null ? (
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
                                      {data?.position}
                                    </Text>
                                    <Text style={styles.infoSecondaryText}>
                                      Position
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            ) : null)}
                          {data?.interests !== undefined &&
                          data?.interests !== '' &&
                          data?.interests !== null ? (
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
                                    {data?.interests}
                                  </Text>

                                  <Text style={styles.infoSecondaryText}>
                                    Interests
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : null}
                          {data?.instagram !== undefined &&
                          data?.instagram !== '' &&
                          data?.instagram !== null ? (
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
                                    {data?.instagram}
                                  </Text>
                                  <Text style={styles.infoSecondaryText}>
                                    Instagram
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : null}
                          {data?.snapchat !== undefined &&
                          data?.snapchat !== '' &&
                          data?.snapchat !== null ? (
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
                                    {data?.snapchat}
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
                      return (
                        <>
                          <View style={{paddingHorizontal: 15}}>
                            {myEvents
                              // .sort(function (a, b) {
                              //   const dateOfA = new Date(
                              //     `${a.month}-${a.year}-${a.day}`,
                              //   );
                              //   const dateOfB = new Date(
                              //     `${b.month}-${b.year}-${b.day}`,
                              //   );
                              //   return dateOfA < dateOfB;
                              // })
                              .map((event, i) => {
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
                      return (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              paddingLeft: 15,
                            }}>
                            {myProducts
                              .sort(function (a, b) {
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
                      );
                    default:
                      return null;
                  }
                })()}
              </View>
            </Animated.View>
            {/* <View style={{height: 1000}}></View> */}
          </ScrollView>
        </>
      )}
    </View>
    // </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
  },
  max: {
    width: '100%',
    height: 300,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
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
  },
  fame: {
    color: 'white',
    fontWeight: '700',
    fontSize: 50,
    paddingRight: 7,
    paddingLeft: 7,
    // paddingBottom: 5,
    // position: 'absolute',
    top: -66,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,

    // zIndex: 20,
    // elevation: Platform.OS === 'android' ? 50 : 0,
  },
  backarrow: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'flex-end',
    height: 25,
    width: 25,
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
    // shadowColor: '#6E635D',
    // shadowOffset: {
    //   width: 10,
    //   height: 5,
    // },
    // shadowOpacity: 0.8,
    // shadowRadius: 50,

    // elevation: 17,
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
    // paddingTop: 10,
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
    paddingVertical: 7,
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.subtleGray,
    zIndex: 500,
  },
  editTxt: {
    // fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

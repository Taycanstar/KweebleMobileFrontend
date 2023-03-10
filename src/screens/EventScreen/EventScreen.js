import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  RefreshControl,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import Colors from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoingPopup from '../../components/GoingPopup/';
import BlurEventMedia from '../../components/BlurEventMedia/';
import {useSelector} from 'react-redux';
import {BlurView} from '@react-native-community/blur';
import {
  FacebookLoader,
  InstagramLoader,
} from 'react-native-easy-content-loader';

const EventScreen = props => {
  const [viewRef, setViewRef] = useState(null);
  const [blurType, setBlurType] = useState('light');
  const [imageUrl, setImageUrl] = useState('');
  const tintColor = ['#ffffff', '#000000'];
  if (blurType === 'xlight') {
    tintColor.reverse();
  }

  const pullMe = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const data = props?.route?.params?.data;
  const scope = props?.route?.params?.scp;
  const [going, setGoing] = useState(data.going);
  const [user, setUser] = useState(data.user);
  const [photo, setPhoto] = useState(data.image);
  const [typeId, setTypeId] = useState(data._id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDropVisible, setIsDropVisible] = useState(false);
  const [indicator, setIndicator] = useState(0);
  const [indicator2, setIndicator2] = useState(0);
  const [buttonColor, setButtonColor] = useState('#00ca4e');
  const [txt, setTxt] = useState('white');
  const me = useSelector(state => state.Reducers.userData);
  const [status, setStatus] = useState(false);
  const [myUserArray, setMyUserArray] = useState([]);
  const [myUser, setMyUser] = useState('');
  const [refresh, setRefresh] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [litMe, setLitMe] = useState('');
  const [apiUsers, setApiUsers] = useState([]);
  const [isShareVisible, setIsShareVisible] = useState(false);
  const [isBlurOpen, setIsBlurOpen] = useState(false);
  // const [currScope, setCurrScope] = useState({});
  const [currEvent, setCurrEvent] = useState({});
  const [scopes, setScopes] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const id = data._id;

  // useEffect(() => {
  //   const ref = navigation.addListener('focus', () => {
  //     // The screen is focused
  //     // Call any action

  //     setRefresh(true);

  //     setTimeout(() => {
  //       setRefresh(false);
  //     }, 1000);
  //   });

  //   return ref;
  // }, [navigation]);

  console.log(id, 'scope');

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const ref = navigation.addListener('focus', () => {
      setRefresh(true);

      setTimeout(() => {
        setRefresh(false);
      }, 500);
    });

    return ref;
  }, [navigation]);

  useEffect(() => {
    let mounted = true;
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const {data} = await axios.get('https://kweeble.herokuapp.com/api');
        if (mounted) {
          setApiUsers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadUsers();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // const interval = setInterval(() => {
    //   loadUsers();
    //   setIsLoading(false);
    // }, 3000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadDimi = async () => {
      if (mounted) {
        const y = apiUsers.filter(u => u._id === me._id)[0];
        await setLitMe(y);
      }
    };

    loadDimi();

    // const interval = setInterval(() => {
    //   loadDimi();
    // }, 3000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, indicator2]);
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
    // }, 3000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [refresh]);

  // useEffect(() => {
  //   let mounted = true;

  //   const load = async () => {
  //     if (mounted) {
  //       const y = events.filter(u => u._id === data._id)[0];

  //       setCurrEvent(y);
  //     }
  //   };

  //   load();

  //   const interval = setInterval(() => {
  //     load();
  //   }, 1000);
  //   return () => {
  //     mounted = false;
  //     clearInterval(interval);
  //   };
  // }, [users, refresh, events, data._id]);

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
    // }, 3000);
    return () => {
      mounted = false;

      // clearInterval(interval);
    };
  }, [refresh]);

  const onButtonPress = id => {
    changeModalVisible(true);
    setGoing(id);
    setUser(user);
    setPhoto(photo);
  };

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

  useEffect(() => {
    // console.log(data.users);

    const myArray = data?.users.filter(usr => usr.id === me._id);
    const myUs = data?.users.filter(usr => usr.id === me._id)[0];
    setMyUserArray(myArray);
    setMyUser(myUs);

    if (myArray.length > 0) {
      setStatus(true);
    } else {
      setStatus(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const onSavePress = async () => {
    try {
      const response = await axios.put(
        `https://kweeble.herokuapp.com/auth/events/${me._id}`,
        // `http://localhost:3000/auth/${data._id}`,
        {
          id: me._id,
          event: data._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setIsSaved(true);
      setIsShareVisible(false);
      setIsDropVisible(false);
      setIndicator2(1);
      console.log(response, 'res');
    } catch (error) {
      console.log(error);
    }
  };

  const onUnsavePress = async () => {
    try {
      const resp = await axios.put(
        `https://kweeble.herokuapp.com/auth/events/del/${me._id}`,
        // `http://localhost:3000/scopes/del/${data._id}`,
        {
          id: me._id,
          event: data._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setIsSaved(false);
      setIsShareVisible(false);
      setIsDropVisible(false);
      setIndicator2(1);
      console.log(resp, 'del');
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      const res = await axios.delete(
        `https://kweeble.herokuapp.com/events/del/${id}`,
        {id},

        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(res, '=>res');
      // navigation.navigate('Home');
      setIsDropVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const psex = async () => {
  //   try {
  //     const response = await axios.post(
  //       `https://kweeble.herokuapp.com/auth/following`,
  //       // `http://localhost:3000/auth/${data._id}`,
  //       {},
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );

  //     console.log(response, 'hey');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(currScope, '=> curr');

  return (
    <SafeAreaView style={styles.eventContainer}>
      {isLoading ? (
        <InstagramLoader active />
      ) : (
        <>
          <View style={{backgroundColor: 'rgb(240,239,239)', flex: 1}}>
            <View style={styles.nav}>
              <Pressable onPress={onBackPress} style={{flex: 0.05}}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={30}
                  color={Colors.primary}
                />
              </Pressable>

              <View
                style={{
                  flex: 0.8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.headerText}>{data?.name}</Text>
              </View>
              {/* <Ionicons
            onPress={() => {
              setIsShareVisible(true);
            }}
            name="share-outline"
            size={25}
            color={'black'}
          /> */}
              <TouchableOpacity
                onPress={() => {
                  setIsDropVisible(true);
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 3,
                  flex: 0.05,
                }}>
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={22}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => pullMe()}
                />
              }
              showsVerticalScrollIndicator={false}>
              <View>
                <Image
                  style={{width: '100%', height: 250}}
                  source={
                    data?.image
                      ? {uri: data?.image}
                      : require('../../../assets/images/zoom.webp')
                  }
                />
              </View>

              <View style={styles.content}>
                {/* <Text style={styles.name}>{data.name}</Text> */}
                <View style={styles.contentRow}>
                  <View style={styles.icon}>
                    <MaterialCommunityIcons
                      onPress={onBackPress}
                      name="calendar-week"
                      size={20}
                      color={Colors.softRed}
                    />
                  </View>

                  <View style={styles.dateRow}>
                    <Text style={styles.startDay}>
                      {months[data?.month - 1]} {data?.day}, {data?.year}
                    </Text>
                  </View>
                </View>
                <View style={styles.contentRow2}>
                  <View style={styles.icon}>
                    <MaterialCommunityIcons
                      onPress={onBackPress}
                      name="clock-time-seven-outline"
                      size={20}
                      color={Colors.softRed}
                    />
                  </View>

                  <View style={styles.dateRow}>
                    {/* <Text
                  style={
                    styles.startTime
                  }>{`${data.startTime} - ${data.endTime}`}</Text> */}
                    <Text style={styles.startTime}>{`${data?.startTime} ${
                      data?.endTime ? '-' : ''
                    } ${data?.endTime}`}</Text>
                  </View>
                </View>
                <View style={styles.contentRow}>
                  <View style={styles.icon}>
                    <Ionicons
                      name="location-sharp"
                      size={20}
                      color={Colors.softRed}
                    />
                  </View>

                  <View>
                    <Text style={styles.location}>{`${data?.location}`}</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.descriptionTitle}>Description</Text>
                  <Text style={styles.description}>{data?.description}</Text>
                </View>
              </View>
              {data?.media.length > 0 && (
                <View>
                  <View style={{marginHorizontal: 15, marginBottom: 10}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                      }}>
                      Media
                    </Text>
                  </View>
                  <View style={{marginHorizontal: 15}}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
                      <View style={{flexDirection: 'row', overflow: 'scroll'}}>
                        {data.media?.map((pt, index) => {
                          return (
                            <View key={`id${pt}`}>
                              <TouchableOpacity
                                onPress={() => {
                                  setIsBlurOpen(true);
                                  setImageUrl(pt);
                                }}>
                                <Image
                                  style={{
                                    width: 60,
                                    height: 80,

                                    marginRight: 5,
                                    borderRadius: 8,
                                  }}
                                  source={{uri: pt}}
                                />
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                      </View>
                    </ScrollView>
                  </View>
                </View>
              )}
            </ScrollView>
            <View style={styles.btnContainer}>
              <View
                style={{
                  backgroundColor: 'white',
                  marginVertical: 3,
                  marginHorizontal: 10,
                  borderRadius: 100,
                  borderWidth: 1.5,
                  borderColor: 'lightgray',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    onButtonPress(data._id);
                  }}>
                  <Text
                    style={{
                      color:
                        indicator === 0
                          ? status
                            ? myUser.goingBtnText
                            : 'black'
                          : txt,
                      fontWeight: 'bold',
                      fontSize: 18,
                      marginRight: 5,
                      paddingVertical: 13,
                      textAlign: 'center',
                    }}>
                    Going
                  </Text>
                  <Entypo
                    name="check"
                    size={23}
                    color={
                      indicator === 0
                        ? status
                          ? myUser.goingBtn
                          : 'black'
                        : buttonColor
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity>
              <Modal
                visible={isModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => changeModalVisible(false)}>
                <GoingPopup
                  changeModalVisible={changeModalVisible}
                  setColor={e => setButtonColor(e)}
                  setTxtColor={e => setTxt(e)}
                  setGoing={e => setGoing(e)}
                  going={going}
                  photo={photo}
                  user={user}
                  typeId={typeId}
                  setIndicator={e => setIndicator(e)}
                />
              </Modal>
            </TouchableOpacity>
          </View>
          <TouchableWithoutFeedback onPress={() => setIsShareVisible(false)}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={isShareVisible}
              onRequestClose={() => setIsShareVisible(false)}>
              <View
                onPress={() => setIsShareVisible(false)}
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
                    paddingHorizontal: 25,
                    // maxHeight: deviceHeight * 0.4,
                    paddingBottom: 12,
                    marginTop: 600,
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
                        fontSize: 18,
                        textAlign: 'center',
                        fontWeight: '700',
                        margin: 5,
                        paddingTop: 5,
                      }}>
                      Share Event
                    </Text>

                    <View
                      onPress={() => setIsModalVisible(false)}
                      style={{paddingTop: 10}}>
                      {/* <Feather
                    name="x"
                    size={25}
                    color="black"
                    backgroundColor="white"
                  /> */}
                      <Text></Text>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingBottom: 70,
                      }}>
                      <TouchableOpacity
                        style={{flexDirection: 'column'}}
                        onPress={
                          indicator2 === 0
                            ? litMe?.savedEvents?.filter(
                                se => se === data._id,
                              )[0] !== undefined
                              ? onUnsavePress
                              : onSavePress
                            : isSaved === true
                            ? onUnsavePress
                            : onSavePress
                        }>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: 'lightgray',
                            borderWidth: 1.5,
                            width: 45,
                            height: 45,
                            borderRadius: 100,
                            marginBottom: 3,
                          }}>
                          <Octicons
                            name={
                              indicator2 === 0
                                ? litMe?.savedEvents?.filter(
                                    p => p === data._id,
                                  )[0] !== undefined
                                  ? 'bookmark-slash'
                                  : 'bookmark'
                                : isSaved === true
                                ? 'bookmark-slash'
                                : 'bookmark'
                            }
                            size={24}
                            color="black"
                          />
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{textAlign: 'center'}}>
                            {indicator2 === 0
                              ? litMe?.savedEvents?.filter(
                                  p => p === data._id,
                                )[0] !== undefined
                                ? 'Unsave'
                                : 'Save'
                              : isSaved === true
                              ? 'Unsave'
                              : 'Save'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => setIsShareVisible(false)}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: 100,
                        borderWidth: 1,
                        height: 40,
                        borderColor: 'lightgray',
                      }}>
                      <Text style={{fontWeight: 'bold', fontSize: 16}}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </TouchableWithoutFeedback>
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={isDropVisible}
            onRequestClose={() => setIsDropVisible(false)}>
            <TouchableOpacity
              style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.1)'}}
              onPress={() => setIsDropVisible(false)}
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
                    indicator2 === 0
                      ? litMe?.savedEvents?.filter(se => se === data._id)[0] !==
                        undefined
                        ? onUnsavePress
                        : onSavePress
                      : isSaved === true
                      ? onUnsavePress
                      : onSavePress
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
                      {indicator2 === 0
                        ? litMe?.savedEvents?.filter(p => p === data._id)[0] !==
                          undefined
                          ? 'Unsave'
                          : 'Save'
                        : isSaved === true
                        ? 'Unsave'
                        : 'Save'}
                    </Text>
                    <Octicons
                      name={
                        indicator2 === 0
                          ? litMe?.savedEvents?.filter(
                              p => p === data._id,
                            )[0] !== undefined
                            ? 'bookmark-slash'
                            : 'bookmark'
                          : isSaved === true
                          ? 'bookmark-slash'
                          : 'bookmark'
                      }
                      size={20}
                      color="black"
                    />
                  </View>
                </TouchableOpacity>

                {scope?.members?.includes(me._id) ? (
                  <TouchableOpacity
                    onPress={() => {
                      setIsDropVisible(false);
                      navigation.navigate('EditEvent', {data: data});
                    }}
                    style={{
                      // backgroundColor: 'white',
                      paddingVertical: 11,
                      paddingHorizontal: 16,
                      paddingRight: 12,
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
                        Edit event{' '}
                      </Text>
                      <Feather name="edit" size={18} color="black" />
                    </View>
                  </TouchableOpacity>
                ) : null}

                {scope?.moderators?.includes(me._id) ? (
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        const res = await axios.delete(
                          `https://kweeble.herokuapp.com/events/del/${id}`,
                          {id},

                          {
                            headers: {
                              'Content-Type': 'application/json',
                            },
                          },
                        );

                        console.log(res, '=>res');
                        navigation.navigate('HomeScreen');
                        setIsDropVisible(false);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    style={{
                      // backgroundColor: 'white',
                      paddingVertical: 11,
                      paddingHorizontal: 16,
                      paddingRight: 12,
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
                          color: Colors.coolRed,
                        }}>
                        Delete event{' '}
                      </Text>
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color={Colors.coolRed}
                      />
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>
            </TouchableOpacity>
          </Modal>
          <BlurEventMedia
            imageUrl={imageUrl}
            isBlurOpen={isBlurOpen}
            closeBlur={() => setIsBlurOpen(false)}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  eventContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  nav: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    height: 45,
  },
  headerText: {
    color: Colors.Black,
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 8,
    overflow: 'hidden',
  },
  content: {
    paddingVertical: 17,
    paddingHorizontal: 15,
  },
  contentRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  contentRow2: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  dateRow: {
    marginBottom: 10,
  },

  startDay: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  startTime: {
    marginLeft: 10,
    fontSize: 14,
    // color: 'gray',
    // color: Colors.softRed,
    fontWeight: '500',
  },
  location: {
    marginLeft: 10,
    fontSize: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
  },
  description: {
    flexWrap: 'wrap',
  },
  icon: {
    borderWidth: 0,
    borderColor: 'black',
    // borderRadius: 50,
    // maxHeight: 35,
    // padding: 7,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  btn: {
    // backgroundColor: 'rgb(107,197,83)',
    backgroundColor: '#00ca4e',

    marginHorizontal: 15,
    borderRadius: 6,
  },
  btnText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 13,
    textAlign: 'center',
  },
  btnContainer: {
    // justifyContent: 'flex-end',
    // height: '64.5%',
    position: 'relative',
    marginBottom: 7,
  },

  containerBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    resizeMode: 'cover',
    width: null,
    height: null,
  },
  blurViewStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  textStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#d0d0d0',
  },
  blurToggleStyle: {
    position: 'absolute',
    top: 30,
    alignItems: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    width: 300,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 16,
  },
});

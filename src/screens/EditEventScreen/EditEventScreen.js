import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  Switch,
  Modal,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef, useMemo} from 'react';
import {updateUser} from '../../store/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScopesPopup from '../../components/ScopesPopup/';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';
import ImagePicker from 'react-native-image-crop-picker';
import {
  FacebookLoader,
  InstagramLoader,
} from 'react-native-easy-content-loader';
// import {icons} from '../../model/data';

const deviceHeight = Dimensions.get('window').height;

const EditEventScreen = props => {
  const dropdownRef = useRef({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  // const [month, setMonth] = useState('');
  // const [month2, setMonth2] = useState('');
  const [scopes, setScopes] = useState([]);
  const [selectedScope, setSelectedScope] = useState('');
  const [scope, setScope] = useState('');
  const [open, setOpen] = useState(false);
  const [mineScopes, setMineScopes] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hour, setHour] = useState('');
  const [hour2, setHour2] = useState('');
  const [minute, setMinute] = useState('');
  const [minute2, setMinute2] = useState('');
  const [icon, setIcon] = useState('Red');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [scopeName, setScopeName] = useState('');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const ref = useRef();
  const [catherine, setCatherine] = useState('Select scope');
  const data2 = useSelector(state => state.Reducers.userData);
  const [isScopeVisible, setIsScopeVisible] = useState(false);
  const [isLocVisible, setIsLocVisible] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [minutes, setMinutes] = useState('00');
  const [specLocation, setSpecLoation] = useState('Open map');
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMediaLoading, setIsMediaLoading] = useState(false);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const evDetails = props?.route?.params?.data;
  const [eventImage, setEventImage] = useState(evDetails?.image);
  const [eventTitle, setEventTitle] = useState(evDetails?.name);
  const [eventLocation, setEventLocation] = useState(evDetails?.location);
  const [eventDetails, setEventDetails] = useState(evDetails?.description);
  const [eventDatetime, setEventDatetime] = useState(evDetails?.datetime);
  const [eventDay, setEventDay] = useState(evDetails?.day);
  const [eventMonth, setEventMonth] = useState(evDetails?.month);
  const [eventYear, setEventYear] = useState(evDetails?.year);
  const [eventStartTime, setEventStartTime] = useState(evDetails?.startTime);
  const [eventEndTime, setEventEndTime] = useState(evDetails?.endTime);
  const [eventScope, setEventScope] = useState(evDetails?.scope);
  const [eventIcon, setEventIcon] = useState(evDetails?.icon);
  const [eventLatitude, setEventLatitude] = useState(evDetails?.latitude);
  const [eventLongitude, setEventLongitude] = useState(evDetails?.longitude);
  const [eventMedia, setEventMedia] = useState(evDetails?.media);
  const [eventHost, setEventHost] = useState(evDetails?.host);
  const [eventLink, setEventLink] = useState(evDetails?.link);
  const [eventDate, setEventDate] = useState(new Date(evDetails?.date));
  const [eventEndDate, setEventEndDate] = useState(
    new Date(evDetails?.endDate),
  );
  const [eventModOnly, setEventModOnly] = useState(evDetails?.host);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notiText, setNotiText] = useState(evDetails?.notiText);
  const [notificationDescription, setNotificationDescription] = useState(
    evDetails?.notificationDescription,
  );
  const [notificationTime, setNotificationTime] = useState(
    evDetails?.notificationTime,
  );

  const changeScopeVisible = bool => {
    setIsScopeVisible(bool);
  };

  const changeLocVisible = bool => {
    setIsLocVisible(bool);
  };

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const pullMe = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const closeModal = (bool, info) => {
    changeModalVisible(bool);
  };
  const closeNotification = (bool, info) => {
    changeNotificationVisible(bool);
  };

  const changeNotificationVisible = bool => {
    setIsNotificationVisible(bool);
  };

  const closeLoc = (bool, info) => {
    changeLocVisible(bool);
  };

  const changeIconVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeIcon = (bool, info) => {
    changeModalVisible(bool);
  };

  const user = useSelector(state => state.Reducers.userData);

  const [data, setData] = useState({
    name: '',
    location: '',
    startDay: `${monthName} ${date.getDate()}, ${date.getFullYear()}`,
    startTime: formatAMPM(date),
    endDay: formatAMPM(date2),
    endTime: formatAMPM(date2),
    datetime: date.getTime(),
    image: '',
    latitude: '',
    longitude: '',
    description: '',
    media: [],
    user: '',
    host: false,
    going: false,
    hostName: '',
    goingBtn: '#00ca4e',
    goingBtnText: 'white',
  });

  const {
    name,
    location,
    startTime,
    month,
    day,
    year,
    endDay,
    endTime,
    datetime,
    image,
    description,
    media,
    latitude,
    longitude,
    host,
    going,
    hostName,
    goingBtn,
    goingBtnText,
  } = data;

  const clearForm = () => {
    setData({
      name: '',
      location: '',
      month: '',
      day: '',
      year: '',
      startTime: '',
      endDay: '',
      endTime: '',
      datetime: '',
      image: '',
      description: '',
      user: '',
      latitude: '',
      longitude: '',
      going: false,
      hostName: '',
      media: [],
      goingBtn: '#00ca4e',
      goingBtnText: 'white',
      host: false,
    });
    setIcon('Default');
    setScope('');
    setMarker('');
    setSelectedScope('');
    setCatherine('Select scope');
    setMinutes('00');
    setIsLoading(false);
    setIsMediaLoading(false);
    setIsPhotoLoading(false);
  };

  const onCancelPress = () => {
    clearForm();
    navigation.goBack();
  };

  const onOpenPress = () => {
    setOpen(true);
  };

  const onOpen2Press = () => {
    setOpen2(true);
  };

  const onOpen3Press = () => {
    setOpen3(true);
  };

  useEffect(() => {
    ref.current?.setAddressText(location);
  }, [location]);

  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxheight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includedBase64: false,
    },
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 1580,
      height: 1080,
      cropping: true,
    }).then(async imag => {
      try {
        setIsPhotoLoading(true);
        // let token = await AsyncStorage.getItem('token', token);

        const formData = new FormData();

        formData.append('image', {
          uri: imag.path,
          type: imag.mime,
          name: imag.filename,
        });

        let res = await fetch('https://kweeble.herokuapp.com/events/image', {
          method: 'post',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data; ',
            // Authorization: `Bearer ${token}`,
          },
        });

        let responseJson = await res.json();
        setIsPhotoLoading(false);
        console.log(responseJson, 'see');
        setEventImage(responseJson);
      } catch (error) {
        console.log(error);
        setIsPhotoLoading(false);
      }
    });
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

  const onDonePress = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //   let token = await AsyncStorage.getItem('token', token);
      const res = await axios.put(
        `https://kweeble.herokuapp.com/events/edit/${evDetails?._id}`,
        {
          name: eventTitle,
          location: eventLocation,
          month: eventMonth,
          year: eventYear,
          day: eventDay,
          startTime: eventStartTime,
          endDay,
          endTime: eventEndTime,
          datetime: eventDatetime,
          image: eventImage,
          description: eventDetails,
          host: eventHost,
          latitude: eventLatitude,
          longitude: eventLongitude,
          icon: eventIcon,
          scope: eventScope,
          media: eventMedia,
          id: evDetails?._id,
          modOnly: eventModOnly,
          repeat: 'Never',
          notiText,
          notificationTime,
          notificationDescription,
          date: eventDate,
          endDate: eventEndDate,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res, '<===success!');
      //   clearForm();
      //   navigation.goBack();
      navigation.navigate('HomeScreen', {setRef: 'ref ye'});
    } catch (error) {
      console.log(error.response.data.error);
      setError(true);
      setErrorMsg(error.response.data.error);
      setIsLoading(false);
    }
  };

  const toggle = () => {
    setEventHost(!eventHost);
  };

  const pinList = [
    {
      id: 0,
      name: 'Red',
      color: Colors.pinRed,
    },
    {
      id: 1,
      name: 'Yellow',
      color: Colors.pinYellow,
    },
    {
      id: 2,
      name: 'Green',
      color: Colors.pinGreen,
    },
    {
      id: 3,
      name: 'Blue',
      color: Colors.pinBlue,
    },
    {
      id: 4,
      name: 'Navy',
      color: Colors.pinNavy,
    },
    {
      id: 5,
      name: 'Orange',
      color: Colors.pinOrange,
    },
    {
      id: 6,
      name: 'Purple',
      color: Colors.pinPurple,
    },
  ];

  useEffect(() => {
    setIcon(icon);
  }, [icon]);

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

  const monthName = months[date.getMonth()];

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
  }, [refresh]);

  useEffect(() => {
    const my = scopes.filter(sc => sc.name === selectedScope);
    setScope(my[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedScope, refresh]);

  const myScopes = scopes.filter(item => {
    return item.members.indexOf(data2._id) >= 0;
  });

  useEffect(() => {
    if (error) {
      setTimeout(function () {
        setError(false);
      }, 4000);
    }
  }, [error]);

  const [markers, setMarkers] = useState([]);
  const [marker, setMarker] = useState('');

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

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes2 = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes2 = minutes2 < 10 ? '0' + minutes2 : minutes2;
    var strTime = hours + ':' + minutes2 + ' ' + ampm;
    return strTime;
  }

  const openMediaPicker = () => {
    try {
      ImagePicker.openPicker({
        multiple: true,
        maxFiles: 5,
      }).then(async images => {
        setIsMediaLoading(true);
        const formData = new FormData();

        for (const imge of images) {
          formData.append('image', {
            uri: imge.path,
            type: imge.mime,
            name: imge.filename,
          });
        }

        let res = await fetch('https://kweeble.herokuapp.com/events/media', {
          method: 'post',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        });
        let responseJson = await res.json();
        console.log('response', responseJson);
        // console.log(res);

        setIsMediaLoading(false);
        setEventMedia(prevState => [...prevState, ...responseJson]);
      });
    } catch (error) {
      console.log(error);
      setIsMediaLoading(false);
    }
  };

  useEffect(() => {
    const xyz = scopes?.filter(s => s?._id === evDetails?.scope)[0]?.name;
    setCatherine(xyz);
  }, [evDetails?.scope, scopes]);

  const onNotificationPress = (num, text) => {
    setIsNotificationVisible(false);
    setNotiText(text);

    let originalDate = new Date(eventDate); // your specific date
    let newDate;

    if (num === 'None') {
      newDate = null; // no notification
    } else {
      newDate = new Date(originalDate.getTime() - num * 60 * 1000);
      // if num is in minutes, multiply by 60 * 1000 to get milliseconds
    }

    setNotificationTime(newDate);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {isLoading ? (
        <InstagramLoader active />
      ) : (
        <>
          <View style={styles.nav}>
            <TouchableOpacity onPress={onCancelPress}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>

            <Text style={styles.headerText}>Edit Event </Text>
            <TouchableOpacity onPress={onDonePress}>
              <Text style={styles.addText}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 10, backgroundColor: 'white'}}>
            <View style={{flex: 0.5}}>
              {eventImage === '' ? (
                isPhotoLoading ? (
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator size="small" color={Colors.primary} />
                  </View>
                ) : (
                  <>
                    <ImageBackground
                      source={require('../../../assets/images/zoom.webp')}
                      style={{
                        width: '100%',
                        height: 225,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={openGallery}
                        style={{
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          borderRadius: 100,
                          height: 60,
                          width: 60,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 5,
                          marginTop: 5,
                        }}>
                        <Feather name="camera" size={30} color="white" />
                      </TouchableOpacity>
                    </ImageBackground>
                  </>
                )
              ) : (
                <>
                  <ImageBackground
                    source={{uri: eventImage}}
                    style={{
                      width: '100%',
                      height: 225,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={openGallery}
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: 100,
                        height: 60,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 5,
                        marginTop: 5,
                      }}>
                      <Feather name="camera" size={30} color="white" />
                    </TouchableOpacity>
                  </ImageBackground>
                </>
              )}
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => pullMe()}
                />
              }
              style={styles.content}>
              {error && (
                <View style={{paddingHorizontal: 0, paddingVertical: 2}}>
                  <Text style={{color: Colors.coolRed, fontWeight: '500'}}>
                    {errorMsg}
                  </Text>
                </View>
              )}
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  //   paddingHorizontal: 15,

                  marginTop: 10,
                  marginBottom: 25,
                }}>
                <View style={styles.inputContainer}>
                  <Text style={styles.txt}>Title</Text>

                  <TextInput
                    placeholder="Title"
                    // editable={false}
                    style={styles.input2}
                    value={eventTitle}
                    onChangeText={newText => setEventTitle(newText)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.txt}>Location</Text>

                  <TextInput
                    placeholder="Location"
                    style={styles.inputInfo}
                    value={eventLocation}
                    multiline
                    onChangeText={newText => setEventLocation(newText)}
                  />
                </View>
                <View style={styles.lastInputContainer2}>
                  <Text style={styles.txt}>Details</Text>

                  <TextInput
                    placeholder="Details"
                    // editable={false}
                    style={styles.lastInput2}
                    value={eventDetails}
                    onChangeText={newText => setEventDetails(newText)}
                  />
                </View>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 15,
                  paddingTop: 10,
                  borderRadius: 10,
                }}>
                <View style={styles.row2}>
                  <View>
                    <Text style={styles.title2}>Date</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginBottom: 10}}>
                    <View
                      style={{
                        borderRadius: 6,
                        backgroundColor: Colors.subtleGray,
                        flexDirection: 'row',
                        marginRight: 5,
                      }}>
                      <Pressable onPress={onOpenPress}>
                        <Text style={styles.date}>{`${
                          months[eventMonth - 1]
                        } ${eventDay}, ${eventYear}`}</Text>
                      </Pressable>
                    </View>
                    <DatePicker
                      modal
                      open={open}
                      mode="date"
                      date={eventDate}
                      onConfirm={datex => {
                        setOpen(false);
                        setDate(datex);
                        // setMonth(month);
                        setEventMonth(datex.getMonth() + 1);
                        setEventDay(datex.getDate());
                        setEventYear(datex.getFullYear());
                        setEventDatetime(datex.getTime());

                        let newDate = new Date(
                          datex.setHours(
                            eventDate.getHours(),
                            eventDate.getMinutes(),
                          ),
                        );
                        setEventDate(newDate);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                      onDateChange={setEventDate}
                    />
                    <View style={styles.dateChangeContainer}>
                      <Pressable onPress={onOpen2Press}>
                        <Text style={styles.date}>{eventStartTime}</Text>
                      </Pressable>
                    </View>

                    <View
                      style={{
                        justifyContent: 'center',
                        align: 'center',
                        marginRight: 3,
                      }}>
                      <Text>-</Text>
                    </View>

                    <View style={styles.dateChangeContainer}>
                      <Pressable onPress={onOpen3Press}>
                        <Text style={styles.date}>{eventEndTime}</Text>
                      </Pressable>
                    </View>

                    <DatePicker
                      onCancel={() => {
                        setOpen2(false);
                      }}
                      onConfirm={time => {
                        setOpen2(false);

                        setEventStartTime(formatAMPM(time));

                        let newDate = new Date(
                          eventDate.setHours(
                            time.getHours(),
                            time.getMinutes(),
                          ),
                        );
                        setEventDate(newDate);
                      }}
                      modal
                      open={open2}
                      mode="time"
                      date={eventDate}
                      onDateChange={setEventDate}
                      is24Hour={false}
                    />
                    <DatePicker
                      onCancel={() => {
                        setOpen3(false);
                      }}
                      onConfirm={timef => {
                        setOpen3(false);
                        setDate2(timef);
                        setEventEndTime(formatAMPM(timef));

                        let newDate = new Date(
                          eventDate.setHours(
                            timef.getHours(),
                            timef.getMinutes(),
                          ),
                        );
                        setEventEndDate(newDate);
                      }}
                      modal
                      open={open3}
                      mode="time"
                      date={date2}
                      onDateChange={setDate2}
                      is24Hour={false}
                    />
                  </View>
                </View>

                <View style={styles.iconRow}>
                  <View>
                    <Text style={{fontSize: 14, fontWeight: '400'}}>Scope</Text>
                  </View>
                  <View>
                    <View style={styles.collegeInput}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingLeft: 15,
                          paddingRight: 5,
                          paddingTop: 5,
                        }}
                        // onPress={() => setIsModalVisible(true)}
                        onPress={() => changeScopeVisible(true)}>
                        <Text style={{fontSize: 14}}>{catherine}</Text>
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={23}
                          color={'gray'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={styles.iconRow}>
                  <View>
                    <Text style={{fontSize: 14, fontWeight: '400'}}>
                      Specific location
                    </Text>
                  </View>
                  <View>
                    <View style={styles.mapInput}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',

                          // paddingLeft: 15,
                          // paddingRight: 10,
                          // paddingTop: 5,
                        }}
                        onPress={() => setIsLocVisible(true)}>
                        <Text style={{fontSize: 14}}>{specLocation}</Text>
                        <MaterialIcons
                          name="keyboard-arrow-right"
                          size={23}
                          color={'gray'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={styles.iconRow}>
                  <View>
                    <Text style={{fontSize: 14, fontWeight: '400'}}>
                      Pin color
                    </Text>
                  </View>
                  <View>
                    <View style={styles.iconInput}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          // paddingLeft: 15,
                          paddingRight: 5,
                          paddingTop: 5,
                        }}
                        // onPress={() => setIsModalVisible(true)}
                        onPress={() => setIsIconVisible(true)}>
                        <Text style={{fontSize: 14}}>{eventIcon}</Text>
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={23}
                          color={'gray'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={styles.iconRow}>
                  <View>
                    <Text style={{fontSize: 14, fontWeight: '400'}}>
                      Notification time
                    </Text>
                  </View>
                  <View>
                    <View style={styles.iconInput}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          // paddingLeft: 15,
                          paddingRight: 5,
                          paddingTop: 5,
                        }}
                        // onPress={() => setIsModalVisible(true)}
                        onPress={() => setIsNotificationVisible(true)}>
                        <Text style={{fontSize: 14}}>{notiText}</Text>
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={23}
                          color={'gray'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {notiText !== 'None' ? (
                  <View
                    style={{
                      backgroundColor: Colors.subtleGray,
                      maxWidth: '100%',
                      minWidth: 127,
                      // height: 35,
                      justifyContent: 'center',
                      borderColor: '#e8e8e8',
                      borderRadius: 8,
                      paddingRight: 5,
                      paddingLeft: 15,
                      paddingVertical: 10,
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onPress={() => setIsLocVisible(true)}>
                      <TextInput
                        multiline={true}
                        style={{fontWeight: '400'}}
                        placeholder="Notification details"
                        autoCapitalize="none"
                        placeholderTextColor={Colors.lightgray}
                        onChangeText={newText =>
                          setNotificationDescription(newText)
                        }
                        value={notificationDescription}
                      />
                    </View>
                  </View>
                ) : null}
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  paddingBottom: 10,
                  marginTop: 10,
                  marginBottom: 25,
                }}>
                <View
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    // borderBottomColor: Colors.subtleGray,
                    // borderBottomWidth: 1,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 3,
                    }}>
                    <TouchableOpacity
                      onPress={openMediaPicker}
                      style={{
                        backgroundColor: Colors.metagray,
                        padding: 2,
                        borderRadius: 100,
                      }}>
                      <Feather name="plus" size={20} color="black" />
                    </TouchableOpacity>
                    <View
                      style={{justifyContent: 'center', marginHorizontal: 10}}>
                      <Text>Media </Text>
                    </View>
                  </View>
                </View>
                {isMediaLoading ? (
                  <View style={{marginBottom: 5}}>
                    <ActivityIndicator size="small" color={Colors.primary} />
                  </View>
                ) : (
                  <>
                    {eventMedia.length > 0 ? (
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <View
                          style={{flexDirection: 'row', overflow: 'scroll'}}>
                          {eventMedia.map((photo, index) => {
                            return (
                              <View key={`id${index}`}>
                                <ImageBackground
                                  style={{
                                    width: 90,
                                    height: 100,

                                    marginRight: 5,
                                  }}
                                  imageStyle={{borderRadius: 8}}
                                  source={{uri: photo}}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      setEventMedia(
                                        eventMedia.filter(
                                          (e, i) => i !== index,
                                        ),
                                      );
                                    }}
                                    style={{
                                      backgroundColor: 'rgba(0,0,0,0.3)',
                                      borderRadius: 100,
                                      height: 25,
                                      width: 25,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      marginLeft: 5,
                                      marginTop: 5,
                                    }}>
                                    <Ionicons
                                      name="ios-close"
                                      size={18}
                                      color="white"
                                    />
                                  </TouchableOpacity>
                                </ImageBackground>
                              </View>
                            );
                          })}
                        </View>
                      </ScrollView>
                    ) : null}
                  </>
                )}
              </View>

              <View style={{width: '100%', height: 500}} />
            </ScrollView>
          </View>
        </>
      )}

      <TouchableWithoutFeedback onPress={closeModal}>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={false}
          onRequestClose={closeModal}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setIsModalVisible(false)}
            activeOpacity={1}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#000000AA',
                // justifyContent: 'flex-end',
              }}>
              {/* <renderOutsideTouchable onTouch={onTouchOutside} /> */}

              <View
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  paddingHorizontal: 10,
                  maxHeight: deviceHeight * 0.4,
                  paddingBottom: 12,
                  marginTop: 45,
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

                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',

                    //   alignItems: 'center',
                  }}>
                  {myScopes.map(scope => {
                    return (
                      <View key={scope._id}>
                        <ScrollView>
                          <TouchableOpacity
                            onPress={() => {
                              setEventScope(scope._id);
                              // setIsScopeSelected(true);
                              setIsModalVisible(false);
                              setScopeName(scope.name);
                              setCatherine(`${scope.name}`);
                            }}
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
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={closeIcon}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={isIconVisible}
          onRequestClose={closeIcon}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000AA',
              // justifyContent: 'flex-end',
            }}>
            {/* <renderOutsideTouchable onTouch={onTouchOutside} /> */}

            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                paddingHorizontal: 10,
                height: '100%',
                // maxHeight: deviceHeight * 0.4,
                paddingBottom: 12,
                marginTop: 45,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => setIsIconVisible(false)}
                  style={{paddingTop: 10, borderRadius: 100}}>
                  <MaterialIcons
                    // onPress={() => navigation.goBack()}
                    name="arrow-back-ios"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    textAlign: 'center',
                    fontWeight: '600',
                    margin: 5,
                    paddingTop: 5,
                  }}>
                  Select map icon
                </Text>

                <View>
                  <Text> {'     '}</Text>
                </View>

                {/* <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={{paddingTop: 10}}>
                  <Feather
                    name="x"
                    size={25}
                    color="black"
                    backgroundColor="white"
                  />
                </TouchableOpacity> */}
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',

                  //   alignItems: 'center',
                }}>
                {pinList.map(icn => {
                  return (
                    <View key={icn.id}>
                      <ScrollView>
                        <TouchableOpacity
                          onPress={() => {
                            setIsIconVisible(false);
                            // setData({...data, icon: icn.name});
                            setEventIcon(icn.name);
                            setIcon(icn.name);
                          }}
                          key={icn.id}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 3,
                            marginBottom: 8,
                            height: '100%',
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
                            {/* <Image
                              source={icn.image}
                              style={{
                                width: 25,
                                height: 25,
                                borderRadius: 100,
                                borderWidth: 0,
                              }}
                            /> */}
                            <View
                              style={{
                                width: 25,
                                height: 25,
                                borderRadius: 100,
                                borderWidth: 0,
                                backgroundColor: icn.color,
                              }}
                            />
                          </View>

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
                              {icn.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </ScrollView>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={closeLoc}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={isLocVisible}
          onRequestClose={closeLoc}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000AA',
              // justifyContent: 'flex-end',
            }}>
            {/* <renderOutsideTouchable onTouch={onTouchOutside} /> */}

            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                // paddingHorizontal: 10,
                // maxHeight: deviceHeight * 0.4,
                height: '100%',
                paddingBottom: 12,
                marginTop: 45,
                // flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 5,
                  paddingHorizontal: 10,
                  // flex: 1,
                }}>
                <Pressable onPress={() => setIsLocVisible(false)}>
                  <Text
                    style={{
                      color: Colors.primary,
                      fontSize: 16,
                      textAlign: 'center',
                      fontWeight: '400',
                      margin: 5,
                      paddingTop: 5,
                    }}>
                    Cancel
                  </Text>
                </Pressable>

                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      textAlign: 'center',
                      fontWeight: '600',
                      marginVertical: 5,
                      paddingTop: 5,
                    }}>
                    Set Location
                  </Text>
                </View>

                <Pressable onPress={() => setIsLocVisible(false)}>
                  <Text
                    style={{
                      color: Colors.primary,
                      fontSize: 16,
                      textAlign: 'center',
                      fontWeight: '400',
                      margin: 5,
                      paddingTop: 5,
                    }}>
                    Save
                  </Text>
                </Pressable>
              </View>

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
                      // borderBottomWidth: 1,
                      // borderColor: 'lightgray',
                      borderColor: '#e8e8e8',
                      borderBottomColor: 'lightgray',
                      borderWidth: 1,
                      // marginBottom: 15,
                      fontSize: 16,
                      paddingBottom: 15,
                      paddingTop: 10,
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      fontWeight: '400',
                      marginHorizontal: 10,
                      marginTop: 10,
                      borderRadius: 8,
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
                    setEventLatitude(e.nativeEvent.coordinate.latitude);
                    setEventLongitude(e.nativeEvent.coordinate.longitude);
                  }}>
                  {marker?.latlng?.latitude !== undefined ? (
                    <Marker
                      // key={index}
                      // image={require('../../../assets/images/iconface.png')}
                      coordinate={{
                        latitude: marker?.latlng?.latitude,
                        longitude: marker?.latlng?.longitude,
                      }}
                    />
                  ) : null}
                </MapView>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => changeNotificationVisible(false)}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={isNotificationVisible}
          onRequestClose={closeNotification}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => changeNotificationVisible(false)}
            style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#000000AA',
                // justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  borderTopRightRadius: 25,
                  borderTopLeftRadius: 25,
                  paddingHorizontal: 10,
                  height: '100%',
                  // maxHeight: deviceHeight * 0.4,
                  paddingBottom: 12,
                  marginTop: 270,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => setIsNotificationVisible(false)}
                    style={{paddingTop: 10, borderRadius: 100}}>
                    <MaterialIcons
                      // onPress={() => navigation.goBack()}
                      name="arrow-back-ios"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      // textAlign: 'center',
                      fontWeight: '600',
                      margin: 5,
                      paddingTop: 5,
                      marginBottom: 15,
                    }}>
                    Notification time
                  </Text>

                  <View>
                    <Text>{'     '}</Text>
                  </View>
                </View>

                <ScrollView>
                  <TouchableOpacity
                    onPress={() => onNotificationPress('None', 'None')}
                    style={{
                      backgroundColor: Colors.metagray,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      padding: 15,
                      borderRadius: 10,
                      width: '100%',
                    }}>
                    <Text style={{fontSize: 16, fontWeight: '400'}}>None</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      onNotificationPress(0, 'At time of the event')
                    }
                    style={{
                      backgroundColor: Colors.metagray,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      padding: 15,
                      borderRadius: 10,
                      width: '100%',
                    }}>
                    <Text style={{fontSize: 16, fontWeight: '400'}}>
                      At time of the event
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onNotificationPress(10, '10 minutes before')}
                    style={{
                      backgroundColor: Colors.metagray,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      padding: 15,
                      borderRadius: 10,
                      width: '100%',
                    }}>
                    <Text style={{fontSize: 16, fontWeight: '400'}}>
                      10 minutes before
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onNotificationPress(15, '15 minutes before')}
                    style={{
                      backgroundColor: Colors.metagray,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      padding: 15,
                      borderRadius: 10,
                      width: '100%',
                    }}>
                    <Text style={{fontSize: 16, fontWeight: '400'}}>
                      15 minutes before
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onNotificationPress(30, '30 minutes before')}
                    style={{
                      backgroundColor: Colors.metagray,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      padding: 15,
                      borderRadius: 10,
                      width: '100%',
                    }}>
                    <Text style={{fontSize: 16, fontWeight: '400'}}>
                      30 minutes before
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onNotificationPress(45, '45 minutes before')}
                    style={{
                      backgroundColor: Colors.metagray,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      padding: 15,
                      borderRadius: 10,
                      width: '100%',
                    }}>
                    <Text style={{fontSize: 16, fontWeight: '400'}}>
                      45 minutes before
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onNotificationPress(60, '1 hour before')}
                    style={{
                      backgroundColor: Colors.metagray,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      padding: 15,
                      borderRadius: 10,
                      width: '100%',
                    }}>
                    <Text style={{fontSize: 16, fontWeight: '400'}}>
                      1 hour before
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onNotificationPress(120, '2 hours before')}
                    style={{
                      backgroundColor: Colors.metagray,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      padding: 15,
                      borderRadius: 10,
                      width: '100%',
                    }}>
                    <Text style={{fontSize: 16, fontWeight: '400'}}>
                      2 hours before
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableWithoutFeedback>

      <Modal
        visible={isScopeVisible}
        transparent
        animationType="slide"
        onRequestClose={() => changeScopeVisible(false)}>
        <ScopesPopup
          changeScopeVisible={changeScopeVisible}
          setScope={e => setCatherine(`${e}`)}
          setId={e => setScope(e)}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default EditEventScreen;

const styles = StyleSheet.create({
  nav: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  cancelBtn: {
    color: 'black',
    fontSize: 16,
  },
  headerText: {color: Colors.Black, fontWeight: 'bold', fontSize: 17},
  addText: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
  content: {
    flex: 7.5,
    // backgroundColor: Colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.metagray,
  },
  title: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '400',
    // marginBottom: 5,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 15,
    fontSize: 16,
    paddingBottom: 15,
    paddingTop: 10,
    paddingHorizontal: 0,
    fontWeight: '400',
    // position: 'relative',
  },
  row: {
    marginBottom: 8,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    // backgroundColor: Colors.subtleGray,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  dateChangeContainer: {
    borderRadius: 6,
    backgroundColor: Colors.subtleGray,
    flexDirection: 'row',
    marginRight: 3,
  },
  title2: {
    color: 'black',
  },
  row3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  collegeInput: {
    backgroundColor: Colors.subtleGray,
    // width: '47.5%',
    maxWidth: '100%',
    height: 35,
    borderColor: '#e8e8e8',
    // borderWidth: 1,
    // paddingHorizontal: 10,
    // marginVertical: 5,
    borderRadius: 8,
  },
  mapInput: {
    backgroundColor: Colors.subtleGray,
    // width: '47.5%',
    maxWidth: '100%',
    minWidth: 127,
    height: 35,
    justifyContent: 'center',
    borderColor: '#e8e8e8',
    // borderWidth: 1,
    // paddingHorizontal: 10,
    // marginVertical: 5,
    borderRadius: 8,
    paddingRight: 5,
    paddingLeft: 15,
    // alignItems: 'center',
  },
  collegeInputText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
  },

  iconInput: {
    backgroundColor: Colors.subtleGray,
    // width: '47.5%',
    maxWidth: '100%',
    minWidth: 127,
    height: 35,
    // justifyContent: 'center',
    borderColor: '#e8e8e8',
    // borderWidth: 1,
    // paddingHorizontal: 10,
    // marginVertical: 5,
    borderRadius: 8,
    paddingRight: 5,
    paddingLeft: 15,
    // alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
    flex: 0.5,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },

  inputContainer: {
    // backgroundColor: 'white',
    // width: '100%',
    // borderColor: '#e8e8e8',
    // borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 5,
    // borderRadius: 5,
    // flex: 1,
    flexDirection: 'row',
  },
  inputInfo: {
    paddingVertical: 10,
    marginTop: 10,
    // borderRadius: 5,
    borderBottomWidth: 1,
    width: '80%',
    borderColor: 'lightgray',
    fontWeight: '400',
    flex: 13,
  },
  input2: {
    paddingVertical: 10,
    // borderRadius: 5,
    borderBottomWidth: 1,
    width: '100%',
    borderColor: 'lightgray',
    fontWeight: '400',
    flex: 13,
  },
  txt: {
    paddingVertical: 15,
    // marginRight: 50,
    fontWeight: '500',
    flex: 4,
  },

  lastInputContainer: {
    // paddingHorizontal: 15,
    // marginBottom: 5,
    // borderRadius: 5,
    // flex: 1,
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderColor: 'lightgray',
  },
  lastInputContainer3: {
    // paddingHorizontal: 15,
    // marginBottom: 5,
    // borderRadius: 5,
    // flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    // borderBottomWidth: 1,
    // borderColor: 'lightgray',
  },

  lastInputContainer2: {
    paddingHorizontal: 15,
    // marginBottom: 5,
    // borderRadius: 5,
    // flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderColor: Colors.redditDarkerGray,
  },
  lastInput: {
    paddingVertical: 10,
    // borderRadius: 5,

    width: '80%',

    fontWeight: '400',
    flex: 10,
  },
  lastInput2: {
    paddingVertical: 10,
    // borderRadius: 5,

    width: '80%',

    fontWeight: '400',
    flex: 13,
  },
});

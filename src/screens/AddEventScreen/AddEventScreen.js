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
import RepeatPopup from '../../components/RepeatPopup/';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';
import ImagePicker from 'react-native-image-crop-picker';
import {
  FacebookLoader,
  InstagramLoader,
} from 'react-native-easy-content-loader';
// import {icons} from '../../model/data';

const deviceHeight = Dimensions.get('window').height;

const AddEventScreen = props => {
  const dropdownRef = useRef({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [scopes, setScopes] = useState([]);
  const [selectedScope, setSelectedScope] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [icon, setIcon] = useState('Red');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isModOnly, setIsModOnly] = useState(false);
  const [scopeName, setScopeName] = useState('');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const ref = useRef();
  const [catherine, setCatherine] = useState('Select scope');
  const data2 = useSelector(state => state.Reducers.userData);
  const [isScopeVisible, setIsScopeVisible] = useState(false);
  const [isRepeatVisible, setIsRepeatVisible] = useState(false);
  const [isLocVisible, setIsLocVisible] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [minutes, setMinutes] = useState('00');
  const [specLocation, setSpecLoation] = useState('Open map');
  const [refresh, setRefresh] = useState(false);
  const [repeatText, setRepeatText] = useState('Never');
  const [isLoading, setIsLoading] = useState(false);
  const [isMediaLoading, setIsMediaLoading] = useState(false);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [eventDate, setEventDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [notificationTime, setNotificationTime] = useState(new Date());
  const [notiText, setNotiText] = useState('None');
  const [notificationDescription, setNotificationDescription] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const changeScopeVisible = bool => {
    setIsScopeVisible(bool);
  };

  const changeRepeatVisible = bool => {
    setIsRepeatVisible(bool);
  };

  const changeLocVisible = bool => {
    setIsLocVisible(bool);
  };

  const changeNotificationVisible = bool => {
    setIsNotificationVisible(bool);
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

  const closeLoc = (bool, info) => {
    changeLocVisible(bool);
  };

  const closeNotification = (bool, info) => {
    changeNotificationVisible(bool);
  };

  const closeIcon = (bool, info) => {
    changeModalVisible(bool);
  };

  const user = useSelector(state => state.Reducers.userData);

  const [data, setData] = useState({
    name: '',
    location: '',
    startDay: `${monthName} ${eventDate.getDate()}, ${eventDate.getFullYear()}`,
    startTime: formatAMPM(eventDate),
    endDay: formatAMPM(eventEndDate),
    endTime: formatAMPM(eventEndDate),
    datetime: eventDate.getTime(),
    image: '',
    latitude: '',
    longitude: '',
    description: '',
    media: [],
    user: '',
    scope: '',
    host: false,
    going: false,
    hostName: '',
    modOnly: false,
    goingBtn: '#00ca4e',
    goingBtnText: 'white',
    repeat: 'Never',
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
    modOnly,
    goingBtn,
    scope,
    goingBtnText,
    repeat,
  } = data;

  const clearForm = () => {
    setData({
      name: '',
      location: '',
      month: '',
      day: '',
      year: '',
      startTime: formatAMPM(eventDate),
      endDay: formatAMPM(eventEndDate),
      endTime: formatAMPM(eventEndDate),
      datetime: '',
      image: '',
      description: '',
      user: '',
      scope: '',
      latitude: '',
      longitude: '',
      going: false,
      hostName: '',
      modOnly: false,
      media: [],
      goingBtn: '#00ca4e',
      goingBtnText: 'white',
      host: false,
      repeat: 'Never',
    });
    setIcon('Default');
    setMarker('');
    setSelectedScope('');
    setCatherine('Select scope');
    setMinutes('00');
    setIsLoading(false);
    setIsMediaLoading(false);
    setIsPhotoLoading(false);
    setEventDate(new Date());
    setEventEndDate(new Date());
    setEventLink('');
    setNotiText('None');
    setNotificationDescription('');
    setNotificationTime(new Date());
  };

  const onCancelPress = () => {
    clearForm();
    navigation.navigate('HomeScreen');
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
        setData({...data, image: responseJson});
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

  const onAddEvent = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setData({...data});
      let token = await AsyncStorage.getItem('token', token);
      const res = await axios.post(
        'https://kweeble.herokuapp.com/events',
        {
          name,
          location,
          month,
          year,
          day,
          startTime,
          endDay,
          endTime,
          datetime,
          image,
          description,
          host,
          latitude,
          longitude,
          icon,
          user: user._id,
          scope,
          going,
          hostName: user.name,
          goingBtn,
          goingBtnText,
          media,
          modOnly,
          repeat,
          date: eventDate,
          notificationTime,
          endDate: eventEndDate,
          notiText,
          notificationDescription,

          link: eventLink,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.error) {
        throw new Error(res.data.error);
      }

      console.log(res, '<===success!');
      clearForm();
      setIsLoading(false);
      navigation.navigate('HomeScreen', {setRef: 'ref ye'});
    } catch (error) {
      console.log(error.response.data.error); // Log the error message instead of error.response.data.error
      setError(true);
      setErrorMsg(error.response.data.error); // Set the error message instead of error.response.data.error
      setIsLoading(false);
    }
  };

  const onAddEventd = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setData({...data});
      let token = await AsyncStorage.getItem('token', token);
      const res = await axios.post(
        'https://kweeble.herokuapp.com/events',
        {
          name,
          location,
          month,
          year,
          day,
          startTime,
          endDay,
          endTime,
          datetime,
          image,
          description,
          host,
          latitude,
          longitude,
          icon,
          user: user._id,
          scope,
          going,
          hostName: user.name,
          goingBtn,
          goingBtnText,
          media,
          modOnly,
          repeat,
          date: eventDate,
          notificationTime,
          endDate: eventEndDate,
          notiText,
          notificationDescription,

          link: eventLink,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res, '<===success!');
      clearForm();
      setIsLoading(false);
      navigation.navigate('HomeScreen', {setRef: 'ref ye'});
    } catch (error) {
      console.log(error.response.data.error);
      setError(true);
      setErrorMsg(error.response.data.error);
      setIsLoading(false);
    }
  };

  const toggle = () => {
    setIsEnabled(!isEnabled);
    setData({...data, host: !isEnabled});
  };

  const toggleModOnly = () => {
    setIsModOnly(!isModOnly);
    setData({...data, modOnly: !isModOnly});
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
  }, [refresh, scopes]);

  const myScopes = scopes?.filter(item => {
    return item.members.indexOf(data2._id) >= 0;
  });

  useEffect(() => {
    if (error) {
      setTimeout(function () {
        setError(false);
      }, 4000);
    }
  }, [error]);

  const [marker, setMarker] = useState('');

  const mapRef = useRef();
  // console.log(markers);
  const [region, setRegion] = useState({
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

        for await (const imge of images) {
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

        // setData({...data, photos: responseJson.images});
        setData({...data, media: responseJson});
      });
    } catch (error) {
      console.log(error);
      setIsMediaLoading(false);
    }
  };
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

            <Text style={styles.headerText}>New Event </Text>
            <TouchableOpacity onPress={onAddEvent}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 10, backgroundColor: 'white'}}>
            <View style={{flex: 0.5}}>
              {data.image === '' ? (
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
                    <View
                      style={{
                        flex: 2.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderStyle: 'dashed',
                        borderColor: 'rgba(128,128,128,0.8)',
                      }}>
                      <Image
                        style={{width: 100, height: 100}}
                        source={require('../../../assets/images/heart.jpg')}
                      />
                      <Pressable onPress={openGallery}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: 'rgba(128,128,128,0.8)',
                            textDecorationLine: 'underline',
                            paddingBottom: 5,
                          }}>
                          Upload event photo here
                        </Text>
                      </Pressable>
                    </View>
                  </>
                )
              ) : (
                <>
                  <ImageBackground
                    source={{uri: image}}
                    style={{width: '100%', height: 225}}>
                    <TouchableOpacity
                      onPress={() => {
                        setData({...data, image: ''});
                      }}
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        borderRadius: 100,
                        height: 30,
                        width: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 5,
                        marginTop: 5,
                      }}>
                      <Ionicons name="ios-close" size={20} color="white" />
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
                  paddingHorizontal: 15,

                  marginTop: 10,
                  marginBottom: 25,
                }}>
                <View
                  style={{
                    paddingTop: 5,
                    paddingBottom: 10,
                    borderBottomColor: Colors.subtleGray,
                    borderBottomWidth: 1,
                  }}>
                  <TextInput
                    // multiline={true}
                    style={{fontWeight: '400'}}
                    placeholder="Title"
                    autoCapitalize="none"
                    placeholderTextColor={Colors.lightgray}
                    onChangeText={newText => setData({...data, name: newText})}
                    value={name}
                  />
                </View>

                <View
                  style={{
                    paddingTop: 5,
                    paddingBottom: 10,
                    borderBottomColor: Colors.subtleGray,
                    borderBottomWidth: 1,
                  }}>
                  <TextInput
                    // multiline={true}
                    style={{fontWeight: '400'}}
                    placeholder="Location"
                    autoCapitalize="none"
                    placeholderTextColor={Colors.lightgray}
                    onChangeText={newText =>
                      setData({...data, location: newText})
                    }
                    value={location}
                  />
                </View>
                <View
                  style={{
                    paddingTop: 5,
                    paddingBottom: 10,
                    borderBottomColor: Colors.subtleGray,
                    borderBottomWidth: 1,
                  }}>
                  <TextInput
                    multiline={true}
                    style={{fontWeight: '400'}}
                    placeholder="Details"
                    placeholderTextColor={Colors.lightgray}
                    onChangeText={newText =>
                      setData({...data, description: newText})
                    }
                    autoCapitalize="none"
                    value={description}
                  />
                </View>

                <View
                  style={{
                    paddingTop: 5,
                    paddingBottom: 10,
                    borderBottomColor: Colors.subtleGray,
                    // borderBottomWidth: 1,
                  }}>
                  <TextInput
                    multiline={true}
                    style={{fontWeight: '400'}}
                    placeholder="URL/Link"
                    placeholderTextColor={Colors.lightgray}
                    onChangeText={newText => setEventLink(newText)}
                    autoCapitalize="none"
                    value={eventLink}
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
                        <Text
                          style={
                            styles.date
                          }>{`${monthName} ${date.getDate()}, ${date.getFullYear()}`}</Text>
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
                        let newDate = new Date(
                          datex.setHours(
                            eventDate.getHours(),
                            eventDate.getMinutes(),
                          ),
                        );
                        setEventDate(newDate);

                        setData({
                          ...data,
                          month: datex.getMonth() + 1,
                          day: datex.getDate(),
                          year: datex.getFullYear(),
                          datetime: datex.getTime(),
                        });
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                      onDateChange={setEventDate}
                    />
                    <View style={styles.dateChangeContainer}>
                      <Pressable onPress={onOpen2Press}>
                        <Text style={styles.date}>{formatAMPM(eventDate)}</Text>
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
                        <Text style={styles.date}>{formatAMPM(date2)}</Text>
                      </Pressable>
                    </View>

                    <DatePicker
                      onCancel={() => {
                        setOpen2(false);
                      }}
                      onConfirm={time => {
                        setOpen2(false);
                        let newDate = new Date(
                          eventDate.setHours(
                            time.getHours(),
                            time.getMinutes(),
                          ),
                        );
                        setEventDate(newDate);
                        setData({
                          ...data,
                          startTime: formatAMPM(time),
                        });
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
                        let newDate = new Date(
                          eventDate.setHours(
                            timef.getHours(),
                            timef.getMinutes(),
                          ),
                        );
                        setEventEndDate(newDate);
                        setData({
                          ...data,
                          endTime: formatAMPM(timef),
                        });
                      }}
                      modal
                      open={open3}
                      mode="time"
                      date={eventEndDate}
                      onDateChange={setEventEndDate}
                      is24Hour={false}
                    />
                  </View>
                </View>

                {/* <View style={styles.iconRow}>
                  <View>
                    <Text style={{fontSize: 14, fontWeight: '400'}}>
                      Repeat
                    </Text>
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
                        onPress={() => changeRepeatVisible(true)}>
                        <Text style={{fontSize: 14}}>{repeatText}</Text>
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={23}
                          color={'gray'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View> */}

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
                      Set specific location
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
                        {/* <Ionicons name="ios-map-outline" size={18} color="black" /> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={styles.iconRow}>
                  <View>
                    <Text style={{fontSize: 14, fontWeight: '400'}}>
                      Select pin color
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
                        <Text style={{fontSize: 14}}>{icon}</Text>
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

                {/* 
                <View style={styles.row3}>
                  <View>
                    <Text style={styles.title2}>Display host</Text>
                  </View>
                  <View style={{paddingRight: 2}}>
                    <Switch
                      trackColor={{false: '#767577', true: '#00ca4e'}}
                      thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggle}
                      value={isEnabled}
                    />
                  </View> */}
                {/* </View> */}

                {/* <View style={styles.row3}>
                  <View>
                    <Text style={styles.title2}>Event only for moderators</Text>
                  </View>
                  <View style={{paddingRight: 2}}>
                    <Switch
                      trackColor={{false: '#767577', true: '#00ca4e'}}
                      thumbColor={isModOnly ? '#f4f3f4' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleModOnly}
                      value={isModOnly}
                    />
                  </View>
                </View> */}
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
                      <Text>Add Media </Text>
                    </View>
                  </View>
                </View>
                {isMediaLoading ? (
                  <View style={{marginBottom: 5}}>
                    <ActivityIndicator size="small" color={Colors.primary} />
                  </View>
                ) : (
                  <>
                    {media.length > 0 ? (
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <View
                          style={{flexDirection: 'row', overflow: 'scroll'}}>
                          {media.map((photo, index) => {
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
                                      media.splice(index, 1);
                                      setData({...data});
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
                            setData({...data, icon: icn.name});
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

                height: '100%',
                paddingBottom: 12,
                marginTop: 45,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 5,
                  paddingHorizontal: 10,
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
                      borderColor: '#e8e8e8',
                      borderBottomColor: 'lightgray',
                      borderWidth: 1,

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
                    listView: {},
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
                    setData({
                      ...data,
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    });
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
      <TouchableWithoutFeedback onPress={() => changeScopeVisible(false)}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={isScopeVisible}
          onRequestClose={() => changeScopeVisible(false)}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => changeScopeVisible(false)}
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
                    onPress={() => setIsScopeVisible(false)}
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
                    {myScopes?.map(sc => {
                      return (
                        <View key={sc?._id}>
                          <ScrollView>
                            <TouchableOpacity
                              onPress={() => {
                                setCatherine(sc?.name);
                                setData({...data, scope: sc._id});
                                setIsScopeVisible(false);
                              }}
                              key={sc?.id}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 3,
                                marginBottom: 8,
                                height: '100%',
                              }}>
                              <Image
                                source={
                                  sc?.photo
                                    ? {uri: sc?.photo}
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
                                  {sc?.name}
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
      <Modal
        visible={isRepeatVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsRepeatVisible(false)}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => setIsRepeatVisible(false)}
          activeOpacity={1}>
          <RepeatPopup
            changeRepeatVisible={changeRepeatVisible}
            setRepeat={e => {
              setRepeatText(e);
              setData({...data, repeat: e});
            }}
            goTo={() => {
              navigation.navigate('CustomRepeat');
            }}
          />
        </TouchableOpacity>
      </Modal>

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
    </SafeAreaView>
  );
};

export default AddEventScreen;

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
    color: Colors.coolRed,
    fontSize: 16,
  },
  headerText: {color: Colors.Black, fontWeight: 'bold', fontSize: 17},
  addText: {
    color: Colors.coolRed,
    fontWeight: 'bold',
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
    maxWidth: '100%',
    minWidth: 127,
    height: 35,
    justifyContent: 'center',
    borderColor: '#e8e8e8',
    borderRadius: 8,
    paddingRight: 5,
    paddingLeft: 15,
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
});

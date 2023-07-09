import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import {useSelector} from 'react-redux';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {useEventContext} from '../../contexts/EventContext';

const EventCard = ({
  name,
  month,
  day,
  year,
  startTime,
  endDay,
  endTime,
  host,
  location,
  image,
  event,
  id,
  user,
  hostName,
  scp,
  date,
  endDate,
  link,
  description,
  // onDelete,
}) => {
  const navigation = useNavigation();
  const data = useSelector(state => state.Reducers.userData);
  const [val, setVal] = useState();
  const [isModalVisible, setIsModalVisible] = useState('');
  const [isReportOptionsVisible, setIsReportOptionsVisible] = useState(false);
  const [isReportSentVisible, setIsReportSentVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(savedEvents?.includes(id));
  const [reportOption, setReportOption] = useState('');
  const [isMoreVisible, setIsMoreVisible] = useState(false);
  const {savedEvents, fetchSavedEvents, addSavedEvent, removeSavedEvent} =
    useEventContext();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const SavedPopup = () => {
    return (
      <Animated.View
        style={{
          zIndex: 20,
          opacity: fadeAnim,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          left: 0,
          right: 0,
          bottom: 0,
          paddingLeft: 7,
          paddingRight: 2,
        }}>
        <Animated.View
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            // height: 40,
            borderRadius: 5,
            padding: 4,
            width: '100%',

            // paddingHorizontal: 5,
            backgroundColor: '#202123',
          }}
          pointerEvents="none">
          <Text style={{color: 'white', position: 'relative', fontSize: 12}}>
            {isSaved ? 'Saved' : 'Unsaved'}
          </Text>
        </Animated.View>
      </Animated.View>
    );
  };

  useEffect(() => {
    // Check if this event is saved when the savedEvents state changes
    setIsSaved(savedEvents?.includes(id));
  }, [savedEvents, id]);

  const onEventPress = () => {
    navigation.navigate('Event', {data: event, scp});
    setIsModalVisible(false);
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

  const onDelete = async () => {
    try {
      const res = await axios.delete(
        `https://kweeble.herokuapp.com/events/${id}`,
        {id},

        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const row = option => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}>
        <Text style={{fontSize: 14, fontWeight: '400'}}>{option}</Text>
      </View>
    );
  };

  const onUnsave = () => {
    removeSavedEvent(id, async () => {
      try {
        const resp = await axios.put(
          `https://kweeble.herokuapp.com/auth/events/del/${data?._id}`,
          {
            id: data?._id,
            event: id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(resp, 'del');
      } catch (error) {
        console.log(error);
        setIsSaved(true);
        addSavedEvent(id, () => {});
      }
    });
  };
  const onSave = () => {
    addSavedEvent(id, async () => {
      try {
        const response = await axios.put(
          `https://kweeble.herokuapp.com/auth/events/${data?._id}`,
          {
            id: data?._id,
            event: id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(response, 'res');
      } catch (error) {
        console.log(error);
        removeSavedEvent(id, () => {});
      }
    });
  };
  const handleSave = () => {
    if (isSaved) {
      onUnsave();
      fadeIn();
      setTimeout(() => {
        fadeOut();
      }, 1500);
    } else {
      onSave();
      fadeIn();
      setTimeout(() => {
        fadeOut();
      }, 1500);
    }
  };
  const onBlock = async () => {
    try {
      const response = await axios.put(
        `https://kweeble.herokuapp.com/auth/block/${data?._id}`,
        // `http://localhost:3000/auth/${data._id}`,
        {
          id: data?._id,
          person: user,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setIsModalVisible(false);
      console.log(response, 'res');
    } catch (error) {
      console.log(error);
    }
  };

  const onReport = () => {
    try {
      const res = axios.post(
        'https://kweeble.herokuapp.com/reports',
        {
          reason: reportOption,
          reportedUser: user,
          reportedItem: id,
          name: hostName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setIsReportOptionsVisible(false);
      setIsReportSentVisible(true);
      // console.log(res, 'success =>');
    } catch (error) {
      console.log(error);
    }
  };

  const addEventToCalendar = () => {
    const eventConfig = {
      title: name,
      startDate: new Date(date).toISOString(), // remember these are UTC times, for local times use new Date().toISOString()
      endDate: new Date(endDate).toISOString(),
      location: location,
      notes: description,
      allDay: false,
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(
        (eventInfo: {
          calendarItemIdentifier: string,
          eventIdentifier: string,
        }) => {
          // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
          // These are two different identifiers on iOS.
          // On Android, where they are both equal and represent the event id, also strings.
          // when { action: 'CANCELED' } is returned, the dialog was dismissed
          console.log(JSON.stringify(eventInfo));
        },
      )
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        console.log(error);
      });
  };

  return (
    <TouchableOpacity onPress={onEventPress}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.eventImage}
          source={
            image ? {uri: image} : require('../../../assets/images/zoom.webp')
          }
        />
        <View style={styles.eventInfo}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // paddingRight: 10,
              zIndex: 20,
            }}>
            <Text style={styles.eventName}>{name}</Text>

            {/* <ModalDropdown
              // onSelect={onDelete}
              onSelect={onDelete}
              renderRow={row}
              options={optionsx}
              dropdownStyle={{
                borderColor: 'gray',
                height: '14%',
              }}>
              <View>
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={21}
                  color="black"
                />
              </View>
            </ModalDropdown> */}
          </View>
          <View style={styles.locationView}>
            <Ionicons name="location-sharp" size={15} color={Colors.softRed} />
            <Text style={styles.eventLocation}>{location}</Text>
          </View>

          <View style={styles.eventDate}>
            <View style={styles.dateView}>
              <FontAwesome
                name="calendar-o"
                size={13}
                color={Colors.metaIcon}
              />
              <Text style={styles.eventDay}>
                {months[month - 1]} {day}, {year}
              </Text>
            </View>
            <View style={styles.timeView}>
              <MaterialCommunityIcons
                name="clock-time-seven-outline"
                size={15}
                color={Colors.metaIcon}
              />
              <Text style={styles.eventTime}>{startTime}</Text>
            </View>
          </View>
          {host && (
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <MaterialCommunityIcons
                name="ghost"
                size={15}
                color={Colors.primary}
              />
              <Text
                style={{marginLeft: 5, fontSize: 12.5, color: Colors.primary}}>
                hosted by {hostName}
              </Text>
            </View>
          )}
          <SavedPopup />
        </View>

        <View
          style={{
            justifyContent: 'space-between',

            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsMoreVisible(!isMoreVisible);
            }}>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={19}
              color="gray"
            />
          </TouchableOpacity>

          <View></View>
          <View>
            {isSaved ? (
              <FontAwesome
                name="bookmark"
                size={20}
                color="black"
                onPress={handleSave}
              />
            ) : (
              <FontAwesome
                name="bookmark-o"
                size={20}
                color="black"
                onPress={handleSave}
              />
            )}
          </View>
        </View>
      </View>

      {isModalVisible === true ? (
        <TouchableWithoutFeedback>
          <View
            style={{
              position: 'absolute',
              zIndex: 100,
              left: 160,
              width: 200,
              top: 33,
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
            {/* <TouchableOpacity
              onPress={user === data._id ? onDelete : onEventPress}
              style={{
                // backgroundColor: 'white',
                paddingVertical: 11,
                paddingHorizontal: 16,
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
              }}>
              {
                user === data._id ? (
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
                        color: Colors.pinRed,
                      }}>
                      Delete event
                    </Text>
                    <FontAwesome
                      name="trash-o"
                      size={18}
                      color={Colors.pinRed}
                    />
                  </View>
                ) : null
                // <View
                //   style={{
                //     flexDirection: 'row',
                //     justifyContent: 'space-between',
                //     width: '100%',
                //   }}>
                //   <Text
                //     style={{fontSize: 14, fontWeight: '400', color: 'black'}}>
                //     Expand event
                //   </Text>
                //   <FontAwesome name="expand" size={16} color="black" />
                // </View>
              }

             
            </TouchableOpacity> */}
            {/* {user === data?._id ? (
              <TouchableOpacity
                onPress={onDelete}
                style={{
                  paddingVertical: 11,
                  paddingHorizontal: 16,
                  borderBottomWidth: 1,
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
                      color: Colors.pinRed,
                    }}>
                    Delete event
                  </Text>
                  <FontAwesome name="trash-o" size={16} color={Colors.pinRed} />
                </View>
              </TouchableOpacity>
            ) : null} */}
            {user !== data?._id ? (
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  setIsReportOptionsVisible(true);
                }}
                style={{
                  paddingVertical: 11,
                  paddingHorizontal: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: 'lightgray',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text
                    style={{fontSize: 14, fontWeight: '400', color: 'black'}}>
                    Report event
                  </Text>
                  <FontAwesome name="flag-o" size={16} color="black" />
                </View>
              </TouchableOpacity>
            ) : null}

            {user !== data?._id ? (
              <TouchableOpacity
                onPress={onBlock}
                style={{
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
                    style={{fontSize: 14, fontWeight: '400', color: 'black'}}>
                    Block user
                  </Text>
                  <FontAwesome name="ban" size={16} color="black" />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      ) : null}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isReportOptionsVisible}
        onRequestClose={() => setIsReportOptionsVisible(false)}>
        <View style={{height: '100%', flex: 1}}>
          <TouchableOpacity
            onPress={() => setIsReportOptionsVisible(false)}
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
                  marginTop: 150,
                  backgroundColor: '#fff',
                  width: '100%',
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  // paddingHorizontal: 15,
                  height: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 15,
                    // paddingHorizontal: 5,
                    borderBottomWidth: 0.8,
                    borderBottomColor: 'lightgray',
                    alignItems: 'center',
                    paddingBottom: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => setIsReportOptionsVisible(false)}
                    style={{paddingTop: 10, borderRadius: 100}}>
                    <MaterialIcons
                      // onPress={() => navigation.goBack()}
                      name="arrow-back-ios"
                      size={18}
                      color="black"
                    />
                  </TouchableOpacity>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        color: '#182e44',
                        fontSize: 18,
                        fontWeight: '600',
                        marginTop: 15,
                      }}>
                      Report
                    </Text>
                  </View>

                  <View></View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingHorizontal: 15,
                    borderBottomWidth: 1,
                    borderColor: 'lightgray',
                    paddingBottom: 15,
                  }}>
                  <Text
                    style={{
                      color: '#182e44',
                      fontSize: 15,
                      fontWeight: '600',
                      marginTop: 15,
                      marginBottom: 5,
                    }}>
                    Why are you reporting this event?
                  </Text>
                  <Text style={{color: 'gray', fontSize: 13}}>
                    Your report is anonymous. If someone is in immediate danger,
                    call the local emergency services.
                  </Text>
                </View>
                <View style={{marginBottom: 20}}>
                  <ScrollView
                    vertical
                    style={{marginBottom: 310}}
                    showsVerticalScrollIndicator={false}>
                    <TouchableOpacity
                      onPress={() => {
                        setReportOption("I just don't like it");
                        onReport();
                      }}
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        I just don't like it
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setReportOption("It's spam");
                        onReport();
                      }}
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        It's spam
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setReportOption('Nudity or sexual activity');
                        onReport();
                      }}
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        Nudity or sexual activity
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                      }}
                      onPress={() => {
                        setReportOption('Hate speech or symbols');
                        onReport();
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        Hate speech or symbols
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                      }}
                      onPress={() => {
                        setReportOption('Bullying or harassment');
                        onReport();
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        Bullying or harassment
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                      }}
                      onPress={() => {
                        setReportOption('False information');
                        onReport();
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        False information
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                      }}
                      onPress={() => {
                        setReportOption('Violence or dangerous organizations');
                        onReport();
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        Violence or dangerous organizations
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                      }}
                      onPress={() => {
                        setReportOption('Scam or fraud');
                        onReport();
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        Scam or fraud
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                      }}
                      onPress={() => {
                        setReportOption('Intellectual property violation');
                        onReport();
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        Intellectual property violation
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                      }}
                      onPress={() => {
                        setReportOption('Sale of illegal or regulated goods');
                        onReport();
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        Sale of illegal or regulated goods
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                      }}
                      onPress={() => {
                        setReportOption('Suicide or self-injury');
                        onReport();
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        Suicide or self-injury
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                      }}
                      onPress={() => {
                        setReportOption('Eating disorders');
                        onReport();
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        Eating disorders
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderColor: 'lightgray',
                      }}
                      onPress={() => {
                        setReportOption('Something else');
                        onReport();
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        Something else
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                  <View
                    style={{
                      width: '100%',
                      height: 200,
                      flex: 1,
                      backgroundColor: 'blue',
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isReportSentVisible}
        onRequestClose={() => setIsReportSentVisible(false)}>
        <View style={{height: '100%', flex: 1}}>
          <TouchableOpacity
            onPress={() => setIsReportSentVisible(false)}
            style={{
              // flex: 1,
              height: '100%',
              // paddingTop: 60,
              width: '100%',
              backgroundColor: '#000000AA',
              // justifyContent: 'flex-start',
            }}>
            <View
              style={{
                marginTop: 300,
                backgroundColor: '#fff',
                width: '100%',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                // paddingHorizontal: 15,
                height: '100%',
                // justifyContent: 'space-between',
              }}>
              <View style={{paddingTop: 40}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Feather
                    // onPress={() => navigation.goBack()}
                    name="check-circle"
                    size={50}
                    color={Colors.primary}
                  />
                  <Text
                    style={{
                      marginTop: 15,
                      fontSize: 18,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginBottom: 15,
                    }}>
                    Thanks for letting us know
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'gray',
                      textAlign: 'center',
                      marginBottom: 30,
                    }}>
                    We use these reports to:
                  </Text>
                </View>
                <View
                  style={{
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    paddingRight: 30,
                    paddingLeft: 30,
                  }}>
                  <View style={{flexDirection: 'row', marginBottom: 10}}>
                    <Ionicons
                      name="information-circle-outline"
                      size={25}
                      color="black"
                    />
                    <Text
                      style={{
                        marginLeft: 15,
                        fontSize: 13,
                        color: 'black',
                      }}>
                      Understand problems people are having with different types
                      of content on Kweeble.
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Ionicons name="eye-off-outline" size={25} color="black" />
                    <Text
                      style={{
                        marginLeft: 15,
                        fontSize: 13,
                        color: 'black',
                        paddingRight: 15,
                      }}>
                      Show you less of this kind of content in the future.
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{marginHorizontal: 10, marginTop: 200}}>
                <TouchableOpacity
                  onPress={() => setIsReportSentVisible(false)}
                  style={{
                    backgroundColor: Colors.subtleGray,
                    paddingVertical: 12,
                    borderRadius: 6,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: 14,
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setIsMoreVisible(false)}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={isMoreVisible}
          onRequestClose={() => setIsMoreVisible(false)}>
          <TouchableOpacity
            onPress={() => setIsMoreVisible(false)}
            style={{
              // flex: 1,
              height: '100%',
              // paddingTop: 60,
              width: '100%',
              backgroundColor: '#000000AA',
              // justifyContent: 'flex-start',
            }}>
            <View
              style={{
                marginTop: 580,
                backgroundColor: '#fff',
                width: '100%',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                paddingHorizontal: 15,
                height: '100%',
                paddingTop: 25,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsMoreVisible(false);
                  addEventToCalendar();
                }}
                style={{
                  backgroundColor: Colors.metagray,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  padding: 15,
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 16, fontWeight: '400'}}>
                  Add to calendar
                </Text>
                <Feather name="calendar" size={20} color="black" />
              </TouchableOpacity>
              {user !== data?._id ? (
                <TouchableOpacity
                  onPress={() => {
                    setIsMoreVisible(false);
                    setIsReportOptionsVisible(true);
                  }}
                  style={{
                    backgroundColor: Colors.metagray,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    padding: 15,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '400',
                      color: Colors.strongRed,
                    }}>
                    Report event
                  </Text>
                  <Feather
                    name="alert-circle"
                    size={20}
                    color={Colors.strongRed}
                  />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  setIsMoreVisible(false);
                }}
                style={{
                  backgroundColor: Colors.metagray,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  padding: 15,
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 16, fontWeight: '400'}}>
                  Save event
                </Text>
                <FontAwesome name="bookmark-o" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF  ',
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
    // paddingHorizontal: 15,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  eventInfo: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10,
  },
  eventDate: {
    flexDirection: 'row',
  },
  eventName: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    fontSize: 16,
    marginBottom: 10,
  },
  eventDay: {
    // color: '#F56040',
    color: Colors.metaIcon,
    marginLeft: 7,
    marginRight: 20,
  },
  eventTime: {
    // color: '#F56040',
    color: Colors.metaIcon,
    marginHorizontal: 7,
  },
  eventLocation: {
    color: Colors.softRed,
    marginBottom: 10,
    marginLeft: 5,
  },
  locationView: {
    flexDirection: 'row',
  },
  dateView: {
    flexDirection: 'row',
  },
  timeView: {
    flexDirection: 'row',
  },
});

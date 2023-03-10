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
} from 'react-native';
import React, {useState, useEffect} from 'react';
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
  // onDelete,
}) => {
  const navigation = useNavigation();
  const data = useSelector(state => state.Reducers.userData);
  const [val, setVal] = useState();
  const [isModalVisible, setIsModalVisible] = useState('');
  const [isReportOptionsVisible, setIsReportOptionsVisible] = useState(false);
  const [isReportSentVisible, setIsReportSentVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState('');
  const [reportOption, setReportOption] = useState('');

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const x = data?.savedEvents?.filter(se => se === id)[0];
      if (x !== undefined) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    }

    // const interval = setInterval(() => {
    //   mounted = true;
    // }, 2000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [data, id]);

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

  const onUnsave = async () => {
    setIsSaved(false);
    try {
      const resp = await axios.put(
        `https://kweeble.herokuapp.com/auth/events/del/${data?._id}`,
        // `http://localhost:3000/scopes/del/${data._id}`,
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
    }
  };

  const onSave = async () => {
    console.log('ki');
    setIsSaved(true);
    try {
      const response = await axios.put(
        `https://kweeble.herokuapp.com/auth/events/${data?._id}`,
        // `http://localhost:3000/auth/${data._id}`,
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
      setIsSaved(true);
      console.log(response, 'res');
    } catch (error) {
      console.log(error);
      setIsSaved(false);
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
    }, 1000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadDimi = async () => {
      if (mounted) {
        const y = users.filter(u => u._id === data?._id)[0];
        setMe(y);
      }
    };

    loadDimi();

    const interval = setInterval(() => {
      //   loadDimi();
    }, 1000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [data._id, users]);

  // console.log(me?.savedEvents?.filter(se => se._id === id)[0], 'lo');

  const onReport = async () => {
    try {
      const res = await axios.post(
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
      console.log(res, 'success =>');
    } catch (error) {
      console.log(error);
    }
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
        </View>
        <View
          style={{
            justifyContent: 'space-between',

            alignItems: 'center',
          }}>
          {data._id !== event.user ? (
            <TouchableOpacity
              onPress={() => {
                changeModalVisible(!isModalVisible);
              }}>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={19}
                color="gray"
              />
            </TouchableOpacity>
          ) : null}

          <View></View>
          <View>
            {me?.savedEvents?.filter(se => se === id)[0] !== undefined ? (
              <FontAwesome
                name="bookmark"
                size={20}
                color="black"
                onPress={onUnsave}
              />
            ) : (
              <FontAwesome
                name="bookmark-o"
                size={20}
                color="black"
                onPress={onSave}
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
            {/* <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={{
                zIndex: 201,
                paddingVertical: 11,
                paddingHorizontal: 16,
                // borderBottomWidth: 1,
                // borderBottomColor: 'lightgray',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text style={{fontSize: 14, fontWeight: '400', color: 'black'}}>
                  Close
                </Text>
                <FontAwesome name="times-circle" size={16} color="black" />
              </View>
            </TouchableOpacity> */}
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
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
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

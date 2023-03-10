import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  RefreshControl,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import SearchCard from '../../components/SearchCard';
import ModCard from '../../components/ModCard';

const deviceHeight = Dimensions.get('window').height;
const ManageMembers = props => {
  const me = useSelector(state => state.Reducers.userData);
  const data = props?.route?.params?.data;
  const id = data._id;
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(data.photo);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPlusVisible, setIsPlusVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [currScope, setCurrScope] = useState('');
  const [scopes, setScopes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [mods, setMods] = useState([]);
  const [members, setMembers] = useState([]);
  const [username, setUsername] = useState('');
  const [currPerson, setCurrPerson] = useState('');
  const [error, setError] = useState(false);

  const pullMe = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeModal = (bool, info) => {
    changeModalVisible(bool);
  };

  const changePlusVisible = bool => {
    setIsModalVisible(bool);
  };

  const closePlus = (bool, info) => {
    changeModalVisible(bool);
  };

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

    const interval = setInterval(() => {
      loadScopes();
    }, 1000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [scopes, refresh]);

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
  });

  useEffect(() => {
    const mys = scopes.filter(sc => sc._id === data._id);
    const mys2 = mys[0];
    setCurrScope(mys2);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopes, refresh]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const u = users.filter(user => user.username === username);
      setCurrPerson(u);
    }

    return () => {
      mounted = false;
    };
  }, [username, users, refresh]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const usrs = currScope?.members?.map(mem => {
        return users.filter(u => u._id === mem);
      });

      const newArray = usrs?.flat(1);

      setMembers(newArray);
    }

    return () => {
      mounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, refresh]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const usx = currScope?.moderators?.map(mod => {
        return users.filter(u => u._id === mod);
      });

      const newArray = usx?.flat(1);

      setMods(newArray);
    }

    return () => {
      mounted = false;
    };
  }, [currScope, users, refresh]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const u = users.filter(user => user.username === username);

      setCurrPerson(u);
    }

    return () => {
      mounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  // useEffect(() => {
  //   // console.log(currPerson[0]?._id, 'data');
  //   console.log(error, '<- error');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [refresh]);

  useEffect(() => {
    if (error) {
      setTimeout(function () {
        setError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.nav}>
        <Pressable
          style={{justifyContent: 'flex-end', flex: 0.38}}
          onPress={onBackPress}>
          <MaterialIcons
            onPress={onBackPress}
            name="arrow-back-ios"
            size={20}
            color="black"
          />
        </Pressable>

        <View style={{flex: 0.7}}>
          <Text style={styles.headerText}>Members list</Text>
        </View>

        <View style={{justifyContent: 'flex-end', flex: 0.1}}>
          <AntDesign
            onPress={() => setIsPlusVisible(true)}
            name="plus"
            size={20}
            color="black"
          />
        </View>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
        }
        showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 5}}>
          {members?.map((person, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                key={person._id}>
                <ModCard person={person} />
                <View
                  style={{
                    justifyContent: 'center',
                    paddingRight: 10,
                  }}>
                  <Entypo
                    onPress={() => setIsModalVisible(true)}
                    name="dots-three-horizontal"
                    size={18}
                    color="gray"
                  />
                </View>
                <TouchableWithoutFeedback onPress={closeModal}>
                  <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={closeModal}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: '#000000AA',
                        justifyContent: 'flex-end',
                      }}>
                      {/* <renderOutsideTouchable onTouch={onTouchOutside} /> */}

                      <View
                        style={{
                          backgroundColor: '#fff',
                          width: '100%',
                          borderTopRightRadius: 20,
                          borderTopLeftRadius: 20,
                          paddingHorizontal: 10,
                          maxHeight: deviceHeight * 0.4,
                          paddingBottom: 25,
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            //   alignItems: 'center',
                          }}>
                          {/* <TouchableOpacity
                            onPress={() => {
                              setIsModalVisible(false);
                              navigation.navigate('OtherUserProfile', {
                                data: members[index],
                              });
                              console.log(members[index], 'this is person');
                            }}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingHorizontal: 15,
                              marginBottom: 5,
                            }}>
                            <View style={{paddingTop: 15}}>
                              <FontAwesome
                                name="user-o"
                                size={20}
                                color="black"
                              />
                            </View>
                            <View style={{marginLeft: 15}}>
                              <Text
                                style={{
                                  color: '#182e44',
                                  fontSize: 16,
                                  fontWeight: '500',
                                  marginTop: 15,
                                }}>
                                View profile
                              </Text>
                            </View>
                          </TouchableOpacity> */}
                          <TouchableOpacity
                            onPress={async () => {
                              if (mods?.some(e => e._id === person._id)) {
                                try {
                                  /*  contains the element we're looking for */
                                  const resp = await axios.put(
                                    `https://kweeble.herokuapp.com/scopes/mods/del/${data._id}`,
                                    // `http://localhost:3000/scopes/del/${data._id}`,
                                    {
                                      id: data._id,
                                      mem: person._id,
                                    },
                                    {
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                    },
                                  );
                                  // console.log(resp);
                                } catch (error) {
                                  console.log(error);
                                }
                              } else {
                                console.log('nil');
                              }
                              try {
                                const res = await axios.put(
                                  `https://kweeble.herokuapp.com/scopes/del/${data._id}`,
                                  // `http://localhost:3000/scopes/del/${data._id}`,
                                  {
                                    id: data._id,
                                    mem: person._id,
                                  },
                                  {
                                    headers: {
                                      'Content-Type': 'application/json',
                                    },
                                  },
                                );
                                // console.log(res);
                                setIsModalVisible(false);
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingHorizontal: 13,
                              marginBottom: 15,
                            }}>
                            <View style={{paddingTop: 15}}>
                              <Ionicons
                                name="remove-circle-outline"
                                size={26}
                                color={Colors.awesomeRed}
                              />
                            </View>
                            <View style={{marginLeft: 10, marginRight: 6}}>
                              <Text
                                style={{
                                  color: Colors.awesomeRed,
                                  fontSize: 16,
                                  fontWeight: '500',
                                  marginTop: 15,
                                }}>
                                Remove
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => setIsModalVisible(false)}
                            style={{
                              backgroundColor: Colors.redditDarkerGray,
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingVertical: 10,
                              borderRadius: 100 / 2,
                            }}>
                            <Text style={{fontWeight: '600', color: 'gray'}}>
                              Close
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </TouchableWithoutFeedback>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <TouchableWithoutFeedback onPress={closePlus}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={isPlusVisible}
          onRequestClose={closePlus}>
          <View style={{backgroundColor: '#000000AA', flex: 1}}>
            <View
              style={{
                flex: 1,
                height: '100%',
                backgroundColor: '#000000AA',
                marginTop: 90,
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  paddingHorizontal: 10,
                  height: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Pressable onPress={() => setIsPlusVisible(false)}>
                    <Text
                      style={{
                        color: Colors.primary,
                        fontSize: 16,
                        // margin: 15,
                        marginLeft: 5,
                        marginTop: 15,
                      }}>
                      Cancel
                    </Text>
                  </Pressable>

                  <Text
                    style={{
                      color: '#182e44',
                      fontSize: 20,
                      fontWeight: '600',
                      marginTop: 10,
                    }}>
                    Add member
                  </Text>

                  <Pressable
                    disabled={username === '' ? true : false}
                    onPress={async () => {
                      if (members.some(e => e._id === currPerson[0]?._id)) {
                        /* vendors contains the element we're looking for */
                        null;
                      } else {
                        try {
                          const response = await axios.put(
                            `https://kweeble.herokuapp.com/auth/${currPerson[0]?._id}`,
                            // `http://localhost:3000/auth/${me._id}`,
                            {
                              id: currPerson[0]?._id,
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
                              member: currPerson[0]?._id,
                            },
                            {
                              headers: {
                                'Content-Type': 'application/json',
                              },
                            },
                          );
                          setIsPlusVisible(false);
                        } catch (error) {
                          console.log(error.response.data.error);
                          setError(true);
                        }
                      }
                    }}>
                    <Text
                      style={{
                        color: Colors.primary,
                        fontSize: 16,
                        // margin: 15,
                        marginLeft: 5,
                        marginTop: 15,
                        fontWeight: '600',
                      }}>
                      Add
                    </Text>
                  </Pressable>
                </View>
                <View style={{marginTop: 20, paddingHorizontal: 10}}>
                  <Text style={{fontWeight: '500'}}>Username</Text>
                </View>
                <View
                  style={[
                    styles.searchContainer2,
                    {
                      borderWidth: error ? 1 : 0,
                      borderColor: error ? Colors.coolRed : null,
                    },
                  ]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    {/* <Feather
                      name="search"
                      size={20}
                      color={Colors.metaIcon}
                      style={styles.searchIcon}
                    /> */}
                    <Text style={{fontSize: 14}}>@</Text>
                    <TextInput
                      style={{width: '100%'}}
                      onChangeText={e => {
                        setUsername(e);
                      }}
                      placeholder="Username"
                      autoCapitalize="none"
                      onKeyPress={e => {
                        e.key === 'Enter' && e.preventDefault();
                      }}
                    />
                  </View>
                </View>
                {error && (
                  <View style={{paddingHorizontal: 10, paddingVertical: 2}}>
                    <Text style={{color: Colors.coolRed, fontWeight: '500'}}>
                      Kweeble user does not exist
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ManageMembers;

const styles = StyleSheet.create({
  headText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headText2: {
    paddingHorizontal: 15,
    // paddingVertical: 10,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  subheading: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nav: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    // justifyContent: 'space-between',
  },
  headerText: {
    color: Colors.Black,
    paddingTop: 10,
    fontWeight: '600',
    fontSize: 18,
  },
  addText: {
    // color: Colors.coolRed,
    fontWeight: '500',
    fontSize: 16.5,
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
    flex: 10,
  },
  input: {
    paddingVertical: 10,
    // borderRadius: 5,
    borderBottomWidth: 1,
    width: '80%',
    borderColor: 'lightgray',
    fontWeight: '400',
    flex: 10,
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
    flex: 10,
  },
  profImage: {
    width: '100%',
    height: 250,
  },
  camicon: {
    backgroundColor: '#000000AA',
    alignItems: 'center',
    position: 'absolute',
    height: 60,
    width: 60,
    justifyContent: 'center',
    borderRadius: 100,
    top: 90,
    left: 160,
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    // borderColor: '#c6c6c6',
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.metagray,
  },
  searchContainer2: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 7,
    // borderColor: '#c6c6c6',
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.metagray,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {},
  profileImage: {
    marginRight: 15,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginBottom: 10,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  username: {
    fontWeight: '600',
    color: 'black',
  },
  name: {
    color: 'grey',
  },
  Topacity: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  prevText: {
    color: Colors.metaIcon,
    textAlign: 'center',
  },
  prevText2: {
    color: Colors.metaIcon,
    textAlign: 'center',
    marginVertical: 15,
  },
  prevContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  userInfo: {},
  nameCard: {
    fontWeight: 'bold',
  },
  usernameCard: {
    color: Colors.metaIcon,
    marginTop: 3,
  },
  butn: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 10,
    height: 10,
  },
  butnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
});

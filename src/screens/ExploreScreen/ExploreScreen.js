import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Modal,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CustomButton} from '../../components/CustomButton';
import {useDispatch} from 'react-redux';
import {Logout} from '../../store/actions';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchCard from '../../components/SearchCard';
import ScopeCard from '../../components/ScopeCard';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import UserProfile from '../UserProfile';
import {useSelector} from 'react-redux';

const deviceHeight = Dimensions.get('window').height;

const ExploreScreen = props => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [scopeQuery, setScopeQuery] = useState('');
  const [results, setResults] = useState([]);
  const [scopeResults, setScopeResults] = useState([]);
  const navigation = useNavigation();
  const [pill, setPill] = useState(true);
  const [scopes, setScopes] = useState([]);
  const [myScopes, setMyScopes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [catherine, setCatherine] = useState('All');
  const [isScopeSelected, setIsScopeSelected] = useState(false);
  const data = useSelector(state => state.Reducers.userData);
  const [selUsers, setSelUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [backData, setBackData] = useState(props?.route?.params?.data);
  // // const backData = props?.route?.params?.data;

  // console.log(backData, 'bk');

  // eslint-disable-next-line react-hooks/exhaustive-deps

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

      setRefresh(true);

      setTimeout(() => {
        setRefresh(false);
      }, 500);
    });

    return ref;
  }, [navigation]);

  const onChange = e => {
    setQuery(e);
    fetch(`https://kweeble.herokuapp.com/api`)
      .then(res => res.json())
      .then(data => {
        if (!data.errors) {
          setResults(data);
        } else {
          setResults([]);
        }
      });
  };

  const onChange2 = e => {
    setScopeQuery(e);
    fetch(`https://kweeble.herokuapp.com/scopes`)
      .then(res => res.json())
      .then(data => {
        if (!data.errors) {
          setScopeResults(data);
        } else {
          setScopeResults([]);
        }
      });
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (scopeQuery !== undefined) {
        onChange2(scopeQuery);
      }
    }
    return () => {
      mounted = false;
    };
  });

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
        setIsLoading(false);
      }
    };
    loadScopes();

    return () => {
      mounted = false;
    };
  }, [refresh]);

  useEffect(() => {
    let mounted = true;
    const loadScopes = async () => {
      try {
        setIsLoading(true);
        const {data} = await axios.get('https://kweeble.herokuapp.com/scopes/');
        if (mounted) {
          setScopes(data);

          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    loadScopes();

    return () => {
      mounted = false;
    };
  }, []);

  const onToggleItem = () => {
    setPill(true);
  };

  const onToggleItem2 = () => {
    setPill(false);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const myScopes = scopes.filter(item => {
        return item.members.indexOf(data._id) >= 0;
      });
      setMyScopes(myScopes);
    }
    return () => {
      mounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const scu = myScopes.map(sc => {
        return results.filter((ev, i) => sc._id === ev.scopes[i]);
      });

      const usersInScope = scu.flat(1);

      setFilteredUsers(usersInScope);
    }
    return () => {
      mounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, results]);

  // console.log(myScopes, 'sc');

  return (
    <SafeAreaView style={styles.mainWrapper}>
      {pill ? (
        <View style={styles.searchContainer2}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Feather
              name="search"
              size={20}
              color={Colors.metaIcon}
              style={styles.searchIcon}
            />
            <TextInput
              editable={isLoading ? false : true}
              style={{width: '100%'}}
              onChangeText={onChange}
              placeholder="Search"
              autoCapitalize="none"
              onKeyPress={e => {
                e.key === 'Enter' && e.preventDefault();
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.searchContainer2}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Feather
              name="search"
              size={20}
              color={Colors.metaIcon}
              style={styles.searchIcon}
            />
            <TextInput
              editable={isLoading ? false : true}
              style={{width: '100%'}}
              onChangeText={onChange2}
              placeholder="Search"
              autoCapitalize="none"
              onKeyPress={e => {
                e.key === 'Enter' && e.preventDefault();
              }}
            />
          </View>
        </View>
      )}

      {isLoading ? (
        <View style={{marginTop: 15}}>
          <ActivityIndicator size="small" color={Colors.primary} />
        </View>
      ) : (
        <>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={onToggleItem}
                style={{
                  backgroundColor: pill ? Colors.primary : Colors.metagray,
                  borderRadius: 50,
                  flexDirection: 'row',
                  width: 80,
                  paddingVertical: 7,
                  marginLeft: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '500',

                    color: pill ? 'white' : 'black',
                  }}>
                  People
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onToggleItem2}
                style={{
                  backgroundColor: !pill ? Colors.primary : Colors.metagray,
                  borderRadius: 50,
                  flexDirection: 'row',
                  width: 80,
                  paddingVertical: 7,
                  marginLeft: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    fontWeight: '500',

                    marginLeft: 0,
                    color: !pill ? 'white' : 'black',
                  }}>
                  Scopes
                </Text>
              </TouchableOpacity>
            </View>
            {pill ? (
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
            ) : null}
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
            }
            showsVerticalScrollIndicator={false}
            style={styles.wrapper}>
            {pill ? (
              <>
                {!isScopeSelected ? (
                  <>
                    {results.length > 0 && query !== '' ? (
                      <View>
                        {results
                          .filter(person => {
                            if (query === '') {
                              return null;
                            } else if (
                              person.name
                                .toLowerCase()
                                .includes(query.toLocaleLowerCase())
                            ) {
                              return person;
                            } else if (
                              person.email
                                .toLowerCase()
                                .includes(query.toLowerCase())
                            ) {
                              return person;
                            } else if (
                              person.username
                                .toLowerCase()
                                .includes(query.toLowerCase())
                            ) {
                              return person;
                            }

                            if (person.interests !== undefined) {
                              if (query === '') {
                                return null;
                              } else if (
                                person.interests
                                  .toLowerCase()
                                  .includes(query.toLocaleLowerCase())
                              ) {
                                return person;
                              }
                            }

                            if (person.gradeLevel !== undefined) {
                              if (query === '') {
                                return null;
                              } else if (
                                person.gradeLevel
                                  .toLowerCase()
                                  .includes(query.toLocaleLowerCase())
                              ) {
                                return person;
                              }
                            }

                            if (person.major !== undefined) {
                              if (query === '') {
                                return null;
                              } else if (
                                person.major
                                  .toLowerCase()
                                  .includes(query.toLocaleLowerCase())
                              ) {
                                return person;
                              }
                            }

                            if (person.email !== undefined) {
                              if (query === '') {
                                return null;
                              } else if (
                                person.email
                                  .toLowerCase()
                                  .includes(query.toLocaleLowerCase())
                              ) {
                                return person;
                              }
                            }

                            if (person.position !== undefined) {
                              if (query === '') {
                                return null;
                              } else if (
                                person.position
                                  .toLowerCase()
                                  .includes(query.toLocaleLowerCase())
                              ) {
                                return person;
                              }
                            }

                            if (person.phoneNumber !== undefined) {
                              if (query === '') {
                                return null;
                              } else if (
                                person.phoneNumber
                                  .toLowerCase()
                                  .includes(query.toLocaleLowerCase())
                              ) {
                                return person;
                              }
                            } else if (person.isScope !== true) {
                              return null;
                            }
                          })
                          .map(person => {
                            return (
                              <View key={person._id}>
                                <SearchCard person={person} />
                              </View>
                            );
                          })}
                      </View>
                    ) : (
                      <View style={styles.prevContainer}>
                        <Text style={styles.prevText}>
                          Search people by their name, interests, major, grade
                          level, email and more...
                        </Text>
                        <Text style={styles.prevText2}>Example: Anime</Text>
                      </View>
                    )}
                  </>
                ) : (
                  <>
                    {results.length > 0 && query !== '' ? (
                      <View>
                        {selUsers
                          .filter(person => {
                            if (query === '') {
                              return null;
                            } else if (
                              person.name
                                .toLowerCase()
                                .includes(query.toLocaleLowerCase())
                            ) {
                              return person;
                            } else if (
                              person.email
                                .toLowerCase()
                                .includes(query.toLowerCase())
                            ) {
                              return person;
                            } else if (
                              person.username
                                .toLowerCase()
                                .includes(query.toLowerCase())
                            ) {
                              return person;
                            }

                            if (person.interests !== undefined) {
                              if (query === '') {
                                return null;
                              } else if (
                                person.interests
                                  .toLowerCase()
                                  .includes(query.toLocaleLowerCase())
                              ) {
                                return person;
                              }
                            }

                            if (person.gradeLevel !== undefined) {
                              if (query === '') {
                                return null;
                              } else if (
                                person.gradeLevel
                                  .toLowerCase()
                                  .includes(query.toLocaleLowerCase())
                              ) {
                                return person;
                              }
                            }

                            if (person.major !== undefined) {
                              if (query === '') {
                                return null;
                              } else if (
                                person.major
                                  .toLowerCase()
                                  .includes(query.toLocaleLowerCase())
                              ) {
                                return person;
                              }
                            }

                            if (person.email !== undefined) {
                              if (query === '') {
                                return null;
                              } else if (
                                person.email
                                  .toLowerCase()
                                  .includes(query.toLocaleLowerCase())
                              ) {
                                return person;
                              }
                            }

                            if (person.position !== undefined) {
                              if (query === '') {
                                return null;
                              } else if (
                                person.position
                                  .toLowerCase()
                                  .includes(query.toLocaleLowerCase())
                              ) {
                                return person;
                              }
                            }

                            if (person.phoneNumber !== undefined) {
                              if (query === '') {
                                return null;
                              } else if (
                                person.phoneNumber
                                  .toLowerCase()
                                  .includes(query.toLocaleLowerCase())
                              ) {
                                return person;
                              }
                            } else if (person.isScope !== true) {
                              return null;
                            }
                          })
                          .map(person => {
                            return (
                              <View key={person._id}>
                                <SearchCard person={person} />
                              </View>
                            );
                          })}
                      </View>
                    ) : (
                      <View style={styles.prevContainer}>
                        <Text style={styles.prevText}>
                          Search people by their name, interests, major, grade
                          level, email and more...
                        </Text>
                        <Text style={styles.prevText2}>Example: Anime</Text>
                      </View>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {scopeResults.length > 0 && scopeQuery !== '' ? (
                  <View>
                    {scopeResults
                      .filter(scope => {
                        if (scopeQuery === '') {
                          return null;
                        } else if (
                          scope.name
                            .toLowerCase()
                            .includes(scopeQuery.toLocaleLowerCase())
                        ) {
                          return scope;
                        }
                      })
                      .map(scope => {
                        return (
                          <View style={{marginBottom: 10}} key={scope._id}>
                            <ScopeCard scope={scope} />
                          </View>
                        );
                      })}
                  </View>
                ) : (
                  <View style={styles.prevContainer2}>
                    <Text style={styles.prevText}>
                      Search for your favorite scopes; once a member you'll have
                      access to their directory, marketplace, events, and
                      more...
                    </Text>
                    {/* <Text style={styles.prevText2}>Example: Anime</Text> */}
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </>
      )}

      <TouchableWithoutFeedback onPress={closeModal}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}>
          <TouchableOpacity
            activeOpacity={1}
            style={{flex: 1}}
            onPress={() => setIsModalVisible(false)}>
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
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  paddingHorizontal: 15,
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
                      //   alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsModalVisible(false);
                        setIsScopeSelected(false);
                        setCatherine('All');
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
                          All
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {myScopes.map((scope, j) => {
                      return (
                        <View key={scope._id}>
                          <ScrollView>
                            <TouchableOpacity
                              onPress={() => {
                                const usrs = results.filter(item => {
                                  return item.scopes.indexOf(scope._id) >= 0;
                                });

                                setSelUsers(usrs);
                                setIsScopeSelected(true);
                                setIsModalVisible(false);
                                setCatherine(`$${scope.name}`);
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
                                  scope?.photo
                                    ? {uri: scope?.photo}
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
export default ExploreScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapper: {
    paddingHorizontal: 15,
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
    marginHorizontal: 15,
    marginBottom: 8,
    // borderColor: '#c6c6c6',
    // borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 8 : 2,
    backgroundColor: Colors.metagray,
    // alignItems: 'center',
  },
  searchIcon: {
    marginRight: 5,

    paddingVertical: 10,
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
  prevContainer2: {
    flex: 1,
    paddingVertical: 20,

    // paddingHorizontal: 15,
  },
  subh: {
    backgroundColor: Colors.metagray,
    borderRadius: 50,
    flexDirection: 'row',
    width: 100,
    paddingVertical: 7,
    marginLeft: 15,
    justifyContent: 'center',
  },
  cathView: {
    backgroundColor: Colors.metagray,
    borderRadius: 6,
    justifyContent: 'center',
    marginRight: 15,
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

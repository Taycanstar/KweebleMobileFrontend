import {
  View,
  Text,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchCardPop from '../../components/SearchCardPop';
import axios from 'axios';
import MultiSelect from 'react-native-multiple-select';
import {useDispatch, useSelector} from 'react-redux';

const deviceHeight = Dimensions.get('window').height;
const AddMembersScreen = ({navigation}) => {
  const [showPop, setShowPop] = useState(true);
  //   const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [chooseInfo, setChooseInfo] = useState();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState([]);

  const data2 = useSelector(state => state.Reducers.userData);

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeModal = (bool, info) => {
    changeModalVisible(bool);
    setChooseInfo(info);
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
  }, []);

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

  const onCardPress = person => {
    navigation.navigate('Dm', {
      itemId: person._id,
      msgName: person.name,
    });
    setIsModalVisible(false);
  };

  const onCancelPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    users.forEach((item, index) => {
      item.selected = false;
    });
    // const u = users.filter(user => user._id !== data2._id);
    setSelect(users);
  }, [data2._id, users]);

  const onHandlePress = person => {
    const newPerson = select.map(val => {
      if (val._id === data2._id) {
        return {...val, selected: true};
      } else if (val._id === person._id) {
        return {...val, selected: !val.selected};
      } else {
        return val;
      }
    });

    setSelect(newPerson);
  };

  const filteredUsers = select.filter(user => user.selected === true);

  return (
    <SafeAreaView style={{height: '100%', backgroundColor: '#000000AA'}}>
      <View
        style={{
          flex: 1,
          height: '100%',
          paddingTop: 15,
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable onPress={onCancelPress}>
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
              Add Members
            </Text>

            <Pressable
              disabled={filteredUsers.length === 0 ? true : false}
              onPress={() => {
                navigation.navigate('NewGroup', {
                  participants: filteredUsers,
                });
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
                Next
              </Text>
            </Pressable>
          </View>
          <View style={styles.searchContainer2}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Feather
                name="search"
                size={20}
                color={Colors.metaIcon}
                style={styles.searchIcon}
              />
              <TextInput
                onChangeText={onChange}
                placeholder="Search"
                autoCapitalize="none"
                onKeyPress={e => {
                  e.key === 'Enter' && e.preventDefault();
                }}
              />
            </View>
          </View>
          {select.length > 0 && query !== '' ? (
            <View>
              {select
                .filter(person => {
                  if (query === '') {
                    return null;
                  } else if (person._id === data2._id) {
                    return null;
                  } else if (
                    person.name
                      .toLowerCase()
                      .includes(query.toLocaleLowerCase())
                  ) {
                    return person;
                  } else if (
                    person.email.toLowerCase().includes(query.toLowerCase())
                  ) {
                    return person;
                  } else if (
                    person.username.toLowerCase().includes(query.toLowerCase())
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
                  }
                })
                .map(person => {
                  return (
                    <View key={person._id}>
                      <View style={styles.container}>
                        <TouchableOpacity
                          onPress={() => onHandlePress(person)}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={styles.innerContainer}>
                            <Image
                              style={{
                                marginRight: 15,
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                                marginBottom: 10,
                              }}
                              source={
                                person.photo
                                  ? {uri: person.photo}
                                  : require('../../../assets/images/user.png')
                              }
                            />

                            <View style={styles.userInfo}>
                              <Text style={styles.nameCard}>{person.name}</Text>
                              <Text style={styles.usernameCard}>
                                @{person.username}
                              </Text>
                            </View>
                          </View>
                          <View style={{paddingVertical: 20}}>
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  borderColor: person.selected
                                    ? Colors.primary
                                    : 'gray',
                                  borderWidth: 1,
                                  width: 20,
                                  height: 20,
                                  borderRadius: 100,
                                  backgroundColor: person.selected
                                    ? Colors.primary
                                    : '#fff',
                                  marginHorizontal: 10,
                                }}></View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
            </View>
          ) : (
            <FlatList
              data={select}
              keyExtractor={(item, index) => String(index)}
              renderItem={({item}) => {
                if (item._id !== data2._id) {
                  return (
                    <View key={item._id}>
                      <View style={styles.container}>
                        <TouchableOpacity
                          onPress={() => onHandlePress(item)}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={styles.innerContainer}>
                            <Image
                              style={{
                                marginRight: 15,
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                                marginBottom: 10,
                              }}
                              source={
                                item.photo
                                  ? {uri: item.photo}
                                  : require('../../../assets/images/user.png')
                              }
                            />

                            <View style={styles.userInfo}>
                              <Text style={styles.nameCard}>{item.name}</Text>
                              <Text style={styles.usernameCard}>
                                @{item.username}
                              </Text>
                            </View>
                          </View>
                          <View style={{paddingVertical: 20}}>
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  borderColor: item.selected
                                    ? Colors.primary
                                    : 'gray',
                                  borderWidth: 1,
                                  width: 20,
                                  height: 20,
                                  borderRadius: 100,
                                  backgroundColor: item.selected
                                    ? Colors.primary
                                    : '#fff',
                                  marginHorizontal: 10,
                                }}></View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                } else {
                  return null;
                }
              }}
            />
          )}
        </View>
      </View>
      {/* </Modal> */}
      {/* </TouchableWithoutFeedback> */}
    </SafeAreaView>
  );
};

export default AddMembersScreen;

const styles = StyleSheet.create({
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

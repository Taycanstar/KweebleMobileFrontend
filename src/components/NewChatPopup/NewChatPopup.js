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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchCardPop from '../../components/SearchCardPop';
import axios from 'axios';

const deviceHeight = Dimensions.get('window').height;
const NewChatPopup = ({navigation}) => {
  const [showPop, setShowPop] = useState(true);
  //   const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [chooseInfo, setChooseInfo] = useState();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeModal = (bool, info) => {
    changeModalVisible(bool);
    setChooseInfo(info);
  };

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

  const onNewGroupPress = () => {
    navigation.navigate('AddMembers');
  };

  return (
    // <Modal>
    <View style={{height: '100%'}}>
      <View
        style={{
          flex: 1,
          height: '100%',
          paddingTop: 60,
          backgroundColor: '#000000AA',
          // justifyContent: 'flex-start',
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
            <View></View>
            <Text
              style={{
                color: '#182e44',
                fontSize: 20,
                fontWeight: '600',
                marginTop: 15,
              }}>
              New Chat
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}
              style={{paddingTop: 10}}>
              <Feather
                name="x"
                size={25}
                color="black"
                backgroundColor="white"
              />
            </TouchableOpacity>
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
                      {/* <SearchCardPop person={person} /> */}
                      <View style={styles.container}>
                        <TouchableOpacity
                          onPress={() => onCardPress(person)}
                          style={styles.innerContainer}>
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
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
            </View>
          ) : (
            <View style={styles.prevContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddMembers');
                  setIsModalVisible(false);
                }}
                style={{flexDirection: 'row'}}>
                <View
                  style={{
                    marginLeft: 15,
                    marginRight: 0,
                    backgroundColor: Colors.metagray,
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                    borderRadius: 100,
                    marginBottom: 20,
                  }}>
                  {/* <FontAwesome name="snapchat-ghost" size={35} color="black" /> */}
                  <FontAwesome
                    name="group"
                    size={22}
                    color={Colors.primary}
                    backgroundColor="white"
                  />
                </View>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 16,
                    fontWeight: '500',
                    margin: 15,
                  }}>
                  New Group
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
    // </Modal>
  );
};

export default NewChatPopup;

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
    borderRadius: 100,
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
});

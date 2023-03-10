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
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchCardPop from '../../components/SearchCardPop';
import axios from 'axios';
import MultiSelect from 'react-native-multiple-select';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const deviceHeight = Dimensions.get('window').height;
const NewGroupScreen = props => {
  const [showPop, setShowPop] = useState(true);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [chooseInfo, setChooseInfo] = useState();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState([]);
  const data2 = useSelector(state => state.Reducers.userData);
  const {participants} = props?.route?.params;

  const [data, setData] = useState({
    name: '',
    photo: '',
    members: participants,
    admins: [data2],
    isGroup: true,
  });

  const {name, photo, members, admins, isGroup} = data;

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

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary(options);
      const formData = new FormData();
      let token = await AsyncStorage.getItem('token', token);
      formData.append('image', {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });

      let res = await fetch('https://kweeble.herokuapp.com/groups/image', {
        method: 'post',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data; ',
          Authorization: `Bearer ${token}`,
        },
      });
      let responseJson = await res.json();
      console.log(responseJson, '<==image data');

      setData({...data, photo: responseJson.imageURL});
    } catch (error) {
      console.log(error);
    }
  };

  const onCancelPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    users.forEach((item, index) => {
      item.selected = false;
    });
    setSelect(users);
  }, [users]);

  const onHandlePress = person => {
    const newPerson = select.map(val => {
      if (val._id === person._id) {
        return {...val, selected: !val.selected};
      } else {
        return val;
      }
    });

    setSelect(newPerson);
  };

  const filteredUsers = select.filter(user => user.selected === true);

  const clearForm = () => {
    setData({
      name: '',
      photo: '',
      members: participants,
      isGroup: true,
      admins: '',
    });
  };

  const onCreatePress = async e => {
    e.preventDefault();
    try {
      setData({...data});

      const res = await axios.post(
        'https://kweeble.herokuapp.com/groups',
        {
          name,
          photo,
          members,
          admins,
          isGroup,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      clearForm();

      navigation.navigate('GroupChatScreen', {
        groupName: name,
        photo,
        members,
        groupId: res.data.groupId,
        isGroup,
      });

      console.log(res, 'resp');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000000AA'}}>
      <View
        style={{
          flex: 1,
          height: '100%',
          paddingTop: 15,
          // backgroundColor: '#000000AA',
          // justifyContent: 'flex-start',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              paddingHorizontal: 10,
              // height: '100%',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable onPress={onCancelPress}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 16,
                    // margin: 15,
                    marginLeft: 5,
                    marginTop: 15,
                  }}>
                  Back
                </Text>
              </Pressable>

              <Text
                style={{
                  color: '#182e44',
                  fontSize: 20,
                  fontWeight: '600',
                  marginTop: 10,
                }}>
                Name Group
              </Text>

              <Pressable
                disabled={name === '' ? true : false}
                onPress={onCreatePress}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 16,
                    // margin: 15,
                    marginLeft: 5,
                    marginTop: 15,
                    fontWeight: '600',
                  }}>
                  Create
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={{flex: 1, width: '100%'}}>
            <View>
              <View
                style={{
                  marginTop: 20,
                  marginHorizontal: 20,
                  backgroundColor: Colors.metagray,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 8,
                  flexDirection: 'row',
                }}>
                {photo === '' ? (
                  <Pressable
                    onPress={openGallery}
                    style={{
                      backgroundColor: 'white',
                      padding: 10,
                      borderRadius: 100,
                      width: '17%',
                    }}>
                    <Ionicons
                      name="ios-camera-outline"
                      size={35}
                      color={Colors.primary}
                      backgroundColor="white"
                    />
                  </Pressable>
                ) : (
                  <View onPress={openGallery}>
                    <Image
                      style={{
                        marginRight: 10,
                        width: 52,
                        height: 52,
                        borderRadius: 50 / 2,
                        marginBottom: 6,
                        marginTop: 6,
                      }}
                      source={{uri: photo}}
                    />
                  </View>
                )}

                <View style={styles.groupNameContainer}>
                  <TextInput
                    multiline={true}
                    style={styles.groupName}
                    placeholder="Group Name (Required)"
                    onChangeText={newText => setData({...data, name: newText})}
                    value={name}
                  />
                </View>
              </View>
            </View>
            <View style={{marginHorizontal: 20, marginVertical: 20}}>
              <Text style={{fontSize: 18, fontWeight: '500'}}>Members</Text>
              <View
                style={{
                  backgroundColor: Colors.metagray,
                  marginTop: 10,
                  borderRadius: 8,
                  paddingHorizontal: 20,
                  paddingTop: 8,
                }}>
                {members.map(person => {
                  return (
                    <View
                      key={person._id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: 'white',
                      }}>
                      <Image
                        style={{
                          marginRight: 10,
                          width: 40,
                          height: 40,
                          borderRadius: 50 / 2,
                          marginBottom: 6,
                          marginTop: 6,
                        }}
                        source={
                          person.photo
                            ? {uri: person.photo}
                            : require('../../../assets/images/user.png')
                        }
                      />
                      <Text style={{fontSize: 16, fontWeight: '400'}}>
                        {person.name}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewGroupScreen;

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
  groupName: {
    fontSize: 18,
    fontWeight: '500',
  },
  groupNameContainer: {
    marginHorizontal: 15,
    justifyContent: 'center',
  },
});

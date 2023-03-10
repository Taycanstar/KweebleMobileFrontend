import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  RefreshControl,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import {
  FacebookLoader,
  InstagramLoader,
} from 'react-native-easy-content-loader';

const deviceHeight = Dimensions.get('window').height;
const EditScopeDetailsScreen = props => {
  const me = useSelector(state => state.Reducers.userData);
  const data = props?.route?.params?.data;
  const id = data._id;
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(data.photo);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState('');
  const [info, setInfo] = useState('');
  const [name, setName] = useState('');
  const [currScope, setCurrScope] = useState('');
  const [scopes, setScopes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const onPublicPress = () => {
    setType('Public');
    setIsModalVisible(false);
  };

  const onPrivatePress = () => {
    setType('Private');
    setIsModalVisible(false);
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
    }, 5000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [refresh]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const mys = scopes.filter(sc => sc._id === data._id);
      const mys2 = mys[0];
      setCurrScope(mys2);
    }
    return () => {
      mounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopes]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (
        currScope !== '' &&
        (name === '' || name === undefined) &&
        (info === '' || info === undefined) &&
        (type === '' || type === undefined)
      ) {
        setInfo(currScope?.info);
        setType(currScope?.membership);
        setName(currScope?.name);
      }
    }
    return () => {
      mounted = false;
    };
  }, [currScope, info, name, scopes, type]);

  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxheight: 500,
      maxWidth: 500,
      selectionLimit: 1,
      mediaType: 'photo',
      includedBase64: false,
    },
  };

  const openGalleryy = async () => {
    try {
      const result = await launchImageLibrary(options);
      const formData = new FormData();
      let token = await AsyncStorage.getItem('token', token);
      formData.append('image', {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });

      let res = await fetch('https://kweeble.herokuapp.com/scopes/image', {
        // let res = await fetch('http://localhost:3000/scopes/image', {
        method: 'post',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data; ',
          Authorization: `Bearer ${token}`,
        },
      });
      let responseJson = await res.json();
      console.log(responseJson, 'hol');

      setPhoto(responseJson);
    } catch (error) {
      console.log(error);
    }
  };

  const takePhotofromCamera = async () => {};

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 1080,
      height: 1080,
      // width: 250,
      // height: 250,
      cropping: true,
    }).then(async image => {
      try {
        // let token = await AsyncStorage.getItem('token', token);

        const formData = new FormData();

        formData.append('image', {
          uri: image.path,
          type: image.mime,
          name: image.filename,
        });

        let res = await fetch('https://kweeble.herokuapp.com/scopes/image', {
          // let res = await fetch('http://localhost:3000/scopes/image', {
          method: 'post',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data; ',
            // Authorization: `Bearer ${token}`,
          },
        });

        let responseJson = await res.json();

        console.log(responseJson, 'see');

        setPhoto(responseJson);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const onSavePress = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://kweeble.herokuapp.com/scopes/edit/${id}`,
        // `http://localhost:3000/scopes/edit/${id}`,
        {
          id,
          name,
          type,
          info,
          photo,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setIsLoading(true);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log(currScope, 'data');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {isLoading ? (
        <View style={{marginTop: 50}}>
          <InstagramLoader active />
        </View>
      ) : (
        <>
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

            <View style={{flex: 0.52}}>
              <Text style={styles.headerText}>Mod tools</Text>
            </View>

            <Pressable
              onPress={onSavePress}
              style={{justifyContent: 'flex-end', flex: 0.1}}>
              <Text style={styles.addText}>Save</Text>
            </Pressable>
          </View>
          <ScrollView
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
            }
            showsVerticalScrollIndicator={false}>
            <Pressable onPress={openGallery} style={{flexDirection: 'column'}}>
              <View>
                <Image
                  source={
                    currScope?.photo
                      ? {uri: photo === '' ? currScope?.photo : photo}
                      : photo !== ''
                      ? {uri: photo}
                      : require('../../../assets/images/primary.png')
                  }
                  style={styles.profImage}
                />
              </View>
              <View style={styles.camicon}>
                <Feather name="camera" size={28} color="white" />
              </View>
            </Pressable>
            <View style={styles.headText}>
              <Text style={styles.subheading}>General </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.txt}>Scope name</Text>

              <TextInput
                placeholder="Scope name"
                // editable={false}
                style={styles.input}
                value={name}
                onChangeText={newText => setName(newText)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.txt}>Scope info</Text>

              <TextInput
                placeholder="Scope info"
                style={styles.inputInfo}
                value={info}
                multiline
                onChangeText={newText => setInfo(newText)}
              />
            </View>
            <View style={styles.lastInputContainer2}>
              <Text style={styles.txt}>Membership</Text>

              <TextInput
                placeholder="Membership"
                // editable={false}
                style={styles.lastInput2}
                value={type}
                onPressIn={() => setIsModalVisible(true)}
              />
            </View>
            <View style={styles.headText2}>
              <Text style={styles.subheading}>User Management</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ManageMembers', {data: data})
                }
                style={styles.lastInputContainer3}>
                <Text style={styles.txt}>Members</Text>
                <View style={{justifyContent: 'center'}}>
                  <AntDesign name="arrowright" size={20} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ManageMods', {data: data})}
                style={styles.lastInputContainer}>
                <Text style={styles.txt}>Moderators</Text>
                <View style={{justifyContent: 'center'}}>
                  <AntDesign name="arrowright" size={20} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <TouchableWithoutFeedback onPress={closeModal}>
            <Modal
              animationType={'fade'}
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
                      Membership type
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
                    <TouchableOpacity
                      onPress={onPublicPress}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 15,
                        marginBottom: 15,
                      }}>
                      <MaterialIcons name="public" size={25} color="black" />
                      <View style={{marginLeft: 15}}>
                        <Text
                          style={{
                            color: '#182e44',
                            fontSize: 16,
                            fontWeight: '500',
                            marginTop: 15,
                          }}>
                          Public
                        </Text>
                        <Text style={{fontSize: 13}}>
                          Anyone can view, post, and interact with the scope
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={onPrivatePress}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 15,
                        marginBottom: 15,
                      }}>
                      <Feather name="lock" size={25} color="black" />
                      <View style={{marginLeft: 15, marginRight: 6}}>
                        <Text
                          style={{
                            color: '#182e44',
                            fontSize: 16,
                            fontWeight: '500',
                            marginTop: 15,
                          }}>
                          Private
                        </Text>
                        <Text style={{fontSize: 13}}>
                          Only approved members can view, post, and interact
                          with the scope
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </TouchableWithoutFeedback>
        </>
      )}
    </SafeAreaView>
  );
};

export default EditScopeDetailsScreen;

const styles = StyleSheet.create({
  headText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headText2: {
    paddingHorizontal: 15,
    // paddingVertical: 10,
    paddingTop: 15,
    borderBottomWidth: 0.8,
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
});

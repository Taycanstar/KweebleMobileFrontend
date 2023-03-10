import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchUserProfile,
  updateUser,
  updateUserPhoto,
} from '../../store/actions';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGIN} from '../../constants/actionTypes';
import ImagePicker from 'react-native-image-crop-picker';
import {
  FacebookLoader,
  InstagramLoader,
} from 'react-native-easy-content-loader';

const EditProfileScreen = props => {
  const data = props?.route?.params?.data;
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const cat = useSelector(state => state.Reducers.userData);
  const [name, setName] = useState(data?.name === null ? '' : data?.name);
  const [phoneNumber, setPhoneNumber] = useState(
    data?.phoneNumber === null ? '' : data?.phoneNumber,
  );
  const [interests, setInterests] = useState(
    data?.interests === null ? '' : data?.interests,
  );
  const [position, setPosition] = useState(
    data?.position === null ? '' : data?.position,
  );
  const [major, setMajor] = useState(data?.major === null ? '' : data?.major);
  const [instagram, setInstagram] = useState(
    data?.instagram === null ? '' : data?.instagram,
  );
  const [snapchat, setSnapchat] = useState(
    data?.snapchat === null ? '' : data?.snapchat,
  );
  const [gradeLevel, setGradeLevel] = useState(
    data.gradeLevel === null ? '' : data.gradeLevel,
  );
  const [photo, setPhoto] = useState(data.photo === null ? '' : data.photo);

  const [user, setUser] = useState('');
  const navigation = useNavigation();

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
  }, [users]);

  useEffect(() => {
    let mounted = true;

    const loadMe = async () => {
      if (mounted) {
        const y = users?.filter(u => u._id === cat._id)[0];

        setUser(y);
      }
    };

    loadMe();

    return () => {
      mounted = false;
    };
  }, [cat._id, user, users]);

  // const {
  //   name,
  //   phoneNumber,
  //   interests,
  //   position,
  //   major,
  //   instagram,
  //   snapchat,
  //   gradeLevel,
  //   photo,
  //   _id,
  // } = user;

  // const [editData, setEditData] = useState({
  //   photo,
  //   name,
  //   phoneNumber,
  //   major,
  //   interests,
  //   snapchat,
  //   instagram,
  //   gradeLevel,
  //   position,
  //   _id,
  // });

  const myId = props.route.key;

  const onCancelPress = () => {
    navigation.goBack();
  };

  const onPersonalInfoPress = () => {
    navigation.navigate('EditPersonalDetails');
  };

  // const onSubmit = e => {
  //   try {
  //     e.preventDefault();
  //     dispatch(updateUser(editData));
  //     navigation.navigate('PersonalProfile');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  const openGalleryy = async () => {
    try {
      const result = await launchImageLibrary(options);
      const formData = new FormData();
      let token = await AsyncStorage.getItem('token', token);
      formData.append('photo', {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });

      let res = await fetch('https://kweeble.herokuapp.com/auth/photo', {
        // let res = await fetch('http://localhost:3000/auth/photo', {
        method: 'post',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data; ',
          Authorization: `Bearer ${token}`,
        },
      });
      let responseJson = await res.json();
      console.log(responseJson, '<==image data');
      // dispatch({
      //   type: LOGIN,
      //   payload: token,
      // });
      // dispatch(updateUser(editData));
    } catch (error) {
      console.log(error);
    }
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 1080,
      height: 1080,
      cropping: true,
    }).then(async image => {
      try {
        // let token = await AsyncStorage.getItem('token', token);

        const formData = new FormData();

        formData.append('photo', {
          uri: image.path,
          type: image.mime,
          name: image.filename,
        });

        let res = await fetch('https://kweeble.herokuapp.com/auth/photo', {
          method: 'post',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data; ',
            // Authorization: `Bearer ${token}`,
          },
        });

        let responseJson = await res.json();

        console.log(responseJson, '<==image data');

        setPhoto(responseJson);

        // dispatch(updateUser(editData));
      } catch (error) {
        console.log(error);
      }
    });
  };

  const onSubmitPress = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://kweeble.herokuapp.com/auth/user/${data._id}`,
        // `http://localhost:3000/scopes/edit/${id}`,
        {
          photo,
          name,
          id: data._id,
          phoneNumber,
          major,
          interests,
          snapchat,
          instagram,
          gradeLevel,
          position,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setIsLoading(false);
      navigation.navigate('PersonalProfile');

      console.log(response, 'success');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={{marginTop: 50}}>
          <InstagramLoader active />
        </View>
      ) : (
        <>
          <View style={styles.nav}>
            <Pressable onPress={onCancelPress}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </Pressable>

            <Text style={styles.headerText}>Edit Profile </Text>
            <Pressable onPress={onSubmitPress}>
              <Text style={styles.addText}>Save</Text>
            </Pressable>
          </View>

          <View style={styles.scroll}>
            <View style={styles.blue}></View>
            <View style={styles.white}>
              <View style={styles.imageWrapper}>
                <Image
                  source={
                    data?.photo
                      ? {uri: photo === undefined ? data?.photo : photo}
                      : require('../../../assets/images/user.png')
                  }
                  style={styles.profImage}
                />
                <Pressable onPress={openGallery}>
                  <Text style={styles.photoTxt}>Change profile photo</Text>
                </Pressable>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{flex: 1}}>
                <View style={styles.inputContainer}>
                  <Text style={styles.txt}>Name</Text>
                  <TextInput
                    placeholder="Name"
                    autoCapitalize="none"
                    style={styles.input}
                    defaultValue={data.name}
                    onChangeText={newText => setName(newText)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.txt}>Phone</Text>
                  <TextInput
                    placeholder="Phone"
                    autoCapitalize="none"
                    style={styles.input}
                    defaultValue={data.phoneNumber}
                    onChangeText={newText => setPhoneNumber(newText)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.txt}>Major</Text>
                  <TextInput
                    placeholder="Major"
                    autoCapitalize="none"
                    style={styles.input}
                    defaultValue={data.major}
                    onChangeText={newText => setMajor(newText)}
                  />
                </View>
                {/* <View style={styles.inputContainer}>
                  <Text style={styles.txt}>Grade</Text>
                  <TextInput
                    placeholder="Grade"
                    autoCapitalize="none"
                    style={styles.input}
                    defaultValue={data.gradeLevel}
                    onChangeText={newText => setGradeLevel(newText)}
                  />
                </View> */}
                <View style={styles.inputContainer}>
                  <Text style={styles.txt}>Position</Text>
                  <TextInput
                    placeholder="Position"
                    autoCapitalize="none"
                    style={styles.input}
                    defaultValue={data.position}
                    onChangeText={newText => setPosition(newText)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.txt}>Interests</Text>
                  <TextInput
                    placeholder="Interests"
                    autoCapitalize="none"
                    style={styles.input}
                    defaultValue={data.interests}
                    onChangeText={newText => setInterests(newText)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.txt}>Instagram</Text>

                  <TextInput
                    placeholder="Instagram"
                    autoCapitalize="none"
                    style={styles.input}
                    defaultValue={data.instagram}
                    onChangeText={newText => setInstagram(newText)}
                  />
                </View>
                <View style={styles.lastInputContainer}>
                  <Text style={styles.txt}>Snapchat</Text>

                  <TextInput
                    placeholder="Snapchat"
                    autoCapitalize="none"
                    style={styles.lastInput}
                    defaultValue={data.snapchat}
                    onChangeText={newText => setSnapchat(newText)}
                  />
                </View>

                <View style={styles.personalInfo}>
                  <Pressable onPress={onPersonalInfoPress}>
                    <Text style={styles.personalInfoTxt}>
                      Personal information settings
                    </Text>
                  </Pressable>
                </View>
                <View style={{width: '100%', height: 420}} />
              </ScrollView>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageWrapper: {
    zIndex: 10,
    // flex: 1,
    alignItems: 'center',
    paddingTop: 70,
    marginBottom: 15,
  },
  photoTxt: {
    color: Colors.primary,
    fontWeight: '500',
  },
  scroll: {backgroundColor: Colors.primary, flex: 1},
  profImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    // paddingBottom: 50,
    position: 'absolute',
    top: -40,
  },
  blue: {flex: 2, backgroundColor: Colors.primary},
  white: {
    flex: 10,
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    zIndex: 1,
  },
  nav: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  cancelBtn: {
    color: 'black',
    fontSize: 16,
  },
  headerText: {
    color: Colors.Black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  addText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    // backgroundColor: 'white',
    // width: '100%',
    // borderColor: '#e8e8e8',
    // borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 5,
    // borderRadius: 5,
    // flex: 1,
    flexDirection: 'row',
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
    paddingHorizontal: 20,
    marginBottom: 5,
    // borderRadius: 5,
    // flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  lastInput: {
    paddingVertical: 10,
    // borderRadius: 5,

    width: '80%',

    fontWeight: '400',
    flex: 10,
  },
  personalInfo: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  personalInfoTxt: {
    color: Colors.primary,
    fontSize: 15,
  },
});

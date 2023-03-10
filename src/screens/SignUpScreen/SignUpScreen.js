import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {Signup} from '../../store/actions';
import SelectDropdown from 'react-native-select-dropdown';
import {DropdownIcon} from '../../screens/DropdownIconScreen';
import {CustomSelect} from '../../components/CustomSelect';
import DatePicker from 'react-native-date-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors';

const SignUpScreen = () => {
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [bdOpen, setBdOpen] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeModal = (bool, info) => {
    changeModalVisible(bool);
  };

  const [college, setCollege] = useState('Select College');
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [birthMonth, setBirthMonth] = useState('');

  const [gender, setGender] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: {errors},
  } = useForm();

  const pwd = watch('password');

  const {signupError} = useSelector(state => state.Reducers);

  const onRegisterPressed = async () => {
    const values = getValues();
    setIsLoading(true);
    dispatch(
      Signup(
        values.name,
        values.email.toLowerCase(),
        values.password,
        college,
        values.username.toLowerCase(),
        date.getFullYear(),
        birthMonth,
        date.getDate(),
        gender,
        blockedUsers,
        followers,
        following,
      ),
    ).then(err => {
      if (err) {
        return err;
      } else {
        navigation.navigate('ScopeSignup', {
          username: values.username.toLowerCase(),
          pwd: values.password,
          mail: values.email.toLowerCase(),
        });
      }
    });
  };

  const onTermsOfUsePressed = () => {
    navigation.navigate('Terms');
  };

  const onPrivacyPressed = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  const onBdPress = () => {
    setBdOpen(true);
    setOpen(true);
  };

  useEffect(() => {
    if (date.getMonth() === 0) {
      setBirthMonth('January');
    }
    if (date.getMonth() === 1) {
      setBirthMonth('February');
    }
    if (date.getMonth() === 2) {
      setBirthMonth('March');
    }
    if (date.getMonth() === 3) {
      setBirthMonth('April');
    }
    if (date.getMonth() === 4) {
      setBirthMonth('May');
    }
    if (date.getMonth() === 5) {
      setBirthMonth('June');
    }
    if (date.getMonth() === 6) {
      setBirthMonth('July');
    }
    if (date.getMonth() === 7) {
      setBirthMonth('August');
    }
    if (date.getMonth() === 8) {
      setBirthMonth('September');
    }
    if (date.getMonth() === 9) {
      setBirthMonth('October');
    }
    if (date.getMonth() === 10) {
      setBirthMonth('November');
    }
    if (date.getMonth() === 11) {
      setBirthMonth('December');
    }
  }, [date]);

  const colleges = [
    {
      _id: 0,
      name: 'Not Applicable',
      photo: require('../../../assets/images/na.png'),
    },
    {
      _id: 1,
      name: 'Eckerd College',
      photo: require('../../../assets/images/ecsports.png'),
    },

    {
      _id: 2,
      name: 'Polk State College',
      photo: require('../../../assets/images/polk.jpeg'),
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.subtleGray}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Join Kweeble today.</Text>
          <CustomInput
            placeholder="Full name"
            control={control}
            name="name"
            rules={{required: 'Full name is required'}}
          />
          <CustomInput
            placeholder="Username"
            control={control}
            name="username"
            rules={{
              required: 'Username is required',
              pattern: {
                value: /^([A-Za-z0-9]|[-._](?![-._])){1,20}$/,
                message: 'Special characters and spaces are not allowed',
              },
            }}
          />
          <CustomInput
            control={control}
            placeholder="Email"
            name="email"
            rules={{
              pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
              required: 'Email is required',
            }}
          />
          <CustomInput
            control={control}
            placeholder="Password"
            name="password"
            secureTextEntry
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should beat least 8 characters long',
              },
            }}
          />
          <CustomInput
            control={control}
            placeholder="Confirm password"
            name="confirmPassword"
            secureTextEntry
            rules={{
              required: 'Password confirmation is required',
              validate: value => value === pwd || 'Passwords do not match',
            }}
          />

          <TouchableOpacity style={styles.cont} onPress={onBdPress}>
            {/* <TextInput
              onPressIn={() => {
                setIsModalVisible(true);
              }}
              // value={college}
              editable={false}
              placeholder={college}
              style={{paddingVertical: 15, borderRadius: 5, color: 'blue'}}
            /> */}

            <Text style={{paddingVertical: 15, borderRadius: 5, color: 'gray'}}>
              {bdOpen === false
                ? 'Birthday'
                : `${birthMonth} ${date.getDate()}, ${date.getFullYear()}`}
            </Text>
          </TouchableOpacity>
          {/* <CustomButton
            // onPress={() => setOpen(true)}
            onPress={onBdPress}
            type="fourth"
            text={
              bdOpen === false
                ? 'Birthday'
                : `${birthMonth} ${date.getDate()} ${date.getFullYear()}`
            }
          /> */}
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setBirthMonth(birthMonth);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <TouchableOpacity
            style={styles.cont}
            onPress={() => {
              setIsModalVisible(true);
            }}>
            {/* <TextInput
              onPressIn={() => {
                setIsModalVisible(true);
              }}
              // value={college}
              editable={false}
              placeholder={college}
              style={{paddingVertical: 15, borderRadius: 5, color: 'blue'}}
            /> */}

            <Text style={{paddingVertical: 15, borderRadius: 5, color: 'gray'}}>
              {college}
            </Text>
          </TouchableOpacity>

          {signupError && (
            <TextInput style={styles.isError}>User already exists </TextInput>
          )}

          {isLoading ? (
            <TouchableOpacity
              style={styles.reed}
              // onPress={onPress}
            >
              <ActivityIndicator size="small" color="white" />
            </TouchableOpacity>
          ) : (
            <CustomButton
              onPress={handleSubmit(onRegisterPressed)}
              type="primary"
              text="Sign up"
            />
          )}

          <Text style={styles.text}>
            By signing up, you agree to the{' '}
            <Text style={styles.link} onPress={onTermsOfUsePressed}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={styles.link} onPress={onPrivacyPressed}>
              Privacy Policy
            </Text>
          </Text>

          <CustomButton
            type="tertiary"
            onPress={onSignInPressed}
            text="Already on Kweeble? Log in"
          />
        </View>
      </ScrollView>
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
                  Select College
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
                  }}>
                  {colleges.map(col => {
                    return (
                      <View key={col._id}>
                        <ScrollView>
                          <TouchableOpacity
                            onPress={() => {
                              setIsModalVisible(false);
                              setCollege(`${col.name}`);
                            }}
                            key={col.id}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingHorizontal: 3,
                              marginBottom: 8,
                              height: '100%',
                            }}>
                            <Image
                              source={
                                col.photo
                                  ? col.photo
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
                                {col.name}
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
        </Modal>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 40,
  },
  cont: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  inp: {
    paddingVertical: 15,
    borderRadius: 5,
    color: 'blue',
    placeholderTextColor: 'gray',
  },

  text: {
    color: 'gray',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  link: {
    color: '#fdb075',
  },
  collegeInput: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    // paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    color: 'gray',
  },
  collegeInputText: {
    color: 'gray',
    fontSize: 15,
    textAlign: 'left',
    opacity: 0.6,
  },
  dateInput: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    color: 'gray',
    fontSize: 15,
    textAlign: 'flex-start',
  },
  isError: {
    color: 'red',
    alignSelf: 'stretch',
    paddingVertical: 5,
    fontSize: 15,
    paddingHorizontal: 5,
  },
  reed: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#0078d7',
  },
});

export default SignUpScreen;

import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import logo from '../../../assets/images/logo4.jpg';
import letters from '../../../assets/images/kwlet.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {Login} from '../../store/actions';
import {LOGIN, LOGOUT} from '../../constants/actionTypes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors';

const SignInScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: {error},
  } = useForm();
  const {height} = useWindowDimensions();
  const [isUsername, setIsUsername] = useState(true);
  const usd = watch(['username', 'email']);
  const [isError, setIsError] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onSignInPressed = async data => {
    //console.log(data.username.toLowerCase(), 'username');
    setIsLoading(true);
    dispatch(
      Login(
        data.username?.toLowerCase(),
        data.email?.toLowerCase(),
        data.password,
      ),
    );
  };

  const {loginError} = useSelector(state => state.Reducers);

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };
  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  useEffect(() => {
    if (usd[0] !== undefined) {
      if (usd[0].includes('@')) {
        setIsUsername(false);
      } else {
        setIsUsername(true);
      }
    }
  }, [usd]);

  useEffect(() => {
    if (loginError) {
      setIsLoading(false);
    }
  }, [loginError]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.subtleGray}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <View style={{alignItems: 'center', padding: 40, width: '100%'}}>
            <Image source={logo} style={styles.logo} />

            <CustomInput
              name={!isUsername ? 'email' : 'username'}
              placeholder="Username or email"
              control={control}
              rules={{
                required: 'Username or email is required',
              }}
            />
            <CustomInput
              name="password"
              placeholder="Password"
              control={control}
              secureTextEntry
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password should beat least 8 characters long',
                },
              }}
            />
            {loginError && (
              <TextInput style={styles.isError}>Invalid credentials </TextInput>
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
                onPress={handleSubmit(onSignInPressed)}
                type="primary"
                text={'Log In'}
              />
            )}
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <CustomButton
              type="tertiary"
              onPress={onForgotPasswordPressed}
              text={'Forgot Password?'}
            />

            <CustomButton
              type="quarternary"
              onPress={onSignUpPressed}
              text="Don't have an account?
               Join Kweeble now"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    // padding: 30,
  },

  logo: {
    width: 150,
    borderRadius: 100,
    // maxWidth: 300,
    // maxHeight: 200,
    height: 150,
    marginBottom: 35,
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  input: {
    paddingVertical: 15,
    borderRadius: 5,
  },
  isError: {
    color: 'red',
    alignSelf: 'stretch',
    paddingVertical: 5,
    fontSize: 15,
    paddingHorizontal: 5,
  },
  let: {
    width: '100%',
    height: 100,
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

export default SignInScreen;

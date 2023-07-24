import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import Colors from '../../constants/Colors';

const NewPasswordScreen = props => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const email = props?.route?.params?.email;
  const {
    control,
    handleSubmit,

    formState: {errors},
  } = useForm();
  const navigation = useNavigation();

  const onContinuePress = async () => {
    if (password === confirmPassword) {
      try {
        const res = await axios.post(
          `https://kweeble.herokuapp.com/auth/change-new-password/${email}`,
          {password},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        console.log(res, 'success');

        navigation.navigate('SignIn');
      } catch (error) {
        console.log(error);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3500);
      }
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3500);
    }
  };

  const onSubmitPressed = async () => {
    try {
      const res = await axios.patch(
        `https://kweeble.herokuapp.com/auth/reset-password/${code}`,
        {password},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      navigation.navigate('SignIn');
      console.warn('password updated');
    } catch (error) {
      console.log(error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3500);
    }
  };

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.subtleGray}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Reset your password</Text>

          <View style={styles.inputContainer}>
            <TextInput
              multiline={true}
              style={styles.input}
              placeholder="Enter new password"
              onChangeText={newText => setPassword(newText)}
              value={password}
              name="password"
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              multiline={true}
              style={styles.input}
              placeholder="Confirm new password"
              onChangeText={newText => setConfirmPassword(newText)}
              value={confirmPassword}
              name="confirmpassword"
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
          {error && <Text style={styles.error}>Passwords do not match</Text>}
          <CustomButton
            onPress={onContinuePress}
            type="primary"
            text="Continue"
          />

          <CustomButton
            type="tertiary"
            onPress={onSignInPressed}
            text="Back to Log in"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 40,
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
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  input: {
    // paddingVertical: 15,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 15,
  },
  error: {
    color: 'red',
    alignSelf: 'stretch',
  },
});

export default NewPasswordScreen;

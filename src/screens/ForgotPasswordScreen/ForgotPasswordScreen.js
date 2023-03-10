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

const ForgotPasswordScreen = () => {
  // const [username, setUsername] = useState('');
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,

    formState: {errors},
  } = useForm();

  const onSendPressed = async () => {
    try {
      const res = await axios.post(
        'https://kweeble.herokuapp.com/auth/forgot-password',
        // 'http://localhost:3000/auth/forgot-password',
        {email},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(res, 'lo');

      navigation.navigate('NewPassword');
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
          {/* <CustomInput
          placeholder="Email"
          name="email"
          control={control}
          rules={{required: 'Email is required'}}
        /> */}
          <View style={styles.inputContainer}>
            <TextInput
              multiline={true}
              style={styles.input}
              placeholder="Email"
              onChangeText={newText => setEmail(newText)}
              value={email}
              autoCapitalize="none"
            />
          </View>
          {error && <Text style={styles.error}>Invalid email</Text>}

          <CustomButton onPress={onSendPressed} type="primary" text="Send" />

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

export default ForgotPasswordScreen;

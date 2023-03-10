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

const NewPasswordScreen = () => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const {
    control,
    handleSubmit,

    formState: {errors},
  } = useForm();
  const navigation = useNavigation();

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
              placeholder="Enter code"
              onChangeText={newText => setCode(newText)}
              value={code}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              multiline={true}
              style={styles.input}
              placeholder="Enter new password"
              onChangeText={newText => setPassword(newText)}
              value={password}
              name="password"
              autoCapitalize="none"
            />
          </View>
          {error && (
            <Text style={styles.error}>One time code is incorrect</Text>
          )}
          <CustomButton
            onPress={onSubmitPressed}
            type="primary"
            text="Submit"
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

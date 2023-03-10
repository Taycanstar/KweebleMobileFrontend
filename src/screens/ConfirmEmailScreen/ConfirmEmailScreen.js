import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
const ConfirmEmailScreen = () => {
  // const [code, setCode] = useState('');
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,

    formState: {errors},
  } = useForm();

  const onConfirmPressed = data => {
    console.warn(data);
    navigation.navigate('Home');
  };

  const onResendPressed = () => {
    console.warn('resend');
  };

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>
        <CustomInput
          placeholder="Enter confirmation code"
          name="code"
          control={control}
        />
        <CustomButton
          onPress={handleSubmit(onConfirmPressed)}
          type="primary"
          text="Confirm"
          rules={{required: 'Confirmation code is required'}}
        />

        <CustomButton
          type="secondary"
          onPress={onResendPressed}
          text="Resend code"
        />

        <CustomButton
          type="tertiary"
          onPress={onSignInPressed}
          text="Back to Log in"
        />
      </View>
    </ScrollView>
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
});

export default ConfirmEmailScreen;

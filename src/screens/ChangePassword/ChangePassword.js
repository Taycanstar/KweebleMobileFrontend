import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({navigation}) => {
  const data = useSelector(state => state.Reducers.userData);
  const email = data.email;
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const onBackPress = () => {
    navigation.goBack();
  };
  const onChangePasswordPress = () => {
    navigation.navigate('ChangePassword');
  };

  const onSubmit = async () => {
    try {
      setPassword({...password});
      let token = await AsyncStorage.getItem('token', token);
      const res = await axios.put(
        'https://kweeble.herokuapp.com/auth/update-password',
        {password: password, email: data.email, name: data.name},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('succes', res);
      console.warn('Password updated');
      navigation.navigate('SettingsScreen');
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3500);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.nav}>
        <MaterialIcons
          onPress={onBackPress}
          name="arrow-back-ios"
          size={30}
          color="black"
        />

        <Text style={styles.headerText}>Change Password </Text>

        <Pressable onPress={onSubmit}>
          <Text style={styles.addText}>Done</Text>
        </Pressable>
      </View>
      <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 20}}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            onChangeText={newText => setPassword(newText)}
            value={password}
            autoCapitalize="none"
            secureTextEntry
            name="password"
          />
        </View>
        {error && <Text style={styles.error}>Couldn't change password</Text>}
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  nav: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  cancelBtn: {
    color: Colors.coolRed,
    fontSize: 16,
  },
  content: {
    flex: 0.35,
    paddingVertical: 15,
    // paddingHorizontal: 15,
    marginLeft: 15,
    marginRight: 30,
    // flexDirection: 'column',
  },
  headerText: {
    color: Colors.Black,
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 10,
  },
  addText: {
    paddingTop: 10,
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
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

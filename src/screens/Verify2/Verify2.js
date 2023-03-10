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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Logout} from '../../store/actions';

const Verify2 = ({navigation}) => {
  const data = useSelector(state => state.Reducers.userData);
  const dispatch = useDispatch();
  const email = data.email;
  const id = data._id;
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
      const res = await axios.post(
        'https://kweeble.herokuapp.com/auth/verify-password',
        {password, email},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      let token = await AsyncStorage.getItem('token', token);
      const response = await axios.delete(
        'https://kweeble.herokuapp.com/auth',

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id: id,
          },
        },
      );
      console.log('succes', res);
      dispatch(Logout());
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3500);
      console.log(error);
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

        <Text style={styles.headerText}>Confirm password </Text>

        <Pressable onPress={onSubmit}>
          <Text style={styles.addText}>{'     '}</Text>
        </Pressable>
      </View>
      <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 20}}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter current password"
            onChangeText={newText => setPassword(newText)}
            value={password}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity style={styles.btn} onPress={onSubmit}>
            <Text style={styles.dtext}>Deactivate</Text>
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.error}>Invalid password</Text>}
      </View>
    </SafeAreaView>
  );
};

export default Verify2;

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
  btn: {
    marginTop: 20,
    backgroundColor: Colors.strongRed,
    paddingVertical: 10,
    // maxWidth: '100%',
    width: '40%',
    borderRadius: 10,
  },
  dtext: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

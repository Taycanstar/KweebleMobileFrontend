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
const VerifyPasswordScreen = ({navigation}) => {
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
      const res = await axios.post(
        'https://kweeble.herokuapp.com/auth/verify-password',
        {password, email},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('succes', res);
      navigation.navigate('ChangePassword');
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

        <Text style={styles.headerText}>Verify Password </Text>

        <Pressable onPress={onSubmit}>
          <Text style={styles.addText}>Next</Text>
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
        {error && <Text style={styles.error}>Invalid password</Text>}
      </View>
    </SafeAreaView>
  );
};

export default VerifyPasswordScreen;

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

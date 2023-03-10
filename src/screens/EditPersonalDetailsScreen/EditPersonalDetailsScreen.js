import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

const EditPersonalDetailsScreen = () => {
  const data = useSelector(state => state.Reducers.userData);
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.goBack();
  };

  const onChangeEmailPress = () => {
    navigation.navigate('ChangeEmail');
  };

  const onChangeUsernamePress = () => {
    navigation.navigate('ChangeUsername');
  };

  const onChangeBirthdayPress = () => {
    navigation.navigate('ChangeBirthday');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.nav}>
        <Pressable onPress={onBackPress}>
          <MaterialIcons
            onPress={onBackPress}
            name="arrow-back-ios"
            size={30}
            color="black"
          />
        </Pressable>

        <Text style={styles.headerText}>Personal information </Text>
        <Pressable>
          <Text style={styles.addText}>{''}</Text>
        </Pressable>
      </View>
      <View style={styles.headText}>
        <Text style={styles.subheading}>
          Provide your personal information.{' '}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.txt}>Email</Text>

        <TextInput
          placeholder="Email"
          editable={false}
          style={styles.input}
          value={data.email}
          onPressIn={onChangeEmailPress}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.txt}>Username</Text>

        <TextInput
          placeholder="Username"
          editable={false}
          style={styles.input}
          value={data.username}
          onPressIn={onChangeUsernamePress}
        />
      </View>
      <View style={styles.lastInputContainer}>
        <Text style={styles.txt}>Birthday</Text>

        <TextInput
          placeholder="Birthday"
          editable={false}
          style={styles.lastInput}
          value={`${data.birthMonth} ${data.birthDay}, ${data.birthYear}`}
          onPressIn={onChangeBirthdayPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditPersonalDetailsScreen;

const styles = StyleSheet.create({
  headText: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  subheading: {
    color: Colors.metaIcon,
  },
  nav: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  headerText: {
    color: Colors.Black,
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  addText: {
    color: Colors.coolRed,
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
});

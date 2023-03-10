import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserProfile, updateUsername} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ChangeScopeType = props => {
  const dispatch = useDispatch();

  const data = props?.route?.params?.data;
  const me = useSelector(state => state.Reducers.userData);

  //console.log(data, '<==data');

  const [name, setName] = useState(data.name);
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.goBack();
  };

  const editUsername = () => {
    // try {
    //   dispatch(updateUsername(username, data._id));
    //   navigation.navigate('PersonalProfile');
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.nav}>
        <Pressable onPress={onBackPress}>
          <MaterialIcons
            onPress={onBackPress}
            name="arrow-back-ios"
            size={20}
            color="black"
          />
        </Pressable>

        <Text style={styles.headerText}>Membership Type</Text>
        <Pressable onPress={editUsername}>
          <Text style={styles.addText}>Done</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        <Feather name="edit" size={25} color="black" />
        <TextInput
          placeholder="Scope name"
          autoCapitalize="none"
          style={styles.input}
          defaultValue={data.name}
          onChangeText={newText => setName({name: newText})}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangeScopeType;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: '100%',
    borderColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
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
    paddingTop: 10,
    color: 'black',
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
    // borderRadius: 5,
    width: '100%',
    borderColor: 'lightgray',
    fontWeight: '400',
    flex: 10,
    fontSize: 16,
    marginLeft: 10,
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

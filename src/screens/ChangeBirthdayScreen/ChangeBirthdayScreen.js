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
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserProfile, updateUser} from '../../store/actions';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';

const ChangeBirthdayScreen = () => {
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState('');
  const dispatch = useDispatch();
  const me = useSelector(state => state.Reducers.userData);

  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.goBack();
  };

  const onSubmit = e => {
    try {
      const editData = {
        birthMonth: month,
        birthDay: date.getDate(),
        birthYear: date.getFullYear(),
      };
      e.preventDefault();
      dispatch(updateUser(editData));
      navigation.navigate('PersonalProfile');
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitPress = async () => {
    try {
      const response = await axios.put(
        `https://kweeble.herokuapp.com/auth/userBd/${me._id}`,
        // `http://localhost:3000/scopes/edit/${id}`,
        {
          birthDay: date.getDate(),
          birthMonth: month,
          birthYear: date.getFullYear(),
          id: me._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      navigation.navigate('PersonalProfile');

      console.log(response, 'success');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (date.getMonth() === 0) {
      setMonth('January');
    }
    if (date.getMonth() === 1) {
      setMonth('February');
    }
    if (date.getMonth() === 2) {
      setMonth('March');
    }
    if (date.getMonth() === 3) {
      setMonth('April');
    }
    if (date.getMonth() === 4) {
      setMonth('May');
    }
    if (date.getMonth() === 5) {
      setMonth('June');
    }
    if (date.getMonth() === 6) {
      setMonth('July');
    }
    if (date.getMonth() === 7) {
      setMonth('August');
    }
    if (date.getMonth() === 8) {
      setMonth('September');
    }
    if (date.getMonth() === 9) {
      setMonth('October');
    }
    if (date.getMonth() === 10) {
      setMonth('November');
    }
    if (date.getMonth() === 11) {
      setMonth('December');
    }
  }, [date]);

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

        <Text style={styles.headerText}>Birthday</Text>
        <Pressable onPress={onSubmitPress}>
          <Text style={styles.addText}>Done</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="Birthday"
          autoCapitalize="none"
          style={styles.input}
          defaultValue={`${month} ${date.getDate()}, ${date.getFullYear()}`}
          editable={false}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <DatePicker mode="date" date={date} onDateChange={setDate} />
      </View>
    </SafeAreaView>
  );
};

export default ChangeBirthdayScreen;

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

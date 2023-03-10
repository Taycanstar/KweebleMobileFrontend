import {
  View,
  Text,
  Dimensions,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchCardPop from '../../components/SearchCardPop';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import SelectMultiple from 'react-native-select-multiple';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const deviceHeight = Dimensions.get('window').height;

const GoingPopup = props => {
  const [showPop, setShowPop] = useState(true);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chooseInfo, setChooseInfo] = useState();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const data2 = useSelector(state => state.Reducers.userData);
  const photo = props?.photo;
  const user = props?.user;
  const typeId = props?.typeId;

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeModal = async (bool, data, color, txt, ind) => {
    props.changeModalVisible(bool);
    props.setGoing(data);
    props.setColor(color);
    props.setTxtColor(txt);
    props.setIndicator(ind);

    try {
      const res = await axios.put(
        `https://kweeble.herokuapp.com/events/${props.going}`,
        // `http://localhost:3000/events/${props.going}`,
        {
          id: data2._id,
          going: data,
          goingBtn: color,
          goingBtnText: txt,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.log(error);
    }

    if (data === true) {
      try {
        const response = await axios.post(
          `https://kweeble.herokuapp.com/notifications/new`,
          // `http://localhost:3000/events/${props.going}`,
          {
            text: `is going to your event!`,
            type: 'event',
            typeId,
            to: user,
            from: data2._id,
            photo: photo,
            seen: false,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        console.log(response, '<== res');
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.delete(
          `https://kweeble.herokuapp.com/notifications/del/${typeId}`,
          // `http://localhost:3000/notifications/del/${typeId}`,
          {typeId},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChange = e => {
    setQuery(e);
    fetch(`https://kweeble.herokuapp.com/api`)
      .then(res => res.json())
      .then(data => {
        if (!data.errors) {
          setResults(data);
        } else {
          setResults([]);
        }
      });
  };

  return (
    <View style={{height: '100%', flex: 1}}>
      <TouchableOpacity
        onPress={() => closeModal(false, false, 'gray', 'black', 1)}
        style={{
          // flex: 1,
          height: '100%',
          // paddingTop: 60,
          width: '100%',
          backgroundColor: '#000000AA',
          // justifyContent: 'flex-start',
        }}>
        <TouchableWithoutFeedback>
          <View
            style={{
              marginTop: 60,
              backgroundColor: '#fff',
              width: '100%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              paddingHorizontal: 15,
              height: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // paddingHorizontal: 5,
                alignItems: 'center',
                paddingBottom: 10,
              }}>
              <TouchableOpacity
                onPress={() => closeModal(false, false, 'gray', 'black', 1)}
                style={{paddingTop: 10, borderRadius: 100}}>
                <MaterialIcons
                  // onPress={() => navigation.goBack()}
                  name="arrow-back-ios"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#182e44',
                  fontSize: 18,
                  fontWeight: '600',
                  marginTop: 15,
                }}></Text>

              <View></View>
            </View>

            <ScrollView vertical showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() =>
                  closeModal(false, true, Colors.primary, Colors.primary, 1)
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name="ios-checkmark-circle-outline"
                    size={22}
                    color="black"
                  />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>Going</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, false, 'gray', 'black', 1)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name="close-circle-outline"
                    size={28}
                    color="black"
                  />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>Not going</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </View>
  );
};

export default GoingPopup;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    // borderColor: '#c6c6c6',
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.metagray,
  },
  searchContainer2: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 7,
    // borderColor: '#c6c6c6',
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.metagray,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {},
  profileImage: {
    marginRight: 15,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginBottom: 10,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  username: {
    fontWeight: '600',
    color: 'black',
  },
  name: {
    color: 'grey',
  },
  Topacity: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  prevText: {
    color: Colors.metaIcon,
    textAlign: 'center',
  },
  prevText2: {
    color: Colors.metaIcon,
    textAlign: 'center',
    marginVertical: 15,
  },
  prevContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  userInfo: {},
  nameCard: {
    fontWeight: 'bold',
  },
  usernameCard: {
    color: Colors.metaIcon,
    marginTop: 3,
  },
});

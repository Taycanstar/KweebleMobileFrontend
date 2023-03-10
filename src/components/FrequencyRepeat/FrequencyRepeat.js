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

const deviceHeight = Dimensions.get('window').height;

const FrequencyRepeat = props => {
  const navigation = useNavigation();
  const [isFrequencyVisible, setIsFrequencyVisible] = useState(false);
  const [chooseInfo, setChooseInfo] = useState();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const changeFrequencyVisible = bool => {
    setIsFrequencyVisible(bool);
  };

  const closeFrequency = (bool, data) => {
    props.changeFrequencyVisible(bool);
    props.setFrequency(data);
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
        onPress={() => closeFrequency(false, 'Frequency')}
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
              marginTop: 460,
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
                onPress={() => closeFrequency(false, 'Frequency')}
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
                }}>
                Frequency
              </Text>

              <View></View>
            </View>

            <ScrollView vertical showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => closeFrequency(false, 'Daily')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Text style={{fontSize: 18, fontWeight: '400'}}>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeFrequency(false, 'Weekly')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text style={{fontSize: 18, fontWeight: '400'}}>Weekly</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeFrequency(false, 'Monthly')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text style={{fontSize: 18, fontWeight: '400'}}>Monthly</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}
                onPress={() => closeFrequency(false, 'Yearly')}>
                <Text style={{fontSize: 18, fontWeight: '400'}}>Yearly</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </View>
  );
};

export default FrequencyRepeat;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    paddingBottom: 25,
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

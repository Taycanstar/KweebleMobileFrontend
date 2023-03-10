import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Platform,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Message from '../../components/Message/';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {io} from 'socket.io-client';
import {useSelector} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';

//socket config
const ROOT_URL = 'https://kweeble.herokuapp.com/';
const socket = io('http://localhost:3000');

const GroupChatScreen = props => {
  const headerHeight = useHeaderHeight();
  const [messages, setMessages] = useState([]);
  const [groups, setGroups] = useState([]);
  const [content, setContent] = useState('');
  const data = useSelector(state => state.Reducers.userData);
  const name = data.name;
  const id = props?.route?.params?._id;
  const {groupName, photo, members, groupId, description} =
    props?.route?.params;
  const socketRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    let mounted = true;
    const loadMessages = async () => {
      try {
        const {data} = await axios.get(
          'https://kweeble.herokuapp.com/messages/',
        );
        if (mounted) {
          setMessages(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadMessages();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const emit = async () => {
      try {
        await socket.emit('join_room', 'Room2');
        socket.on('new_message', dayta => {
          if (mounted) {
            setMessages(curr => [...curr, dayta]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    emit();
    return () => {
      mounted = false;
    };
  }, []);

  const onSend = async () => {
    try {
      if (content.trim() === '') {
        return;
      }

      const message = {
        room: 'Room2',
        name,
        received: false,
        user: data._id,
        recipient: groupId,
        text: content.trim(),
        receiverHasRead: false,
        timestamp: new Date().getTime(),
      };

      await socket.emit('send_message', message);
      setContent('');

      const res = await axios.post(
        'https://kweeble.herokuapp.com/messages',
        {
          name,
          received: false,
          user: data._id,
          recipient: groupId,
          text: content.trim(),
          timestamp: new Date().getTime(),
          receiverHasRead: false,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredMessages =
    messages && messages.filter(msg => msg.recipient === groupId);
  useEffect(() => {}, []);

  const renderItem = ({item}) => {
    return (
      <>
        {item.user === data._id ? (
          <View
            style={{
              // backgroundColor: '#0078fe',
              backgroundColor: Colors.primary,
              padding: 10,
              marginLeft: '45%',
              // borderRadius: 5,

              marginTop: 5,
              marginRight: '0%',
              maxWidth: '50%',
              alignSelf: 'flex-end',
              borderRadius: 20,
            }}>
            <Text style={{fontSize: 16, color: '#fff'}}> {item.text}</Text>

            <View style={styles.rightArrow}></View>
            <View style={styles.rightArrowOverlap}></View>
          </View>
        ) : (
          <View
            style={{
              // backgroundColor: '#dedede',
              backgroundColor: '#eee',
              padding: 10,
              // borderRadius: 5,
              marginTop: 5,
              marginLeft: '0%',
              maxWidth: '50%',
              alignSelf: 'flex-start',
              //maxWidth: 500,
              //padding: 14,

              //alignItems:"center",
              borderRadius: 20,
            }}>
            <Text
              style={{fontSize: 16, color: '#000', justifyContent: 'center'}}>
              {' '}
              {item.text}
            </Text>
            <View style={styles.leftArrow}></View>
            <View style={styles.leftArrowOverlap}></View>
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        scrollEnabled
        style={styles.keyboard}>
        <View style={styles.nav}>
          <View style={{marginRight: 15}}>
            <MaterialIcons
              onPress={() => navigation.navigate('Messages ')}
              name="arrow-back-ios"
              size={25}
              color={Colors.primary}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('GroupChatInfo', {
                groupName,
                photo,
                members,
                groupId,
                description,
              })
            }
            style={{
              width: '93%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{
                marginRight: 8,
                width: 40,
                height: 40,
                borderRadius: 50 / 2,
              }}
              source={
                photo
                  ? {uri: photo}
                  : require('../../../assets/images/user.png')
              }
            />
            <Text
              style={{
                color: Colors.Black,
                fontWeight: '600',
                fontSize: 18,
                // paddingTop: 8,
              }}>
              {groupName}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredMessages}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={styles.flatlist}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={setContent}
            multiline
          />
          <Pressable
            style={styles.btn}
            disabled={content === ''}
            onPress={onSend}>
            <View style={content === '' ? styles.icontainer : styles.icont}>
              <Ionicons
                name="send"
                size={18}
                color={content === '' ? 'lightgray' : 'white'}
              />
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GroupChatScreen;

const styles = StyleSheet.create({
  nav: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 0,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    // padding: 10,
    borderRadius: 6,
    marginBottom: 3,
  },
  icont: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 8,
  },
  icontainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 5,
    borderColor: 'gray',
  },
  keyboard: {
    flex: 1,
    paddingBottom: 10,
    backgroundColor: 'white',
    paddingTop: 5,
  },
  flatlist: {
    paddingHorizontal: 20,
  },
  rightArrow: {
    position: 'absolute',
    // backgroundColor: '#0078fe',
    backgroundColor: Colors.primary,
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: 'absolute',
    // backgroundColor: '#eeeeee',
    backgroundColor: '#fff',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },

  /*Arrow head for recevied messages*/
  leftArrow: {
    position: 'absolute',
    // backgroundColor: '#dedede',
    backgroundColor: '#eee',
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10,
  },

  leftArrowOverlap: {
    position: 'absolute',
    // backgroundColor: '#eeeeee',
    backgroundColor: '#fff',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
  },
});

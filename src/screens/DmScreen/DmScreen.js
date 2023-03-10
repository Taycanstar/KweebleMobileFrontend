import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Platform,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Message from '../../components/Message/';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {io} from 'socket.io-client';
import {useSelector} from 'react-redux';

//socket config
const ROOT_URL = 'https://kweeble.herokuapp.com/';
const socket = io('http://localhost:3000');
const DmScreen = props => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const data = useSelector(state => state.Reducers.userData);
  const name = data.name;
  const id = props?.route?.params?._id;
  const {itemId, msgName} = props?.route?.params;
  const socketRef = useRef();

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
        await socket.emit('join_room', 'Room1');
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
        room: 'Room1',
        name,
        received: false,
        user: data._id,
        recipient: itemId,
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
          recipient: itemId,
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
    messages &&
    messages.filter(
      msg =>
        (msg.user === data._id && msg.recipient === itemId) ||
        (msg.user === itemId && msg.recipient === data._id),
    );
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      scrollEnabled
      style={styles.keyboard}>
      <FlatList
        data={filteredMessages}
        renderItem={renderItem}
        // keyExtractor={item => item.id}
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
  );
};

export default DmScreen;

const styles = StyleSheet.create({
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

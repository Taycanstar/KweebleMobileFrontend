import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Message from '../../components/Message/';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';
import {useSelector} from 'react-redux';

//socket config
const ROOT_URL = 'https://kweeble.herokuapp.com/';

const ChatScreen2 = props => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const socket = io('http://localhost:8000');
  const data = useSelector(state => state.Reducers.userData);
  const name = data.name;
  const text = props?.route?.params?.text;
  const nameOnChat = props?.route?.params?.name;
  const {id} = props?.route?.params;

  const received = props?.route?.params?.received;

  const timestamp = props?.route?.params?.timestamp;
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
  }, [messages]);

  useEffect(() => {
    // Room connection
    socket.emit('join_room', 'Elvis');
    // Messages => envoie + reception
    socket.on('new_message', data => {
      console.log('message', data);
      setMessages(current => {
        return [...current, data];
      });
    });
  }, [socket]);

  const onSend = () => {
    if (content.trim() === '') {
      return;
    }

    const message = {
      room: 'Elvis',
      name,
      received: false,
      text: content.trim(),
      timestamp: new Date().getTime(),
    };

    socket.emit('send_message', message);
    setContent('');
  };
  const filteredMessages =
    messages &&
    messages.filter(msg => msg.user === data._id && msg.recipient === id);
  const renderItem = ({item}) => {
    // return <Message name={name} message={item} />;

    return (
      <View
        style={{
          alignSelf: item.received === false ? 'flex-end' : 'flex-start',
          backgroundColor:
            item.received === false ? Colors.primary : 'lightgray',
          borderRadius: 50,
          marginTop: 5,
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}>
        <Text
          style={[
            styles.content,
            {
              //   backgroundColor:
              //     item.received === false ? Colors.primary : 'lightgray',
              color: item.received === false ? 'white' : 'black',
              fontWeight: '500',
              fontSize: 15,
            },
          ]}>
          {item.text}
        </Text>
        {/* <Text style={styles.name}>{item.name}</Text> */}
      </View>
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
        keyExtractor={item => item.id}
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
          <Ionicons
            name="send"
            size={24}
            color={content === '' ? 'lightgray' : 'black'}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen2;

const styles = StyleSheet.create({
  content: {
    // padding: 10,
    borderRadius: 6,
    marginBottom: 3,
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
    borderRadius: 6,
    marginRight: 5,
  },
  keyboard: {
    flex: 1,
    paddingBottom: 10,
  },
  flatlist: {
    paddingHorizontal: 20,
  },
});

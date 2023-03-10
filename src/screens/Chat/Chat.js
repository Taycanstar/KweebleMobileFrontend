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

//socket config
const ROOT_URL = 'https://kweeble.herokuapp.com/';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const socket = io('http://localhost:8000');

  //   useEffect(() => {
  //     let mounted = true;
  //     const loadMessages = async () => {
  //       try {
  //         const {data} = await axios.get(
  //           'https://kweeble.herokuapp.com/messages/',
  //         );
  //         if (mounted) {
  //           setMessages(data);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     loadMessages();
  //     return () => {
  //       mounted = false;
  //     };
  //   }, []);

  useEffect(() => {
    console.log(messages);
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
      name: 'dimi',
      received: true,
      text: content.trim(),
      timestamp: new Date().getTime(),
    };
    console.log('message==>>>', content);
    socket.emit('send_message', message);
    setContent('');
  };

  const renderItem = ({item}) => {
    // return <Message name={name} message={item} />;

    return (
      <View
        style={{
          alignSelf: item.received == true ? 'flex-end' : 'flex-start',
        }}>
        <Text
          style={[
            styles.content,
            {
              backgroundColor:
                item.received == true ? Colors.primary : 'lightgray',
            },
          ]}>
          {item.content}
        </Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      scrollEnabled
      style={styles.keyboard}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatlist}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={text => setContent(text)}
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

export default Chat;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 5,
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

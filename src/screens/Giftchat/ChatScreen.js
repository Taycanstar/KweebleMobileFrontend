import {View, Text} from 'react-native';
import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import axios from 'axios';

const ChatScreen = props => {
  const data = useSelector(state => state.Reducers.userData);
  const name = data.name;
  const [messages, setMessages] = useState([]);
  const text = props?.route?.params?.text;
  const received = props?.route?.params?.received;
  const timestamp = props?.route?.params?.timestamp;

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  // useEffect(() => {
  //   let mounted = true;
  //   const loadMessages = async () => {
  //     try {
  //       const {data} = await axios.get(
  //         'https://kweeble.herokuapp.com/messages/',
  //       );
  //       if (mounted) {
  //         setMessages(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   loadMessages();
  //   return () => {
  //     mounted = false;
  //   };
  // }, [messages]);

  const onSend = useCallback(
    async (messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
      const {_id, createdAt, text, user} = messages[0];

      try {
        const res = await axios.post(
          'https://kweeble.herokuapp.com/messages',
          {
            name: data.name,
            timestamp: createdAt,
            text,
            received: true,
            user,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(res, '<===success! msg');
      } catch (error) {
        console.log(error);
      }
    },
    [data],
  );

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            size={32}
            color={'#2e64e5'}
            style={{marginBottom: 5, marginRight: 5}}
          />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };
  return (
    <GiftedChat
      messages={messages.reverse()}
      onSend={messages => onSend(messages)}
      user={{
        _id: data._id,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const Message = ({message, name}) => {
  return (
    <View
      style={{
        alignSelf: name == message.name ? 'flex-end' : 'flex-start',
      }}>
      <Text
        style={[
          styles.content,
          {
            backgroundColor:
              name == message.name ? Colors.primary : 'lightgray',
          },
        ]}>
        {message.text}
      </Text>
      <Text style={styles.name}>{message.name}</Text>
    </View>
  );
};

export default Message;

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
});

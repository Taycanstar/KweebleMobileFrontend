import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, text, type, bgColor, fgColor}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles[`${type}Container`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.text,
          styles[`${type}Text`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  primaryContainer: {
    backgroundColor: '#0078d7',
  },
  tertiaryContainer: {},
  primaryText: {
    fontWeight: 'bold',
    color: 'white',
  },
  tertiaryText: {
    color: 'gray',
  },

  quarternaryText: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  secondaryContainer: {
    borderColor: '#0078d7',
    borderWidth: 2,
  },
  secondaryText: {
    color: '#0078d7',
  },
  fourthText: {
    color: '#8e8e8e',
    opacity: 0.6,
  },
  fourthContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    // paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'flex-start',
  },
});

export default CustomButton;

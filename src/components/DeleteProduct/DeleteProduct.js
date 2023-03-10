import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const DeleteProduct = props => {
  const closeModal = (bool, data) => {
    props.changeModalVisible(bool);
    props.setInfo(data);
  };

  return (
    <View
      style={{backgroundColor: '#000000AA', position: 'absolute', top: 300}}>
      <Text>DeleteProduct</Text>
      <View>
        <TouchableOpacity onPress={() => closeModal(false, 'Cancel')}>
          <Text>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteProduct;

import {
  View,
  Text,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';

const deviceHeight = Dimensions.get('window').height;
const AddPopup = ({onTouchOutside, title, navigation}) => {
  const [showPop, setShowPop] = useState(true);
  //   const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [chooseInfo, setChooseInfo] = useState();

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeModal = (bool, info) => {
    changeModalVisible(bool);
    setChooseInfo(info);
  };

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end',
          }}>
          {/* <renderOutsideTouchable onTouch={onTouchOutside} /> */}

          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              paddingHorizontal: 10,
              maxHeight: deviceHeight * 0.4,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: '#182e44',
                  fontSize: 24,
                  fontWeight: '600',
                  margin: 15,
                }}>
                Add
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.pop();
                }}
                style={{paddingTop: 10}}>
                <Feather
                  name="x"
                  size={25}
                  color="black"
                  backgroundColor="white"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddEvent');
                setIsModalVisible(false);
              }}
              style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginLeft: 10,
                  marginRight: 0,
                  backgroundColor: '#eee',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 100,
                  marginBottom: 20,
                }}>
                {/* <FontAwesome name="snapchat-ghost" size={35} color="black" /> */}
                <FontAwesome
                  name="calendar-o"
                  size={22}
                  color="black"
                  backgroundColor="white"
                />
              </View>
              <Text
                style={{
                  color: '#182e44',
                  fontSize: 16,
                  fontWeight: '500',
                  margin: 15,
                }}>
                Add Event
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddProduct');
                setIsModalVisible(false);
              }}
              style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginLeft: 10,
                  marginRight: 0,
                  backgroundColor: '#eee',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 100,
                  marginBottom: 30,
                }}>
                {/* <FontAwesome name="snapchat-ghost" size={35} color="black" /> */}
                <Feather
                  name="shopping-bag"
                  size={25}
                  color="black"
                  backgroundColor="white"
                />
              </View>
              <Text
                style={{
                  color: '#182e44',
                  fontSize: 16,
                  fontWeight: '500',
                  margin: 15,
                }}>
                Add Product
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default AddPopup;

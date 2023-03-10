import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import axios from 'axios';

const EditGroupScreen = props => {
  const navigation = useNavigation();
  const {groupName, photo, members, groupId} = props?.route?.params;

  const [data, setData] = useState({
    name: '',
    groupPhoto: '',
    description: '',
  });

  const {groupPhoto, name, description} = data;

  const onDonePress = async () => {
    try {
      const res = await axios.put(
        `https://kweeble.herokuapp.com/groups/${groupId}`,
        {
          name,
          description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      navigation.goBack();

      console.log(res, '<==res from press');
    } catch (error) {
      console.log(error);
    }
  };

  const onChangePhotoPress = () => {};

  const onChangeGroupNamePress = () => {};
  const onChangeDescriptionPress = () => {};
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.nav}>
        <View style={{marginRight: 15}}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="arrow-back-ios"
            size={25}
            color={Colors.primary}
          />
        </View>
        <Text style={styles.headerText}>Edit Group</Text>

        <TouchableOpacity onPress={onDonePress}>
          <Text style={styles.addText}>Done</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          //   width: '100%',
          //   height: '100%',
          //   justifyContent: 'center',
          //   flex: 1,
          paddingTop: 20,
          alignItems: 'center',
        }}>
        <Image
          style={{
            marginRight: 8,
            width: 85,
            height: 85,
            borderRadius: 100,
          }}
          source={
            photo ? {uri: photo} : require('../../../assets/images/user.png')
          }
        />
        <TouchableOpacity onPress={onChangePhotoPress}>
          <Text style={styles.editTxt}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputC}>
        <Octicons name="people" size={25} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Group name"
          //   value={data.email}
          onPressIn={onChangeGroupNamePress}
          defaultValue={name}
          onChangeText={newText => setData({...data, name: newText})}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputC}>
        <Octicons name="pencil" size={25} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Description"
          //   value={data.email}
          onPressIn={onChangeDescriptionPress}
          defaultValue={description}
          onChangeText={newText => setData({...data, description: newText})}
          autoCapitalize="none"
        />
      </View>
    </SafeAreaView>
  );
};

export default EditGroupScreen;

const styles = StyleSheet.create({
  nav: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {color: Colors.Black, fontWeight: '600', fontSize: 17},
  addText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 17,
    paddingRight: 3,
  },
  editBtn: {
    borderColor: Colors.subtleGray,
    borderWidth: 1,
    marginHorizontal: 20,
    // flex: 1,
    justifyContent: 'center',
    borderRadius: 6,
    padding: 7,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: Colors.subtleGray,
  },
  editTxt: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 15,
    color: Colors.primary,
  },
  inputC: {
    backgroundColor: Colors.subtleGray,
    // width: '100%',
    borderColor: Colors.subtleGray,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
});

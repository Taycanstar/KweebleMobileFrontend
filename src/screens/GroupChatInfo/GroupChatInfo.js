import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HandleGroupMember from '../../components/HandleGroupMember';
import Colors from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const deviceHeight = Dimensions.get('window').height;
const GroupChatInfo = props => {
  const {groupName, photo, members, groupId, description} =
    props?.route?.params;
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadUsers = async () => {
      try {
        const {data} = await axios.get('https://kweeble.herokuapp.com/api');
        if (mounted) {
          setUsers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadUsers();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const mydata = members.map(member => {
      return users.filter(user => user._id === member);
    });
    const merged = [].concat.apply([], mydata);
    setParticipants(merged);
  }, [members, users]);

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeModal = (bool, info) => {
    changeModalVisible(bool);
  };

  const onEditPress = () => {
    navigation.navigate('EditGroup', {groupName, photo, members, groupId});
  };

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

        <Pressable onPress={onEditPress}>
          <Text style={styles.addText}>Edit</Text>
        </Pressable>
      </View>

      <ScrollView style={{backgroundColor: 'white'}}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            flex: 1,
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
          <Text
            style={{
              fontWeight: '600',
              fontSize: 24,
              marginTop: 10,
              marginBottom: 5,
            }}>
            {groupName}
          </Text>
          <Text style={{fontWeight: '400', fontSize: 16, marginBottom: 15}}>
            {description}
          </Text>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Text style={{fontWeight: '600', fontSize: 18, marginVertical: 10}}>
            Members
          </Text>
          <View
            style={{
              backgroundColor: Colors.metagray,
              marginTop: 10,
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingTop: 8,
            }}>
            {participants.map(member => {
              return (
                <View key={member._id}>
                  <TouchableOpacity
                    onPress={() => setIsModalVisible(true)}
                    key={member._id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor: 'white',
                    }}>
                    <Image
                      style={{
                        marginRight: 10,
                        width: 40,
                        height: 40,
                        borderRadius: 50 / 2,
                        marginBottom: 6,
                        marginTop: 6,
                      }}
                      source={
                        member?.photo
                          ? {uri: member?.photo}
                          : require('../../../assets/images/user.png')
                      }
                    />
                    <Text style={{fontSize: 16, fontWeight: '400'}}>
                      {member?.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.metagray,
              marginTop: 10,
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingVertical: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather
              onPress={() => navigation.goBack()}
              name="log-out"
              size={25}
              color={Colors.coolRed}
            />
            <Text style={{color: Colors.coolRed, fontSize: 16, marginLeft: 10}}>
              Leave group
            </Text>
          </TouchableOpacity>
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
                    paddingBottom: 25,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: '#182e44',
                        fontSize: 10,
                        fontWeight: '600',
                        margin: 5,
                      }}></Text>

                    <TouchableOpacity
                      onPress={() => setIsModalVisible(false)}
                      style={{paddingTop: 10}}>
                      <Feather
                        name="x"
                        size={25}
                        color="black"
                        backgroundColor="white"
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{flexDirection: 'row'}}
                      onPress={() => console.log('hi')}>
                      <Text
                        style={{
                          color: '#182e44',
                          fontSize: 16,
                          fontWeight: '500',
                          margin: 15,
                        }}>
                        Make Group Moderator
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#182e44',
                          fontSize: 16,
                          fontWeight: '500',
                          margin: 15,
                        }}>
                        Remove from Group
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupChatInfo;

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
  headerText: {color: Colors.Black, fontWeight: 'bold', fontSize: 17},
  addText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 17,
    paddingRight: 3,
  },
});

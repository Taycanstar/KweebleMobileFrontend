import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

const deviceHeight = Dimensions.get('window').height;
const CreateScopeScreen = () => {
  const navigation = useNavigation();
  const [scopeName, setScopeName] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [scopeType, setScopeType] = useState('Public');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const data = useSelector(state => state.Reducers.userData);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeModal = (bool, info) => {
    changeModalVisible(bool);
  };

  const onPublicPress = () => {
    setScopeType('Public');
    setIsModalVisible(false);
  };

  const onPrivatePress = () => {
    setScopeType('Private');
    setIsModalVisible(false);
  };

  const onRestrictedPress = () => {
    setScopeType('Restricted');
    setIsModalVisible(false);
  };

  const clearForm = () => {
    setScopeName('');
    setScopeType('Public');
  };

  const onCancelPress = () => {
    clearForm();
    navigation.navigate('HomeScreen');
  };

  const onCreatePress = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://kweeble.herokuapp.com/scopes/newScope',
        // 'http://localhost:3000/scopes/newScope',
        {
          name: scopeName,
          membership: scopeType,
          members: [data],
          isScope: true,
          info: '',
          moderators: [data],
          photo: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (res.data.message) {
        const resScope = res.data.scope;
        const response = await axios.put(
          `https://kweeble.herokuapp.com/auth/${data._id}`,
          // `http://localhost:3000/auth/${data._id}`,
          {
            id: data._id,
            scope: resScope,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } else {
        console.log('unsuccessful');
      }

      navigation.navigate('HomeScreen');
      clearForm();
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMsg(error.response.data.error);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(function () {
        setError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          //   backgroundColor: 'gray',
          paddingVertical: 8,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 16,
              // margin: 15,
              marginLeft: 5,
              //   marginTop: 15,
            }}>
            Cancel
          </Text>
        </Pressable>

        <Text
          style={{
            color: '#182e44',
            fontSize: 18,
            fontWeight: '600',
            // marginTop: 10,
          }}>
          Create Scope
        </Text>

        <Pressable onPress={onCreatePress}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 16,
              // margin: 15,
              marginLeft: 5,
              //   marginTop: 15,
              fontWeight: '400',
            }}>
            Create
          </Text>
        </Pressable>
      </View>
      <View style={styles.nameView}>
        <Text>Scope name</Text>
        <View
          style={[
            styles.inputC,
            {
              // borderColor: isFocus ? Colors.primary : Colors.subtleGray,
              borderWidth: error ? 1 : 0,
              borderColor: error ? Colors.coolRed : Colors.subtleGray,
            },
          ]}>
          <TextInput
            style={styles.input}
            placeholder="Scope_name"
            value={scopeName}
            onChangeText={newText => setScopeName(newText)}
            autoCapitalize="none"
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={Colors.redditPlaceholder}
          />
        </View>
        {error && (
          <View style={{paddingHorizontal: 10, paddingVertical: 2}}>
            <Text style={{color: Colors.coolRed, fontWeight: '500'}}>
              {errorMsg}
            </Text>
          </View>
        )}
      </View>
      <Pressable
        onPress={() => setIsModalVisible(true)}
        style={styles.typeView}>
        <Text>Membership type</Text>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <Text style={{fontSize: 18, fontWeight: '600', paddingTop: 4}}>
            {scopeType}
          </Text>
          <View
            style={{
              flex: 1,
            }}>
            <MaterialIcons name="arrow-drop-down" size={30} color="black" />
            {/* <Text></Text>
            <Text></Text> */}
          </View>
        </View>
      </Pressable>
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
                <Text>{'        '}</Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    textAlign: 'center',
                    fontWeight: '600',
                    margin: 5,
                    paddingTop: 5,
                  }}>
                  Membership type
                </Text>

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
                  //   alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={onPublicPress}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    marginBottom: 15,
                  }}>
                  <MaterialIcons name="public" size={25} color="black" />
                  <View style={{marginLeft: 15}}>
                    <Text
                      style={{
                        color: '#182e44',
                        fontSize: 16,
                        fontWeight: '500',
                        marginTop: 15,
                      }}>
                      Public
                    </Text>
                    <Text style={{fontSize: 13}}>
                      Anyone can view, but only approved members can post, and
                      interact with the scope
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={onRestrictedPress}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    marginBottom: 15,
                  }}>
                  <Feather name="lock" size={25} color="black" />
                  <View style={{marginLeft: 15, marginRight: 6}}>
                    <Text
                      style={{
                        color: '#182e44',
                        fontSize: 16,
                        fontWeight: '500',
                        marginTop: 15,
                      }}>
                      Restricted
                    </Text>
                    <Text style={{fontSize: 13}}>
                      Anyone can view, but only approved members can post, and
                      interact with the scope
                    </Text>
                  </View>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={onPrivatePress}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    marginBottom: 15,
                  }}>
                  <MaterialIcons name="security" size={25} color="black" />
                  <View style={{marginLeft: 15, marginRight: 10}}>
                    <Text
                      style={{
                        color: '#182e44',
                        fontSize: 16,
                        fontWeight: '500',
                        marginTop: 15,
                      }}>
                      Private
                    </Text>
                    <Text style={{fontSize: 13}}>
                      Only approved members can view, post, and interact with
                      the scope
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CreateScopeScreen;

const styles = StyleSheet.create({
  nameView: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  typeView: {
    paddingHorizontal: 15,
    marginTop: 15,
  },

  inputC: {
    backgroundColor: Colors.redditbgGray,
    // borderWidth: 1,
    // borderColor: Colors.subtleGray,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    paddingVertical: 15,
    borderRadius: 10,
    marginLeft: 10,
    fontSize: 16,
    width: '100%',
  },
});

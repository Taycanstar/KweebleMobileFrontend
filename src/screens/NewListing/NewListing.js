import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import SelectMultiple from 'react-native-select-multiple';
import CategoriesPopup from '../../components/CategoriesPopup';
import ConditionPopup from '../../components/ConditionPopup';
import ScopesPopup from '../../components/ScopesPopup';
import MultiSelect from 'react-native-multiple-select';
import {useDispatch, useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {
  FacebookLoader,
  InstagramLoader,
} from 'react-native-easy-content-loader';

const NewListing = () => {
  const navigation = useNavigation();

  const [select, setSelect] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isScopeVisible, setIsScopeVisible] = useState(false);
  const [isConditionVisible, setIsConditionVisible] = useState(false);
  const [chooseData, setChooseData] = useState();
  const me = useSelector(state => state.Reducers.userData);
  const [isFocus, setIsFocus] = useState(false);
  const [isTitleFocus, setIsTitleFocus] = useState(false);
  const [isDescFocus, setIsDescFocus] = useState(false);
  const [scName, setScName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scopes, setScopes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isMediaLoading, setIsMediaLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [error, setError] = useState(false);

  const [data, setData] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    scope: '',
    description: '',
    seller: me,
    photos: '',
    sellerPhoto: me.photo,
    sellerUsername: me.username,
    sellerName: me.name,
    sellerMajor: me.major,
    sellerGradeLevel: me.gradeLevel,
    isSold: false,
  });
  const {
    title,
    price,
    category,
    condition,
    scope,
    description,
    photos,
    seller,
    sellerPhoto,
    sellerUsername,
    sellerName,
    sellerGradeLevel,
    sellerMajor,
    isSold,
  } = data;

  useEffect(() => {
    let mounted = true;
    const loadScopes = async () => {
      try {
        const {data} = await axios.get('https://kweeble.herokuapp.com/scopes/');
        if (mounted) {
          setScopes(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadScopes();
    // const interval = setInterval(() => {
    //   loadScopes();
    // }, 2000);
    return () => {
      mounted = false;

      // clearInterval(interval);
    };
  }, [refresh]);

  const pullMe = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  useEffect(() => {
    const ref = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action

      setRefresh(true);

      setTimeout(() => {
        setRefresh(false);
      }, 500);
    });
    return ref;
  }, [navigation]);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const handleTitleFocus = () => {
    setIsTitleFocus(true);
  };

  const handleTitleBlur = () => {
    setIsTitleFocus(false);
  };

  const handleDescFocus = () => {
    setIsDescFocus(true);
  };

  const handleDescBlur = () => {
    setIsDescFocus(false);
  };

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeModal = (bool, info) => {
    changeModalVisible(bool);
    setChooseData(info);
  };

  const changeConditionVisible = bool => {
    setIsConditionVisible(bool);
  };

  const changeScopeVisible = bool => {
    setIsScopeVisible(bool);
  };

  const closeCondition = (bool, info) => {
    changeConditionVisible(bool);
    setChooseData(info);
  };

  const clearForm = () => {
    setData({
      title: '',
      price: '',
      category: '',
      condition: '',
      scope: '',
      description: '',
      seller: '',
      photos: '',
      isSold: false,
      scopeName: '',
    });
    setIsLoading(false);
    setIsMediaLoading(false);
  };

  const openPicker = () => {
    try {
      ImagePicker.openPicker({
        multiple: true,
        maxFiles: 10,
      }).then(async images => {
        setIsMediaLoading(true);
        const formData = new FormData();

        for await (const image of images) {
          formData.append('image', {
            uri: image.path,
            type: image.mime,
            name: image.filename,
          });
        }

        let res = await fetch('https://kweeble.herokuapp.com/products/image', {
          method: 'post',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        });
        let responseJson = await res.json();
        console.log('response', responseJson);
        // console.log(res);
        setIsMediaLoading(false);

        // setData({...data, photos: responseJson.images});
        setData({...data, photos: responseJson});
      });
    } catch (error) {
      console.log(error);
      setIsMediaLoading(false);
    }
  };

  const onPublishPress = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setData({...data});
      let token = await AsyncStorage.getItem('token', token);
      const res = await axios.post(
        'https://kweeble.herokuapp.com/products',
        {
          title,
          description,
          photos,
          category,
          price,
          condition,
          scope,
          seller,
          sellerPhoto,
          sellerUsername,
          sellerName,
          sellerGradeLevel,
          sellerMajor,
          isSold,
          interested: false,
          users: [{id: me}],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, '<===success!');
      clearForm();

      navigation.navigate('Marketplace');
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setErrorMsg(error.response.data.error);
      setError(true);
      setIsLoading(false);
    }
  };

  const myScopes = scopes.filter(item => {
    return item.members.indexOf(me._id) >= 0;
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {isLoading ? (
        <InstagramLoader active />
      ) : (
        <>
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
              New Listing
            </Text>

            <Pressable onPress={onPublishPress}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 16,
                  // margin: 15,
                  marginLeft: 5,
                  //   marginTop: 15,
                  fontWeight: '400',
                }}>
                Publish
              </Text>
            </Pressable>
          </View>
          <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 15}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => pullMe()}
                />
              }>
              <View style={styles.innerContainer}>
                <Image
                  style={{
                    marginRight: 15,
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                    marginBottom: 10,
                  }}
                  source={
                    me.photo
                      ? {uri: me.photo}
                      : require('../../../assets/images/user.png')
                  }
                />

                <View style={styles.userInfo}>
                  <Text style={styles.name}>{me.name}</Text>
                  <View flexDirection="row">
                    <Text style={{color: 'rgb(135,135,139)'}}>
                      Listing on Marketplace •{' '}
                    </Text>
                    <MaterialCommunityIcons
                      name="shopping-outline"
                      size={16}
                      color="rgb(135,135,139)"
                    />
                  </View>
                </View>
              </View>
              <View>
                {photos === '' || photos.length === 0 ? (
                  <>
                    {isMediaLoading ? (
                      <View
                        style={{
                          marginBottom: 5,
                          height: 100,
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <ActivityIndicator
                          size="small"
                          color={Colors.primary}
                        />
                      </View>
                    ) : (
                      <Pressable
                        onPress={openPicker}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          borderWidth: 1,
                          borderColor: Colors.borderGray,
                          borderRadius: 7,
                          height: 100,
                          width: '100%',
                        }}>
                        <MaterialCommunityIcons
                          name="plus-box-multiple"
                          size={40}
                          color="rgb(135,135,139)"
                        />
                        <Text
                          style={{
                            color: 'rgb(135,135,139)',
                            fontWeight: '500',
                            marginLeft: 5,
                            fontSize: 16,
                          }}>
                          Add Photos
                        </Text>
                      </Pressable>
                    )}
                  </>
                ) : (
                  <>
                    {isMediaLoading ? (
                      <View style={{marginBottom: 5}}>
                        <ActivityIndicator
                          size="small"
                          color={Colors.primary}
                        />
                      </View>
                    ) : (
                      <>
                        {photos.length > 0 ? (
                          <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            <View
                              style={{
                                flexDirection: 'row',
                                overflow: 'scroll',
                              }}>
                              {photos.map((photo, index) => {
                                return (
                                  <View key={`id${index}`}>
                                    <ImageBackground
                                      style={{
                                        width: 100,
                                        height: 100,

                                        marginRight: 5,
                                      }}
                                      imageStyle={{borderRadius: 8}}
                                      source={{uri: photo}}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          photos.splice(index, 1);
                                          setData({...data});
                                        }}
                                        style={{
                                          backgroundColor: 'rgba(0,0,0,0.3)',
                                          borderRadius: 100,
                                          height: 25,
                                          width: 25,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          marginLeft: 5,
                                          marginTop: 5,
                                        }}>
                                        <Ionicons
                                          name="ios-close"
                                          size={18}
                                          color="white"
                                        />
                                      </TouchableOpacity>
                                    </ImageBackground>
                                  </View>
                                );
                              })}
                              <Pressable
                                onPress={openPicker}
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  borderWidth: 1,
                                  borderColor: Colors.borderGray,
                                  borderRadius: 7,
                                  height: 100,
                                  width: 150,
                                }}>
                                <MaterialCommunityIcons
                                  name="plus-box-multiple"
                                  size={25}
                                  color="rgb(135,135,139)"
                                />
                                <Text
                                  style={{
                                    color: 'rgb(135,135,139)',
                                    fontWeight: '500',
                                    marginLeft: 5,
                                    fontSize: 14,
                                  }}>
                                  Add Photos
                                </Text>
                              </Pressable>
                            </View>
                          </ScrollView>
                        ) : (
                          <Text>hello</Text>
                        )}
                      </>
                    )}
                  </>
                )}

                <Text
                  style={{
                    color: 'rgb(135,135,139)',
                    fontWeight: '500',
                    marginTop: 5,
                    marginBottom: 10,
                  }}>
                  {`Photos: ${photos.length}/10 Choose your listing's main photo first`}
                </Text>
              </View>

              {error && (
                <View style={{paddingHorizontal: 0, paddingVertical: 2}}>
                  <Text style={{color: Colors.coolRed, fontWeight: '500'}}>
                    {errorMsg}
                  </Text>
                </View>
              )}
              <View
                style={[
                  styles.inputC,
                  {
                    borderColor: isTitleFocus
                      ? Colors.primary
                      : Colors.borderGray,
                  },
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={title}
                  //   onPressIn={onChangeDescriptionPress}
                  defaultValue={description}
                  onChangeText={newText => setData({...data, title: newText})}
                  autoCapitalize="none"
                  onFocus={handleTitleFocus}
                  onBlur={handleTitleBlur}
                  placeholderTextColor={Colors.coolGray}
                />
              </View>
              <View
                style={[
                  styles.inputC,
                  {borderColor: isFocus ? Colors.primary : Colors.borderGray},
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  value={price}
                  //   onPressIn={onChangeDescriptionPress}
                  defaultValue={description}
                  onChangeText={newText => setData({...data, price: newText})}
                  autoCapitalize="none"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholderTextColor={Colors.coolGray}
                />
              </View>

              <Pressable
                style={styles.inputH}
                onPress={() => changeModalVisible(true)}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    color:
                      category === '' || category === 'Category'
                        ? Colors.coolGray
                        : 'black',
                    // opacity:
                    // category === '' || category === 'Category' ? 0.6 : 1,
                  }}>
                  {category === '' ? 'Category' : category}
                </Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={40}
                  color="rgb(135,135,139)"
                />
              </Pressable>
              <Pressable
                style={styles.inputH}
                onPress={() => changeConditionVisible(true)}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    color:
                      condition === '' || condition === 'Condition'
                        ? Colors.coolGray
                        : 'black',
                    // opacity:
                    // condition === '' || condition === 'Condition' ? 0.6 : 1,
                  }}>
                  {condition === '' ? 'Condition' : condition}
                </Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={40}
                  color="rgb(135,135,139)"
                />
              </Pressable>
              <Pressable
                style={styles.inputH}
                onPress={() => changeScopeVisible(true)}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    color:
                      scope === '' || scope === 'Select Scope'
                        ? Colors.coolGray
                        : 'black',
                    // opacity: scope === '' || scope === 'Select Scope' ? 0.6 : 1,
                  }}>
                  {scope === '' ? 'Select Scope' : scName}
                </Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={40}
                  color="rgb(135,135,139)"
                />
              </Pressable>
              <View
                style={[
                  styles.inputC,
                  {
                    borderColor: isDescFocus
                      ? Colors.primary
                      : Colors.borderGray,
                    paddingTop: 10,
                  },
                ]}>
                <TextInput
                  multiline={true}
                  style={styles.input}
                  placeholder="Description"
                  value={description}
                  placeholderTextColor={Colors.coolGray}
                  //   onPressIn={onChangeDescriptionPress}
                  defaultValue={description}
                  onChangeText={newText =>
                    setData({...data, description: newText})
                  }
                  autoCapitalize="none"
                  onFocus={handleDescFocus}
                  onBlur={handleDescBlur}
                />
              </View>
              <View style={{width: '100%', height: 590}} />
            </ScrollView>
            <Modal
              visible={isModalVisible}
              transparent
              animationType="slide"
              onRequestClose={() => changeModalVisible(false)}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setIsModalVisible(false)}
                activeOpacity={1}>
                <CategoriesPopup
                  changeModalVisible={changeModalVisible}
                  setCategory={e => setData({...data, category: e})}
                />
              </TouchableOpacity>
            </Modal>
            {/* <Modal
              visible={isScopeVisible}
              transparent
              animationType="slide"
              onRequestClose={() => changeScopeVisible(false)}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setIsModalVisible(false)}
                activeOpacity={1}>
                <ScopesPopup
                  changeScopeVisible={changeScopeVisible}
                  setScope={e => setScName(e)}
                  setId={e => setData({...data, scope: e})}
                />
              </TouchableOpacity>
            </Modal> */}
            <Modal
              visible={isConditionVisible}
              transparent
              animationType="slide"
              onRequestClose={() => changeConditionVisible(false)}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setIsModalVisible(false)}
                activeOpacity={1}>
                <ConditionPopup
                  changeConditionVisible={changeConditionVisible}
                  setCondition={e => setData({...data, condition: e})}
                />
              </TouchableOpacity>
            </Modal>
          </View>
        </>
      )}

      <TouchableWithoutFeedback onPress={() => changeScopeVisible(false)}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={isScopeVisible}
          onRequestClose={() => changeScopeVisible(false)}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => changeScopeVisible(false)}
            style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#000000AA',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  paddingHorizontal: 16,
                  // maxHeight: deviceHeight * 0.4,
                  paddingBottom: 12,
                  marginTop: 60,
                  height: '100%',
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
                    Select scope
                  </Text>

                  <TouchableOpacity
                    onPress={() => setIsScopeVisible(false)}
                    style={{paddingTop: 10}}>
                    <Feather
                      name="x"
                      size={25}
                      color="black"
                      backgroundColor="white"
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      paddingBottom: 70,
                    }}>
                    {myScopes?.map(sc => {
                      return (
                        <View key={sc?._id}>
                          <ScrollView>
                            <TouchableOpacity
                              onPress={() => {
                                setScName(sc?.name);
                                setData({...data, scope: sc._id});
                                setIsScopeVisible(false);
                                console.log('hi');
                              }}
                              key={sc?.id}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 3,
                                marginBottom: 8,
                                height: '100%',
                              }}>
                              <Image
                                source={
                                  sc?.photo
                                    ? {uri: sc?.photo}
                                    : require('../../../assets/images/logo3.jpg')
                                }
                                style={{
                                  width: 35,
                                  height: 35,
                                  borderRadius: 100,
                                  borderWidth: 0,
                                }}
                              />
                              <View
                                style={{
                                  marginLeft: 15,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: '#182e44',
                                    fontSize: 16,
                                    fontWeight: '600',
                                  }}>
                                  {sc?.name}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </ScrollView>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default NewListing;

const styles = StyleSheet.create({
  nav: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {color: Colors.Black, fontWeight: '700', fontSize: 24},
  addText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 17,
    paddingRight: 3,
  },

  subh: {
    backgroundColor: Colors.subtleGray,
    borderRadius: 50,
    flexDirection: 'row',
    width: 175,
    paddingVertical: 7,
    justifyContent: 'center',
  },
  subTxt: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 5,
  },
  inputC: {
    backgroundColor: 'white',
    // width: '100%',
    borderWidth: 1,
    borderColor: Colors.borderGray,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    // marginHorizontal: 10,
    // marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    paddingVertical: 15,
    borderRadius: 5,
    marginLeft: 10,
    fontSize: 16,
    width: '100%',
  },
  inputH: {
    backgroundColor: 'white',
    // width: '100%',
    borderWidth: 1,
    borderColor: Colors.borderGray,
    paddingHorizontal: 10,
    // marginVertical: 5,
    borderRadius: 5,
    // marginHorizontal: 10,
    // marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
  },
  username: {
    color: Colors.metaIcon,
  },
  innerContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
});

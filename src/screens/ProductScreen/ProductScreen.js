import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TextInput,
  Modal,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import SelectMultiple from 'react-native-select-multiple';
import CategoriesPopup from '../../components/CategoriesPopup';
import ConditionPopup from '../../components/ConditionPopup';
import MultiSelect from 'react-native-multiple-select';
import {useDispatch, useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import DeleteProduct from '../../components/DeleteProduct/';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ProductScreen = props => {
  const navigation = useNavigation();
  const [imgActive, setImgActive] = useState(0);
  const [select, setSelect] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConditionVisible, setIsConditionVisible] = useState(false);
  const [chooseData, setChooseData] = useState();
  const me = useSelector(state => state.Reducers.userData);
  const [myUser, setMyUser] = useState('');
  const [myUserArray, setMyUserArray] = useState([]);
  const [status, setStatus] = useState(false);
  const [indicator, setIndicator] = useState(0);
  const [indicator2, setIndicator2] = useState(0);
  const [chooseInfo, setChooseInfo] = useState();
  const [apiUsers, setApiUsers] = useState([]);
  const [litMe, setLitMe] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  // const [interest, setInterest] = useState('');

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeModal = (bool, info) => {
    changeModalVisible(bool);
    setChooseInfo(info);
  };

  const {
    title,
    seller,
    sellerPhoto,
    sellerUsername,
    sellerName,
    sellerGradeLevel,
    sellerMajor,
    condition,
    description,
    price,
    photos,
    isSold,
    id,
    users,
  } = props?.route?.params.product;

  const pullMe = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  useEffect(() => {
    let mounted = true;
    const loadUsers = async () => {
      try {
        const {data} = await axios.get('https://kweeble.herokuapp.com/api');
        if (mounted) {
          setApiUsers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadUsers();

    const interval = setInterval(() => {
      loadUsers();
    }, 3000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const [interest, setInterest] = useState(
    users?.find(o => o?.id === me._id) === undefined
      ? false
      : users?.find(o => o?.id === me._id).interested,
  );

  useEffect(() => {
    // console.log(data.users);
    const myArray = apiUsers?.filter(user => user.id == me._id);
    const myUs = apiUsers?.filter(user => user.id == me._id)[0];
    setMyUserArray(myArray);
    setMyUser(myUs);

    if (myArray?.length > 0) {
      setStatus(true);
    } else {
      setStatus(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== imgActive) {
        setImgActive(slide);
      }
    }
  };

  const onPhotoPress = () => {};

  const onShowInterestPress = async () => {
    if (interest === false) {
      setInterest(true);
      try {
        const response = await axios.post(
          `https://kweeble.herokuapp.com/notifications/new`,
          // `http://localhost:3000/events/${props.going}`,
          {
            text: `is interested in your product "${title}" Get his info on his kweeble profile.`,
            type: 'product',
            typeId: id,
            to: seller,
            from: me._id,
            photo: photos[0],
            seen: false,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const res = await axios.put(
          `https://kweeble.herokuapp.com/products/${id}`,
          // `http://localhost:3000/events/${props.going}`,
          {
            id: me._id,
            interested: true,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        setIndicator(1);

        console.log(res, '<== res interested true');
      } catch (error) {
        console.log(error);
        setInterest(false);
      }
    } else {
      setInterest(false);
      try {
        const res = await axios.delete(
          `https://kweeble.herokuapp.com/notifications/del/${id}`,
          // `http://localhost:3000/notifications/del/${typeId}`,
          {typeId: id},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const response = await axios.put(
          `https://kweeble.herokuapp.com/products/${id}`,
          // `http://localhost:3000/events/${props.going}`,
          {
            id: me._id,
            interested: false,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        console.log(response, 'interested false');
        setIndicator(1);
      } catch (error) {
        console.log(error);
        setInterest(true);
      }
    }
  };

  const onDelete = async () => {
    try {
      const res = await axios.delete(
        `https://kweeble.herokuapp.com/products/${id}`,
        {id},

        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setIsModalVisible(false);
      navigation.goBack();
      console.log(res, 'product deleted');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadDimi = async () => {
      if (mounted) {
        const y = apiUsers.filter(u => u._id === me._id)[0];
        await setLitMe(y);
      }
    };

    loadDimi();

    const interval = setInterval(() => {
      loadDimi();
    }, 1000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, indicator2]);

  useEffect(() => {
    const ref = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action

      setRefresh(true);

      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    });

    return ref;
  }, [navigation]);

  const onSave = async () => {
    setIsSaved(true);
    try {
      const response = await axios.put(
        `https://kweeble.herokuapp.com/auth/products/${me._id}`,
        // `http://localhost:3000/auth/${data._id}`,
        {
          id: me._id,
          product: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setIndicator2(1);
      console.log(response, 'res');
    } catch (error) {
      console.log(error);
      setIsSaved(false);
    }
  };

  const onUnsave = async () => {
    setIsSaved(false);
    try {
      const resp = await axios.put(
        `https://kweeble.herokuapp.com/auth/products/del/${me._id}`,
        // `http://localhost:3000/scopes/del/${data._id}`,
        {
          id: me._id,
          product: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setIndicator2(1);
    } catch (error) {
      console.log(error);
      setIsSaved(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          backgroundColor: 'white',
          paddingTop: 5,
          paddingBottom: 5,
        }}>
        <TouchableOpacity
          style={{borderRadius: 100}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="ios-close" size={25} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            color: '#182e44',
            fontSize: 18,
            fontWeight: '600',
            // marginTop: 10,
          }}>
          {title}
        </Text>

        <TouchableOpacity style={{marginRight: 10}}>
          <Entypo name="dots-three-horizontal" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{paddingBottom: 50}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
          }>
          <View style={{width: WIDTH, height: HEIGHT * 0.55}}>
            <ScrollView
              onScroll={({nativeEvent}) => onChange(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              pagingEnabled
              horizontal
              style={{width: WIDTH, height: HEIGHT * 0.55}}>
              {photos?.map((e, index) => {
                return (
                  <View key={index}>
                    <Image
                      key={e}
                      // resizeMode="contain"
                      style={{width: WIDTH, height: HEIGHT * 0.55}}
                      source={{uri: e}}
                    />
                  </View>
                );
              })}
            </ScrollView>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              {photos?.map((e, index) => (
                <View key={index}>
                  <Text
                    style={imgActive == index ? styles.dotActive : styles.dot}>
                    ●
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 5,
              }}>
              {/* {indicator === 0 ? (
                litMe?.savedProducts?.filter(p => p === id)[0] === undefined ? (
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={async () => {
                        try {
                          const response = await axios.put(
                            `https://kweeble.herokuapp.com/auth/products/${me._id}`,
                            // `http://localhost:3000/auth/${data._id}`,
                            {
                              id: me._id,
                              product: id,
                            },
                            {
                              headers: {
                                'Content-Type': 'application/json',
                              },
                            },
                          );
                          setIsSaved(true);
                          setIndicator2(1);
                          console.log(response, 'res');
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 45,
                        height: 45,
                        marginBottom: 5,
                        borderRadius: 100,

                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Ionicons
                        name="bookmark-outline"
                        size={25}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 13,
                        fontWeight: '500',
                      }}>
                      Save
                    </Text>
                  </View>
                ) : (
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={async () => {
                        try {
                          const resp = await axios.put(
                            `https://kweeble.herokuapp.com/auth/products/del/${me._id}`,
                            // `http://localhost:3000/scopes/del/${data._id}`,
                            {
                              id: me._id,
                              product: id,
                            },
                            {
                              headers: {
                                'Content-Type': 'application/json',
                              },
                            },
                          );
                          setIsSaved(false);
                          setIndicator2(1);
                          console.log(resp, 'del');
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 45,
                        height: 45,
                        marginBottom: 5,
                        borderRadius: 100,

                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Ionicons name="ios-bookmark" size={25} color="black" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 13,
                        fontWeight: '500',
                      }}>
                      Saved
                    </Text>
                  </View>
                )
              ) : isSaved === false ? (
                <View style={{alignItems: 'center', width: 85}}>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        const response = await axios.put(
                          `https://kweeble.herokuapp.com/auth/products/${me._id}`,
                          // `http://localhost:3000/auth/${data._id}`,
                          {
                            id: me._id,
                            product: id,
                          },
                          {
                            headers: {
                              'Content-Type': 'application/json',
                            },
                          },
                        );
                        setIsSaved(true);

                        console.log(response, 'res');
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    style={{
                      // marginRight: 10,
                      backgroundColor: Colors.subtleGray,
                      width: 45,
                      height: 45,
                      marginBottom: 5,
                      borderRadius: 100,

                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Ionicons name="bookmark-outline" size={25} color="black" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 13,
                      fontWeight: '500',
                    }}>
                    Save
                  </Text>
                </View>
              ) : (
                <View style={{alignItems: 'center', width: 85}}>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        const resp = await axios.put(
                          `https://kweeble.herokuapp.com/auth/products/del/${me._id}`,
                          // `http://localhost:3000/scopes/del/${data._id}`,
                          {
                            id: me._id,
                            product: id,
                          },
                          {
                            headers: {
                              'Content-Type': 'application/json',
                            },
                          },
                        );
                        setIsSaved(false);
                        console.log(resp, 'del');
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    style={{
                      // marginRight: 10,
                      backgroundColor: Colors.subtleGray,
                      width: 45,
                      height: 45,
                      marginBottom: 5,
                      borderRadius: 100,

                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Ionicons name="ios-bookmark" size={25} color="black" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 13,
                      fontWeight: '500',
                    }}>
                    Saved
                  </Text>
                </View>
              )} */}
              <View style={{alignItems: 'center', width: 85}}>
                <TouchableOpacity
                  onPress={
                    indicator2 === 0
                      ? litMe?.savedProducts?.filter(p => p === id)[0] !==
                        undefined
                        ? onUnsave
                        : onSave
                      : isSaved === true
                      ? onUnsave
                      : onSave
                  }
                  style={{
                    // marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    width: 45,
                    height: 45,
                    marginBottom: 5,
                    borderRadius: 100,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Ionicons
                    name={
                      indicator2 === 0
                        ? litMe?.savedProducts?.filter(p => p === id)[0] !==
                          undefined
                          ? 'bookmark'
                          : 'bookmark-outline'
                        : isSaved === true
                        ? 'bookmark'
                        : 'bookmark-outline'
                    }
                    size={25}
                    color="black"
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 13,
                    fontWeight: '500',
                  }}>
                  {indicator2 === 0
                    ? litMe?.savedProducts?.filter(p => p === id)[0] !==
                      undefined
                      ? 'Saved'
                      : 'Save'
                    : isSaved === true
                    ? 'Saved'
                    : 'Save'}
                </Text>
              </View>

              <View style={{alignItems: 'center', width: 85}}>
                <TouchableOpacity
                  onPress={onShowInterestPress}
                  style={{
                    // marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    width: 45,
                    height: 45,
                    marginBottom: 5,
                    borderRadius: 100,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="hand-coin"
                    size={25}
                    color={
                      indicator === 0
                        ? users?.find(o => o?.id == me._id)?.interested === true
                          ? Colors.primary
                          : 'black'
                        : interest === true
                        ? Colors.primary
                        : 'black'
                    }
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 13,
                    fontWeight: '500',
                    color:
                      indicator === 0
                        ? users?.find(o => o?.id == me._id)?.interested === true
                          ? Colors.primary
                          : 'black'
                        : interest === true
                        ? Colors.primary
                        : 'black',
                  }}>
                  {indicator === 0
                    ? users?.find(o => o?.id == me._id)?.interested === true
                      ? 'Interested'
                      : 'Show interest'
                    : interest === true
                    ? 'Interested'
                    : 'Show interest'}
                </Text>
              </View>
            </View>
            <View style={styles.innerContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={onPhotoPress}>
                  <Image
                    style={{
                      marginRight: 15,
                      width: 50,
                      height: 50,
                      borderRadius: 50 / 2,
                      marginBottom: 10,
                    }}
                    source={
                      sellerPhoto
                        ? {uri: sellerPhoto}
                        : require('../../../assets/images/user.png')
                    }
                  />
                </TouchableOpacity>

                <View style={styles.userInfo}>
                  <Text style={styles.name}>{sellerName}</Text>
                  <View flexDirection="row">
                    <Text style={{color: 'rgb(135,135,139)'}}>
                      {sellerGradeLevel} • {sellerMajor}
                    </Text>
                  </View>
                </View>
              </View>
              {/* <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() =>
                  navigation.navigate('Messages', {
                    screen: 'Dm',
                    params: {
                      itemId: currUser[0]?._id,
                      msgName: currUser[0]?.name,
                    },
                  })
                }>
                <Ionicons name="chatbubble-outline" size={30} color="black" />
              </TouchableOpacity> */}
            </View>

            <View style={{paddingTop: 10, paddingBottom: 10}}>
              <Text style={{fontWeight: 'bold', fontSize: 19}}>Details</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 10,
                  paddingTop: 15,
                  // borderBottomWidth: 1,
                  borderColor: Colors.subtleGray,
                }}>
                <Text style={{fontSize: 15, fontWeight: '500'}}>Condition</Text>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'gray'}}>
                  {condition}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 25,
                  paddingTop: 15,
                  borderBottomWidth: 1,
                  borderColor: Colors.subtleGray,
                }}>
                <Text style={{fontSize: 15, fontWeight: '500'}}>Price</Text>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'gray'}}>
                  ${price}
                </Text>
              </View>
              <View style={{paddingTop: 15}}>
                <Text style={{fontWeight: 'bold', fontSize: 19}}>
                  Description
                </Text>
                <Text style={{marginTop: 15, fontSize: 15, fontWeight: '400'}}>
                  {description}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'flex-end',
              }}>
              {seller === me._id ? (
                <TouchableOpacity
                  onPress={() => changeModalVisible(true)}
                  style={{
                    marginTop: 20,
                    // backgroundColor: Colors.strongRed,
                    backgroundColor: Colors.subtleGray,
                    paddingVertical: 10,
                    // maxWidth: '100%',
                    width: '40%',

                    borderRadius: 100,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: Colors.strongRed,
                      fontWeight: 'bold',
                    }}>
                    Delete Product
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <Modal
              visible={isModalVisible}
              transparent
              animationType="none"
              onRequestClose={() => changeModalVisible(false)}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  zIndex: 6,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    // backgroundColor: 'rgba(81,81,81, 0.99)',
                    backgroundColor: 'rgba(50,50,50, 0.99)',
                    width: 300,
                    height: 150,
                    borderRadius: 10,
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      paddingBottom: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: 'gray',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: 18,
                        textAlign: 'center',
                      }}>
                      Delete Product
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        paddingHorizontal: 10,
                      }}>
                      Are you sure you want to delete this product?
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      width: '100%',
                      paddingTop: 15,
                      // height: '50%',
                      // alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                      }}
                      onPress={() => closeModal(false, 'Cancel')}>
                      <Text
                        style={{
                          color: '#1982fc',
                          fontSize: 18,
                          fontWeight: '700',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onDelete} style={{opacity: 1}}>
                      <Text
                        style={{
                          color: Colors.strongRed,
                          fontSize: 18,
                          fontWeight: '700',
                        }}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    zIndex: -10,
                    flex: 1,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    opacity: 0.2,
                    backgroundColor: 'black',
                    width: WIDTH,
                    height: HEIGHT,
                  }}
                />
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;

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
    justifyContent: 'space-between',
  },
  dotActive: {
    margin: 3,
    color: 'white',
  },
  dot: {
    margin: 3,
    color: 'white',
    opacity: 0.5,
  },
});

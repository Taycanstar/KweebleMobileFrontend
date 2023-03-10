import {
  View,
  Text,
  Dimensions,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchCardPop from '../../components/SearchCardPop';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import SelectMultiple from 'react-native-select-multiple';
import {useNavigation} from '@react-navigation/native';

const deviceHeight = Dimensions.get('window').height;
const CategoriesPopup = props => {
  const [showPop, setShowPop] = useState(true);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chooseInfo, setChooseInfo] = useState();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeModal = (bool, data) => {
    props.changeModalVisible(bool);
    props.setCategory(data);
  };

  const onChange = e => {
    setQuery(e);
    fetch(`https://kweeble.herokuapp.com/api`)
      .then(res => res.json())
      .then(data => {
        if (!data.errors) {
          setResults(data);
        } else {
          setResults([]);
        }
      });
  };

  return (
    <View style={{height: '100%', flex: 1}}>
      <TouchableOpacity
        onPress={() => closeModal(false, 'Category')}
        style={{
          // flex: 1,
          height: '100%',
          // paddingTop: 60,
          width: '100%',
          backgroundColor: '#000000AA',
          // justifyContent: 'flex-start',
        }}>
        <TouchableWithoutFeedback>
          <View
            style={{
              marginTop: 60,
              backgroundColor: '#fff',
              width: '100%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              paddingHorizontal: 15,
              height: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // paddingHorizontal: 5,
                alignItems: 'center',
                paddingBottom: 10,
              }}>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Category')}
                style={{paddingTop: 10, borderRadius: 100}}>
                <MaterialIcons
                  // onPress={() => navigation.goBack()}
                  name="arrow-back-ios"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#182e44',
                  fontSize: 18,
                  fontWeight: '600',
                  marginTop: 15,
                }}>
                Select Category
              </Text>

              <View></View>
            </View>

            <ScrollView vertical showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Antiques & Collectibles')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5 name="space-shuttle" size={22} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Antiques & Colectibles
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Appliances')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="washing-machine"
                    size={28}
                    color="black"
                  />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Appliances
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Arts & Crafts')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5 name="paint-brush" size={25} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Arts & Crafts
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}
                onPress={() => closeModal(false, 'Auto Parts')}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons name="car-sport-sharp" size={28} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Auto Parts
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}
                onPress={() => closeModal(false, 'Books, Movies & Music')}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5 name="book" size={23} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Books, Movies & Music
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Electronics')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons name="phone-iphone" size={28} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Electronics
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Furniture')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5 name="couch" size={23} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>Furniture</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Garage Sale')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5 name="box-open" size={23} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Garage Sale
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Health & Beauty')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5 name="air-freshener" size={23} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Health & Beauty
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Home Goods & Decor')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5 name="image" size={25} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Home Goods & Decor
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Tools')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5 name="tools" size={23} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>Tools</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Jewelry & Watches')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons name="watch" size={25} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Jewelry & Watches
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Luggage & Bags')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons name="luggage" size={28} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Luggage & Bags
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, "Men's Clothing & Shoes")}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="bow-tie"
                    size={28}
                    color="black"
                  />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Men's Clothing & Shoes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Miscellaneous')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo name="box" size={25} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Miscellaneous
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Musical Instruments')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5 name="guitar" size={25} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Musical Instruments
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Patio & Garden')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="grass"
                    size={28}
                    color="black"
                  />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Patio & Garden
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Pet Supplies')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons name="pets" size={28} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Pet Supplies
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Sporting Goods')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5 name="bicycle" size={23} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Sporting Goods
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, 'Toys & Games')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons name="game-controller" size={25} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Toys & Games
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal(false, "Women's Clothing & Shoes")}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                  paddingBottom: 30,
                }}>
                <View
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    height: 45,
                    width: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="shoe-heel"
                    size={28}
                    color="black"
                  />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Women's Clothing & Shoes
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </View>
  );
};

export default CategoriesPopup;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    // borderColor: '#c6c6c6',
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.metagray,
  },
  searchContainer2: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 7,
    // borderColor: '#c6c6c6',
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.metagray,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {},
  profileImage: {
    marginRight: 15,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginBottom: 10,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  username: {
    fontWeight: '600',
    color: 'black',
  },
  name: {
    color: 'grey',
  },
  Topacity: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  prevText: {
    color: Colors.metaIcon,
    textAlign: 'center',
  },
  prevText2: {
    color: Colors.metaIcon,
    textAlign: 'center',
    marginVertical: 15,
  },
  prevContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  userInfo: {},
  nameCard: {
    fontWeight: 'bold',
  },
  usernameCard: {
    color: Colors.metaIcon,
    marginTop: 3,
  },
});

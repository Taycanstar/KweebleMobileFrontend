import {
  View,
  Text,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchCardPop from '../../components/SearchCardPop';
import ProductCard from '../../components/ProductCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const CategoriesScreen = ({navigation}) => {
  const [showPop, setShowPop] = useState(true);
  //   const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [chooseInfo, setChooseInfo] = useState();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [products, setProducts] = useState();

  useEffect(() => {
    let mounted = true;
    const loadProducts = async () => {
      try {
        const {data} = await axios.get(
          'https://kweeble.herokuapp.com/products/',
        );
        if (mounted) {
          setProducts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadProducts();
    return () => {
      mounted = false;
    };
  }, [products]);

  const onChange = e => {
    setQuery(e);
    fetch(`https://kweeble.herokuapp.com/products/`)
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
    <SafeAreaView style={{height: '100%', flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          marginLeft: 15,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="arrow-back-ios"
            size={25}
            color="black"
          />
        </View>
        <View style={styles.searchContainer2}>
          <View style={{flexDirection: 'row'}}>
            <Feather
              name="search"
              size={20}
              color={Colors.metaIcon}
              style={styles.searchIcon}
            />
            <TextInput
              onChangeText={text => setQuery(text)}
              style={{width: '100%'}}
              placeholder="Search Marketplace"
              autoCapitalize="none"
              onKeyPress={e => {
                e.key === 'Enter' && e.preventDefault();
              }}
            />
          </View>
        </View>
      </View>
      <View>
        {query === '' ? (
          <View style={{padding: 15}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Antiques & Collectibles',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Appliances',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Arts & Crafts',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Auto Parts',
                  })
                }
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
                  <Ionicons name="car-sport-sharp" size={28} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Auto Parts
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Books, Movies & Music',
                  })
                }
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
                  <FontAwesome5 name="book" size={23} color="black" />
                </View>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Books, Movies & Music
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Electronics',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Furniture',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Garage Sale',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Health & Beauty',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Home Goods & Decor',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Tools',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Jewelry & Watches',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Luggage & Bags',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: "Men's Clothing & Shoes",
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Miscellaneous',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Musical Instruments',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Patio & Garden',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Pet Supplies',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Sporting Goods',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: 'Toys & Games',
                  })
                }
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
                onPress={() =>
                  navigation.navigate('SingleCategory', {
                    products: products,
                    category: "Women's Clothing & Shoes",
                  })
                }
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
        ) : (
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginBottom: 15,
                  marginTop: 25,
                  marginLeft: 15,
                }}>
                {products
                  .filter(product => {
                    if (query === '') {
                      return null;
                    } else if (
                      product.title
                        .toLowerCase()
                        .includes(query.toLocaleLowerCase())
                    ) {
                      return product;
                    } else if (
                      product.category
                        .toLowerCase()
                        .includes(query.toLowerCase())
                    ) {
                      return product;
                    }
                  })
                  .map(product => {
                    return (
                      <View key={product._id}>
                        <ProductCard product={product} />
                      </View>
                      //   <View
                      //     key={product._id}
                      //     style={{
                      //       marginRight: 10,
                      //       marginLeft: 10,
                      //       borderRadius: 10,
                      //       backgroundColor: 'white',
                      //       marginBottom: 10,
                      //       justifyContent: 'center',
                      //       shadowColor: '#000',
                      //       shadowOffset: {
                      //         width: 0,
                      //         height: 2,
                      //       },
                      //       shadowOpacity: 0.25,
                      //       shadowRadius: 3.84,
                      //       elevation: 5,
                      //     }}>
                      //     <Image
                      //       style={{
                      //         width: 175,
                      //         height: 210,
                      //         borderTopLeftRadius: 10,
                      //         borderTopRightRadius: 10,
                      //       }}
                      //       source={{uri: product.photos[0]}}
                      //     />
                      //     <View
                      //       style={{
                      //         flexDirection: 'row',
                      //         justifyContent: 'space-between',
                      //         paddingHorizontal: 10,
                      //         paddingVertical: 10,
                      //       }}>
                      //       <View
                      //         style={{
                      //           flexDirection: 'row',
                      //           alignItems: 'center',
                      //         }}>
                      //         {/* <Image
                      //     style={{width: 30, height: 30, borderRadius: 100}}
                      //     source={{uri: product.seller.photo}}
                      //   /> */}
                      //         <Text
                      //           style={{
                      //             fontSize: 18,
                      //             fontWeight: '700',
                      //             letterSpacing: 1,
                      //           }}>
                      //           {`$${product.price}.00`}
                      //         </Text>
                      //       </View>
                      //       <Pressable
                      //         style={{
                      //           justifyContent: 'center',
                      //           alignItems: 'center',
                      //         }}>
                      //         <MaterialCommunityIcons
                      //           name="dots-horizontal"
                      //           size={17}
                      //           color="gray"
                      //         />
                      //       </Pressable>
                      //     </View>
                      //   </View>
                    );
                  })}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoriesScreen;

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
    width: '87%',
    // marginTop: 10,
    marginHorizontal: 7,
    // borderColor: '#c6c6c6',
    // borderWidth: 1,
    borderRadius: 100,
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

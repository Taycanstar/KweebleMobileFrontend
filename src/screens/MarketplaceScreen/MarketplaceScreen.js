import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  RefreshControl,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';
import {
  FacebookLoader,
  InstagramLoader,
} from 'react-native-easy-content-loader';

const deviceHeight = Dimensions.get('window').height;

const MarketplaceScreen = () => {
  const data = useSelector(state => state.Reducers.userData);
  const navigation = useNavigation();
  // const me = useSelector(state => state.Reducers.userData);
  const [picked, setPicked] = useState(false);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [catherine, setCatherine] = useState('Home');
  const [scopes, setScopes] = useState([]);
  const [isScopeSelected, setIsScopeSelected] = useState(false);
  const [selProducts, setSelProducts] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [indicator, setIndicator] = useState(0);
  const [me, setMe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pullMe = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 500);
  };

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

    // const interval = setInterval(() => {
    //   loadUsers();
    // }, 3000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, []);

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
    // const interval = setInterval(() => {
    //   loadProducts();
    // }, 3000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [refresh]);

  useEffect(() => {
    let mounted = true;
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const {data} = await axios.get(
          'https://kweeble.herokuapp.com/products/',
        );

        if (mounted) {
          setProducts(data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadProducts();

    // const interval = setInterval(() => {
    // loadProducts();

    // }, 3000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, []);

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
    // }, 3000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [refresh]);

  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const closeModal = (bool, info) => {
    changeModalVisible(bool);
  };

  const onSellPress = () => {
    navigation.navigate('NewListing');
  };

  const [filteredProducts, setFilteredProducts] = useState([]);

  const myScopes = scopes.filter(item => {
    return item.members.indexOf(data._id) >= 0;
  });

  // console.log(scopeMap.flat(1));
  useEffect(() => {
    const fev = products.filter(e => e.isSold === false);

    //maybe add for each
    const myScopeEvents = myScopes.map(sc => {
      return fev.filter(ev => sc._id === ev.scope);
    });

    const mySE = myScopeEvents.flat(1);

    setFilteredProducts(mySE);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, products]);

  const onUnsave = async () => {
    try {
      const resp = await axios.put(
        `https://kweeble.herokuapp.com/auth/events/del/${data._id}`,
        // `http://localhost:3000/scopes/del/${data._id}`,
        {
          id: data._id,
          product: data._id,
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
  };

  const onSave = async () => {
    try {
      const response = await axios.put(
        `https://kweeble.herokuapp.com/auth/events/${data._id}`,
        // `http://localhost:3000/auth/${data._id}`,
        {
          id: data._id,
          event: data._id,
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
  };

  useEffect(() => {
    let mounted = true;

    const loadDimi = async () => {
      if (mounted) {
        const y = users.filter(u => u._id === data._id)[0];

        setMe(y);
      }
    };

    loadDimi();

    // const interval = setInterval(() => {
    //   loadDimi();
    // }, 3000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [data._id, users]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {isLoading ? (
        <InstagramLoader active />
      ) : (
        <>
          <View style={styles.nav}>
            <View
              style={{
                marginRight: 15,
                flexDirection: 'row',
                justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <Text style={styles.headerText}>Marketplace</Text>
              <View style={styles.icons}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Categories')}
                  style={{
                    // marginLeft: 50,
                    marginRight: 10,
                    backgroundColor: Colors.subtleGray,
                    paddingHorizontal: 7,
                    paddingVertical: 7,
                    borderRadius: 100,
                  }}>
                  <Feather name="search" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              {/* <View style={styles.icons}>
            <TouchableOpacity
              style={{
                // marginLeft: 50,
                marginRight: 10,
                backgroundColor: Colors.subtleGray,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 100,
              }}>
              <Feather name="user" size={25} color="black" />
            </TouchableOpacity>
          </View> */}
              <View style={styles.rightCorner}>
                <TouchableOpacity
                  style={styles.cathView}
                  onPress={() => setIsModalVisible(true)}>
                  <Text style={styles.cathText}>{catherine}</Text>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={23}
                    color={'gray'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
            }
            style={{marginTop: 5}}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 15,
                justifyContent: 'space-between',
                marginBottom: 5,
              }}>
              <TouchableOpacity style={styles.subh} onPress={onSellPress}>
                <Feather name="edit" size={18} color="black" />
                <Text style={styles.subTxt}>Sell</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subh}
                onPress={() => navigation.navigate('Categories')}>
                <Feather name="list" size={18} color="black" />
                <Text style={styles.subTxt}>Categories</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: 15}}>
              <Text
                style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>
                Shop by category
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    paddingTop: 20,
                    paddingBottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: "Men's Clothing & Shoes",
                        })
                      }
                      style={{
                        backgroundColor: Colors.subtleGray,

                        width: 55,
                        height: 55,
                        marginBottom: 5,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesome5 name="tshirt" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={{textAlign: 'center', fontSize: 14}}>Men</Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: "Women's Clothing & Shoes",
                        })
                      }
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 55,
                        height: 55,
                        marginBottom: 5,
                        borderRadius: 100,

                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="shoe-heel"
                        size={40}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Text style={{textAlign: 'center', fontSize: 14}}>
                      Women
                    </Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Electronics',
                        })
                      }
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 55,
                        height: 55,

                        marginBottom: 5,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <MaterialIcons
                        name="phone-iphone"
                        size={32}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Text>Electronics</Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Arts & Crafts',
                        })
                      }
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 55,
                        height: 55,

                        marginBottom: 5,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesome5
                        name="paint-brush"
                        size={25}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Text>Crafts</Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Tools',
                        })
                      }
                      style={{
                        backgroundColor: Colors.subtleGray,
                        width: 55,
                        height: 55,
                        marginBottom: 5,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesome5 name="tools" size={25} color="black" />
                    </TouchableOpacity>
                    <Text>Tools</Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Jewelry & Watches',
                        })
                      }
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 55,
                        height: 55,
                        marginBottom: 5,
                        borderRadius: 100,

                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesome name="diamond" size={27} color="black" />
                    </TouchableOpacity>
                    <Text>Jewelry</Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Luggage & Bags',
                        })
                      }
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 55,
                        height: 55,

                        marginBottom: 5,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="bag-personal"
                        size={32}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Text>Bags</Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Miscellaneous',
                        })
                      }
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 55,
                        height: 55,

                        marginBottom: 5,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Ionicons
                        name="file-tray-stacked"
                        size={25}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Text>Various</Text>
                  </View>
                </View>
              </ScrollView>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    paddingTop: 20,
                    paddingBottom: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Books, Movies & Music',
                        })
                      }
                      style={{
                        backgroundColor: Colors.subtleGray,

                        width: 55,
                        height: 55,
                        marginBottom: 5,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesome5 name="book" size={25} color="black" />
                    </TouchableOpacity>
                    <Text>Books</Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Health & Beauty',
                        })
                      }
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 55,
                        height: 55,
                        marginBottom: 5,
                        borderRadius: 100,

                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesome5
                        name="air-freshener"
                        size={25}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Text>Beauty</Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Home Goods & Decor',
                        })
                      }
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 55,
                        height: 55,

                        marginBottom: 5,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesome5 name="couch" size={25} color="black" />
                    </TouchableOpacity>
                    <Text>Decor</Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Pet Supplies',
                        })
                      }
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 55,
                        height: 55,

                        marginBottom: 5,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <MaterialIcons name="pets" size={28} color="black" />
                    </TouchableOpacity>
                    <Text>Pet Supplies</Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Sporting Goods',
                        })
                      }
                      style={{
                        backgroundColor: Colors.subtleGray,

                        width: 55,
                        height: 55,
                        marginBottom: 5,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesome5 name="biking" size={25} color="black" />
                    </TouchableOpacity>
                    <Text>Sport</Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Toys & Games',
                        })
                      }
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 55,
                        height: 55,
                        marginBottom: 5,
                        borderRadius: 100,

                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Ionicons
                        name="game-controller"
                        size={30}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Text>Games</Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Musical Instruments',
                        })
                      }
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 55,
                        height: 55,

                        marginBottom: 5,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesome5 name="guitar" size={28} color="black" />
                    </TouchableOpacity>
                    <Text>Instruments</Text>
                  </View>
                  <View style={{alignItems: 'center', width: 85}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('SingleCategory', {
                          products: products,
                          category: 'Antiques & Collectibles',
                        })
                      }
                      style={{
                        // marginRight: 10,
                        backgroundColor: Colors.subtleGray,
                        width: 55,
                        height: 55,

                        marginBottom: 5,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesome5
                        name="space-shuttle"
                        size={28}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Text>Collectibles</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={{paddingLeft: 15}}>
              <View
                style={{
                  flexDirection: 'row',

                  marginBottom: 20,
                  width: '100%',
                }}>
                {/* <Pressable
              onPress={() => setPicked(true)}
              style={{
                borderBottomWidth: 3,
                borderColor: picked === true ? 'black' : 'white',
                marginRight: 20,

                width: '45%',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 15,
                  alignSelf: 'stretch',
                  textAlign: 'center',
                }}>
                Today's picks
              </Text>
            </Pressable> */}
                <Pressable
                  // onPress={() => setPicked(false)}
                  style={{
                    borderBottomWidth: 3,
                    // borderColor: picked === false ? 'black' : 'white',
                    borderColor: 'white',
                    marginRight: 20,
                    width: '45%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginLeft: 20,
                    }}>
                    Recently added
                  </Text>
                </Pressable>
              </View>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {isScopeSelected === true ? (
                  <>
                    {selProducts
                      .sort(function (a, b) {
                        return a.createdAt > b.createdAt;
                      })
                      .map(product => {
                        return (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('Product', {product})
                            }
                            key={product._id}
                            style={{
                              marginRight: 10,
                              borderRadius: 10,
                              backgroundColor: 'white',
                              marginBottom: 10,
                              justifyContent: 'center',
                              shadowColor: '#000',
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 3.84,

                              elevation: 5,
                            }}>
                            <Image
                              style={{
                                width: 175,
                                height: 210,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                              }}
                              source={{
                                uri: product.photos[product.photos.length - 1],
                              }}
                            />
                            <View style={{position: 'absolute'}}>
                              {data.savedProducts.filter(
                                p => p._id === product._id,
                              ) ? (
                                <FontAwesome
                                  name="bookmark"
                                  size={20}
                                  color="black"
                                  onPress={async () => {
                                    try {
                                      const resp = await axios.put(
                                        `https://kweeble.herokuapp.com/auth/products/del/${data._id}`,
                                        // `http://localhost:3000/scopes/del/${data._id}`,
                                        {
                                          id: data._id,
                                          product: product._id,
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
                                />
                              ) : (
                                <FontAwesome
                                  name="bookmark-o"
                                  size={20}
                                  color="black"
                                  onPress={async () => {
                                    try {
                                      const response = await axios.put(
                                        `https://kweeble.herokuapp.com/auth/products/${data._id}`,
                                        // `http://localhost:3000/auth/${data._id}`,
                                        {
                                          id: data._id,
                                          product: product._id,
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
                                />
                              )}
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                {/* <Image
                        style={{width: 30, height: 30, borderRadius: 100}}
                        source={{uri: product.seller.photo}}
                      /> */}
                                <Text
                                  style={{
                                    fontSize: 18,
                                    fontWeight: '700',
                                    letterSpacing: 1,
                                  }}>
                                  ${product.price}
                                </Text>
                              </View>
                              <View></View>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {filteredProducts
                      .sort(function (a, b) {
                        return a.createdAt > b.createdAt;
                      })
                      .map((product, i) => {
                        return (
                          <View key={i}>
                            <ProductCard product={product} />
                            {/* <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Product', {
                              product: {
                                id: product._id,
                                title: product.title,
                                price: product.price,
                                seller: product.seller,
                                description: product.description,
                                photos: product.photos,
                                condition: product.condition,
                                users,
                                producers: product.users,
                                sellerPhoto: product.sellerPhoto,
                                sellerUsername: product.username,
                                sellerName: product.sellerName,
                                sellerGradeLevel: product.sellerGradeLevel,
                                sellerMajor: product.sellerMajor,
                              },
                            })
                          }
                          style={{
                            marginRight: 10,
                            borderRadius: 10,
                            backgroundColor: 'white',
                            marginBottom: 10,
                            justifyContent: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                          }}>
                          <Image
                            style={{
                              width: 175,
                              height: 210,
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                            }}
                            source={{
                              uri: product.photos[product.photos.length - 1],
                            }}
                          />
                          <View
                            style={{position: 'absolute', top: 5, left: 152}}>
                            {indicator === 0 ? (
                              data.savedProducts.filter(
                                p => p === product._id,
                              )[0] !== undefined ? (
                                <FontAwesome
                                  name="bookmark"
                                  size={22}
                                  color="white"
                                  onPress={async () => {
                                    try {
                                      const resp = await axios.put(
                                        `https://kweeble.herokuapp.com/auth/products/del/${data._id}`,
                                        // `http://localhost:3000/scopes/del/${data._id}`,
                                        {
                                          id: data._id,
                                          product: product._id,
                                        },
                                        {
                                          headers: {
                                            'Content-Type': 'application/json',
                                          },
                                        },
                                      );
                                      setIsSaved(false);
                                      setIndicator(1);
                                      console.log(resp, 'del');
                                    } catch (error) {
                                      console.log(error);
                                    }
                                  }}
                                />
                              ) : (
                                <FontAwesome
                                  name="bookmark-o"
                                  size={22}
                                  color="white"
                                  onPress={async () => {
                                    try {
                                      const response = await axios.put(
                                        `https://kweeble.herokuapp.com/auth/products/${data._id}`,
                                        // `http://localhost:3000/auth/${data._id}`,
                                        {
                                          id: data._id,
                                          product: product._id,
                                        },
                                        {
                                          headers: {
                                            'Content-Type': 'application/json',
                                          },
                                        },
                                      );
                                      setIsSaved(true);
                                      setIndicator(1);
                                      console.log(response, 'res');
                                    } catch (error) {
                                      console.log(error);
                                    }
                                  }}
                                />
                              )
                            ) : isSaved ? (
                              <FontAwesome
                                name="bookmark"
                                size={22}
                                color="white"
                                onPress={async () => {
                                  try {
                                    const resp = await axios.put(
                                      `https://kweeble.herokuapp.com/auth/products/del/${data._id}`,
                                      // `http://localhost:3000/scopes/del/${data._id}`,
                                      {
                                        id: data._id,
                                        product: product._id,
                                      },
                                      {
                                        headers: {
                                          'Content-Type': 'application/json',
                                        },
                                      },
                                    );
                                    setIsSaved(false);
                                    setIndicator(1);
                                    console.log(resp, 'del');
                                  } catch (error) {
                                    console.log(error);
                                  }
                                }}
                              />
                            ) : (
                              <FontAwesome
                                name="bookmark-o"
                                size={22}
                                color="white"
                                onPress={async () => {
                                  try {
                                    const response = await axios.put(
                                      `https://kweeble.herokuapp.com/auth/products/${data._id}`,
                                      // `http://localhost:3000/auth/${data._id}`,
                                      {
                                        id: data._id,
                                        product: product._id,
                                      },
                                      {
                                        headers: {
                                          'Content-Type': 'application/json',
                                        },
                                      },
                                    );
                                    setIsSaved(true);
                                    setIndicator(1);
                                    console.log(response, 'res');
                                  } catch (error) {
                                    console.log(error);
                                  }
                                }}
                              />
                            )}
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingHorizontal: 10,
                              paddingVertical: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: '700',
                                  letterSpacing: 1,
                                }}>
                                {`$${product.price}.00`}
                              </Text>
                            </View>
                            <Pressable
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <MaterialCommunityIcons
                                name="dots-horizontal"
                                size={17}
                                color="gray"
                              />
                            </Pressable>
                          </View>
                        </TouchableOpacity> */}
                          </View>
                        );
                      })}
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}

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
              // justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                paddingHorizontal: 10,
                height: '100%',
                // maxHeight: deviceHeight * 0.4,
                paddingBottom: 12,
                marginTop: 60,
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
              <ScrollView
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingBottom: 70,
                    //   alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVisible(false);
                      setIsScopeSelected(false);
                      setCatherine('Home');
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 5,
                      marginBottom: 8,
                    }}>
                    <Ionicons name="home-outline" size={30} color={'black'} />
                    <View
                      style={{
                        marginLeft: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#182e44',
                          fontSize: 16,
                          fontWeight: '600',
                        }}>
                        Home
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {myScopes.map(scope => {
                    return (
                      <View key={scope._id}>
                        <ScrollView>
                          <TouchableOpacity
                            onPress={() => {
                              const evnts = products.filter(
                                e =>
                                  e.scope === scope._id && e.isSold === false,
                              );
                              setSelProducts(evnts);
                              setIsScopeSelected(true);
                              setIsModalVisible(false);
                              setCatherine(`$${scope.name}`);
                            }}
                            key={scope.id}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingHorizontal: 3,
                              marginBottom: 8,
                              height: '100%',
                            }}>
                            <Image
                              source={
                                scope.photo
                                  ? {uri: scope.photo}
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
                                ${scope.name}
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
        </Modal>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default MarketplaceScreen;

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
  headerText: {
    color: Colors.Black,
    fontWeight: '700',
    fontSize: 24,
    marginRight: 7,
  },
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
  cathView: {
    backgroundColor: Colors.redditDarkerGray,
    borderRadius: 6,
    justifyContent: 'center',
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 3,
    paddingVertical: 5,
    // flex: 1,
  },
  cathText: {
    fontWeight: '600',
    fontSize: 14,
  },
  rightCorner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // marginRight: 5,
  },
});

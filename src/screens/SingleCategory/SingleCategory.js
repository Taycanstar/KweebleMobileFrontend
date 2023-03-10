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
import {useNavigation} from '@react-navigation/native';

const SingleCategory = props => {
  const [showPop, setShowPop] = useState(true);
  //   const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [chooseInfo, setChooseInfo] = useState();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const {products, category, seller} = props?.route?.params;
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [importedProducts, setImportedProducts] = useState();

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
    let mounted = true;
    const loadProducts = async () => {
      try {
        const {data} = await axios.get(
          'https://kweeble.herokuapp.com/products/',
        );
        if (mounted) {
          setImportedProducts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadProducts();
    return () => {
      mounted = false;
    };
  }, [importedProducts]);

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

  useEffect(() => {
    const mydata = users.filter(user => user._id === products.seller);
    setCurrentUser(mydata);
  }, [products.seller, users]);

  const onCardPress = person => {
    navigation.navigate('Dm', {
      itemId: person._id,
      msgName: person.name,
    });
    setIsModalVisible(false);
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
              onChangeText={newText => setQuery(newText)}
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

      {query === '' ? (
        <View>
          <ScrollView>
            <View style={{paddingHorizontal: 15, paddingVertical: 15}}>
              <TouchableOpacity>
                <Text style={{fontSize: 20, fontWeight: '700'}}>
                  {category}
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(0, 120, 215, 0.15)',
                  marginVertical: 10,
                  padding: 8,
                  width: '25%',
                  borderRadius: 8,
                  flexDirection: 'row',
                }}>
                <FontAwesome5
                  name="sliders-h"
                  size={17}
                  color={Colors.primary}
                />
                <Text
                  style={{
                    fontWeight: '600',
                    color: Colors.primary,
                    marginLeft: 8,
                  }}>
                  Filters
                </Text>
              </TouchableOpacity> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: 15,
                // marginRight: 10,
              }}>
              <>
                {products.map(product => {
                  if (product.category === category) {
                    return (
                      <ProductCard key={product._id} product={product} />
                      // <View
                      //   key={product._id}
                      //   style={{
                      //     marginRight: 10,
                      //     marginLeft: 10,
                      //     borderRadius: 10,
                      //     backgroundColor: 'white',
                      //     marginBottom: 10,
                      //     justifyContent: 'center',
                      //     shadowColor: '#000',
                      //     shadowOffset: {
                      //       width: 0,
                      //       height: 2,
                      //     },
                      //     shadowOpacity: 0.25,
                      //     shadowRadius: 3.84,

                      //     elevation: 5,
                      //   }}>
                      //   <Image
                      //     style={{
                      //       width: 175,
                      //       height: 210,
                      //       borderTopLeftRadius: 10,
                      //       borderTopRightRadius: 10,
                      //     }}
                      //     source={{uri: product.photos[0]}}
                      //   />
                      //   <View
                      //     style={{
                      //       flexDirection: 'column',
                      //       justifyContent: 'space-between',
                      //       paddingHorizontal: 10,
                      //       paddingVertical: 6,
                      //     }}>
                      //     <View
                      //       style={{
                      //         flexDirection: 'row',
                      //         alignItems: 'center',
                      //       }}>
                      //       <Text
                      //         style={{
                      //           fontSize: 16,
                      //           fontWeight: '700',
                      //           letterSpacing: 1,
                      //         }}>
                      //         {`$${product.price}.00`}
                      //       </Text>
                      //     </View>
                      //     {/* <View></View> */}
                      //     <Text style={{marginTop: 2, fontSize: 14}}>
                      //       {product.title}
                      //     </Text>
                      //   </View>
                      // </View>
                    );
                  }
                })}
              </>
            </View>
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
              }}>
              {importedProducts
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
                    product.category.toLowerCase().includes(query.toLowerCase())
                  ) {
                    return product;
                  }
                })
                .map(product => {
                  return (
                    <ProductCard product={product} />
                    // <View
                    //   key={product._id}
                    //   style={{
                    //     marginRight: 10,
                    //     marginLeft: 10,
                    //     borderRadius: 10,
                    //     backgroundColor: 'white',
                    //     marginBottom: 10,
                    //     justifyContent: 'center',
                    //     shadowColor: '#000',
                    //     shadowOffset: {
                    //       width: 0,
                    //       height: 2,
                    //     },
                    //     shadowOpacity: 0.25,
                    //     shadowRadius: 3.84,
                    //     elevation: 5,
                    //   }}>
                    //   <Image
                    //     style={{
                    //       width: 175,
                    //       height: 210,
                    //       borderTopLeftRadius: 10,
                    //       borderTopRightRadius: 10,
                    //     }}
                    //     source={{uri: product.photos[0]}}
                    //   />
                    //   <View
                    //     style={{
                    //       flexDirection: 'row',
                    //       justifyContent: 'space-between',
                    //       paddingHorizontal: 10,
                    //       paddingVertical: 10,
                    //     }}>
                    //     <View
                    //       style={{
                    //         flexDirection: 'row',
                    //         alignItems: 'center',
                    //       }}>
                    //       {/* <Image
                    //     style={{width: 30, height: 30, borderRadius: 100}}
                    //     source={{uri: product.seller.photo}}
                    //   /> */}
                    //       <Text
                    //         style={{
                    //           fontSize: 18,
                    //           fontWeight: '700',
                    //           letterSpacing: 1,
                    //         }}>
                    //         {`$${product.price}.00`}
                    //       </Text>
                    //     </View>
                    //     <Pressable
                    //       style={{
                    //         justifyContent: 'center',
                    //         alignItems: 'center',
                    //       }}>
                    //       <MaterialCommunityIcons
                    //         name="dots-horizontal"
                    //         size={17}
                    //         color="gray"
                    //       />
                    //     </Pressable>
                    //   </View>
                    // </View>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SingleCategory;

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

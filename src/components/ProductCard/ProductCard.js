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

const ProductCard = ({product}) => {
  const navigation = useNavigation();
  const [isSaved, setIsSaved] = useState(false);
  const [indicator, setIndicator] = useState(0);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const data = useSelector(state => state.Reducers.userData);
  const [me, setMe] = useState('');

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
  }, [products]);

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
    // }, 1000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, []);

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
    //   //   loadDimi();
    // }, 1000);
    return () => {
      mounted = false;
      // clearInterval(interval);
    };
  }, [data._id, users]);

  return (
    <View key={product._id}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MarketplaceStack', {
            screen: 'Product',
            params: {
              product: {
                title: product.title,
                id: product._id,
                price: product.price,
                seller: product.seller,
                description: product.description,
                photos: product.photos,
                condition: product.condition,
                sellerPhoto: product.sellerPhoto,
                sellerUsername: product.username,
                sellerName: product.sellerName,
                sellerGradeLevel: product.sellerGradeLevel,
                sellerMajor: product.sellerMajor,
                users: product.users,
                isSold: product.isSold,
              },
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
          source={{uri: product.photos[0]}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'column',
              // alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                letterSpacing: 1,
              }}>
              {`$${product.price}.00`}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: 'gray',
                // letterSpacing: 1,
              }}>
              {product.title}
            </Text>
          </View>

          {/* <TouchableOpacity
                                    onPress={() => {
                                      changeModalVisible(!isModalVisible);
                                    }}
                                    style={{
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <MaterialCommunityIcons
                                      name="dots-horizontal"
                                      size={21}
                                      color="gray"
                                    />
                                  </TouchableOpacity> */}
        </View>
        <View style={{position: 'absolute', top: 5, left: 152}}>
          {/* {indicator === 0 ? ( */}
          {me?.savedProducts?.filter(p => p === product._id)[0] !==
          undefined ? (
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
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

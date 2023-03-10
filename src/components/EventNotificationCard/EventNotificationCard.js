import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FontAwesome5} from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const EventNotificationCard = ({refresh, notification}) => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [username, setUsername] = useState('');
  const [events, setEvents] = useState([]);
  const [load, setLoad] = useState(false);
  const [products, setProducts] = useState([]);
  const [myEv, setMyEv] = useState('');
  const [myProd, setMyProd] = useState('');
  const [timeset, setTimeset] = useState('');

  useEffect(() => {
    let mounted = true;
    const loadEvents = async () => {
      try {
        const {data} = await axios.get('https://kweeble.herokuapp.com/events/');
        if (mounted) {
          setEvents(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadEvents();
    const interval = setInterval(() => {
      loadEvents();
    }, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [load]);

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
    const interval = setInterval(() => {
      loadProducts();
    }, 3000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [load]);

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
  }, [load]);

  useEffect(() => {
    if (notification.type === 'event') {
      const ev = events.filter(e => e._id === notification.typeId)[0];
      setMyEv(ev);
    } else if (notification.type === 'product') {
      const pr = products.filter(p => p._id === notification.typeId)[0];
      setMyProd(pr);
    }
  }, [events, notification.type, notification.typeId, products, load]);

  useEffect(() => {
    const avi = users.filter(u => u._id === notification.from);
    const av = avi[0]?.photo;
    const u = avi[0]?.username;

    setProfilePhoto(av);
    setUsername(u);
  }, [notification.from, users, load]);

  useEffect(() => {
    const x = Date.parse(notification.createdAt);
    const y = new Date();
    const date = Date.parse(y);

    const timeSinceNoti = date - x;
    const seconds = timeSinceNoti / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;

    if (seconds <= 59) {
      setTimeset(`${Math.trunc(seconds)}s`);
    } else if (minutes <= 59) {
      setTimeset(`${Math.trunc(minutes)}m`);
    } else if (hours <= 23) {
      setTimeset(`${Math.trunc(hours)}h`);
    } else if (days <= 7) {
      setTimeset(`${Math.trunc(days)}d`);
    } else {
      setTimeset(`${Math.trunc(weeks)}w`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  // console.log(dateTimeParts); //1379426880000
  // console.log(date); //Tue Sep 17 2013 10:08:00 GMT-0400

  useEffect(() => {
    const ref = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action

      setLoad(true);

      setTimeout(() => {
        setLoad(false);
      }, 500);
    });

    return ref;
  }, [navigation]);

  const onCardPress = () => {
    if (notification.type === 'event') {
      navigation.navigate('Event', {data: myEv});
    } else if (notification.type === 'product') {
      // navigation.navigate('Product', {product: myProd});
      navigation.navigate('MarketplaceStack', {
        screen: 'Product',
        params: {
          product: {
            title: myProd.title,
            id: myProd._id,
            price: myProd.price,
            seller: myProd.seller,
            description: myProd.description,
            photos: myProd.photos,
            condition: myProd.condition,
            sellerPhoto: myProd.sellerPhoto,
            sellerUsername: myProd.username,
            sellerName: myProd.sellerName,
            sellerGradeLevel: myProd.sellerGradeLevel,
            sellerMajor: myProd.sellerMajor,
            users: myProd.users,
            isSold: myProd.isSold,
          },
        },
      });
      // console.log(myProd);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onCardPress(notification)}
        style={styles.innerContainer}>
        <View style={styles.imgContainer}>
          <Image
            style={{
              marginRight: 15,
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              // marginBottom: 10,
            }}
            source={
              profilePhoto
                ? {uri: profilePhoto}
                : require('../../../assets/images/user.png')
            }
          />
        </View>

        <View
          style={{
            // justifyContent: 'center',
            paddingTop: 5,
            alignItems: 'flex-start',
            flexDirection: 'row',
            paddingRight: 8,
            flex: 0.8,
          }}>
          <Text style={{fontSize: 14}}>
            <Text style={{fontWeight: '600'}}>{username} </Text>
            <Text>{notification.text}</Text>
            <Text> </Text>
            <Text style={{color: 'gray'}}>{timeset}</Text>
          </Text>
        </View>

        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            marginRight: 15,
            marginLeft: 10,
          }}>
          <Image
            style={{
              width: 45,
              height: 45,
              borderRadius: 4,

              // marginBottom: 10,
            }}
            source={
              notification.photo
                ? {uri: notification.photo}
                : require('../../../assets/images/max.jpg')
            }
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EventNotificationCard;

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: 5,
    // paddingRight: 10,
    paddingLeft: 10,

    // justifyContent: 'space-between',

    paddingBottom: 5,
  },
  imgContainer: {
    justifyContent: 'center',
    flex: 0.2,
  },
  userInfo: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  name: {
    fontWeight: 'bold',
  },
  username: {
    color: Colors.metaIcon,
    marginTop: 3,
  },
});

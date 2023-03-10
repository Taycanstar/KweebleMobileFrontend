import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Logout} from '../../store/actions';
import axios from 'axios';

const CustomDrawer = props => {
  const data = useSelector(state => state.Reducers.userData);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState('');
  const onLogoutPressed = () => {
    dispatch(Logout());
  };

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

    const interval = setInterval(() => {
      loadUsers();
    }, 3000);
    return () => {
      mounted = false;
      clearInterval(interval);
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

    const interval = setInterval(() => {
      loadDimi();
    }, 3000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [data._id, users]);
  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props} contentContainerStyle={{}}>
        <ImageBackground
          // source={require('../../../assets/images/menubg.png')}
          source={require('../../../assets/images/w.png')}
          style={styles.imgbg}>
          <Image
            style={styles.avi}
            source={
              me?.photo
                ? {uri: me?.photo}
                : require('../../../assets/images/user.png')
            }
          />
          <Text style={styles.username}>@{me?.username}</Text>
        </ImageBackground>
        <View style={styles.items}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomTextView}>
        {/* <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={styles.botIcon}>
            <Ionicons name="share-social-outline" size={22} />
            <Text style={styles.botText}>Share with friends</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={onLogoutPressed}
          style={{paddingVertical: 15}}>
          <View style={styles.botIcon}>
            <Ionicons name="exit" size={22} />
            <Text style={styles.botText}>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: Colors.primary,
  },
  imgbg: {
    padding: 20,
  },
  avi: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  items: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 10,
  },
  bottomTextView: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  botIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botText: {
    fontSize: 15,
    marginLeft: 5,
  },
});

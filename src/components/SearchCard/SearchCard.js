import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {FontAwesome5} from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';

const SearchCard = ({person}) => {
  const navigation = useNavigation();
  const onCardPress = () => {
    navigation.navigate('OtherUserProfile', {data: person});
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onCardPress(person)}
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
              person.photo
                ? {uri: person.photo}
                : require('../../../assets/images/user.png')
            }
          />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.name}>{person.name}</Text>
          <Text style={styles.username}>@{person.username}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: 7,
    paddingRight: 10,
    paddingLeft: 10,

    paddingBottom: 7,
  },
  imgContainer: {
    justifyContent: 'center',
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

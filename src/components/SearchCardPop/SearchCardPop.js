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

const SearchCardPop = ({person, isModal}) => {
  const navigation = useNavigation();
  const onCardPress = person => {
    navigation.navigate('Dm', {
      itemId: person._id,
      msgName: person.name,
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onCardPress(person)}
        style={styles.innerContainer}>
        <Image
          style={{
            marginRight: 15,
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            marginBottom: 10,
          }}
          source={
            person.photo
              ? {uri: person.photo}
              : require('../../../assets/images/user.png')
          }
        />

        <View style={styles.userInfo}>
          <Text style={styles.name}>{person.name}</Text>
          <Text style={styles.username}>@{person.username}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchCardPop;

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  userInfo: {},
  name: {
    fontWeight: 'bold',
  },
  username: {
    color: Colors.metaIcon,
    marginTop: 3,
  },
});

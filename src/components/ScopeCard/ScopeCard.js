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

const ScopeCard = ({scope}) => {
  const navigation = useNavigation();
  const onCardPress = () => {
    navigation.navigate('ScopeScreen', {data: scope});
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onCardPress(scope)}
        style={styles.innerContainer}>
        <View style={styles.cardImg}>
          <Image
            style={{
              marginRight: 15,
              width: 55,
              height: 55,
              // borderRadius: 50 / 2,
              borderRadius: 6,
              // marginBottom: 10,
            }}
            source={
              scope?.photo
                ? {uri: scope?.photo}
                : require('../../../assets/images/logo3.jpg')
            }
          />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.name}>{scope.name}</Text>
          <Text style={styles.members}>
            {scope.members.length === 1
              ? `${scope.members.length} member`
              : `${scope.members.length} members`}
          </Text>
          <Text style={styles.details}>{scope.info}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ScopeCard;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    marginTop: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    display: 'flex',
    // paddingTop: 10,
    paddingRight: 10,
    // paddingLeft: 10,
  },
  userInfo: {},
  name: {
    fontWeight: 'bold',
  },
  details: {
    color: Colors.metaIcon,
    marginTop: 3,
  },
  members: {
    color: Colors.metaIcon,
    fontSize: 12.5,
    marginTop: 3,
  },
  cardImg: {
    justifyContent: 'center',
  },
});

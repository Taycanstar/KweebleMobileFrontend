import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const DeactivateScreen = ({navigation}) => {
  const onBackPress = () => {
    navigation.goBack();
  };
  const onPolicyPress = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const onTermsPress = () => {
    navigation.navigate('Terms');
  };

  const Verify2 = () => {
    navigation.navigate('Verify2');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.nav}>
        <MaterialIcons
          onPress={onBackPress}
          name="arrow-back-ios"
          size={30}
          color="black"
        />

        <Text style={styles.headerText}>Deactivate your account </Text>

        <Text style={styles.addText}>{'      '}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.rowSubtitle}>
              You’re about to eliminate your Kweeble account. This will
              permanently remove your account from Kweeble. You can still create
              a new account with the same details if you change your mind in the
              future.
            </Text>
            <TouchableOpacity style={styles.btn} onPress={Verify2}>
              <Text style={styles.dtext}>Deactivate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeactivateScreen;

const styles = StyleSheet.create({
  nav: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  cancelBtn: {
    color: Colors.coolRed,
    fontSize: 16,
  },
  content: {
    flex: 0.2,
    paddingVertical: 15,
    // paddingHorizontal: 15,
    marginLeft: 15,
    marginRight: 30,
    // flexDirection: 'column',
  },
  headerText: {
    color: Colors.Black,
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 10,
  },
  addText: {
    color: Colors.coolRed,
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'column',
    marginBottom: 20,
    // alignItems: 'center',
    // justifyContent: 'space-between',
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  textContainer: {
    marginLeft: 10,
    // // paddingRight: 15,
    // maxWidth: 260,
    marginRight: 10,
    flex: 1,
  },
  rowSubtitle: {
    color: 'gray',
  },
  btn: {
    marginTop: 20,
    // backgroundColor: Colors.strongRed,
    paddingVertical: 10,
  },
  dtext: {
    textAlign: 'center',
    color: Colors.strongRed,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

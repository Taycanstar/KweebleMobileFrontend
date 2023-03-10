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

const PrivacySettings = ({navigation}) => {
  const onBackPress = () => {
    navigation.goBack();
  };
  const onPolicyPress = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const onTermsPress = () => {
    navigation.navigate('Terms');
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

        <Text style={styles.headerText}>Privacy and Safety </Text>

        <Text style={styles.addText}>{'      '}</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={onPolicyPress} style={{flex: 1}}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Privacy Policy</Text>
              {/* <Text style={styles.rowSubtitle}>
                See your account information like your phone number and email
                address.
              </Text> */}
            </View>
            <View style={{flex: 0.1}}>
              <MaterialIcons
                // onPress={onBackPress}
                name="arrow-forward-ios"
                size={25}
                color="lightgray"
              />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onTermsPress} style={{flex: 1}}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Terms of Service</Text>
              {/* <Text style={styles.rowSubtitle}>
                Change your password at any time
              </Text> */}
            </View>
            <View style={{flex: 0.1}}>
              <MaterialIcons
                // onPress={onBackPress}
                name="arrow-forward-ios"
                size={25}
                color="lightgray"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PrivacySettings;

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
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  textContainer: {
    marginLeft: 10,
    // paddingRight: 15,
    maxWidth: 260,
    marginRight: 10,
    flex: 0.8,
  },
  rowSubtitle: {
    color: 'gray',
  },
});

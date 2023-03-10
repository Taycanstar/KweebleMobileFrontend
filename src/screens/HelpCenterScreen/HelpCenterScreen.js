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

const HelpCenterScreen = ({navigation}) => {
  const onBackPress = () => {
    navigation.goBack();
  };
  const onCuPress = () => {
    navigation.navigate('ContactUs');
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

        <Text style={styles.headerText}>Help Center </Text>

        <Text style={styles.addText}>{'      '}</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={onCuPress}
          style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Contact us</Text>
              {/* <Text style={styles.rowSubtitle}>
                See your account information like your phone number and email
                address.
              </Text> */}
            </View>
            <View>
              <MaterialIcons
                onPress={onBackPress}
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

export default HelpCenterScreen;

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
    flex: 1,
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
    // flex: 1,
    // width: '100%',
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  textContainer: {
    marginLeft: 10,
    // paddingRight: 15,
    // maxWidth: 260,
    marginRight: 10,
    flex: 0.8,
  },
  rowSubtitle: {
    color: 'gray',
  },
});

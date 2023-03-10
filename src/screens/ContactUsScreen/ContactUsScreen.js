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

const ContactUsScreen = ({navigation}) => {
  const onBackPress = () => {
    navigation.goBack();
  };
  const onCuPress = () => {
    navigation.navigate('Contactus');
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

        <Text style={styles.headerText}>Contact us </Text>

        <Text style={styles.addText}>{'      '}</Text>
      </View>
      <View style={styles.content}>
        <View style={{flex: 1}}>
          <View style={styles.row}>
            <Text style={{lineHeight: 20, paddingHorizontal: 5}}>
              If you have a kweeble account and want to reach out to us to
              report an issue, feedback, or simply want to have a chat feel free
              to send us an email, or if you'd like a faster response you can
              also email my personal school email.
            </Text>
            <View
              style={{
                backgroundColor: Colors.redditDarkerGray,
                marginTop: 20,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 6,
              }}>
              <Text style={{fontWeight: '600', fontSize: 16}}>
                Kweeble Support
              </Text>
              <Text style={{marginTop: 10, marginBottom: 5}}>
                support@kweeble.com
              </Text>
            </View>
            <View
              style={{
                backgroundColor: Colors.redditDarkerGray,
                marginTop: 15,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 6,
              }}>
              <Text style={{fontWeight: '600', fontSize: 16}}>
                Personal school email
              </Text>
              <Text style={{marginTop: 10, marginBottom: 5}}>
                dnunez@eckerd.edu
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactUsScreen;

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
    flexDirection: 'column',
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
    // flexDirection: 'row',
    marginBottom: 20,
    // alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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

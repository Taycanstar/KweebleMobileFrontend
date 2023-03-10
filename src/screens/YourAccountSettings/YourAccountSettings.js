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

const YourAccountSettings = ({navigation}) => {
  const onBackPress = () => {
    navigation.goBack();
  };
  const onChangePasswordPress = () => {
    navigation.navigate('VerifyPassword');
  };
  const onDeactivatePress = () => {
    navigation.navigate('Deactivate');
  };

  const onAccountSettingsPress = () => {
    navigation.navigate('EditPersonalDetails');
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

        <Text style={styles.headerText}>Your Account </Text>

        <Text style={styles.addText}>{'      '}</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={onAccountSettingsPress} style={{flex: 1}}>
          <View style={styles.row}>
            <View style={{flex: 0.1}}>
              <Feather
                onPress={onBackPress}
                name="user"
                size={25}
                color="black"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Account information</Text>
              <Text style={styles.rowSubtitle}>
                See your account information like your phone number, username,
                and email address.
              </Text>
            </View>
            <View style={{flex: 0.1}}>
              <MaterialIcons
                onPress={onBackPress}
                name="arrow-forward-ios"
                size={25}
                color="lightgray"
              />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onChangePasswordPress} style={{flex: 1}}>
          <View style={styles.row}>
            <View style={{flex: 0.1}}>
              <Feather
                onPress={onBackPress}
                name="key"
                size={25}
                color="black"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Change your password</Text>
              <Text style={styles.rowSubtitle}>
                Change your password at any time
              </Text>
            </View>
            <View style={{flex: 0.1}}>
              <MaterialIcons
                onPress={onBackPress}
                name="arrow-forward-ios"
                size={25}
                color="lightgray"
              />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDeactivatePress} style={{flex: 1}}>
          <View style={styles.row}>
            <View style={{flex: 0.1}}>
              <Feather
                onPress={onBackPress}
                name="frown"
                size={25}
                color="black"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Deactivate your account</Text>
              <Text style={styles.rowSubtitle}>
                Find out how you can deactivate your account
              </Text>
            </View>
            <View style={{flex: 0.1}}>
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

export default YourAccountSettings;

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
    flex: 0.35,
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
    maxWidth: 290,
    marginRight: 10,
    flex: 0.8,
  },
  rowSubtitle: {
    color: 'gray',
  },
});

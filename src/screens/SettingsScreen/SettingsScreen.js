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

const SettingsScreen = ({navigation}) => {
  const onBackPress = () => {
    navigation.goBack();
  };

  const onAccountPress = () => {
    navigation.navigate('YourAccountSettings');
  };

  const onPrivacyPress = () => {
    navigation.navigate('PrivacySettings');
  };

  const onNotificationsPress = () => {
    navigation.navigate('NotificationsSettings');
  };

  const onResourcesPress = () => {
    navigation.navigate('ResourcesSettings');
  };
  const onHelpPress = () => {
    navigation.navigate('HelpCenter');
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

        <Text style={styles.headerText}>Settings </Text>

        <Text style={styles.addText}>{'      '}</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={onAccountPress} style={{flex: 1}}>
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
              <Text style={styles.rowTitle}>Your account</Text>
              <Text style={styles.rowSubtitle}>
                See information about your account. Change your password or
                learn deactivation options.
              </Text>
            </View>
            <View style={{flex: 0.1}}>
              <MaterialIcons
                onPress={onAccountPress}
                name="arrow-forward-ios"
                size={25}
                color="lightgray"
              />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 1}} onPress={onPrivacyPress}>
          <View style={styles.row}>
            <View style={{flex: 0.1}}>
              <Feather
                onPress={onPrivacyPress}
                name="columns"
                size={25}
                color="black"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Privacy and Safety</Text>
              <Text style={styles.rowSubtitle}>
                View what information you see and share on Kweeble
              </Text>
            </View>
            <View style={{flex: 0.1}}>
              <MaterialIcons
                onPress={onNotificationsPress}
                name="arrow-forward-ios"
                size={25}
                color="lightgray"
              />
            </View>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={onNotificationsPress} style={{flex: 1}}>
          <View style={styles.row}>
            <View style={{flex: 0.1}}>
              <Feather
                onPress={onResourcesPress}
                name="bell"
                size={25}
                color="black"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Notifications</Text>
              <Text style={styles.rowSubtitle}>
                Select the kinds of notifications you get about your activities,
                interests, and recommendations.
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
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onHelpPress} style={{flex: 1}}>
          <View style={styles.row}>
            <View style={{flex: 0.1}}>
              <Feather
                onPress={onResourcesPress}
                name="help-circle"
                size={25}
                color="black"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Help Center</Text>
              <Text style={styles.rowSubtitle}>
                Contact us for help and feedback about our services.
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
        {/* <TouchableOpacity style={{flex: 1}} onPress={onResourcesPress}>
          <View style={styles.row}>
            <View style={{flex: 0.1}}>
              <Feather
                onPress={onBackPress}
                name="more-horizontal"
                size={25}
                color="black"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.rowTitle}>Additional Resources</Text>
              <Text style={styles.rowSubtitle}>
                Check out other places for helpful information to learn more
                about Kweeble products and services
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
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

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
    flex: 0.6,
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

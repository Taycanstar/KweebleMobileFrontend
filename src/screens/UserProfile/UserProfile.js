import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserProfile} from '../../store/actions';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const UserProfile = props => {
  //   console.log('PROPS', props?.route?.params?.data);
  const data = props?.route?.params?.data;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const myId = props.route.key;

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topNav}>
        <MaterialIcons
          onPress={onBackPress}
          name="arrow-back-ios"
          size={30}
          color="white"
        />
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {data.username}
        </Text>
        <Text>{'       '}</Text>
      </View>
      <View style={styles.topWrapper}></View>
      <View style={styles.imageWrapper}>
        <Image
          source={
            data.photo
              ? {uri: data.photo}
              : require('../../../assets/images/user.png')
          }
          style={styles.profImage}
        />
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.gradeLevel}>{data.gradeLevel}</Text>
        <View style={styles.dmc}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Dm', {
                itemId: data._id,
                msgName: data.name,
              });
            }}>
            <View style={styles.dm}>
              <SimpleLineIcons
                name="envelope"
                size={25}
                color="black"
                backgroundColor={Colors.subtleGray}
              />
            </View>
          </TouchableOpacity>
        </View>

        {data.email && (
          <View>
            <View style={styles.icons}>
              <View
                style={{
                  marginLeft: 50,
                  marginRight: 40,
                  backgroundColor: 'rgba(255, 193, 0, 0.15)',
                  paddingHorizontal: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 100,
                }}>
                <MaterialCommunityIcons
                  name="email"
                  size={25}
                  color="rgba(255, 193, 0, 1)"
                />
              </View>
              <View style={styles.text}>
                <Text style={styles.infoPrimaryText}>{data.email}</Text>
                <Text style={styles.infoSecondaryText}>Email</Text>
              </View>
            </View>
          </View>
        )}
        {data.phoneNumber && (
          <View style={styles.view}>
            <View style={styles.icons}>
              <View
                style={{
                  marginLeft: 50,
                  marginRight: 40,
                  backgroundColor: 'rgba(37,211,102,0.16)',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 100,
                }}>
                <Ionicons
                  name="md-phone-portrait-outline"
                  size={25}
                  color="rgb(37, 211, 102)"
                />
              </View>
              <View style={styles.text}>
                <Text
                  style={
                    styles.infoPrimaryText
                  }>{`(${data.phoneNumber[0]}${data.phoneNumber[1]}${data.phoneNumber[2]}) ${data.phoneNumber[3]}${data.phoneNumber[4]}${data.phoneNumber[5]}-${data.phoneNumber[6]}${data.phoneNumber[7]}${data.phoneNumber[8]}${data.phoneNumber[9]}`}</Text>
                <Text style={styles.infoSecondaryText}>Phone number</Text>
              </View>
            </View>
          </View>
        )}
        {data.major && (
          <View>
            <View style={styles.icons}>
              <View
                style={{
                  marginLeft: 50,
                  marginRight: 40,
                  backgroundColor: 'rgba(0,0,128,0.15)',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 100,
                }}>
                <Ionicons name="md-school" size={25} color="rgb(0,0,128)" />
              </View>
              <View style={styles.text}>
                <Text style={styles.infoPrimaryText}>{data.major}</Text>
                <Text style={styles.infoSecondaryText}>Major</Text>
              </View>
            </View>
          </View>
        )}
        {data.interests && (
          <View>
            <View style={styles.icons}>
              <View
                style={{
                  marginLeft: 50,
                  marginRight: 40,
                  backgroundColor: 'rgba(230, 0, 35,0.15)',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 100,
                }}>
                <Ionicons
                  name="md-game-controller"
                  size={25}
                  color={'rgb(230,0,35)'}
                />
              </View>
              <View style={styles.text}>
                <Text style={styles.infoPrimaryText}>{data.interests}</Text>

                <Text style={styles.infoSecondaryText}>Interests</Text>
              </View>
            </View>
          </View>
        )}
        {data.instagram && (
          <View>
            <View style={styles.icons}>
              <View
                style={{
                  marginLeft: 50,
                  marginRight: 40,
                  backgroundColor: 'rgba(225, 48, 108,0.15)',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 100,
                }}>
                <LinearGradient
                  style={{borderRadius: 8}}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={[
                    '#5851DB',
                    '#C13584',
                    '#E1306C',
                    '#FD1D1D',
                    '#F77737',
                  ]}>
                  <Ionicons name="ios-logo-instagram" size={25} color="white" />
                </LinearGradient>
              </View>
              <View style={styles.text}>
                <Text style={styles.infoPrimaryText}>{data.instagram}</Text>
                <Text style={styles.infoSecondaryText}>Instagram</Text>
              </View>
            </View>
          </View>
        )}
        {data.snapchat && (
          <View>
            <View style={styles.icons}>
              <View
                style={{
                  marginLeft: 50,
                  marginRight: 40,
                  backgroundColor: 'rgba(255, 252, 0,0.4)',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 100,
                }}>
                {/* <FontAwesome name="snapchat-ghost" size={35} color="black" /> */}
                <MaterialCommunityIcons
                  name="snapchat"
                  size={25}
                  color="black"
                  backgroundColor="white"
                />
              </View>
              <View style={styles.text}>
                <Text style={styles.infoPrimaryText}>{data.snapchat}</Text>
                <Text style={styles.infoSecondaryText}>Snapchat</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    // width: '100%',
  },
  topNav: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
  },
  topWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    height: 100,
  },
  profImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    paddingBottom: 50,
    position: 'relative',
    top: '-70%',
    zIndex: 50,
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: -5,
    backgroundColor: Colors.white,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '48%',
    zIndex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
    marginTop: 75,
    textAlign: 'center',
  },
  imageWrapper: {
    zIndex: 10,
    flex: 1,
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  vector: {
    marginLeft: 50,
    marginRight: 40,
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 100,
  },

  userDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  infoPrimaryText: {
    color: 'black',
    flexWrap: 'wrap',
    fontWeight: '400',
  },
  infoSecondaryText: {
    color: 'gray',
    fontSize: 12,
  },
  text: {
    flex: 1,
  },
  gradeLevel: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 10,
  },
  dmc: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.subtleGray,
  },
  dm: {
    backgroundColor: Colors.subtleGray,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
});

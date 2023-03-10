import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import {useSelector} from 'react-redux';

const ECard = ({
  name,
  month,
  day,
  year,
  startTime,
  endDay,
  endTime,
  host,
  location,
  image,
  event,
  id,
  user,
}) => {
  const navigation = useNavigation();
  const data = useSelector(state => state.Reducers.userData);
  const [val, setVal] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onEventPress = () => {
    // navigation.navigate('Event', {data: event});
    console.log('ye');
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const onDelete = async () => {
    try {
      const res = await axios.delete(
        `https://kweeble.herokuapp.com/events/${id}`,
        {id},

        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  const changeModalVisible = bool => {
    setIsModalVisible(bool);
  };

  const row = option => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}>
        <Text style={{fontSize: 14, fontWeight: '400'}}>{option}</Text>
      </View>
    );
  };
  return (
    <TouchableOpacity onPress={onEventPress}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.eventImage}
          source={
            image ? {uri: image} : require('../../../assets/images/zoom.webp')
          }
        />
        <View style={styles.eventInfo}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // paddingRight: 10,
              zIndex: 20,
            }}>
            <Text style={styles.eventName}>{name}</Text>

            {/* <ModalDropdown
              // onSelect={onDelete}
              onSelect={onDelete}
              renderRow={row}
              options={optionsx}
              dropdownStyle={{
                borderColor: 'gray',
                height: '14%',
              }}>
              <View>
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={21}
                  color="black"
                />
              </View>
            </ModalDropdown> */}
            {/* <TouchableOpacity
              onPress={() => {
                changeModalVisible(!isModalVisible);
              }}>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={21}
                color="black"
              />
            </TouchableOpacity> */}
            {isModalVisible === true ? (
              <View
                style={{
                  position: 'absolute',
                  zIndex: 0,
                  left: 125,
                  top: 20,
                  // borderWidth: 1,
                  // borderColor: 'rgba(81,81,81, 0.97)',
                  borderRadius: 8,
                  backgroundColor: 'rgba(81,81,81, 0.97)',
                }}>
                <TouchableOpacity
                  onPress={user === data._id ? onDelete : onEventPress}
                  style={{
                    // backgroundColor: 'white',
                    paddingVertical: 11,
                    paddingHorizontal: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                  }}>
                  <Text
                    style={{fontSize: 14, fontWeight: '400', color: 'white'}}>
                    {user === data._id ? `Delete    🗑️` : 'Expand   📍'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    // backgroundColor: 'white',
                    paddingVertical: 11,
                    paddingHorizontal: 16,
                  }}>
                  <Text
                    style={{fontSize: 14, fontWeight: '400', color: 'white'}}>
                    Save {'      '}❤️
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={styles.locationView}>
            <Ionicons name="location-sharp" size={15} color={Colors.softRed} />
            <Text style={styles.eventLocation}>{location}</Text>
          </View>

          <View style={styles.eventDate}>
            <View style={styles.dateView}>
              <FontAwesome
                name="calendar-o"
                size={13}
                color={Colors.metaIcon}
              />
              <Text style={styles.eventDay}>
                {months[month - 1]} {day}, {year}
              </Text>
            </View>
            <View style={styles.timeView}>
              <MaterialCommunityIcons
                name="clock-time-seven-outline"
                size={15}
                color={Colors.metaIcon}
              />
              <Text style={styles.eventTime}>{startTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ECard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
    // paddingHorizontal: 15,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  eventInfo: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10,
  },
  eventDate: {
    flexDirection: 'row',
  },
  eventName: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    fontSize: 16,
    marginBottom: 10,
  },
  eventDay: {
    // color: '#F56040',
    color: Colors.metaIcon,
    marginLeft: 7,
    marginRight: 20,
  },
  eventTime: {
    // color: '#F56040',
    color: Colors.metaIcon,
    marginHorizontal: 7,
  },
  eventLocation: {
    color: Colors.softRed,
    marginBottom: 10,
    marginLeft: 5,
  },
  locationView: {
    flexDirection: 'row',
  },
  dateView: {
    flexDirection: 'row',
  },
  timeView: {
    flexDirection: 'row',
  },
});

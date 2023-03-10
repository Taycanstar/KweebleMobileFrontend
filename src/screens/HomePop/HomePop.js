import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CustomButton} from '../../components/CustomButton';
import {useDispatch} from 'react-redux';
import {Logout} from '../../store/actions';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-snap-carousel';
import {sliderData} from '../../model/data.js';
import BannerSlider from '../../components/BannerSlider';
import {windowWidth} from '../../utils/Dimensions';
import CustomSwitch from '../../components/CustomSwitch';
import ListView from '../../screens/ListView';
import MapScreen from '../../screens/MapScreen';
import EventCard from '../../components/EventCard';
import AddPopup from '../../components/AddPopup';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const HomePop = ({navigation, event}) => {
  const data = useSelector(state => state.Reducers.userData);
  const [eventsTab, setEventsTab] = useState(1);
  const dispatch = useDispatch();
  const onLogoutPressed = () => {
    //validate user
    dispatch(Logout());
  };

  const [events, setEvents] = useState([]);

  const navigation2 = useNavigation();

  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setEventsTab(value);
  };

  const onNotificationsPress = () => {
    navigation.navigate('Notifications', {title: data.name});
  };

  useEffect(() => {
    let mounted = true;
    const loadEvents = async () => {
      try {
        const {data} = await axios.get('https://kweeble.herokuapp.com/events/');
        if (mounted) {
          setEvents(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadEvents();
    return () => {
      mounted = false;
    };
  }, [events]);

  let today = new Date();
  let tomorrow = new Date();
  let yesterday = new Date();
  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);

  const filteredEvents = events.filter(e => e.datetime > yesterday.getTime());

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <View style={styles.container}>
        {/* <View style={styles.leftIcons}> */}

        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={styles.topProfilePic}
            source={
              data.photo
                ? {uri: data.photo}
                : require('../../../assets/images/user.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.topLogo}
            source={require('../../../assets/images/logoa.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNotificationsPress}>
          <Feather name="bell" size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.switchTab}>
        <CustomSwitch
          selectionMode={1}
          option1="List view"
          option2="Map view"
          onSelectSwitch={onSelectSwitch}
        />
      </View>
      <ScrollView style={styles.wrapper}>
        {eventsTab === 1 && (
          <>
            <View style={styles.upcomingTextView}>
              <Text style={styles.upcomingText}>Upcoming Events</Text>
              <TouchableOpacity onPress={() => {}}></TouchableOpacity>
              <Text style={styles.smallUpcomingText}>See all</Text>
            </View>

            <Carousel
              //   ref={c => {
              //     this._carousel = c;
              //   }}
              data={sliderData}
              renderItem={renderBanner}
              sliderWidth={windowWidth - 40}
              itemWidth={300}
              loop={true}
            />
            {filteredEvents.reverse().map((event, i) => {
              return (
                <TouchableOpacity key={i}>
                  <EventCard
                    key={i}
                    event={event}
                    name={event.name}
                    startDay={event.startDay}
                    year={event.year}
                    day={event.day}
                    month={event.month}
                    endDay={event.endDay}
                    location={event.location}
                    startTime={event.startTime}
                    endTime={event.endTime}
                    image={event.image}
                  />
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </ScrollView>
      {eventsTab === 2 && <MapScreen />}
      <AddPopup />
    </SafeAreaView>
  );
};
export default HomePop;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapper: {
    paddingHorizontal: 20,
    // paddingVertical: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 20,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  topLogo: {
    width: 35,
    height: 35,
  },
  topProfilePic: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  rightIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    // flex: 0.72,
  },
  singleLeftIcon: {marginHorizontal: 5},
  upcomingTextView: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upcomingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  smallUpcomingText: {
    color: Colors.primary,
  },
  switchTab: {
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // marginBottom: 10,
  },
});

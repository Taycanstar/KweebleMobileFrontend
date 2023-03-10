import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {CustomButton} from '../../components/CustomButton';
import {useDispatch} from 'react-redux';
import {Logout} from '../../store/actions';
import Colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-snap-carousel';
import {sliderData} from '../../model/data.js';
import {events} from '../../model/data.js';
import BannerSlider from '../../components/BannerSlider';
import {windowWidth} from '../../utils/Dimensions';
import CustomSwitch from '../../components/CustomSwitch';
import ListView from '../../screens/ListView';
import MapScreen from '../../screens/MapScreen';
import EventCard from '../../components/EventCard';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeModalScreen = ({navigation, event}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const data = useSelector(state => state.Reducers.userData);
  const [eventsTab, setEventsTab] = useState(1);
  const dispatch = useDispatch();
  const onLogoutPressed = () => {
    //validate user
    dispatch(Logout());
  };

  const navigation2 = useNavigation();

  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setEventsTab(value);
  };

  const onEventPress = () => {
    navigation.navigate('Event', {data: event});
  };

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <Modal visible={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingTop: 500,
          }}>
          <Text>Hello</Text>
        </View>
      </Modal>
      <View style={styles.container}>
        {/* <View style={styles.leftIcons}> */}

        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image style={styles.topProfilePic} source={{uri: data.photo}} />
        </TouchableOpacity>
        <Image
          style={styles.topLogo}
          source={require('../../../assets/images/logoa.png')}
        />

        <Feather name="message-square" size={30} color={'black'} />
      </View>
      <ScrollView style={styles.wrapper}>
        <View style={styles.switchTab}>
          <CustomSwitch
            selectionMode={1}
            option1="List view"
            option2="Map view"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
        {eventsTab == 1 && (
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
            {/* Come up with a list view design for events
            remember it will use a mapping function to 
            map over every event */}
            {/* <ListView /> */}
            {events.map((event, i) => {
              return (
                <TouchableOpacity onPress={onEventPress} key={i}>
                  <EventCard
                    key={i}
                    eventName={event.eventName}
                    eventTime={event.eventTime}
                    eventLocation={event.eventLocation}
                    eventDate={event.eventDate}
                    eventImage={event.eventImage}
                  />
                </TouchableOpacity>
              );
            })}
          </>
        )}

        {eventsTab == 2 && <MapScreen />}
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeModalScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    marginBottom: 10,
  },
});

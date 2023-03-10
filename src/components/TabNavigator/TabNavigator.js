import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../../screens/HomeScreen';
import MarketplaceScreen from '../../screens/MarketplaceScreen';
import NotificationScreen from '../../screens/NotificationScreen';
import ExploreScreen from '../../screens/ExploreScreen';
import SearchScreen from '../../screens/SearchScreen';
import AddEventScreen from '../../screens/AddEventScreen';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/Colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EventScreen from '../../screens/EventScreen';
import AddModal from '../AddModal';
import AddBtn from '../AddBtn';
import SettingsStack from '../../navigation/index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../CustomDrawer/';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeNavigatorScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Event" component={EventScreen} />
    </Stack.Navigator>
  );
}

function AddScreenModals() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animationEnabled: false}}>
      <Stack.Screen
        name="AddModal"
        component={AddModal}
        options={{animationEnabled: true}}
      />
    </Stack.Navigator>
  );
}

const CreateNewPlaceholder = () => (
  <View style={{flex: 1, backgroundColor: Colors.primary}} />
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: Colors.primary,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeNavigatorScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddEventScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="add-circle" size={50} color={color} />
          ),
          tabBarVisible: false,
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarBadge: 3,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="md-notifications-outline" size={30} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="shopping-outline"
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

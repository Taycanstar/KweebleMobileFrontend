import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {
  useNavigation,
  useRoute,
  NavigationState,
  getFocusedRouteNameFromRoute,
  createNavigationContainerRef,
} from '@react-navigation/native';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import {useSelector, useDispatch} from 'react-redux';
import {Init} from '../store/actions';
import {ActivityIndicator} from 'react-native-paper';
// import TabNavigator from '../components/TabNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import HomePop from '../screens/HomePop';
import EventScreen from '../screens/EventScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Terms from '../screens/Terms';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import PersonalProfileScreen from '../screens/PersonalProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SavedScreen from '../screens/SavedScreen';
import CustomDrawer from '../components/CustomDrawer';
import NotificationTabIcon from '../components/NotificationTabIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import AddModal from '../components/AddModal';
import HomeModalScreen from '../screens/HomeModalScreen/';
import EditProfileScreen from '../screens/EditProfileScreen/';
import EditPersonalDetailsScreen from '../screens/EditPersonalDetailsScreen/';
import ChangeEmailScreen from '../screens/ChangeEmailScreen/';
import ChangeUsernameScreen from '../screens/ChangeUsernameScreen/';
import ChangeBirthdayScreen from '../screens/ChangeBirthdayScreen/';
import YourAccountSettings from '../screens/YourAccountSettings/';
import NotificationsSettings from '../screens/NotificationsSettings/';
import PrivacySettings from '../screens/PrivacySettings/';
import ResourcesSettings from '../screens/ResourcesSettings/';
import VerifyPasswordScreen from '../screens/VerifyPasswordScreen/';
import Verify2 from '../screens/Verify2/';
import ChangePassword from '../screens/ChangePassword/';
import DeactivateScreen from '../screens/DeactivateScreen/';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchScreen from '../screens/SearchScreen';
import AddEventScreen from '../screens/AddEventScreen';
import EditEventScreen from '../screens/EditEventScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MessagesScreen from '../screens/MessagesScreen';
import Chat from '../screens/Chat';
import ChatScreen2 from '../screens/ChatScreen2';
import AddMembersScreen from '../screens/AddMembersScreen';
import DmScreen from '../screens/DmScreen';
import AddProductScreen from '../screens/AddProductScreen';
import ConfirmOtp from '../screens/ConfirmOtp';
import NewGroupScreen from '../screens/NewGroupScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GroupChatScreen from '../screens/GroupChatScreen';
import GroupChatInfo from '../screens/GroupChatInfo';
import EditGroupScreen from '../screens/EditGroupScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProductScreen from '../screens/ProductScreen';
import ScopeSignupScreen from '../screens/ScopeSignupScreen';
import CreateScopeScreen from '../screens/CreateScopeScreen';
import HelpCenter from '../screens/HelpCenterScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import ManageMods from '../screens/ManageMods';
import ExploreScreen from '../screens/ExploreScreen';
import OtherUserProfile from '../screens/OtherUserProfile/';
import ScopeScreen from '../screens/ScopeScreen';
import ManageMembers from '../screens/ManageMembers/';
import EditScopeDetailsScreen from '../screens/EditScopeDetailsScreen/';
import CustomRepeat from '../screens/CustomRepeat';
import SingleCategory from '../screens/SingleCategory';
import NewListing from '../screens/NewListing';
import AddPopup from '../components/AddPopup/';
import RepeatPopup from '../components/RepeatPopup/';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CategoriesPopup from '../components/CategoriesPopup';
import NewChatPopup from '../components/NewChatPopup';
import TabBarItem from '../components/TabBarItem';
import axios from 'axios';

export const navigationRef = createNavigationContainerRef();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
// const Stack = createSharedElementStackNavigator();
const Drawer = createDrawerNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ScopeSignup" component={ScopeSignupScreen} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="ConfirmOtp" component={ConfirmOtp} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

function AddScreenModals() {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{headerShown: false, animationEnabled: true}}>
      <Stack.Screen
        name="AddPopup"
        component={AddPopup}
        options={{
          headerShown: false,
          animationEnabled: false,
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen name="AddEvent" component={AddEventScreen} />
      <Stack.Screen name="Event" component={EventScreen} />
      <Stack.Screen name="CustomRepeat" component={CustomRepeat} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="Event" component={EventScreen} />
      <Stack.Screen name="EditEvent" component={EditEventScreen} />
    </Stack.Navigator>
  );
}

function MarketplaceStack() {
  return (
    <Stack.Navigator
      initialRouteName="Marketplace"
      screenOptions={{headerShown: false, animationEnabled: true}}>
      <Stack.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{
          headerShown: false,
          animationEnabled: false,
          // animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen name="NewListing" component={NewListing} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="SingleCategory" component={SingleCategory} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
}

const MainStack = props => {
  const route = props?.routeName;

  return (
    <Stack.Navigator
      routeName={route}
      // mode="modal"
      screenOptions={{
        animationEnabled: false,
        headerShown: false,

        cardStyle: {backgroundColor: 'transparent'},
      }}>
      {/* <Stack.Screen name="MyStack" component={TabNavigator} /> */}
      <Stack.Screen name="MyStack">
        {props => <TabNavigator {...props} routeName={route} />}
      </Stack.Screen>
      <Stack.Screen
        name="Modal"
        component={AddScreenModals}
        options={{animationEnabled: true}}
      />
      <Stack.Screen name="HomeDraw" component={MyStack} />
    </Stack.Navigator>
  );
};

const PersonalProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PersonalProfile"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="PersonalProfile" component={PersonalProfileScreen} /> */}
      <Stack.Screen name="PersonalProfile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen
        name="EditPersonalDetails"
        component={EditPersonalDetailsScreen}
      />
      <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
      <Stack.Screen name="ChangeUsername" component={ChangeUsernameScreen} />
      <Stack.Screen name="ChangeBirthday" component={ChangeBirthdayScreen} />
    </Stack.Navigator>
  );
};

export const SettingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen
        name="YourAccountSettings"
        component={YourAccountSettings}
      />
      <Stack.Screen name="PrivacySettings" component={PrivacySettings} />
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="ResourcesSettings" component={ResourcesSettings} />
      <Stack.Screen name="VerifyPassword" component={VerifyPasswordScreen} />
      <Stack.Screen name="Verify2" component={Verify2} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Deactivate" component={DeactivateScreen} />
    </Stack.Navigator>
  );
};

function HomeNavigatorScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen name="Event" component={EventScreen} />
      <Stack.Screen name="EditEvent" component={EditEventScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={({route}) => ({
          tabBarVisible: route.state && route.state.index === 0,
        })}
      />

      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />
      <Stack.Screen name="ScopeScreen" component={ScopeScreen} />
      <Stack.Screen name="ManageMods" component={ManageMods} />
      <Stack.Screen name="ManageMembers" component={ManageMembers} />

      <Stack.Screen
        name="EditScopeDetailsScreen"
        component={EditScopeDetailsScreen}
      />
    </Stack.Navigator>
  );
}

function AddEventStack() {
  return (
    <Stack.Navigator
      initialRouteName="AddEvent"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AddEvent" component={AddEventScreen} />
      <Stack.Screen name="CustomRepeat" component={CustomRepeat} />
    </Stack.Navigator>
  );
}

function MessagesStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Messages "
        options={({navigation}) => ({
          headerBackTitleVisible: true,
          headerLeft: () => (
            <MaterialIcons
              onPress={() => navigation.goBack()}
              name="arrow-back-ios"
              size={25}
              color="black"
            />
          ),
          headerRight: () => (
            <Feather
              onPress={() => navigation.navigate('NewChat')}
              name="edit"
              size={25}
              color="black"
            />
          ),
        })}
        component={MessagesScreen}
      />
      <Stack.Screen
        name="Dm"
        component={DmScreen}
        options={({route, navigation}) => ({
          title: route.params.msgName,
          headerBackTitleVisible: false,
          headerShown: true,
          headerLeft: () => (
            <MaterialIcons
              onPress={() => navigation.navigate('Messages ')}
              name="arrow-back-ios"
              size={25}
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        mode="modal"
        name="NewChat"
        component={NewChatPopup}
        options={({route}) => ({
          title: 'New Chat',
          headerBackTitleVisible: false,
          headerShown: false,
          animation: 'slide_from_bottom',
        })}
      />
      <Stack.Screen
        name="AddMembers"
        component={AddMembersScreen}
        options={({route}) => ({
          title: 'Add members',
          headerBackTitleVisible: false,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="NewGroup"
        component={NewGroupScreen}
        options={({route}) => ({
          title: 'New Group',
          headerBackTitleVisible: false,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="GroupChatScreen"
        component={GroupChatScreen}
        options={({route, navigation}) => ({
          title: null,
          headerBackTitleVisible: false,
          headerShown: false,
          headerLeft: () => (
            <>
              <View style={{marginRight: 15}}>
                <MaterialIcons
                  onPress={() => navigation.navigate('Messages')}
                  name="arrow-back-ios"
                  size={25}
                  color={Colors.primary}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('GroupChatInfo', {
                    groupName: route.params.name,
                    photo: route.params.photo,
                    members: route.params.members,
                    groupId: route.params.groupId,
                  })
                }
                style={{
                  width: '93%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    marginRight: 8,
                    width: 40,
                    height: 40,
                    borderRadius: 50 / 2,
                  }}
                  source={
                    route.params.photo
                      ? {uri: route.params.photo}
                      : require('../../assets/images/user.png')
                  }
                />
                <Text
                  style={{
                    color: Colors.Black,
                    fontWeight: '600',
                    fontSize: 18,
                    // paddingTop: 8,
                  }}>
                  {route.params.groupName}
                </Text>
              </TouchableOpacity>
            </>
          ),
        })}
      />
      <Stack.Screen
        name="GroupChatInfo"
        component={GroupChatInfo}
        options={({route}) => ({
          title: 'New Group',
          headerBackTitleVisible: false,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="EditGroup"
        component={EditGroupScreen}
        options={({route}) => ({
          title: 'Edit Group Group',
          headerBackTitleVisible: false,
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

const MyStack = () => {
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        drawerLabelStyle: {marginLeft: -25},
        fontSize: 15,
        fontWeight: 700,
        drawerActiveBackgroundColor: Colors.primary,
        drawerActiveTintColor: Colors.white,
        drawerInactiveTintColor: '#333',
      }}>
      <Drawer.Screen
        name="Home "
        component={TabNavigator}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        })}
      />
      <Drawer.Screen
        name="Profile"
        component={PersonalProfileStack}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="bookmark-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Create a scope"
        component={CreateScopeScreen}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="google-circles-communities"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
const TabNavigator = props => {
  const route = props?.routeName;

  return (
    <Tab.Navigator
      screenOptions={{
        animationEnabled: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: Colors.primary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigatorScreen}
        options={({route}) => ({
          // tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" size={25} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Add"
        component={AddEventStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="add-circle" size={45} color={color} />
          ),
          animationEnabled: true,
          animation: 'slide_from_bottom',
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search" size={25} color={color} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Messages"
        component={MessagesStack}
        options={{
          // tabBarBadge: 3,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbubbles-outline" size={30} color={color} />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name="Notifications"
        initialParams={{notis: 3}}
        component={NotificationScreen}
        options={{
          // tabBarBadge: 0,
          tabBarIcon: ({color, size}) => (
            // <Feather name="bell" size={30} color={color} />
            <NotificationTabIcon color={color} route={route} />
            // <TabBarItem />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name="MarketplaceStack"
        component={MarketplaceStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="shopping-outline"
              size={25}
              color={color}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
  // };
};

const Navigation = () => {
  const token = useSelector(state => state.Reducers.authToken);
  const [routeName, setRouteName] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
    setLoading(false);
  };

  // if you add [], then it will call only one when load

  useEffect(() => {
    init();
  });

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator animation={true} size="large" color="#0078d7" />
      </View>
    );
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setRouteName(navigationRef.getCurrentRoute().name);
      }}
      onStateChange={async () => {
        const previousRouteName = routeName;
        const currentRouteName = navigationRef.getCurrentRoute().name;

        setRouteName(currentRouteName);
      }}>
      {token === null ? <AuthStack /> : <MyStack routeName={routeName} />}
    </NavigationContainer>
  );
};

export default Navigation;

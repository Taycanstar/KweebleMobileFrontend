import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExploreScreen from '../ExploreScreen';
import UserProfile from '../UserProfile';
import OtherUserProfile from '../OtherUserProfile';
import MessagesScreen from '../MessagesScreen';
import ScopeScreen from '../ScopeScreen';
import EventScreen from '../EventScreen';
import ManageMods from '../ManageMods';
import ManageMembers from '../ManageMembers';
import EditScopeDetailsScreen from '../EditScopeDetailsScreen';
import DmScreen from '../DmScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />
      <Stack.Screen name="ScopeScreen" component={ScopeScreen} />
      <Stack.Screen name="ManageMods" component={ManageMods} />
      <Stack.Screen name="ManageMembers" component={ManageMembers} />

      <Stack.Screen
        name="EditScopeDetailsScreen"
        component={EditScopeDetailsScreen}
      />
      {/* 
      <Stack.Screen name="Event" component={EventScreen} /> */}
      {/* <Stack.Screen name="UserProfile" component={UserProfile} /> */}
      <Stack.Screen
        name="Dm"
        component={DmScreen}
        options={({route}) => ({
          title: route.params.msgName,
          headerBackTitleVisible: false,
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

const MsgStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      {/* <Stack.Screen name="Messages" component={MessagesScreen} /> */}
      <Stack.Screen
        name="Chat"
        component={DmScreen}
        // options={({navigation}) => ({
        //   headerBackTitleVisible: true,
        //   headerLeft: () => (
        //     <MaterialIcons
        //       onPress={() => navigation.goBack()}
        //       name="arrow-back-ios"
        //       size={25}
        //       color="black"
        //     />
        //   ),
        // })}
        options={({route}) => ({
          title: route.params.name,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

const SearchScreen = props => {
  return <SearchStack />;
};

export default SearchScreen;

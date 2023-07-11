/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {EventProvider} from './src/contexts/EventContext';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
LogBox.ignoreLogs([
  'Animated.event now requires a second argument for options',
]);

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  StatusBar,
} from 'react-native';

import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './src/navigation';
import Test from './src/screens/Test';
const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1, width: '100%'}}>
      <Provider store={store}>
        <EventProvider>
          <StatusBar barStyle="dark-content" />
          <Navigation />
        </EventProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: '#fff',
  },
});

export default App;

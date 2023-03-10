import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Text} from 'react-native';

import {Feather} from 'react-native-vector-icons/Feather';

const renderBadge = ({badgeProps, counter}) => (
  <View style={styles.badge}>
    <Text style={styles.notificationText}>{counter}</Text>
  </View>
);

function TabBarItem({notificationCount, badgeProps, icon, label, color}) {
  let counter = 1;

  switch (icon) {
    case 'apps':
      counter = notificationCount.apps;
      break;
    case 'navigate':
      counter = notificationCount.navigation;
      break;
    case 'person':
      counter = notificationCount.profile;
      break;
    default:
      counter = 0;
  }

  return (
    <View style={styles.container}>
      {counter > 0 && renderBadge({counter, badgeProps})}
      <View style={styles.iconContainer}>
        <Feather name="bell" size={30} color={color} />
        <Text style={{color, ...styles.label}}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  badge: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 100 / 2,
  },
});

const mapStateToProps = state => ({
  notificationCount: {
    apps: state.apps.notificationCount,
    navigation: state.navigation.notificationCount,
    profile: state.profile.notificationCount,
  },
});

export default connect(mapStateToProps)(TabBarItem);

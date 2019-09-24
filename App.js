import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import MainMenu from './screens/MainMenu'

// Instalar todo con yarn
// excepto react-navigation (npm)

function App() {
  return (
    <View style={styles.container}>
      <AppContainer/>
    </View>
  );
}

const AppNavigator = createStackNavigator({
  MainMenu: {screen: MainMenu},
  // NewColumn: {screen: NewColumn},
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainMenu  from './screens/MainMenu'
import NewColumn from './screens/NewColumn'
import NewCore from './screens/NewCore'
import ColumnGallery  from './screens/ColumnGallery'
import CoreGallery  from './screens/CoreGallery'
import Settings from './screens/Settings'
import AboutLithoDex  from './screens/AboutLithoDex'


// Instalar todo con yarn
// excepto react-navigation (npm)

// Asegura que Android y Computador esten en
// la misma senal wifi

function App() {
  return (
    <View style={styles.container}>
      <AppContainer/>
    </View>
  );
}

// App envuelta con React-Navigator
const AppNavigator = createStackNavigator({
  MainMenu: {
    screen: MainMenu,
    navigationOptions: {
      title: 'Menu',
      backgroundColor: 'transparent',
    },
  },
  NewColumn: {
    screen: NewColumn,
    navigationOptions: {
      title: 'Nueva columna',
      backgroundColor: 'transparent',
    },
  },
  ColumnGallery: {
    screen: ColumnGallery,
    navigationOptions: {
      title: 'Galería de columnas',
      backgroundColor: 'transparent',
    },
  },
  NewCore: {
    screen: NewCore,
    navigationOptions: {
      title: 'Nuevo núcleo',
      backgroundColor: 'transparent',
    },
  },
  CoreGallery: {
    screen: CoreGallery,
    navigationOptions: {
      title: 'Galería de núcleos',
      backgroundColor: 'transparent',
    },
  },
  AboutLithoDex: {
    screen: AboutLithoDex,
    navigationOptions: {
      title: 'Sobre LithoDex',
      backgroundColor: 'transparent',
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Configuración',
      backgroundColor: 'transparent',
    },
  },
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

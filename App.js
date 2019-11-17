import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import reducer from './reducers/reducers'

import { Constants } from 'expo'

import MainMenu  from './screens/MainMenu'
import NewColumn from './screens/NewColumn'
import ColumnScreen  from './screens/ColumnScreen'
import NewCore from './screens/NewCore'
import ColumnGallery  from './screens/ColumnGallery'
import CoreGallery  from './screens/CoreGallery'
import Settings from './screens/Settings'
import AboutLithoDex  from './screens/AboutLithoDex'

import * as Log from './log/functions'
import * as Database from './database/functions'

// React-Navigator
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
  ColumnScreen: {
    screen: ColumnScreen,
    navigationOptions: {
      title: 'Crear columna',
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

// Store de Redux
const store = createStore(reducer)


export default class App extends Component {

  componentWillMount(){
    // const clear_db = Log.clear_app()
    const log_entry = Log.open_app()
  }

  componentDidMount(){
    // const default_user = Database.new_user()
  }

  render() {
    
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


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

import PouchDB from 'pouchdb-react-native'

import * as Log from './log/functions'

// Instalar todo con yarn
// excepto react-navigation,
//         react-native-picker-checkbox
//         shortid
// Para esos usa npm install <paquete> --save
// Si async-storage no se instala, revisa
// https://github.com/react-native-community/async-storage

// Este proyecto se desarrolló con Expo
// Asegura que Android y Computador esten en
// la misma senal wifi

// Si aún no funciona, haz port forwarding para
// el puerto de exp:... que sale en el CLI

// Problemas con expo 
// https://github.com/expo/expo/issues/1381

// El mejor Redux tutorial
// https://daveceddia.com/redux-tutorial/


// PouchDB
const db = new PouchDB('lithodex')

// Si no hay 'default' como objeto DATABASE,
// lo crea
db.get('default').then(function(database){
  return db.put({
    _id: 'default',
    _rev: database._rev,
    log: database.log.push(Log.open_app())
  })
}).catch(function (error) {
  console.log(error)
  db.put({
    _id: 'default',
    log: [Log.open_app()]
  })
  console.log(Log.open_app())
})
  


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

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MainMenu from './components/MainMenu'

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function App() {
  return (
    <View style={styles.container}>
      <MainMenu/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigator from './navigation/AppNavigator'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()



export default function App() {
  return (
    <Provider store={store}>
        <AuthNavigator/>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

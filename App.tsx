// @refresh reset
import React, {useState , useEffect} from 'react';
import { StyleSheet, Text,LogBox, View } from 'react-native';
import AuthNavigator from './navigation/AuthNavigator'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import {socket} from './socket'
import * as Notifications from 'expo-notifications'

LogBox.ignoreAllLogs();

const store = configureStore()

const loadFonts = () => Font.loadAsync({
  'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
  'OpenSans-Light': require('./assets/fonts/OpenSans-Regular.ttf')
})

Notifications.setNotificationHandler({
  handleNotification : async () => {
    return {
      shouldPlaySound : true,
      shouldShowAlert : true,
    }
  }
})





export default function App() {
  const [isFontsLoaded, setIsFontsLoaded] = React.useState(false)

 

  if (!isFontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onError={() => console.log('Error opening Fonts!')}
        onFinish={() => setIsFontsLoaded(true)}
      />
    )
  }

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

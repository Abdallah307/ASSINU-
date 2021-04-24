// @refresh reset
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigator from './navigation/AuthNavigator'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import * as firebase from 'firebase'
import 'firebase/firestore'

const store = configureStore()

const loadFonts = () => Font.loadAsync({
  'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
  'OpenSans-Light': require('./assets/fonts/OpenSans-Regular.ttf')
})

const firebaseConfig = {
  apiKey: "AIzaSyBIKpnNCt2LarGq91z0Q-Da8CUVQd6613g",
  authDomain: "assinu-chating.firebaseapp.com",
  projectId: "assinu-chating",
  storageBucket: "assinu-chating.appspot.com",
  messagingSenderId: "895176148380",
  appId: "1:895176148380:web:860408468aacedc094b459"
};
// Initialize Firebase
if (firebase.apps.length === 0)
firebase.initializeApp(firebaseConfig);


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
      <AuthNavigator />
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

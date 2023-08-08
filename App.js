import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './navigations/Tabs';
import { LoginContext } from './Helper/Context';
import Login from './components/Login';
import { useState } from 'react';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }} >

      {loggedIn ? (
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      ) : (<Login />)}
    </LoginContext.Provider>
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

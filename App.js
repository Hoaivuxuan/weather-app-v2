/** @format */

import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './screens/BottomTab';
// import HomeScreen from "./screens/HomeScreen";

export default function App() {
   return (
      <GestureHandlerRootView style={{flex: 1}}>
         <NavigationContainer>
            <BottomTab />
         </NavigationContainer>
      </GestureHandlerRootView>
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

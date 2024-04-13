/** @format */

import {useState} from 'react';
import HomeScreen from './HomeScreen/HomeScreen';
import LocationScreen from './HomeScreen/LocationScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function MyStack() {
   const [city, setCity] = useState('Hanoi');
   return (
      <Stack.Navigator
         initialRouteName='HomeScreen'
         screenOptions={{
            headerShown: false,
         }}
      >
         <Stack.Screen name='HomeScreen'>
            {(props) => <HomeScreen {...props} setCity={setCity} city={city} />}
         </Stack.Screen>
         <Stack.Screen name='LocationScreen'>{(props) => <LocationScreen {...props} setCity={setCity} />}</Stack.Screen>
      </Stack.Navigator>
   );
}

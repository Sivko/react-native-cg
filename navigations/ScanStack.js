import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Slot from '../screens/Slot';
import Scan from '../screens/Scan';

const Scaner = createNativeStackNavigator();

export default function ScanerScreens() {
  return (
    <Scaner.Navigator>
      <Scaner.Screen
        options={{ headerShown: false }}
        name="Scaner"
        component={Scan} />
      <Scaner.Screen name="Место" component={Slot} />
    </Scaner.Navigator>
  );
}
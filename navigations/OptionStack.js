import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OptionScreen from '../screens/Option';

const Option = createNativeStackNavigator();

export default function OptionStack() {
  return (
    <Option.Navigator>
      <Option.Screen
        options={{ headerShown: false }}
        name="Настройки"
        component={OptionScreen} />
    </Option.Navigator>
  );
}
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddInvoices from '../screens/AddInvoices';
import AddInvoice from '../screens/AddInvoice';
import Slot from '../screens/Slot';
import Invoces from '../screens/Invoces';
import uploadInvocesSlots from '../requests/upload/uploadInvocesSlots';

const SettingsStack = createNativeStackNavigator();

export default function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        options={{ headerShown: false }}
        name="AddInvoices"
        component={AddInvoices} />
      <SettingsStack.Screen
        name="Оформить"
        component={AddInvoice}
      />
      <SettingsStack.Screen name="Место" component={Slot} />
      <SettingsStack.Screen
        name="Квитанции"
        component={Invoces}
        options={() => ({
          headerRight: () => <Button title="Отправить" onPress={()=>uploadInvocesSlots()} />
        })}
      />
    </SettingsStack.Navigator>
  );
}
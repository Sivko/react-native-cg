import * as React from 'react';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddInvoicesStack from './AddInvoicesStack';
import DownloadFlights from '../screens/DownloadFlights';
import ScanScreens from './ScanStack';
import OptionStack from './OptionStack';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Принять места":
              return <AntDesign
                name="dropbox"
                size={size}
                color={color}
              />
            case "Зарузить рейсы":
              return <Entypo
                name='grid'
                size={size}
                color={color}
              />
            case "Сканировать рейсы":
              return <AntDesign
                name='barcode'
                size={size}
                color={color}
              />
            case "Настройки":
              return <Ionicons
                name='options'
                size={size}
                color={color}
              />
          }
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#207aff',
      })}
    >
      <Tab.Screen name="Принять места" component={AddInvoicesStack} />
      <Tab.Screen name="Зарузить рейсы" component={DownloadFlights} />
      <Tab.Screen name="Сканировать рейсы" component={ScanScreens} />
      <Tab.Screen name="Настройки" component={OptionStack} />
    </Tab.Navigator>
  );
}

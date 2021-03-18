import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screen/Home';
import Camera from './src/screen/Camera';
import DropdownKodepos from './src/screen/DropdownKodepos';
import GoToCamera from './src/components/GoToCamera';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="GoToCamera" component={GoToCamera} />
        <Stack.Screen name="DropdownKodepos" component={DropdownKodepos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

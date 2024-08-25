import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import DailiesScreen from './screens/DailiesScreen';
import ProfileScreen from './screens/ProfileScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StepProvider } from './contexts/StepContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StepProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Dailies" component={DailiesScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </StepProvider>
    </SafeAreaProvider>
  );
}

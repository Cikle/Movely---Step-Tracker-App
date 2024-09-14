import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ChallengesScreen from './screens/ChallengesScreen';
import ProfileScreen from './screens/ProfileScreen';
import { StepProvider } from './contexts/StepContext';
import { CaloriesProvider } from './contexts/CaloriesContext'; // Import CaloriesContext
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Font from 'expo-font';

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'gotham-black': require('./fonts/Gotham-Black.otf'),
        'gotham-bold': require('./fonts/Gotham-Bold.otf'),
        'gotham-thin': require('./fonts/Gotham-Thin.otf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading component
  }

  return (
    <StepProvider>
      <CaloriesProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: {
                backgroundColor: '#121212',
                borderTopColor: 'transparent',
              },
              tabBarActiveTintColor: '#FFFAFA',
              tabBarInactiveTintColor: 'rgba(245, 245, 245, 0.7)',
              tabBarIcon: ({ color, size }) => {
                let iconName: string = '';

                switch (route.name) {
                  case 'Home':
                    iconName = 'home';
                    break;
                  case 'Challenges':
                    iconName = 'event';
                    break;
                  case 'Profile':
                    iconName = 'person';
                    break;
                  default:
                    iconName = 'help';
                    break;
                }

                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: '' }} />
            <Tab.Screen name="Challenges" component={ChallengesScreen} options={{ title: '' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: '' }} />
          </Tab.Navigator>
        </NavigationContainer>
      </CaloriesProvider>
    </StepProvider>
  );
}

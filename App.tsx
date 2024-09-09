import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import DailiesScreen from './screens/DailiesScreen';
import ProfileScreen from './screens/ProfileScreen';
import { StepProvider } from './contexts/StepContext';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <StepProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false, // Hide headers
            tabBarStyle: {
              backgroundColor: '#121212', // Dark background for tab bar
              borderTopColor: 'transparent', // Remove top border
            },
            tabBarActiveTintColor: '#FFFAFA', // Active tab icon color
            tabBarInactiveTintColor: 'rgba(245, 245, 245, 0.7)', // 70% opacity Inactive tab icon color
            tabBarIcon: ({ color, size }) => {
              // Initialize iconName as an empty string
              let iconName: string = '';

              // Determine icon based on route name
              switch (route.name) {
                case 'Home':
                  iconName = 'home';
                  break;
                case 'Dailies':
                  iconName = 'event'; // Example icon, you can choose different ones
                  break;
                case 'Profile':
                  iconName = 'person';
                  break;
                default:
                  iconName = 'help'; // Default icon if no match found
                  break;
              }

              // Return the icon component
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: '' }}
          />
          <Tab.Screen
            name="Dailies"
            component={DailiesScreen}
            options={{ title: '' }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: '' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </StepProvider>
  );
}

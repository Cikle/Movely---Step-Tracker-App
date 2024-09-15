import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ChallengesScreen from './screens/ChallengesScreen';
import ProfileScreen from './screens/ProfileScreen';
import { StepProvider } from './contexts/StepContext';
import { CaloriesProvider } from './contexts/CaloriesContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'gotham-black': require('./fonts/Gotham-Black.otf'),
        'gotham-bold': require('./fonts/Gotham-Bold.otf'),
        'gotham-thin': require('./fonts/Gotham-Thin.otf'),
      });
      setFontsLoaded(true);
    };

    const checkFirstLaunch = async () => {
      try {
        const isLaunched = await AsyncStorage.getItem('isLaunched');
        if (isLaunched === null) {
          setIsFirstLaunch(true);
          setModalVisible(true);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
    };

    loadFonts();
    checkFirstLaunch();
  }, []);

  const handleSubmit = async () => {
    if (name.trim() === '' || username.trim() === '') {
      Alert.alert('Error', 'Please enter both name and username');
      return;
    }

    try {
      await AsyncStorage.setItem('isLaunched', 'true');
      setModalVisible(false);
      // Save user data or perform further actions here
      console.log('Name:', name);
      console.log('Username:', username);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  if (!fontsLoaded) {
    return null; // or a loading component
  }

  return (
    <StepProvider>
      <CaloriesProvider>
        <NavigationContainer>
          <StatusBar style="light" />
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

          {/* Modal for first-time user input */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Welcome!</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username"
                  value={username}
                  onChangeText={setUsername}
                />
                <Button title="Submit" onPress={handleSubmit} />
              </View>
            </View>
          </Modal>
        </NavigationContainer>
      </CaloriesProvider>
    </StepProvider>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#C1C1C1',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    color: '#FFF',
  },
});

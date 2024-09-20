# Movely, The Step Tracker App

## Overview

The Step Tracker App is a mobile application developed using React Native and Expo, designed to help users track their daily steps, set challenges, and monitor their activity. The app features an intuitive user interface and utilizes the MVVM architecture to separate data, logic, and presentation for better maintainability.

## Features

- Track daily step counts
- Set and manage challenges
- User-friendly interface
- Gestures and animations for an enhanced experience
- Local storage for user data using AsyncStorage
- Integration with sensor data for step counting

## Installation

### Prerequisites

1. **Node.js**: Install Node.js if you haven't already.
2. **Expo CLI**: Install Expo CLI globally to run the React Native app:
   
   ```bash
   npm install -g expo-cli

Clone the Repository

Clone the repository or download the project as a ZIP:

bash

git clone [https://github.com/yourusername/step-tracker-app.git](https://github.com/Cikle/Movely.git)

Navigate to the project directory:

bash

cd step-tracker-app

Install Dependencies

Install the required packages:

bash

npm install

Install Additional Dependencies

To use the Accelerometer and other libraries, install the following:

bash

expo install expo-sensors
expo install @react-native-async-storage/async-storage
expo install lottie-react-native
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

Start the Application

Start the app:

bash

expo start

Technologies Used

    React Native: For building the mobile app
    Expo: For easy development and deployment
    React Navigation: For navigation between screens
    Lottie: For animations
    AsyncStorage: For local data storage
    Expo Sensors: For accessing device sensors

Usage

    Open the app on your device or simulator.
    Start walking to track your steps.
    Access the challenges screen to view and manage your step challenges.
    Monitor your profile and view your step statistics.

Future Improvements

    Implement user authentication
    Add social sharing features
    Introduce more detailed analytics on user activity

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import StepsCounter from '../components/StepsCounter';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            <StepsCounter />
            {/* Add your profile content here */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        color: '#ffffff',
    },
});

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import { useSteps } from '../contexts/StepContext';

const ProfileScreen = () => {
    const { steps, activity, resetSteps } = useSteps();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>Total Steps: {steps}</Text>
            <Text style={styles.subtitle}>Current Activity: {activity}</Text>
            <Button title="Reset Steps" onPress={resetSteps} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        fontWeight: 'bold',
        color: "#ffffff",
    },
    subtitle: {
        fontSize: 20,
        color: '#e0e0e0',
        marginTop: 10,
    },
});

export default ProfileScreen;

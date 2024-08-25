import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useSteps } from '../contexts/StepContext';

const DailiesScreen = () => {
    const { steps, activity } = useSteps();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Daily Challenges</Text>
            <Text style={styles.subtitle}>Current Step Count: {steps}</Text>
            <Text style={styles.subtitle}>Current Activity: {activity}</Text>
            {/* Here you can add more UI for daily challenges */}
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

export default DailiesScreen;

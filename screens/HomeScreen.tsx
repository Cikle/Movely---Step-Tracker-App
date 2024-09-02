import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useSteps } from '../contexts/StepContext';

const HomeScreen = () => {
    const { steps, activity } = useSteps();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Movely</Text>
            <View style={styles.infoContainer}>
                <View style={styles.stepsContainer}>
                    <Text style={styles.stepsText}>{steps}</Text>
                    <Text style={styles.stepsLabel}>Steps</Text>
                </View>
                <Text style={styles.activityText}>{activity}</Text>
            </View>
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
    infoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    stepsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    stepsText: {
        fontSize: 36,
        color: '#bb86fc',
        fontWeight: 'bold',
        marginRight: 8,
    },
    stepsLabel: {
        fontSize: 24,
        color: '#e0e0e0',
    },
    activityText: {
        fontSize: 20,
        color: '#ffffff',
        fontStyle: 'italic',
    },
});

export default HomeScreen;
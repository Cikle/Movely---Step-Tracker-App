import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSteps } from '../contexts/StepContext';

const StepsCounter: React.FC = () => {
    const { steps } = useSteps();

    return (
        <View style={styles.container}>
            <Text style={styles.stepsText}>{steps}</Text>
            <Text style={styles.stepsLabel}>Steps</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
});

export default StepsCounter;

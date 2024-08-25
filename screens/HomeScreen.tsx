import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import StepsCounter from '../components/StepsCounter';
import { useSteps } from '../contexts/StepContext';

export default function HomeScreen() {
    const { setSteps } = useSteps();
    const [isCounting, setIsCounting] = useState<boolean>(false);
    const [lastY, setLastY] = useState<number>(0);
    const [lastTimestamp, setLastTimestamp] = useState<number>(0);

    useEffect(() => {
        let subscription: { remove: () => void } | undefined;

        Accelerometer.isAvailableAsync().then((result: boolean) => {
            if (result) {
                subscription = Accelerometer.addListener((accelerometerData) => {
                    const { y } = accelerometerData;
                    const threshold = 0.1;
                    const timestamp = new Date().getTime();

                    if (
                        Math.abs(y - lastY) > threshold &&
                        !isCounting &&
                        (timestamp - lastTimestamp > 800)
                    ) {
                        setIsCounting(true);
                        setLastY(y);
                        setLastTimestamp(timestamp);

                        setSteps((prevSteps) => prevSteps + 1);
                        setTimeout(() => {
                            setIsCounting(false);
                        }, 1200);
                    }
                });
            } else {
                console.log('Accelerometer not available on this device');
            }
        });

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, [isCounting, lastY, lastTimestamp, setSteps]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Movely</Text>
            <StepsCounter />
            {/* Add additional home screen content here */}
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
        marginBottom: 20,
        fontWeight: 'bold',
        color: "#ffffff",
    },
});

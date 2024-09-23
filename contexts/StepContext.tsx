import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Accelerometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Asked ChatGPT: "why does my App crash whenever I try to launch it in expo?", which it then fixed (At the start of the project)

interface StepContextProps {
    steps: number;
    activity: string;
    resetSteps: () => void;
}

const StepContext = createContext<StepContextProps | undefined>(undefined);

export const StepProvider = ({ children }: { children: ReactNode }) => {
    const [steps, setSteps] = useState<number>(0);
    const [activity, setActivity] = useState<string>('Standing');
    const [lastY, setLastY] = useState<number>(0);
    const [lastTimestamp, setLastTimestamp] = useState<number>(0);
    const [timeIntervals, setTimeIntervals] = useState<number[]>([]);
    const [lastMovementTime, setLastMovementTime] = useState<number>(Date.now());

    // Load steps from AsyncStorage on mount
    useEffect(() => {
        const loadSteps = async () => {
            try {
                const savedSteps = await AsyncStorage.getItem('steps');
                if (savedSteps !== null) {
                    setSteps(Number(savedSteps));
                }
            } catch (error) {
                console.error('Failed to load steps from AsyncStorage:', error);
            }
        };
        loadSteps();
    }, []);

    // Save steps to AsyncStorage when steps state changes
    useEffect(() => {
        const saveSteps = async () => {
            try {
                await AsyncStorage.setItem('steps', steps.toString());
            } catch (error) {
                console.error('Failed to save steps to AsyncStorage:', error);
            }
        };
        saveSteps();
    }, [steps]);

    // Accelerometer setup and step counting logic
    useEffect(() => {
        Accelerometer.setUpdateInterval(100);

        const subscription = Accelerometer.addListener(accelerometerData => {
            const { x, y, z } = accelerometerData;

            const magnitude = Math.sqrt(x * x + y * y + z * z);

            // Activity detection logic
            const currentTimestamp = Date.now();
            if (magnitude > 1.2) {
                const interval = currentTimestamp - lastTimestamp;
                if (interval > 250) {
                    setSteps(prevSteps => prevSteps + 1);
                    setLastTimestamp(currentTimestamp);
                    setLastMovementTime(currentTimestamp);
                    setActivity('Walking');
                }
            } else {
                if (currentTimestamp - lastMovementTime > 3000) { // If theres no movement for 3 seconds the activity schanges to standing
                    setActivity('Standing'); // Update to Standing
                }
            }

            setLastY(y);
        });

        return () => {
            subscription.remove();
        };
    }, [lastY, lastTimestamp, lastMovementTime]);

    const resetSteps = () => setSteps(0);

    return (
        <StepContext.Provider value={{ steps, activity, resetSteps }}>
            {children}
        </StepContext.Provider>
    );
};

export const useSteps = (): StepContextProps => {
    const context = useContext(StepContext);
    if (!context) {
        throw new Error('useSteps must be used within a StepProvider');
    }
    return context;
};

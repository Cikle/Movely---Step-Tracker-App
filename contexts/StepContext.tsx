import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Accelerometer } from 'expo-sensors';

interface StepContextProps {
    steps: number;
    activity: string;
    resetSteps: () => void;
}

const StepContext = createContext<StepContextProps | undefined>(undefined);

export const StepProvider = ({ children }: { children: ReactNode }) => {
    const [steps, setSteps] = useState<number>(0);
    const [lastY, setLastY] = useState<number>(0);
    const [lastTimestamp, setLastTimestamp] = useState<number>(0);
    const [activity, setActivity] = useState<string>('Standing');
    const [timeIntervals, setTimeIntervals] = useState<number[]>([]);
    const [lastMovementTime, setLastMovementTime] = useState<number>(Date.now());

    const alpha = 0.9; // Filter smoothing factor
    const lowPassFilter = (value: number, lastValue: number) => alpha * lastValue + (1 - alpha) * value;

    // Time after which activity should be considered "Standing" if no movement
    const inactivityTimeout = 3000; // 3 seconds of inactivity to consider "Standing"
    const stepIntervalThreshold = 300; // Minimum interval between steps in milliseconds

    useEffect(() => {
        const subscription = Accelerometer.addListener((accelerometerData) => {
            const { x, y, z } = accelerometerData;
            const filteredY = lowPassFilter(y, lastY);
            const magnitude = Math.sqrt(x * x + filteredY * filteredY + z * z);
            const timestamp = Date.now();

            // Step detection threshold
            const stepThreshold = 1.25;

            if (magnitude > stepThreshold && (timestamp - lastTimestamp > stepIntervalThreshold)) {
                setLastY(filteredY);
                setLastTimestamp(timestamp);
                setLastMovementTime(timestamp); // Update the last movement timestamp

                setSteps((prevSteps) => prevSteps + 1);

                // Calculate the time interval between this and the last step
                const interval = timestamp - lastTimestamp;
                setTimeIntervals((prevIntervals) => [...prevIntervals.slice(-9), interval]); // Keep the last 10 intervals

                // Calculate steps per second based on recent intervals
                if (timeIntervals.length > 0) {
                    const avgInterval = timeIntervals.reduce((a, b) => a + b, 0) / timeIntervals.length;
                    const stepsPerSecond = 1000 / avgInterval;

                    // Classify the activity
                    if (stepsPerSecond >= 2.8) {
                        setActivity('Running');
                    } else if (stepsPerSecond >= 1.8) {
                        setActivity('Jogging');
                    } else if (stepsPerSecond >= 0.5) {
                        setActivity('Walking');
                    } else {
                        setActivity('Standing');
                    }
                }
            }
        });

        Accelerometer.setUpdateInterval(100); // Update every 100ms for faster detection

        // Check if user has been inactive for a period (3 seconds)
        const inactivityCheck = setInterval(() => {
            if (Date.now() - lastMovementTime > inactivityTimeout) {
                setActivity('Standing');
                setTimeIntervals([]); // Clear the intervals if no movement is detected
            }
        }, 1000); // Check inactivity every 1 second

        return () => {
            subscription.remove();
            clearInterval(inactivityCheck);
        };
    }, [lastY, lastTimestamp, timeIntervals, lastMovementTime]);

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

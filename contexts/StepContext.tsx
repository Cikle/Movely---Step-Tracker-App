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
    const [isCounting, setIsCounting] = useState<boolean>(false);
    const [lastY, setLastY] = useState<number>(0);
    const [lastTimestamp, setLastTimestamp] = useState<number>(0);
    const [activity, setActivity] = useState<string>('Standing');
    const [timeIntervals, setTimeIntervals] = useState<number[]>([]);

    const alpha = 0.9; // Filter smoothing factor
    const lowPassFilter = (value: number, lastValue: number) => alpha * lastValue + (1 - alpha) * value;

    useEffect(() => {
        let subscription: ReturnType<typeof Accelerometer.addListener> | undefined;
        Accelerometer.setUpdateInterval(50); // Update every 50ms for faster detection

        Accelerometer.isAvailableAsync().then((result: boolean) => {
            if (result) {
                subscription = Accelerometer.addListener((accelerometerData) => {
                    const { x, y, z } = accelerometerData;
                    const filteredY = lowPassFilter(y, lastY);
                    const magnitude = Math.sqrt(x * x + filteredY * filteredY + z * z);
                    const timestamp = new Date().getTime();

                    // Step detection threshold
                    const stepThreshold = 1.2;

                    if (
                        magnitude > stepThreshold &&
                        !isCounting &&
                        (timestamp - lastTimestamp > 250) // Reduce delay for faster updates
                    ) {
                        setIsCounting(true);
                        setLastY(filteredY);

                        // Calculate the time interval between this and the last step
                        const interval = timestamp - lastTimestamp;
                        setTimeIntervals(prevIntervals => [...prevIntervals.slice(-9), interval]); // Keep the last 10 intervals
                        setLastTimestamp(timestamp);

                        setSteps((prevSteps) => prevSteps + 1);
                        setTimeout(() => {
                            setIsCounting(false);
                        }, 20); // Delay to avoid overcounting, adjusted for faster updates

                        // Calculate steps per second based on recent intervals
                        if (timeIntervals.length > 0) {
                            const avgInterval = timeIntervals.reduce((a, b) => a + b, 0) / timeIntervals.length;
                            const stepsPerSecond = 1000 / avgInterval;

                            // Classify the activity
                            if (stepsPerSecond >= 3) {
                                setActivity('Running');
                            } else if (stepsPerSecond >= 2.5) {
                                setActivity('Jogging');
                            } else if (stepsPerSecond >= 1.5) {
                                setActivity('Walking');
                            } else if (stepsPerSecond >= 0.5) {
                                setActivity('Standing');
                            }
                        }
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
    }, [isCounting, lastY, lastTimestamp, timeIntervals]);

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

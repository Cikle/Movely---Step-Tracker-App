import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSteps } from './StepContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CaloriesContextType {
    calories: number;
}

const CaloriesContext = createContext<CaloriesContextType | undefined>(undefined);

export const CaloriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { steps } = useSteps();
    const [calories, setCalories] = useState<number>(0);

    useEffect(() => {
        const calculatedCalories = Math.floor(steps * 0.04);
        setCalories(calculatedCalories);
    }, [steps]);

    useEffect(() => {
        // Save calories to AsyncStorage / Could've just calculated it but idk
        const saveCalories = async () => {
            try {
                await AsyncStorage.setItem('calories', calories.toString());
            } catch (error) {
                console.error('Failed to save calories to AsyncStorage', error);
            }
        };

        saveCalories();
    }, [calories]);

    return (
        <CaloriesContext.Provider value={{ calories }}>
            {children}
        </CaloriesContext.Provider>
    );
};

export const useCalories = (): CaloriesContextType => {
    const context = useContext(CaloriesContext);
    if (!context) {
        throw new Error('useCalories must be used within a CaloriesProvider');
    }
    return context;
};

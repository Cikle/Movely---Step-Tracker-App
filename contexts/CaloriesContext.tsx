import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSteps } from './StepContext';

interface CaloriesContextProps {
    calories: number;
}

const CaloriesContext = createContext<CaloriesContextProps | undefined>(undefined);

export const CaloriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { steps } = useSteps();
    const [calories, setCalories] = useState<number>(0);

    useEffect(() => {
        // Calculate calories based on steps and count only full numbers
        const calculatedCalories = Math.floor(steps * 0.04);
        setCalories(calculatedCalories);
    }, [steps]);

    return (
        <CaloriesContext.Provider value={{ calories }}>
            {children}
        </CaloriesContext.Provider>
    );
};

export const useCalories = (): CaloriesContextProps => {
    const context = useContext(CaloriesContext);
    if (!context) {
        throw new Error('useCalories must be used within a CaloriesProvider');
    }
    return context;
};

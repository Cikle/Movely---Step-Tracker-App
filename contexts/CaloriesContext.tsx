// contexts/CaloriesContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSteps } from './StepContext'; // Assuming you already have StepContext

interface CaloriesContextType {
    calories: number;
}

const CaloriesContext = createContext<CaloriesContextType | undefined>(undefined);

export const CaloriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { steps } = useSteps();  // Access steps from StepContext
    const [calories, setCalories] = useState<number>(0);

    useEffect(() => {
        // 0.04 calories per step, round to full number
        const calculatedCalories = Math.floor(steps * 0.04);
        setCalories(calculatedCalories);
    }, [steps]);

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

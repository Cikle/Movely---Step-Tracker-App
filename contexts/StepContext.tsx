import React, { createContext, useState, ReactNode } from 'react';

interface StepContextType {
    steps: number;
    setSteps: React.Dispatch<React.SetStateAction<number>>;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [steps, setSteps] = useState<number>(0);

    return (
        <StepContext.Provider value={{ steps, setSteps }}>
            {children}
        </StepContext.Provider>
    );
};

export const useSteps = () => {
    const context = React.useContext(StepContext);
    if (context === undefined) {
        throw new Error('useSteps must be used within a StepProvider');
    }
    return context;
};

// challenges.ts
import { useState, useEffect } from 'react';

export interface Challenge {
    title: string;
    goal: number;
    progress: number;
    isUnlocked: boolean;
    claimed?: boolean; // Add this line
}


const initialChallenges: Challenge[] = [
    { title: 'Daily Challenge', goal: 10, progress: 0, isUnlocked: false },
    { title: 'Weekly Challenge', goal: 20, progress: 0, isUnlocked: false },
    { title: 'Monthly Challenge', goal: 30, progress: 0, isUnlocked: false },
];

export const useChallenges = (steps: number) => {
    const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);

    useEffect(() => {
        const updatedChallenges = challenges.map(challenge => {
            let progress = challenge.progress;
            if (challenge.isUnlocked) {
                progress = Math.min(challenge.goal, progress + steps);
            } else {
                progress = Math.min(challenge.goal, steps);
                if (progress >= challenge.goal) {
                    challenge.isUnlocked = true;
                }
            }
            return { ...challenge, progress };
        });

        setChallenges(updatedChallenges);
    }, [steps]);

    const updateChallengeProgress = (newChallenges: Challenge[]) => {
        setChallenges(newChallenges);
    };

    return { challenges, updateChallengeProgress };
};
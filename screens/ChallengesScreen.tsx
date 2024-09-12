import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Alert } from 'react-native';
import ChallengeComponent from '../components/ChallengeComponent';
import { useSteps } from '../contexts/StepContext';

const dailyGoal = 10;
const weeklyGoal = 20;
const monthlyGoal = 30;

const ChallengesScreen = () => {
    const { steps } = useSteps();
    const [challenges, setChallenges] = useState([
        { title: 'Daily Challenge', goal: dailyGoal, progress: 0, isUnlocked: false },
        { title: 'Weekly Challenge', goal: weeklyGoal, progress: 0, isUnlocked: false },
        { title: 'Monthly Challenge', goal: monthlyGoal, progress: 0, isUnlocked: false },
    ]);

    useEffect(() => {
        // Calculate progress for each challenge
        const updatedChallenges = challenges.map(challenge => {
            const progress = calculateChallengeProgress(challenge.title, steps);
            return {
                ...challenge,
                progress,
                isUnlocked: progress >= challenge.goal,
            };
        });
        setChallenges(updatedChallenges);
    }, [steps]);

    const calculateChallengeProgress = (title: string, steps: number) => {
        switch (title) {
            case 'Daily Challenge':
                return steps;
            case 'Weekly Challenge':
                return steps; // For simplicity, using total steps here; adjust as needed
            case 'Monthly Challenge':
                return steps; // Similarly, adjust for monthly tracking if needed
            default:
                return 0;
        }
    };

    const handleClaim = (title: string) => {
        Alert.alert('Claimed!', `You have claimed EXP for completing the ${title}.`);
        // You can add additional logic to handle the reward here
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {challenges.map((challenge, index) => (
                    <ChallengeComponent
                        key={index}
                        {...challenge}
                        onClaim={handleClaim}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
});

export default ChallengesScreen;
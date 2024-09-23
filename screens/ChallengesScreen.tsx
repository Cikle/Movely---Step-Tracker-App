import React from 'react';
import { StyleSheet, View, FlatList, Vibration } from 'react-native'; // Import Vibration
import { useSteps } from '../contexts/StepContext';
import { useChallenges, Challenge } from '../utils/challenges';
import ChallengeComponent from '../components/ChallengeComponent';

const ChallengesScreen = () => {
    const { steps } = useSteps();
    const { challenges, updateChallengeProgress } = useChallenges(steps);

    const handleClaim = (title: string) => {
        const updatedChallenges = challenges.map(challenge => {
            if (challenge.title === title && challenge.isUnlocked && !challenge.claimed) {
                Vibration.vibrate(300); // Vibrate for 300ms
                return { ...challenge, claimed: true };
            }
            return challenge;
        });
        updateChallengeProgress(updatedChallenges);
    };

    const renderChallengeItem = ({ item }: { item: Challenge }) => (
        <ChallengeComponent
            title={item.title}
            goal={item.goal}
            progress={item.progress}
            isUnlocked={item.isUnlocked}
            onClaim={handleClaim}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={challenges}
                renderItem={renderChallengeItem}
                keyExtractor={(item) => item.title}
                style={styles.challengesList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: '20%',
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    challengesList: {
        width: '90%',
    },
});

export default ChallengesScreen;

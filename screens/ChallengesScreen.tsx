import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSteps } from '../contexts/StepContext';
import { useChallenges, Challenge } from '../utils/challenges';
import ChallengeComponent from '../components/ChallengeComponent'; // Adjust path as needed

const ChallengesScreen = () => {
    const { steps } = useSteps();
    const { challenges, updateChallengeProgress } = useChallenges(steps);

    const handleClaim = (title: string) => {
        const updatedChallenges = challenges.map(challenge => {
            if (challenge.title === title && challenge.isUnlocked && !challenge.claimed) {
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
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    challengesList: {
        width: '100%',
    },
});

export default ChallengesScreen;

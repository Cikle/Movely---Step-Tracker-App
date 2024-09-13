import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

interface Challenge {
    title: string;
    goal: number;
    progress: number;
    isUnlocked: boolean;
    onClaim: (title: string) => void;
}

const ChallengeComponent: React.FC<Challenge> = ({ title, goal, progress, isUnlocked, onClaim }) => {
    const [claimed, setClaimed] = useState(false);
    const progressPercentage = (progress / goal) * 100;

    const handleClaim = () => {
        if (isUnlocked && !claimed) {
            onClaim(title);
            setClaimed(true); // Update claim state
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.progress}>
                {isUnlocked
                    ? claimed
                        ? `You've already made ${goal} steps`
                        : `You've successfully made ${progress} steps`
                    : `Current progress: ${progress} / ${goal} steps`}
            </Text>


            <TouchableOpacity
                style={[
                    styles.progressBarContainer,
                    !isUnlocked && styles.lockedButton,
                    claimed && styles.claimedButton, // Apply dark background when claimed
                ]}
                disabled={!isUnlocked || claimed} // Disable if not unlocked or already claimed
                onPress={handleClaim}
            >
                <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
                {claimed ? (
                    <Text style={styles.claimedText}>Claimed</Text>
                ) : isUnlocked ? (
                    <View style={styles.claimContent}>
                        <Icon name="unlock" size={20} color="#FFF" style={styles.icon} />
                        <Text style={styles.claimText}>Claim EXP</Text>
                    </View>
                ) : (
                    <Icon name="lock" size={20} color="#FFF" style={styles.icon2} />
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#333',
        borderRadius: 8,
        borderColor: '#444',
        borderWidth: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    progress: {
        fontSize: 16,
        color: '#CCC',
        marginVertical: 5,
    },
    progressBarContainer: {
        height: 40, // Increased height for better visibility
        backgroundColor: '#444',
        borderRadius: 10,
        marginTop: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center', // Center items horizontally
        position: 'relative',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#CCC', // Changed color for visibility
        position: 'absolute',
        top: 0,
        left: 0,
    },
    lockedButton: {
        backgroundColor: '#555', // Color when locked
    },
    claimedButton: {
        backgroundColor: '#121212', // Dark background when claimed
    },
    lockedText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14, // Adjust font size for better visibility
    },
    claimContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon2: {
        marginRight: 0, // Space between icon and text
    },
    icon: {
        marginRight: 10, // Space between icon and text
    },
    claimText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    claimedText: {
        color: '#FFF', // Ensure text is visible on dark background
        fontWeight: 'bold',
    },
});

export default ChallengeComponent;

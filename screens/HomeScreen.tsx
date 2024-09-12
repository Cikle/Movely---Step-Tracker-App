import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import { useSteps } from '../contexts/StepContext';
import streetAnimation from '../assets/Street_Animation.json'; // Adjust path if needed
import { StackNavigationProp } from '@react-navigation/stack'; // Import for navigation typing
import { useNavigation } from '@react-navigation/native'; // Import for navigation

const { width, height } = Dimensions.get('window'); // Get screen width and height

// Define the type for your navigation stack
type RootStackParamList = {
  Home: undefined;
  Challenges: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const animationSpeeds: { [key: string]: number } = {
    Standing: 0.0, // Set to 0 to stop animation
    Walking: 1.0,
    Jogging: 1.5,
    Running: 2.0
};

// Define Challenge type
interface Challenge {
    title: string;
    goal: number;
    progress: number;
    isUnlocked: boolean;
}

// Sample data for challenges
const sampleChallenges: Challenge[] = [
    { title: 'Daily Steps', goal: 5000, progress: 3500, isUnlocked: true },
    { title: 'Weekly Steps', goal: 30000, progress: 15000, isUnlocked: true },
    { title: 'Monthly Steps', goal: 100000, progress: 75000, isUnlocked: true }
];

const HomeScreen = () => {
    const { steps, activity } = useSteps();
    const animationRef = useRef<LottieView>(null); // Create a ref to control the animation
    const navigation = useNavigation<HomeScreenNavigationProp>(); // Correctly type the navigation
    const calories = 200; // Example calorie count, update as needed

    // Ensure activity is a valid key for animationSpeeds
    const speed = animationSpeeds[activity as keyof typeof animationSpeeds] || 1.0; // Default to 1.0 if activity is not recognized

    useEffect(() => {
        if (animationRef.current) {
            if (activity === 'Standing') {
                animationRef.current.pause(); // Pause animation if standing
            } else {
                animationRef.current.play(); // Play animation for other activities
            }
        }
    }, [activity]);

    useEffect(() => {
        if (animationRef.current && activity !== 'Standing') {
            animationRef.current.play(); // Ensure animation is playing based on speed change and activity
        }
    }, [speed]);

    const handleNavigateToChallenges = () => {
        navigation.navigate('Challenges'); // Navigate to the ChallengesScreen
    };

    // Render each challenge with type annotation
    const renderChallengeItem = ({ item }: { item: Challenge }) => (
        <View style={styles.challengeItem}>
            <Text style={styles.challengeTitle}>{item.title}</Text>
            <Text style={styles.challengeProgress}>
                {item.progress} / {item.goal} steps
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.borderContainer}>
                <Text style={styles.caloriesText}>{calories} kcal</Text>
                <View style={styles.stepCounterContainer}>
                    <Text style={styles.stepsTodayText}>steps today</Text>
                    <Text style={styles.stepsText}>{steps}</Text>
                </View>
                <LottieView
                    ref={animationRef}
                    source={streetAnimation}
                    autoPlay
                    loop
                    speed={speed}
                    style={styles.animation}
                />
            </View>
            <TouchableOpacity style={styles.challengesBox} onPress={handleNavigateToChallenges}>
                <Text style={styles.challengesTitle}>Current Challenges</Text>
                <FlatList
                    data={sampleChallenges}
                    renderItem={renderChallengeItem}
                    keyExtractor={(item) => item.title}
                    style={styles.challengesList}
                    scrollEnabled={false} // Prevent scrolling within the challenges box
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    borderContainer: {
        borderWidth: 2, // Border width for the container
        borderColor: '#FFFAFA', // Border color for the container
        borderTopWidth: 2, // Keep the top border
        borderLeftWidth: 2, // Keep the left border
        borderRightWidth: 2, // Keep the right border
        borderBottomWidth: 0, // Remove the bottom border
        borderRadius: 0, // No border radius
        width: width, // Full screen width
        height: height * 0.4, // Adjust height as needed, for example, 40% of the screen height
        marginBottom: 20,
        overflow: 'hidden', // Hide overflow to ensure clean borders
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        position: 'relative', // Relative position to contain absolutely positioned children
    },
    caloriesText: {
        position: 'absolute', // Position absolutely to place at the top-left corner
        top: 10, // Adjust top position as needed
        left: 10, // Adjust left position as needed
        fontSize: 12,
        color: '#FFFAFA',
        fontWeight: 'bold',
        zIndex: 2, // Ensure calorie counter is on top
    },
    stepCounterContainer: {
        position: 'absolute', // Position absolutely within the borderContainer
        top: 50, // Adjust to position above the animation
        alignItems: 'center',
        zIndex: 2, // Ensure step counter is on top
    },
    stepsTodayText: {
        fontSize: 12,
        color: '#e0e0e0',
        marginBottom: -1,
    },
    stepsText: {
        fontSize: 25,
        color: '#FFFAFA',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    stepsLabel: {
        fontSize: 24,
        color: '#e0e0e0',
    },
    animation: {
        width: '100%',
        aspectRatio: 2,
        position: 'absolute', // Ensure animation stays within its container
        bottom: 0, // Align to bottom of the container
        zIndex: 1, // Ensure animation is below the step counter
    },
    challengesBox: {
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        marginBottom: 20,
    },
    challengesTitle: {
        fontSize: 18,
        color: '#FFFAFA',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    challengesList: {
        width: '100%',
    },
    challengeItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    challengeTitle: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
    challengeProgress: {
        fontSize: 14,
        color: '#CCC',
    },
});

export default HomeScreen;

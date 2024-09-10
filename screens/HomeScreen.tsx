import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { useSteps } from '../contexts/StepContext';
import streetAnimation from '../assets/Street_Animation.json'; // Adjust path if needed

const { width } = Dimensions.get('window'); // Get screen width

const animationSpeeds: { [key: string]: number } = {
    Standing: 0.0, // Set to 0 to stop animation
    Walking: 1.0,
    Jogging: 1.5,
    Running: 2.0
};

const HomeScreen = () => {
    const { steps, activity } = useSteps();
    const animationRef = useRef<LottieView>(null); // Create a ref to control the animation

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

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Movely</Text>
            <View style={styles.infoContainer}>
                <View style={styles.stepsContainer}>
                    <Text style={styles.stepsText}>{steps}</Text>
                    <Text style={styles.stepsLabel}>Steps</Text>
                </View>
                <Text style={styles.activityText}>{activity}</Text>
            </View>
            <LottieView
                ref={animationRef} // Attach the ref to the LottieView
                source={streetAnimation}
                autoPlay
                loop
                speed={speed} // Adjust animation speed based on activity
                style={[styles.animation, { width }]} // Set width to screen width
            />
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
    title: {
        fontSize: 28,
        marginBottom: 20,
        fontWeight: 'bold',
        color: "#FFFAFA",
    },
    infoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    stepsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    stepsText: {
        fontSize: 36,
        color: '#FFFAFA',
        fontWeight: 'bold',
        marginRight: 8,
    },
    stepsLabel: {
        fontSize: 24,
        color: '#e0e0e0',
    },
    activityText: {
        fontSize: 20,
        color: '#FFFAFA',
        fontStyle: 'italic',
    },
    animation: {
        width: '100%',
        aspectRatio: 2,
    }
});

export default HomeScreen;
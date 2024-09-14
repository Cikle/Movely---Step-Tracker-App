import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import { useSteps } from '../contexts/StepContext';
import { useChallenges, Challenge } from '../utils/challenges';
import streetAnimation from '../assets/Street_Animation.json';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window'); //Get screen width and height

type RootStackParamList = {
    Home: undefined;
    Challenges: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// animation speed
const animationSpeeds: { [key: string]: number } = {
    Standing: 0.0,
    Walking: 1.0,
    Jogging: 1.5,
    Running: 2.0
};

const HomeScreen = () => {
    const { steps, activity } = useSteps();
    const { challenges, updateChallengeProgress } = useChallenges(steps);
    const animationRef = useRef<LottieView>(null);
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const calories = 200;

    const speed = animationSpeeds[activity as keyof typeof animationSpeeds] || 1.0; // Default to 1.0 if activity is not recognized

    useEffect(() => {
        if (animationRef.current) {
            if (activity === 'Standing') {
                animationRef.current.pause();
            } else {
                animationRef.current.play();
            }
        }
    }, [activity]);

    useEffect(() => {
        if (animationRef.current && activity !== 'Standing') {
            animationRef.current.play();
        }
    }, [speed]);

    const handleNavigateToChallenges = () => {
        navigation.navigate('Challenges');
    };

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
                <View style={styles.leftCornerLine} />
                <View style={styles.rightCornerLine} />
            </View>
            <TouchableOpacity style={styles.challengesBox} onPress={handleNavigateToChallenges}>
                <Text style={styles.challengesTitle}>Current Challenges</Text>
                <FlatList
                    data={challenges}
                    renderItem={renderChallengeItem}
                    keyExtractor={(item) => item.title}
                    style={styles.challengesList}
                    scrollEnabled={false}
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
        borderWidth: 1,
        borderColor: '#FFFAFA',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 0,
        borderRadius: 0,
        width: width,
        height: height * 0.4,
        marginBottom: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    caloriesText: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 12,
        color: '#FFFAFA',
        fontWeight: 'bold',
        zIndex: 2,
    },
    stepCounterContainer: {
        position: 'absolute',
        top: 90,
        alignItems: 'center',
        zIndex: 2,
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
    animation: {
        width: '80%',
        aspectRatio: 2,
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
    },
    leftCornerLine: {
        position: 'absolute',
        bottom: 70,
        left: -40,
        width: 200,
        height: 1,
        backgroundColor: '#FFFAFA',
        transform: [{ rotate: '-50deg' }], // Angle upwards and inwards
    },
    rightCornerLine: {
        position: 'absolute',
        bottom: 70,
        right: -40,
        width: 200,
        height: 1,
        backgroundColor: '#FFFAFA',
        transform: [{ rotate: '50deg' }], // Angle upwards and inwards
    },
    challengesBox: {
        marginTop: 20,
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#C1C1C1',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        marginBottom: 20,
    },
    challengesTitle: {
        fontSize: 18,
        color: '#FFFAFA',
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft: 10,
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
    claimButton: {
        marginTop: 5,
        backgroundColor: '#4CAF50',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    claimedButton: {
        backgroundColor: '#9E9E9E',
    },
    claimButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default HomeScreen;

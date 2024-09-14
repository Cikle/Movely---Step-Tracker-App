import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSteps } from '../contexts/StepContext'; // Import useSteps
import { useCalories } from '../contexts/CaloriesContext'; // Import useCalories

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
    const { steps, resetSteps } = useSteps();
    const { calories } = useCalories();

    const allTimeSteps = 10000;
    const allTimeCalories = Math.floor(allTimeSteps * 0.04);

    const badges = [
        require('../assets/badges/badge1.png'),
        require('../assets/badges/badge2.png'),
        require('../assets/badges/badge3.png'),
    ];

    const [showAllBadges, setShowAllBadges] = React.useState(false);

    const displayedBadges = showAllBadges ? badges : badges.slice(0, 3);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/profile-pic.jpg')} style={styles.profileImage} />

            <View style={styles.infoWrapper}>
                <View style={styles.infoContainer}>
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>John Doe</Text>
                        <Text style={styles.username}>@johndoe</Text>
                        <Text style={styles.joinDate}>Joined: January 2023</Text>
                        <View style={styles.streakContainer}>
                            <FontAwesome name="star" size={18} color="#FFF" />
                            <Text style={styles.streakNumber}>7-day</Text>
                            <Text style={styles.streakLabel}>🔥 Streak</Text>
                        </View>
                    </View>

                    <View style={styles.badgesContainer}>
                        <Text style={styles.badgesTitle}>Badges</Text>
                        <View style={styles.badgesRow}>
                            {displayedBadges.map((badge, index) => (
                                <Image key={index} source={badge} style={styles.badge} />
                            ))}
                        </View>
                        {badges.length > 3 && (
                            <TouchableOpacity onPress={() => setShowAllBadges(!showAllBadges)} style={styles.showMoreButton}>
                                <Text style={styles.showMoreText}>{showAllBadges ? 'Show Less' : 'Show More'}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.infoSeparator} />
            </View>

            <ScrollView contentContainerStyle={styles.statsContainer}>
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <FontAwesome name="print" size={30} color="#FFF" style={styles.statIcon} />
                        <View style={styles.statTextContainer}>
                            <Text style={styles.statsNumber}>{steps}</Text>
                            <Text style={styles.statsLabel}>Today's Steps</Text>
                        </View>
                    </View>
                    <View style={styles.statItem}>
                        <FontAwesome name="trophy" size={30} color="#FFF" style={styles.statIcon} />
                        <View style={styles.statTextContainer}>
                            <Text style={styles.statsNumber}>{allTimeSteps}</Text>
                            <Text style={styles.statsLabel}>All-Time Steps</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <FontAwesome name="fire" size={30} color="#FFF" style={styles.statIcon} />
                        <View style={styles.statTextContainer}>
                            <Text style={styles.statsNumber}>{calories} kcal</Text>
                            <Text style={styles.statsLabel}>Today's Calories Burnt</Text>
                        </View>
                    </View>
                    <View style={styles.statItem}>
                        <FontAwesome name="fire" size={30} color="#FFF" style={styles.statIcon} />
                        <View style={styles.statTextContainer}>
                            <Text style={styles.statsNumber}>{allTimeCalories} kcal</Text>
                            <Text style={styles.statsLabel}>All-Time Calories Burnt</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.resetButton} onPress={resetSteps}>
                    <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    profileImage: {
        width: width,
        height: height * 0.33,
        resizeMode: 'cover',
    },
    infoWrapper: {
        width: '100%',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    userInfo: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1,
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF',
    },
    username: {
        fontSize: 18,
        color: '#FFF',
    },
    joinDate: {
        fontSize: 16,
        color: '#FFF',
    },
    streakContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    streakNumber: {
        fontSize: 22,
        color: '#FFF',
        marginHorizontal: 5,
    },
    streakLabel: {
        fontSize: 16,
        color: '#FFF',
    },
    infoSeparator: {
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    badgesContainer: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#C1C1C1',
        padding: 10,
        width: 150,
        alignItems: 'center',
    },
    badgesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        paddingRight: 5,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    badgesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    badge: {
        width: 30,
        height: 30,
        margin: 5,
    },
    showMoreButton: {
        marginTop: 10,
    },
    showMoreText: {
        fontSize: 16,
        color: '#007BFF',
    },
    statsContainer: {
        paddingTop: 20,
        width: '100%',
        alignItems: 'center',
        paddingBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#C1C1C1',
        padding: 10,
        width: width * 0.4,
    },
    statIcon: {
        marginRight: 10,
    },
    statTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    statsNumber: {
        fontSize: 22,
        color: '#FFF',
        marginBottom: 5,
    },
    statsLabel: {
        fontSize: 14,
        color: '#FFF',
    },
    resetButton: {
        backgroundColor: '#CCC',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    resetButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;

import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSteps } from '../contexts/StepContext';
import { useCalories } from '../contexts/CaloriesContext';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
    const { steps, resetSteps } = useSteps();
    const { calories } = useCalories();

    const allTimeSteps = 10000; // Example value
    const allTimeCalories = Math.floor(allTimeSteps * 0.04);

    const streak = 7; // Example streak value

    const badges = [
        require('../assets/badges/badge1.png'),
        require('../assets/badges/badge2.png'),
        require('../assets/badges/badge3.png'),
        require('../assets/badges/badge1.png'),
        require('../assets/badges/badge2.png'),
    ];

    const [modalVisible, setModalVisible] = useState(false);

    const handleBadgesPress = () => {
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Image source={require('../assets/profile-pic.jpg')} style={styles.profileImage} />

                <View style={styles.infoWrapper}>
                    <View style={styles.infoContainer}>
                        <View style={styles.userInfo}>
                            <Text style={styles.name}>John Doe</Text>
                            <Text style={styles.username}>@johndoe</Text>
                            <Text style={styles.joinDate}>Joined: January 2023</Text>
                        </View>

                        <TouchableOpacity onPress={handleBadgesPress} style={styles.badgesContainer}>
                            <Text style={styles.badgesTitle}>Badges</Text>
                            <View style={styles.badgesRow}>
                                {badges.slice(0, 3).map((badge, index) => (
                                    <Image key={index} source={badge} style={styles.badge} />
                                ))}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoSeparator} />
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsRowFullWidth}>
                        <View style={styles.statItemFullWidth}>
                            <FontAwesome name="star" size={30} color="#FFF" style={styles.statIcon} />
                            <View style={styles.statTextContainer}>
                                <Text style={styles.statsNumber}>{streak}</Text>
                                <Text style={styles.statsLabel}>Streak</Text>
                            </View>
                        </View>
                    </View>
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
                    <View style={styles.statsRowFullWidth}>
                        <View style={styles.statItemFullWidth}>
                            <FontAwesome name="database" size={30} color="#FFF" style={styles.statIcon} />
                            <View style={styles.statTextContainer}>
                                <Text style={styles.statsNumber}>{JSON.stringify({ steps, calories })}</Text>
                                <Text style={styles.statsLabel}>JSON Data</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.resetButton} onPress={resetSteps}>
                        <Text style={styles.resetButtonText}>Reset Steps</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Badges</Text>
                            <View style={styles.modalBadgesContainer}>
                                {badges.map((badge, index) => (
                                    <Image key={index} source={badge} style={styles.modalBadge} />
                                ))}
                            </View>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
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
        fontFamily: 'gotham-black',
        color: '#FFF',
    },
    username: {
        fontFamily: 'gotham-thin',
        fontSize: 18,
        color: '#FFF',
    },
    joinDate: {
        paddingTop: 5,
        fontSize: 16,
        fontFamily: 'gotham-thin',
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
        fontFamily: 'gotham-black',
        color: '#FFF',
        paddingRight: 5,
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
    statsContainer: {
        paddingTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    statsRowFullWidth: {
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
    statItemFullWidth: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#C1C1C1',
        padding: 10,
        width: '100%',
    },
    statIcon: {
        marginRight: 10,
    },
    statTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    statsNumber: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 5,
        fontFamily: 'gotham-black',
    },
    statsLabel: {
        fontSize: 16,
        color: '#FFF',
        fontFamily: 'gotham-thin',
    },
    resetButton: {
        backgroundColor: '#C1C1C1',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    resetButtonText: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'gotham-thin',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#121212',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: width * 0.8,
    },
    modalTitle: {
        fontSize: 24,
        color: '#FFF',
        fontFamily: 'gotham-black',
        marginBottom: 10,
    },
    modalBadgesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    modalBadge: {
        width: 50,
        height: 50,
        margin: 5,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#C1C1C1',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: {
        color: '#000',
        fontFamily: 'gotham-thin',
    },
});

export default ProfileScreen;

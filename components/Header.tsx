import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const Header: React.FC<{ title: string; onPressSettings?: () => void; }> = ({ title, onPressSettings }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            {onPressSettings && (
                <TouchableOpacity style={styles.settingsButton} onPress={onPressSettings}>
                    <Icon name="cog" size={20} color="#FFF" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        flex: 1,
        textAlign: 'center',
    },
    settingsButton: {
        position: 'absolute',
        right: 15,
    },
});

export default Header;

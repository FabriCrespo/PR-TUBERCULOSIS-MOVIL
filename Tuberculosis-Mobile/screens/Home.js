import React, { useContext } from 'react';
import { Button, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import { UserContext } from '../contexts/UserContext';


const Home = ({ navigation }) => {
    const { user } = useContext(UserContext);
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Bienvenid@: {user.nombres}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('UserInfo', { id: 1 })}
            >
                <Text style={styles.buttonText}>Mi informacion</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Camera')}
            >
                <Text style={styles.buttonText}>Grabar video</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Tutorial')}
            >
                <Text style={styles.buttonText}>Tutorial</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#4CAF50', // Color verde
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Sombra en Android
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333', // Color de texto oscuro
        marginBottom: 30, // Espacio entre el texto y los botones
        textAlign: 'center',
    },
});

export default Home;

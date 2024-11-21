import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button
                title="Go to User Info"
                onPress={() => navigation.navigate('UserInfo', { id: 1 })} // Navegar y pasar el id como parámetro
            />
            <Button
                title="Go to Camera"
                onPress={() => navigation.navigate('Camera')}
            />
            <Button
                title="Tutorial"
                onPress={() => navigation.navigate('Tutorial')}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;

import React, { useState } from 'react';
import { API_URL } from '@env';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import userImage from '../assets/usuario.png'
export default function LoginScreen({ navigation }) {
  const [carnet_identidad, setCi] = useState('')

  // Metodo LogIn
  const handleLogIn = () => {
    //Alert.alert(user, pass)
    fetch(`${API_URL}/loginmobile`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ ci: carnet_identidad }),
      }).then(response => response.json())
      .then(data => {
        if (data.message === 'Login successful') {
          navigation.navigate('Home');
        }
        else {
          Alert.alert('Error', 'Paciente no encontrado');

        }
      }).catch(error => { console.error('Error:', error); });
  };
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <View>
        <Image
          source={userImage}
          style={{ width: 80, height: 80 }}
        />
      </View>
      <View
        style={{
          marginVertical: 20,
        }}
      >
        <TextInput
          value={carnet_identidad} //
          onChangeText={setCi} // 
          placeholderTextColor={"#626262"}
          placeholder="Carnet de Identidad"
          secureTextEntry
          style={[
            {
              fontSize: 14,
              padding: 15,
              backgroundColor: "#f1f4ff",
              borderRadius: 30,
              marginVertical: 5,
              width: 250,
            },
          ]}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={handleLogIn}
          style={{
            padding: 20,
            backgroundColor: "#97E5DB",
            marginBottom: 10,
            marginTop: 15,
            borderRadius: 30,
            shadowColor: "#1F41BB",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 20,
          }}
        >
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

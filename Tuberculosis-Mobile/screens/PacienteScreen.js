import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { API_URL } from '@env';
import { UserContext } from '../contexts/UserContext';

const placeholderImage = require('../assets/Paciente.png');

const Paciente = () => {
  const route = useRoute();
  const { id } = route.params; // Obtener el id del paciente de los parámetros de la ruta
  const { user } = useContext(UserContext);
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await fetch(`${API_URL}/paciente/${user.idPersona}`);
        const data = await response.json();
        console.log("Datos del paciente:", data); // Verifica los datos del paciente
        setPaciente(data);
      } catch (error) {
        console.error('Error fetching paciente data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPaciente();
  }, [id]);
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Paciente no encontrado.</Text>
      </View>
    );
  }

  // Función para formatear la fecha de nacimiento
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={paciente.imageUrl ? { uri: paciente.imageUrl } : placeholderImage} 
        style={styles.image} 
      />
      <Text style={styles.name}>
        {[paciente.nombres, paciente.primerApellido, paciente.segundoApellido].filter(Boolean).join(' ') || 'No disponible'}
      </Text>
      <Text style={styles.label}>Número de celular:</Text>
      <Text style={styles.details}>{paciente.numeroCelular ?? 'No disponible'}</Text>
      <Text style={styles.label}>Fecha de nacimiento:</Text>
      <Text style={styles.details}>{paciente.fechaNacimiento ? new Date(paciente.fechaNacimiento).toLocaleDateString() : 'No disponible'}</Text>
      <Text style={styles.label}>Sexo:</Text>
      <Text style={styles.details}>{paciente.sexo ?? 'No disponible'}</Text>
      <Text style={styles.label}>Dirección:</Text>
      <Text style={styles.details}>{paciente.direccion ?? 'No disponible'}</Text>
      <Text style={styles.label}>CI:</Text>
      <Text style={styles.details}>{paciente.CI ?? 'No disponible'}</Text>
      <Text style={styles.label}>Establecimiento de Salud:</Text>
      <Text style={styles.details}>{paciente.nombreEstablecimiento || 'No disponible'}</Text>
    </View>
  );
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d5ffff', // Fondo claro
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d5ffff',
  },
  image: {
    width: 200, // Ancho reducido
    height: 200, // Alto reducido
    borderRadius: 75, // Hacerla circular
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#005954', // Color más oscuro para el nombre
  },
  details: {
    fontSize: 18,
    color: '#338b85', // Color intermedio para los detalles
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005954', // Color oscuro para los títulos de las etiquetas
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});


export default Paciente;

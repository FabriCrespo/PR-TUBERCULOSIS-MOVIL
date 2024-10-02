import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Paciente = () => {
  const route = useRoute();
  const { id } = route.params; // Obtener el id del paciente de los parámetros de la ruta
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await fetch(`http://localhost:3000/paciente/${id}`);
        const data = await response.json();
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

  return (
    <View style={styles.container}>
      <Image source={{ uri: paciente.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{paciente.nombre} {paciente.apellido}</Text>
      <Text style={styles.details}>Edad: {paciente.edad}</Text>
      <Text style={styles.details}>Género: {paciente.genero}</Text>
      <Text style={styles.details}>Historia Médica: {paciente.historiaMedica}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Paciente;

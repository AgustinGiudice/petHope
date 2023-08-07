import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ShowPets = () => {
  const [mascotas, setMascotas] = useState([]);


  const baseURL = 'http://localhost:3000/api/mascotas'; 

  const queryParams = {
    longitud:  -77.123456,
    latitud: 10.987654,   
    distancia: 10,       
    cuidadosEspeciales: false, 
    tipoMascota: 'gato',
    tamaño: 'chico',   
    rangoDeEdad: 3
  };

  // Construye la URL con los parámetros
  const url = `${baseURL}/${queryParams.longitud}/${queryParams.latitud}/${queryParams.distancia}/${queryParams.cuidadosEspeciales}/${queryParams.tipoMascota}/${queryParams.tamaño}/${queryParams.rangoDeEdad}`;

  useEffect(() => {
    // Obtener las mascotas 
    fetch(url)
      .then((response) => response.json())
      .then((data) => setMascotas(data))
      .catch((error) => console.error('Error al obtener mascotas:', error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.mascotaItem}>
      <Text style={styles.mascotaNombre}>{item.nombre}</Text>
      <Text>Edad: {item.edad}</Text>
      <Text>Nivel de Cuidado: {item.nivelCuidado}</Text>
      <Text>Tamaño: {item.tamanio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mascotas Disponibles</Text>
      <FlatList
        data={mascotas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    padding: 20,
  },
  mascotaItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  mascotaNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ShowPets;
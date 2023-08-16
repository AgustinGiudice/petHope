import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ShowPets = ({ navigation }) => {
  const [mascotas, setMascotas] = useState([]);

  const baseURL = "http://localhost:3000/api/mascotas";

  const queryParams = {
    longitud: -58.41184318187,
    latitud: -34.6093696411,
    distancia: 2000,
    cuidadosEspeciales: 0,
    tipoMascota: "perro",
    tamaño: "chico",
    rangoDeEdad: 3,
  };

  // Construye la URL con los parámetros
  const url = `${baseURL}?longitud=${queryParams.longitud}&latitud=${queryParams.latitud}&distancia=${queryParams.distancia}&cuidadosEspeciales=${queryParams.cuidadosEspeciales}&tipoMascota=${queryParams.tipoMascota}&tamaño=${queryParams.tamaño}&rangoDeEdad=${queryParams.rangoDeEdad}`;
  useEffect(() => {
    // Obtener las mascotas
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setMascotas(data))
      .catch((error) => console.error("Error al obtener mascotas:", error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.mascotaItem}>
      <Text style={styles.mascotaNombre}>{item.nombre}</Text>
      <Text>Raza: {item.raza === 1 ? "Perro" : "Gato"}</Text>
      <Text>
        Edad:{" "}
        {item.edad === 1 ? "Cachorro" : item.edad === 2 ? "Juvenil" : "Adulto"}
      </Text>
      <Text>Nivel de Cuidado: {item.nivelCuidado}</Text>
      <Text>
        Tamaño:{" "}
        {item.tamanio === 1 ? "Chico" : item.tamanio === 2 ? "Medio" : "Grande"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackText}>Volver</Text>
      </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listContainer: {
    padding: 20,
  },
  mascotaItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  mascotaNombre: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  goBackButton: {
    backgroundColor: "gray",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  goBackText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ShowPets;

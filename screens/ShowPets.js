import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const ShowPets = ({ navigation }) => {
  const [mascotas, setMascotas] = useState([]);

  const baseURL = "http://localhost:3000/api/mascotas";

  const queryParams = {
    longitud: -58.41184318187,
    latitud: -34.6093696411,
    // latitud: -34.61, //coordenadas hardcodeadas para dejar el refugio en devoto... XQ SI
    //   longitud: -58.51815,
    distancia: 11000,
    cuidadosEspeciales: false,
    tipoMascota: 1,
    tamaño: 2,
    rangoDeEdad: 2,
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
      .then((data) => {
        setMascotas(data);
      })
      .catch((error) => console.error("Error al obtener mascotas:", error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.mascotaItem}>
      <Image source={item.pic} style={styles.mascotaImagen} />
      <Text style={styles.mascotaNombre}>{item.nombre}</Text>
      <Text>Raza: {item.raza === 1 ? "Perro" : "Gato"}</Text>
      <Text>
        Edad:{" "}
        {item.edad === 1 ? "Cachorro" : item.edad === 2 ? "Juvenil" : "Adulto"}
      </Text>
      <Text>Nivel de Cuidado: {item.nivelCuidado}</Text>
      <Text>Distancia: {(item.distance / 1000).toFixed(2)} km</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
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
    textAlign: "center",
  },
  mascotaImagen: {
    width: 400,
    height: 400,
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

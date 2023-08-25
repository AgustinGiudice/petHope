import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const ShowPets = ({ navigation }) => {
  const [mascotas, setMascotas] = useState([]);
  const [index, setIndex] = useState(0); //Setea el numero actual para el fetch!!

  const myRef = useRef();
  const baseURL =
    "https://mascotas-back-31adf188c4e6.herokuapp.com/api/mascotas";

  const queryParams = {
    longitud: -58.41184318187,
    latitud: -34.6093696411,
    distancia: 10000,
    cuidadosEspeciales: false,
    tipoMascota: 3,
    tamaño: 2,
    rangoDeEdad: 3,
  };

  // Construye la URL con los parámetros
  const url = `${baseURL}?longitud=${queryParams.longitud}&latitud=${queryParams.latitud}&distancia=${queryParams.distancia}&cuidadosEspeciales=${queryParams.cuidadosEspeciales}&tipoMascota=${queryParams.tipoMascota}&tamaño=${queryParams.tamaño}&rangoDeEdad=${queryParams.rangoDeEdad}&current=${index}`;
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
        console.log(data);
      })
      .catch((error) => console.error("Error al obtener mascotas:", error));
  }, [index]);

  const nextPet = () => {
    setIndex(index + 1); //Incrementa el numero de Offset para el fetch
  };

  const renderItem = ({ item }) => (
    <View style={styles.mascotaItem}>
      <Image source={{ uri: item.pic }} style={styles.mascotaImagen} />
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

  const handleScroll = () => {
    nextPet();
    console.log("SCROLLING!!!");
    myRef.current.scrollTo({
      y: 571 * index,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mascotas Disponibles</Text>
      <ScrollView ref={myRef} onScroll={handleScroll}>
        <FlatList
          data={mascotas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.goFowardButton}
          onPress={() => nextPet()}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#fff",
    height: "100vh",
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    height: "15%",
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  mascotaItem: {
    marginBottom: 20,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    height: "80vh",
    justifyContent: "space-between",
    minHeight: 450,
  },
  mascotaImagen: {
    width: "100%",
    height: "50%",
    borderRadius: 5,
    resizeMode: "center",
  },
  mascotaNombre: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  goBackButton: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: "center",
    width: 100,
  },
  goFowardButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: "center",
    width: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ShowPets;

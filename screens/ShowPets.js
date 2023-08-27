import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "@env";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Menu from "../components/Menu";

const ShowPets = ({ navigation }) => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );
  // PRUEBAS
  const reff = useRef(null);

  //pruebas 2
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatlistRef = useRef(null);

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    flatlistRef.current.scrollToIndex({ animated: true, index });
  };

  const [mascotas, setMascotas] = useState([]);
  const [index, setIndex] = useState(0); //Setea el numero actual para el fetch!!
  const [indexElemento, setIndexElemento] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const myRef = useRef();
  // const baseURL =
  //   "https://mascotas-back-31adf188c4e6.herokuapp.com/api/mascotas";

  //
  //Meto los estilos adentro del cuerpo de la funciónn para poder usar los useState
  //
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      backgroundColor: "#fff",
      height: screenHeight, //Para que la pantalla siempre ocupe el 100% del dispositivo
    },
    mascotaItem: {
      marginBottom: 20,
      marginTop: 5,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      borderRadius: 5,
      textAlign: "center",
      justifyContent: "space-between",
      height: screenHeight * 0.87,
      minHeight: 450,
      width: screenWidth - 10,
    },
    mascotaImagen: {
      width: "100%",
      height: screenHeight * 0.6,
      borderRadius: 5,
      resizeMode: "cover",
      alignContent: "center",
    },
    mascotaNombre: {
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  const queryParams = {
    longitud: -58.41184318187,
    latitud: -34.6093696411,
    distancia: 15,
    cuidadosEspeciales: false,
    tipoMascota: 1,
    tamaño: 2,
    rangoDeEdad: 1,
  };

  // Construye la URL con los parámetros
  const url = `${BASE_URL}api/mascotas?longitud=${queryParams.longitud}&latitud=${queryParams.latitud}&distancia=${queryParams.distancia}&cuidadosEspeciales=${queryParams.cuidadosEspeciales}&tipoMascota=${queryParams.tipoMascota}&tamaño=${queryParams.tamaño}&rangoDeEdad=${queryParams.rangoDeEdad}&current=${index}`;
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
        const idToScrollTo = 1;
        const initialIndex = data.findIndex((item) => item.id === idToScrollTo);
        setIndexElemento(initialIndex);
      })
      .catch((error) => console.error("Error al obtener mascotas:", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [index]);

  //
  //Funciones para hacer "responsive" el Front
  //
  const handleScreenResize = () => {
    const { width, height } = Dimensions.get("window");
    setScreenWidth(width);
    setScreenHeight(height);
  };

  useEffect(() => {
    Dimensions.addEventListener("change", handleScreenResize);

    return () => {
      Dimensions.removeEventListener("change", handleScreenResize);
    };
  }, []);

  // ITEMS QUE RENDERIZAMOS ABAJO
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

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          ref={flatlistRef}
          horizontal
          pagingEnabled
          data={mascotas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          getItemLayout={(data, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x / screenWidth
            );
            if (newIndex !== currentIndex) {
              setCurrentIndex(newIndex);
            }
          }}
        />
      )}
      <Menu />
    </View>
  );
};

export default ShowPets;

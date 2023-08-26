import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Menu from "../components/Menu";


const screenWidth = Dimensions.get('window').width;

const ShowPets = ({ navigation }) => {

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
        const idToScrollTo = 1;
        const initialIndex = data.findIndex((item) => item.id === idToScrollTo);
        setIndexElemento(initialIndex)
        console.log(data);
      })
      .catch((error) => console.error("Error al obtener mascotas:", error));


  }, [index]);



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
      
      <Menu />
    </View>
  );
};

const mainContentHeight = Dimensions.get("window").height * 0.9;


// ESTILOS

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: 40,
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
    justifyContent: "space-between",
    height: mainContentHeight,
    minHeight: 450,
    width: screenWidth,
  },
  mascotaImagen: {
    width: "100%",
    height: "80%",
    borderRadius: 5,
    resizeMode: "cover",
  },
  mascotaNombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShowPets;

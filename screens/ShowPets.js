import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "@env";
import { saveDataToCache, loadCachedData } from "../hooks/useCache";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ItemList from "../components/ItemList";
import Menu from "../components/Menu";
import { screenHeight, screenWidth } from "../hooks/useScreenResize";

const ShowPets = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mascotas, setMascotas] = useState([]);
  const [petVistos, setPetVistos] = useState("");
  const [index, setIndex] = useState(0); //Setea el numero actual para el fetch!!
  const [isLoading, setIsLoading] = useState(true);
  const flatlistRef = useRef();

  //
  //Meto los estilos adentro del cuerpo de la función para poder usar los useState
  //
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      backgroundColor: "#fff",
      minHeight: screenHeight,
      paddingTop: 40, //Para que la pantalla siempre ocupe el 100% del dispositivo
      overflow: "hidden",
      position: "absolute",
      minWidth: screenWidth,
      alignItems: "center",
    },
    loader: {
      width: "100%",
      height: "100%",
    },
    sinMascotas: {
      color: "black",
      fontSize: 30,
      fontWeight: "bold",
    },
  });

  const queryParams = {
    longitud: -58.41184318187,
    latitud: -34.6093696411,
    distancia: 15,
    cuidadosEspeciales: false,
    tipoMascota: 3,
    tamaño: 3,
    rangoDeEdad: 3,
  };

  // Construye la URL con los parámetros
  const url = `${BASE_URL}api/mascotas?longitud=${queryParams.longitud}&latitud=${queryParams.latitud}&distancia=${queryParams.distancia}&cuidadosEspeciales=${queryParams.cuidadosEspeciales}&tipoMascota=${queryParams.tipoMascota}&tamaño=${queryParams.tamaño}&rangoDeEdad=${queryParams.rangoDeEdad}&current=${index}&vistos=${petVistos}`;
  useEffect(() => {
    console.log(petVistos);
    // Obtener las mascotas

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setMascotas((prevData) => prevData.concat(data));
          const idMascotas = data.map((mascota) => mascota.id);
          setPetVistos((prevString) => {
            const updatedString =
              prevString === ""
                ? idMascotas.join("|")
                : prevString + "|" + idMascotas.join("|");
            saveDataToCache("mascotasVistas", updatedString);
            return updatedString;
          });
        } else {
          console.log("No hay más mascotas!");
          // ANIMACION DE QUE NO HAY MAS MASCOTAS
        }
      })
      .catch((error) => console.error("Error al obtener mascotas:", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [index]);

  {
    if (isLoading) {
      return <ActivityIndicator size="large" style={styles.loader} />;
    } else {
      return (
        <View style={styles.container}>
          {mascotas.length === 0 ? (
            <Text styles={styles.sinMascotas}>
              No hay mascotas para mostrar
            </Text>
          ) : (
            <FlatList
              ref={flatlistRef}
              horizontal
              pagingEnabled
              data={mascotas}
              renderItem={ItemList}
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
              onEndReached={() => {
                setIndex(index + 1);
              }}
            />
          )}
          {!isLoading && mascotas.length !== 0 ? (
            <Menu mascota_id={mascotas[currentIndex].id} />
          ) : (
            <Menu />
          )}
        </View>
      );
    }
  }
};
export default ShowPets;

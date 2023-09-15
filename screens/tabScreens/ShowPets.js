import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "@env";
import { saveDataToCache, loadCachedData } from "../../hooks/useCache";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ButtonFilters from "../../components/ButtonFilters";
import ItemList from "../../components/ItemList";
import SPButtons from "../../components/SPbuttons";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";

const ShowPets = ({ navigation }) => {
  const [filtros, setFiltros] = useState({
    sexo: 2,
    distancia: 15,
    tipoMascota: 3,
    tamaño: 3,
    rangoDeEdad: 3,
  });
  const [isFilterChanged, setIsFilterChanged] = useState(false);

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
      backgroundColor: "#A5D4FF",
      flex: 1,
      overflow: "hidden",
      position: "relative",
      minWidth: screenWidth,
      alignItems: "center",
      minHeight: screenHeight - 60,
      paddingTop: 40,
    },
    loader: {
      width: "100%",
      height: "100%",
    },
    buttonFilters: {
      zIndex: 1,
    },
    sinMascotas: {
      color: "black",
      fontSize: 30,
      fontWeight: "bold",
      flex: 1,
    },
    headerItem: {
      backgroundColor: "#7A5FB5",
      width: screenWidth,
      height: 150,
      borderRadius: 10,
      zIndex: 10,
      alignItems: "center",
      justifyContent: "flex-end",
      marginBottom: -30,
    },
  });

  const queryParams = {
    sexo: filtros.sexo,
    longitud: -58.41184318187,
    latitud: -34.6093696411,
    distancia: filtros.distancia,
    cuidadosEspeciales: false,
    tipoMascota: filtros.tipoMascota,
    tamaño: filtros.tamaño,
    rangoDeEdad: filtros.rangoDeEdad,
  };

  // Construye la URL con los parámetros
  const url = `${BASE_URL}api/mascotas?longitud=${queryParams.longitud}&latitud=${queryParams.latitud}&distancia=${queryParams.distancia}&cuidadosEspeciales=${queryParams.cuidadosEspeciales}&tipoMascota=${filtros.tipoMascota}&tamaño=${queryParams.tamaño}&rangoDeEdad=${queryParams.rangoDeEdad}&current=${index}&vistos=${petVistos}`;
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
        if (data.length > 0) {
          if (!isFilterChanged) {
            setMascotas((prevData) => prevData.concat(data));
          } else {
            setMascotas([]);
          }
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
  }, [filtros, index]);

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
            <>
              <View style={styles.headerItem}>
                <View style={styles.buttonFilters}>
                  <ButtonFilters
                    filtros={filtros}
                    setFiltros={setFiltros}
                    setIsFilterChanged={setIsFilterChanged}
                  />
                </View>

                <Text>{mascotas[currentIndex].nombre}</Text>
              </View>
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
              {!isLoading ? (
                <SPButtons mascota_id={mascotas[currentIndex].id} />
              ) : null}
            </>
          )}
        </View>
      );
    }
  }
};
export default ShowPets;

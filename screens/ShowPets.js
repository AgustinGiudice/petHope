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
import Menu from "../components/Menu";
import ButtonFilters from "../components/ButtonFilters";
import ItemList from "../components/ItemList";
import SPButtons from "../components/SPbuttons";
import { screenHeight, screenWidth } from "../hooks/useScreenResize";

const ShowPets = ({ navigation }) => {
  const [filtros, setFiltros] = useState({
    sexo: 2,
    distancia: 15,
    tipoMascota: 3,
    tamaño: 3,
    rangoDeEdad: 3,
  });
  console.log("filtros de showpets:" + filtros.tipoMascota);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mascotas, setMascotas] = useState([]);
  const [petVistos, setPetVistos] = useState("");
  const [index, setIndex] = useState(0); //Setea el numero actual para el fetch!!
  const [isLoading, setIsLoading] = useState(false);
  const flatlistRef = useRef();

  //
  //Meto los estilos adentro del cuerpo de la función para poder usar los useState
  //
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      backgroundColor: "#fff",
      flex: 1,
      paddingTop: 40, //Para que la pantalla siempre ocupe el 100% del dispositivo
      overflow: "hidden",
      position: "relative",
      minWidth: screenWidth,
      alignItems: "center",
      minHeight: screenHeight,
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
      backgroundColor:"#7A5FB5",
      width:screenWidth,
      height:150,
      borderRadius:10,
      zIndex:10,
      alignItems: "center",
      justifyContent: "flex-end",
      marginBottom:-30
    }
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
    console.log(petVistos);
    console.log(url);
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
          console.log("log de mascotas"+mascotas);
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
              <View style={styles.buttonFilters}></View>
              <View style={styles.headerItem}>
                <View style={styles.buttonFilters}>
                  <ButtonFilters filtros={filtros} setFiltros={setFiltros} />
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
              {!isLoading ? <SPButtons mascota_id={mascotas[currentIndex].id} /> : null}
            </>
          )}
          
        </View>
      );
    }
  }
};
export default ShowPets;

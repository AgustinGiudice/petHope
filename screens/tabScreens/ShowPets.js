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
import ExplodingHeart from "../../components/ExplodingHeart";

const ShowPets = ({ navigation }) => {
  const [filtros, setFiltros] = useState({
    sexo: 2,
    distancia: 6000,
    tipoMascota: 3,
    tamaño: 3,
    rangoDeEdad: 3,
  });
  const [isFilterChanged, setIsFilterChanged] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

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
      backgroundColor: "#eee",
      flex: 1,
      overflow: "hidden",
      position: "relative",
      minWidth: screenWidth,
      alignItems: "center",
      minHeight: screenHeight - 60,
      paddingTop: 60,
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
      position: "relative",
      backgroundColor: "#7A5FB5",
      width: screenWidth,
      height: 50,
      borderRadius: 10,
      zIndex: 10,
      alignItems: "center",
      justifyContent: "flex-end",
      // marginBottom: -30,
    },
    headerItem2: {
      position: "absolute",
      backgroundColor: "#C69AE8",
      width: 1300,
      height: 1300,
      borderRadius: 630,
      zIndex: 10,
      alignItems: "center",
      justifyContent: "flex-end",
      bottom: -35,
      elevation: 10, // Para Android
      shadowColor: "black", // Para iOS
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
    headerItemsContenido: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: screenWidth - screenWidth * 0.3,
      marginBottom: 25,
    },
    namePet: {
      color: "white",
      fontWeight: "bold",
      fontSize: 35,
    },
    corazonLike: {
      position: "absolute",
      zIndex: 999,
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
  const url = `${BASE_URL}api/mascotas?sexo=${filtros.sexo}&longitud=${queryParams.longitud}&latitud=${queryParams.latitud}&distancia=${filtros.distancia}&cuidadosEspeciales=${queryParams.cuidadosEspeciales}&tipoMascota=${filtros.tipoMascota}&tamaño=${queryParams.tamaño}&rangoDeEdad=${queryParams.rangoDeEdad}&current=${index}&vistos=${petVistos}`;

  useEffect(() => {
    setCurrentIndex(0);
    setIndex(0);
  }, [isFilterChanged]);

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
          console.log(data[0].nombre);
          console.log(data[0].sexo);
          if (!isFilterChanged) {
            setMascotas((prevData) => prevData.concat(data));
          } else {
            setMascotas(data);
            setIsFilterChanged(false);
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
          if (!isFilterChanged) {
            console.log("No hay más mascotas!");
            setIndex(1);
          } else {
            if (index === 0) {
              setIndex(1); //Encontrar una forma de no hacer esto, hace peticiones al pedo
            }
            setMascotas([]);
            setIsFilterChanged(false);
          }
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
            <View style={styles.buttonFilters}>
              <Text styles={styles.sinMascotas}>
                No hay mascotas para mostrar
              </Text>
              <ButtonFilters
                filtros={filtros}
                setFiltros={setFiltros}
                setIsFilterChanged={setIsFilterChanged}
              />
            </View>
          ) : (
            <>
              {showLikeAnimation && (
                <ExplodingHeart style={styles.corazonLike} width={300} />
              )}
              <View style={styles.headerItem}>
                <View style={styles.headerItem2}>
                  <View style={styles.headerItemsContenido}>
                    <View style={styles.buttonFilters}>
                      <ButtonFilters
                        filtros={filtros}
                        setFiltros={setFiltros}
                        setIsFilterChanged={setIsFilterChanged}
                      />
                    </View>
                    <View>
                      <Text style={styles.namePet}>
                        {mascotas[currentIndex].nombre}
                      </Text>
                    </View>
                    <View>
                      <Text>{mascotas[currentIndex].nivelCuidado}</Text>
                    </View>
                  </View>
                </View>
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
                <SPButtons
                  mascota_id={mascotas[currentIndex].id}
                  showLikeAnimation={showLikeAnimation}
                  setShowLikeAnimation={setShowLikeAnimation}
                />
              ) : null}
            </>
          )}
        </View>
      );
    }
  }
};
export default ShowPets;

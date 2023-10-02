import React, { useState, useEffect, useRef, useContext } from "react";
import { BASE_URL } from "@env";
import {
  saveDataToCache,
  loadCachedData,
  clearCache,
} from "../../hooks/useCache";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ButtonFilters from "../../components/ButtonFilters";
import ItemList from "../../components/ItemList";
import SPButtons from "../../components/SPbuttons";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import ExplodingHeart from "../../components/ExplodingHeart";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserContext } from "../../context/UserContext";
import Constants from "expo-constants";
import LoadingComponent from "../../components/LoadingComponent";
import InfoPetModal from "../../components/InfoPetModal";

const ShowPets = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);

  const [resetMatches, setResetMatches] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mascotas, setMascotas] = useState([]);
  const [petVistos, setPetVistos] = useState("");
  const [index, setIndex] = useState(0); //Setea el numero actual para el fetch!!
  const [isLoading, setIsLoading] = useState(true);
  const [infoPetModalIsVisible, setInfoPetModalIsVisible] = useState(false);
  const flatlistRef = useRef();

  const cambioColorPaw = (numColor) => {
    let color;

    switch (numColor) {
      case 1:
        color = "blue";
        break;
      case 2:
        color = "green";
        break;
      case 3:
        color = "yellow";
        break;
      case 4:
        color = "orange";
        break;
      case 5:
        color = "red";
        break;
      default:
        color = "red";
        break;
    }

    return color;
  };

  //
  //Meto los estilos adentro del cuerpo de la función para poder usar los useState
  //

  const [filtros, setFiltros] = useState({
    sexo: 2,
    distancia: 100000,
    tipoMascota: currentUser.tipoAnimal,
    tamaño: currentUser.tamanioPreferido,
    rangoDeEdad: currentUser.edadPreferida,
  });
  // Construye la URL con los parámetros
  const url = `${BASE_URL}api/mascotas?sexo=${filtros.sexo}&longitud=${currentUser.ubicacion.coordinates[0]}&latitud=${currentUser.ubicacion.coordinates[1]}&distancia=${filtros.distancia}&cuidadosEspeciales=${currentUser.aceptaCuidadosEspeciales}&tipoMascota=${filtros.tipoMascota}&tamaño=${filtros.tamaño}&rangoDeEdad=${filtros.rangoDeEdad}&current=${index}&vistos=${petVistos}`;

  const getUserData = async () => {
    try {
      await clearCache("mascotasVistas");
      setPetVistos("");
      const cache = await loadCachedData("mascotasVistas");
      if (cache !== null) {
        const parsedData = cache;
        console.log("Datos cargados desde caché:", parsedData);
        setPetVistos(parsedData);
      }
    } catch (error) {
      console.log("Error al obtener datos de caché:", error);
    }
  };

  useEffect(() => {
    setCurrentIndex(0);
    setIndex(0);
    setIsLoading(true);
  }, [resetMatches]);

  useEffect(() => {
    // Obtener las mascotas
    console.log(url);
    getUserData().then(
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            if (!resetMatches) {
              setMascotas((prevData) => prevData.concat(data));
            } else {
              setMascotas(data);
              setResetMatches(false);
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
            if (!resetMatches) {
              setIndex(1);
            } else {
              if (index === 0) {
                setIndex(1); //Encontrar una forma de no hacer esto, hace peticiones al pedo
              }
              setMascotas([]);
              setResetMatches(false);
            }
            // ANIMACION DE QUE NO HAY MAS MASCOTAS
          }
        })
        .catch((error) => console.error("Error al obtener mascotas:", error))
        .finally(() => {
          setIsLoading(false);
        })
    );
  }, [index]);
  {
    if (isLoading) {
      return <LoadingComponent />;
    } else {
      return (
        <View
          style={[
            styles.container,
            { minWidth: screenWidth, minHeight: screenHeight - 60 },
          ]}
        >
          {mascotas.length === 0 ? (
            <View style={styles.buttonFilters}>
              <Text styles={styles.sinMascotas}>
                No hay mascotas para mostrar
              </Text>
              <ButtonFilters
                filtros={filtros}
                setFiltros={setFiltros}
                setResetMatches={setResetMatches}
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
                        setResetMatches={setResetMatches}
                      />
                    </View>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={styles.namePet}
                    >
                      {mascotas[currentIndex].nombre}
                    </Text>
                    <View>
                      <Ionicons
                        style={styles.pawIcon}
                        name="paw"
                        size={45}
                        color={cambioColorPaw(
                          mascotas[currentIndex].nivelCuidado
                        )}
                      />
                      <Text
                        style={[
                          styles.pawIconNumber,
                          {
                            color:
                              mascotas[currentIndex].nivelCuidado === 1 ||
                              mascotas[currentIndex].nivelCuidado === 5
                                ? "white"
                                : "black",
                          },
                        ]}
                      >
                        {mascotas[currentIndex].nivelCuidado}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <InfoPetModal
                isVisible={infoPetModalIsVisible}
                setIsVisible={setInfoPetModalIsVisible}
                petInfo={mascotas[currentIndex]}
                setResetMatches={setResetMatches}
                setShowLikeAnimation={setShowLikeAnimation}
                currentUserId={currentUser.id}
              />
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
                  setResetMatches={setResetMatches}
                  setShowLikeAnimation={setShowLikeAnimation}
                  currentUserId={currentUser.id}
                  setInfoPetModalIsVisible={setInfoPetModalIsVisible}
                />
              ) : null}
            </>
          )}
        </View>
      );
    }
  }
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#eee",
    flex: 1,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
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
    width: screenWidth,
    justifyContent: "space-between",
    marginBottom: 30,
    alignItems: "baseline",
    paddingHorizontal: 30,
    textAlign: "center",
  },
  namePet: {
    color: "white",
    fontWeight: "bold",
    fontSize: 28,
    flex: 1,
    paddingHorizontal: 3,
    textAlign: "center",
    textAlignVertical: "center",
  },
  corazonLike: {
    position: "absolute",
    zIndex: 999,
  },
  pawIcon: {
    position: "relative",
  },
  pawIconNumber: {
    position: "absolute",
    top: 19,
    left: 18,
    fontSize: 12,
  },
});
export default ShowPets;

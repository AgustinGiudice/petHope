import React, { useState, useEffect, useRef, useContext } from "react";
import { BASE_URL } from "@env";
import { View, FlatList, StyleSheet } from "react-native";
import ItemList from "../../components/ItemList";
import SPButtons from "../../components/SPbuttons";
import ExplodingHeart from "../../components/ExplodingHeart";
import LoadingComponent from "../../components/LoadingComponent";
import InfoPetModal from "../../components/InfoPetModal";
import CompletarFormulario from "../../components/CompletarFormulario";
import SinMascotas from "../../components/SinMascotas";
import HeaderMascota from "../../components/HeaderMascota";
import { UserContext } from "../../context/UserContext";
import { TokenContext } from "../../context/TokenContext";
import { getMascotas } from "../../services/getMascotas";
import { getMascotasVistas } from "../../services/getMascotasVistas";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import Constants from "expo-constants";

const ShowPets = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);

  const [resetMatches, setResetMatches] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mascotas, setMascotas] = useState([]);
  const [petVistos, setPetVistos] = useState("");
  const [index, setIndex] = useState(0); //Setea el numero actual para el fetch!!
  const [isLoading, setIsLoading] = useState(true);
  const [infoPetModalIsVisible, setInfoPetModalIsVisible] = useState(false);
  const flatlistRef = useRef();

  const [filtros, setFiltros] = useState({
    sexo: 2,
    distancia: 100000,
    tipoMascota: currentUser.tipoAnimal,
    tamaño: currentUser.tamanioPreferido,
    rangoDeEdad: currentUser.edadPreferida,
  });
  // Construye la URL con los parámetros

  useEffect(() => {
    setCurrentIndex(0);
    setIndex(0);
    setIsLoading(true);
  }, [resetMatches]);

  useEffect(() => {
    // Obtener las mascotas
    const url = `${BASE_URL}api/mascotas?sexo=${filtros.sexo}&latitud=${currentUser.ubicacion.coordinates[0]}&longitud=${currentUser.ubicacion.coordinates[1]}&distancia=100000&cuidadosEspeciales=${currentUser.aceptaCuidadosEspeciales}&tipoMascota=${filtros.tipoMascota}&tamaño=3&rangoDeEdad=3&current=${index}&vistos=${petVistos}`;
    getMascotasVistas().then(async () => {
      try {
        getMascotas(
          url,
          token,
          navigation,
          setMascotas,
          setPetVistos,
          setIndex,
          resetMatches,
          setResetMatches,
          setIsLoading
        );
      } catch (error) {
        console.error("Error al obtener mascotas:", error);
      } finally {
        setIsLoading(false);
      }
    });
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
          {currentUser.completado !== 100 ? (
            <CompletarFormulario navigation={navigation} />
          ) : mascotas.length === 0 ? (
            <SinMascotas
              filtros={filtros}
              setFiltros={setFiltros}
              setResetMatches={setResetMatches}
            />
          ) : (
            <>
              {showLikeAnimation && (
                <ExplodingHeart style={styles.corazonLike} width={300} />
              )}

              <HeaderMascota
                filtros={filtros}
                setFiltros={setFiltros}
                currentIndex={currentIndex}
                mascotas={mascotas}
                setResetMatches={setResetMatches}
              />

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
                  setPetVistos((prevString) => {
                    const updatedString =
                      prevString === ""
                        ? mascotas[currentIndex].id.join("|")
                        : prevString +
                          "|" +
                          mascotas[currentIndex].id.join("|");
                    console.log(currentIndex);
                    console.log(mascotas[currentIndex]);
                    saveDataToCache("mascotasVistas", updatedString);
                    return updatedString;
                  });
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

  corazonLike: {
    position: "absolute",
    zIndex: 999,
  },
});
export default ShowPets;

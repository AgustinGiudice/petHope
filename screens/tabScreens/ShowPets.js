import React, { useState, useEffect, useContext } from "react";
import { BASE_URL } from "@env";
import { View, StyleSheet } from "react-native";
import SPButtons from "../../components/SPbuttons";
import ExplodingHeart from "../../components/ExplodingHeart";
import LoadingComponent from "../../components/LoadingComponent";
import InfoPetModal from "../../components/InfoPetModal";
import CompletarFormulario from "../../components/CompletarFormulario";
import SinMascotas from "../../components/SinMascotas";
import { UserContext } from "../../context/UserContext";
import { TokenContext } from "../../context/TokenContext";
import { getMascotas } from "../../services/getMascotas";
import { getMascotasVistas } from "../../services/getMascotasVistas";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import Constants from "expo-constants";
import SwiperPets from "../../components/SwiperPets";

const ShowPets = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);

  const [resetMatches, setResetMatches] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mascotas, setMascotas] = useState([]);
  const [petVistos, setPetVistos] = useState("");
  const [index, setIndex] = useState(0); //Setea el numero actual para el fetch!!
  const [isLoading, setIsLoading] = useState(true);
  const [infoPetModalIsVisible, setInfoPetModalIsVisible] = useState(false);
  const [firstFetch, setFirstFetch] = useState(false);

  const [filtros, setFiltros] = useState({
    sexo: 3,
    distancia: 100000,
    tipoMascota: 1,
    tamaño: 2,
    rangoDeEdad: 2,
    // tipoMascota: currentUser.tipoAnimal,
    // tamaño: currentUser.tamanioPreferido,
    // rangoDeEdad: currentUser.edadPreferida,
  });
  // Construye la URL con los parámetros

  useEffect(() => {
    setCurrentIndex(0);
    setIndex(0);
    setIsLoading(true);
  }, [resetMatches]);

  useEffect(() => {
    // Obtener las mascotas
    let url;
    if (firstFetch) {
      url = `${BASE_URL}api/mascotas?sexo=${filtros.sexo}&latitud=${
        currentUser.ubicacion.coordinates[0]
      }&longitud=${
        currentUser.ubicacion.coordinates[1]
      }&distancia=100000&cuidadosEspeciales=${
        currentUser.aceptaCuidadosEspeciales
      }&tipoMascota=${filtros.tipoMascota}&tamaño=3&rangoDeEdad=3&current=${
        index + 1
      }&vistos=${petVistos}`;
    } else {
      url = `${BASE_URL}api/mascotas?sexo=${filtros.sexo}&latitud=${currentUser.ubicacion.coordinates[0]}&longitud=${currentUser.ubicacion.coordinates[1]}&distancia=100000&cuidadosEspeciales=${2}&tipoMascota=${filtros.tipoMascota}&tamaño=3&rangoDeEdad=3&current=${index}&vistos=${petVistos}`;
    }
    console.log(url);
    getMascotasVistas(setPetVistos).then(async () => {
      try {
        await getMascotas(
          url,
          token,
          navigation,
          setMascotas,
          index,
          setIndex,
          resetMatches,
          setResetMatches,
          setIsLoading,
          setCurrentUser
        );
      } catch (error) {
        console.error("Error al obtener mascotas:", error);
      } finally {
        setIsLoading(false);
        if (!firstFetch) {
          const url = `${BASE_URL}api/mascotas?sexo=${filtros.sexo}&latitud=${
            currentUser.ubicacion.coordinates[0]
          }&longitud=${
            currentUser.ubicacion.coordinates[1]
          }&distancia=100000&cuidadosEspeciales=${
            currentUser.aceptaCuidadosEspeciales
          }&tipoMascota=${filtros.tipoMascota}&tamaño=3&rangoDeEdad=3&current=${
            index + 1
          }&vistos=${petVistos}`;
          await getMascotas(
            url,
            token,
            navigation,
            setMascotas,
            index,
            setIndex,
            resetMatches,
            setResetMatches,
            setIsLoading,
            setCurrentUser
          );
          setFirstFetch(true);
        }
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
              <InfoPetModal
                isVisible={infoPetModalIsVisible}
                setIsVisible={setInfoPetModalIsVisible}
                petInfo={mascotas[index]}
                setResetMatches={setResetMatches}
                setShowLikeAnimation={setShowLikeAnimation}
                currentUserId={currentUser.id}
              />
              <SwiperPets
                mascotas={mascotas}
                filtros={filtros}
                setFiltros={setFiltros}
                index={index}
                setIndex={setIndex}
                setResetMatches={setResetMatches}
              />
              {!isLoading ? (
                <SPButtons
                  mascota_id={mascotas[index].id}
                  setResetMatches={setResetMatches}
                  setShowLikeAnimation={setShowLikeAnimation}
                  currentUserId={currentUser.id}
                  setInfoPetModalIsVisible={setInfoPetModalIsVisible}
                  setMascotas={setMascotas}
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

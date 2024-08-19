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
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import { COLORS } from "../../styles";
import SwiperPets from "../../components/SwiperPets";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShowPets = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);

  const [resetMatches, setResetMatches] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  const [mascotas, setMascotas] = useState([]);
  const [index, setIndex] = useState(0); //Setea el numero actual para el fetch!!
  const [isLoading, setIsLoading] = useState(true);
  const [infoPetModalIsVisible, setInfoPetModalIsVisible] = useState(false);
  const [firstFetch, setFirstFetch] = useState(false);

  const [filtros, setFiltros] = useState({
    sexo: 3,
    distancia: 10000000,
    tipoMascota: currentUser.tipoAnimal,
    tamaño: currentUser.tamanioPreferido,
    rangoDeEdad: currentUser.edadPreferida,
  });

  useEffect(() => {
    setFirstFetch(false);
    setIsLoading(true);
    setIndex(0);
  }, [resetMatches]);

  useEffect(() => {
    console.log("Hola soy el useEffect, buenas tardes");
    // Obtener las mascotas.
    // AsyncStorage.clear();
    AsyncStorage.getItem("mascotasVistas").then(async (cache) => {
      let vistos;
      if (cache) {
        cache = JSON.parse(cache);
        if (cache.usuarios) {
          const usuario = cache.usuarios.find(
            (usuario) => usuario.id === currentUser.id
          );
          if (usuario !== undefined) vistos = usuario.idMascotas;
        }
      }
      vistos = JSON.stringify(vistos);
      let url;
      console.log(BASE_URL);
      if (firstFetch) {
        url = `${BASE_URL}api/mascotas?sexo=${filtros.sexo}&latitud=${
          currentUser.ubicacion.coordinates[0]
        }&longitud=${currentUser.ubicacion.coordinates[1]}&distancia=${
          filtros.distancia
        }&cuidadosEspeciales=${
          currentUser.aceptaCuidadosEspeciales
        }&tipoMascota=${filtros.tipoMascota}&tamaño=${
          filtros.tamaño
        }&rangoDeEdad=${filtros.rangoDeEdad}&current=${
          index + 1
        }&vistos=${vistos}`;
      } else {
        url = `${BASE_URL}api/mascotas?sexo=${filtros.sexo}&latitud=${currentUser.ubicacion.coordinates[0]}&longitud=${currentUser.ubicacion.coordinates[1]}&distancia=${filtros.distancia}&cuidadosEspeciales=${currentUser.aceptaCuidadosEspeciales}&tipoMascota=${filtros.tipoMascota}&tamaño=${filtros.tamaño}&rangoDeEdad=${filtros.rangoDeEdad}&current=${index}&vistos=${vistos}`;
      }
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
          }&longitud=${currentUser.ubicacion.coordinates[1]}&distancia=${
            filtros.distancia
          }&cuidadosEspeciales=${
            currentUser.aceptaCuidadosEspeciales
          }&tipoMascota=${filtros.tipoMascota}&tamaño=${
            filtros.tamaño
          }&rangoDeEdad=${filtros.rangoDeEdad}&current=${
            index + 1
          }&vistos=${vistos}`;
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
          {!currentUser.imagen || currentUser.tuvoMascotas === null ? (
            <CompletarFormulario navigation={navigation} />
          ) : mascotas.length === 0 || !mascotas[index] ? (
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
              {mascotas[index] && (
                <InfoPetModal
                  isVisible={infoPetModalIsVisible}
                  setIsVisible={setInfoPetModalIsVisible}
                  petInfo={mascotas[index] && mascotas[index]}
                  setResetMatches={setResetMatches}
                  setShowLikeAnimation={setShowLikeAnimation}
                  currentUserId={currentUser.id}
                />
              )}
              <SwiperPets
                mascotas={mascotas}
                filtros={filtros}
                setFiltros={setFiltros}
                index={index}
                setIndex={setIndex}
                setResetMatches={setResetMatches}
                setShowLikeAnimation={setShowLikeAnimation}
              />
              {!isLoading && (
                <SPButtons
                  mascota_id={mascotas[index] && mascotas[index].id}
                  setResetMatches={setResetMatches}
                  setShowLikeAnimation={setShowLikeAnimation}
                  currentUserId={currentUser.id}
                  setInfoPetModalIsVisible={setInfoPetModalIsVisible}
                  setMascotas={setMascotas}
                />
              )}
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
    backgroundColor: COLORS[50],
    flex: 1,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
  },

  corazonLike: {
    position: "absolute",
    zIndex: 999,
  },
});
export default ShowPets;

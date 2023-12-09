import { StyleSheet, useWindowDimensions, Animated } from "react-native";
import Swiper from "react-native-deck-swiper";
import ItemList from "./ItemList";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { TokenContext } from "../context/TokenContext";
import { useContext, useRef } from "react";
import { setMascotaLike } from "../services/setMascotaLike";

const SwiperPets = ({
  mascotas,
  filtros,
  setFiltros,
  index,
  setIndex,
  setResetMatches,
  setShowLikeAnimation,
}) => {
  const { width, height } = useWindowDimensions();
  const { currentUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const likeAnimationValue = useRef(new Animated.Value(0)).current;

  const handleReject = async () => {
    try {
      const cache = await AsyncStorage.getItem("mascotasVistas");
      let mascotasVistas;
      if (cache) {
        mascotasVistas = JSON.parse(cache);
      } else {
        mascotasVistas = {
          usuarios: [{ id: currentUser.id, idMascotas: [] }],
        };
      }
      if (
        mascotasVistas.usuarios.some((usuario) => usuario.id === currentUser.id)
      ) {
        const indice = mascotasVistas.usuarios.findIndex(
          (usuario) => usuario.id === currentUser.id
        );
        mascotasVistas.usuarios[indice].idMascotas.push(mascotas[index].id);
      } else {
        mascotasVistas.usuarios.push({
          id: currentUser.id,
          idMascotas: [mascotas[index].id],
        });
      }
      const cacheFinal = JSON.stringify(mascotasVistas);

      await AsyncStorage.setItem("mascotasVistas", cacheFinal);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = async () => {
    try {
      const response = await setMascotaLike(
        mascotas[index].id,
        currentUser.id,
        token
      );

      if (!response.ok) {
        throw new Error("Error al likear mascota");
      }
      setShowLikeAnimation(true);

      Animated.sequence([
        Animated.timing(likeAnimationValue, {
          toValue: 1, // Ajusta el valor final de la animación (puede ser cualquier valor)
          duration: 500, // Duración de la primera parte de la animación en milisegundos
          useNativeDriver: false,
        }),
        Animated.timing(likeAnimationValue, {
          toValue: 0, // Ajusta el valor final de la animación (puede ser cualquier valor)
          duration: 500, // Duración de la segunda parte de la animación en milisegundos
          delay: 300, // Retardo entre la primera y la segunda parte de la animación
          useNativeDriver: false,
        }),
      ]).start(() => {
        likeAnimationValue.setValue(0);
        setShowLikeAnimation(false);
        setResetMatches(true);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Swiper
      cards={mascotas}
      renderCard={(mascota) => {
        return (
          <ItemList
            item={mascota}
            filtros={filtros}
            setFiltros={setFiltros}
            setResetMatches={setResetMatches}
          />
        );
      }}
      onSwiped={() => setIndex(index + 1)}
      onSwipedRight={handleReject}
      onSwipedLeft={handleLike}
      cardIndex={0}
      backgroundColor={"#f1f1f1"}
      stackSize={2}
      containerStyle={styles.container}
      verticalSwipe={false}
      showSecondCard={true}
      cardStyle={styles.card}
      overlayLabelWrapperStyle={{
        position: "absolute",
        zIndex: 2,
        flex: 1,
        width: "100%",
        height: "100%",
      }}
      overlayLabels={{
        right: {
          element: (
            <AntDesign
              name="close"
              size={height / 5}
              color="rgba(153,82,203,1)"
            />
          ) /* Optional */,
          title: "NOPE",
          style: {
            wrapper: {
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              backgroundColor: "rgba(195,154,232,0.45)",
            },
          },
        },
        left: {
          element: (
            <AntDesign
              name="hearto"
              size={height / 5}
              color="rgba(153,82,203,1)"
            />
          ) /* Optional */,
          title: "LIKE",
          style: {
            wrapper: {
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              right: -40,
              padding: 20,
              backgroundColor: "rgba(195,154,232,0.45)",
            },
          },
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    left: -20.5,
    top: -60,
  },
});
export default SwiperPets;

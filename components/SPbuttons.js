import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { BASE_URL } from "@env";
import { TokenContext } from "../context/TokenContext";

const SPbuttons = ({
  mascota_id,
  setShowLikeAnimation,
  setResetMatches,
  currentUserId,
  setInfoPetModalIsVisible,
  setMascotas,
}) => {
  const [matchResponse, setMatchResponse] = useState(null); // Estado para almacenar la respuesta
  const { token } = useContext(TokenContext);
  const likeAnimationValue = useRef(new Animated.Value(0)).current;

  const { width, height } = useWindowDimensions();

  // POST
  const postLike = async () => {
    try {
      const response = await fetch(`${BASE_URL}api/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idMascota: mascota_id,
          idUsuario: currentUserId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMatchResponse(data); // Actualiza el estado con la respuesta

        // Mostrar la animación de "like"
        setShowLikeAnimation(true);

        // Iniciar la animación
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
          // Reiniciar la animación y ocultarla cuando termine
          likeAnimationValue.setValue(0);
          setResetMatches(true);
          setMascotas([]);
          setShowLikeAnimation(false);
        });
      } else {
        console.error("Error en la respuesta del backend:", response.status);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const [scaleValue, setScaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    // Iniciar la animación cuando el componente se monta
    Animated.timing(scaleValue, {
      toValue: 1, // Escala final
      duration: 1000, // Duración de la animación en milisegundos
      useNativeDriver: false, // Asegúrate de configurar useNativeDriver en false
    }).start();

    const cleanUp = () => {
      scaleValue.stopAnimation();
      scaleValue.setValue(0);
    };
    return cleanUp;
  }, []);

  const containerStyle = {
    ...styles.footerContainer,
    transform: [{ scale: scaleValue }],
  };

  return (
    <Animated.View
      style={[
        containerStyle,
        {
          width: width - width * 0.05,
          height: height - height * 0.5,
          bottom: height - height * 1.365,
        },
      ]}
    >
      <View style={styles.buttonsMain}>
        <TouchableOpacity
          style={styles.backIcons}
          onPress={() => postLike(mascota_id)}
        >
          <AntDesign name="hearto" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.backIcons}>
          <AntDesign name="close" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsSecondary}>
        <TouchableOpacity style={styles.backIcons2}>
          <AntDesign name="sharealt" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backIcons2}
          onPress={() => setInfoPetModalIsVisible(true)}
        >
          <AntDesign name="ellipsis1" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#C69AE8",
    borderRadius: 500,
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    color: "white",
    fontSize: 30,
  },
  buttonsMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 140,
    marginTop: 15,
  },
  buttonsSecondary: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 270,
    marginTop: -17,
  },
  backIcons: {
    backgroundColor: "#9A34EA",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcons2: {
    backgroundColor: "#9A34EA",
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  likeAnimation: {
    position: "absolute",
    alignSelf: "center",
  },
  likeEmoji: {
    fontSize: 36,
    color: "red",
  },
  likeAnimation: {
    position: "absolute",
    alignSelf: "center",
  },
  likeEmoji: {
    fontSize: 36,
    color: "red",
  },
});

export default SPbuttons;

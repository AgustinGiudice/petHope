import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TokenContext } from "../context/TokenContext";
import { COLORS } from "../styles";
import isTablet from "../functions/isTablet";
import { setMascotaLike } from "../services/setMascotaLike";

const SPbuttons = ({
  mascota_id,
  setShowLikeAnimation,
  setResetMatches,
  currentUserId,
  setInfoPetModalIsVisible,
  setMascotas,
}) => {
  const { token } = useContext(TokenContext);
  const likeAnimationValue = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();

  // POST
  const postLike = async () => {
    try {
      const response = await setMascotaLike(mascota_id, currentUserId, token);
      if (!response.ok) {
        throw new Error("Error al likear mascota");
      }

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
          width: width - width * 0.02,
          height: isTablet() ? height * 0.8 : height * 0.5,
          bottom: isTablet()
            ? height - height * 1.665
            : height - height * 1.365,
        },
      ]}
    >
      <View
        style={[
          styles.buttonsMain,
          {
            marginTop: height * 0.02,
            width: isTablet() ? width * 0.27 : width * 0.37,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.backIcons2, { padding: height * 0.015 }]}
          onPress={() => postLike(mascota_id)}
        >
          <AntDesign name="hearto" size={height * 0.048} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backIcons, { padding: height * 0.015 }]}
        >
          <AntDesign name="close" size={height * 0.048} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.buttonsSecondary,
          {
            marginTop: -1 * height * 0.025,
            width: isTablet() ? width * 0.5 : width * 0.7,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.backIcons2, { padding: height * 0.012 }]}
        >
          <AntDesign name="sharealt" size={height * 0.034} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backIcons, { padding: height * 0.012 }]}
          onPress={() => setInfoPetModalIsVisible(true)}
        >
          <AntDesign name="ellipsis1" size={height * 0.034} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: COLORS[400],
    borderRadius: 500,
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonsMain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonsSecondary: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backIcons: {
    backgroundColor: COLORS[700],
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcons2: {
    backgroundColor: COLORS[700],
    borderRadius: 60,
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

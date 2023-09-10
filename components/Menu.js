import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BASE_URL } from "@env";
import { useState, useRef } from "react";

const Menu = ({ navigation, mascota_id }) => {
  const [matchResponse, setMatchResponse] = useState(null); // Estado para almacenar la respuesta

  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const likeAnimationValue = useRef(new Animated.Value(0)).current;

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  // POST
  const postLike = async () => {
    console.log(mascota_id);
    var url = `${BASE_URL}api/match`;
    try {
      const response = await fetch(`${BASE_URL}api/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idMascota: mascota_id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del backend:", data);
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
          setShowLikeAnimation(false);
        });
      } else {
        console.error("Error en la respuesta del backend:", response.status);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <View style={styles.menuContainer}>
 
      <TouchableOpacity
        style={styles.button}
        color="#007bff"
        onPress={() => navigation.navigate("Personal")}
      >
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pawbutton}
        onPress={() => postLike(mascota_id)}
      >
        <FontAwesome name="paw" size={50} />
      </TouchableOpacity>
      {showLikeAnimation && (
        <Animated.View
          style={[
            styles.likeAnimation,
            {
              bottom: likeAnimationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [screenHeight / 2, -100], // Ajusta los valores según tu diseño
              }),
            },
          ]}
        >
          <Text style={styles.likeEmoji}>❤️</Text>
        </Animated.View>
      )}

      {showLikeAnimation && (
        <Animated.View
          style={[
            styles.likeAnimation,
            {
              bottom: likeAnimationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [screenHeight / 2, -100], // Ajusta los valores según tu diseño
              }),
            },
          ]}
        >
          <Text style={styles.likeEmoji}>❤️</Text>
        </Animated.View>
      )}

      <View style={styles.space}></View>
      <TouchableOpacity style={styles.button} color="#007bff">
        <Text>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} color="#007bff">
        <Text>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    overflow: "visible",
    backgroundColor: "#007bff",
    height: 60,
    width: "100%",
    alignItems: "center",
    position: "relative",
    bottom: 0,
  },
  space: {
    width: 75,
  },
  pawbutton: {
    backgroundColor: "#777bf6",
    position: "absolute",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginHorizontal: width / 3,
    zIndex: 2,
    bottom: 0,
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

export default Menu;

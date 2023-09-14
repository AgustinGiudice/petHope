import React, { useEffect, useState, useRef, componentWillUnmount } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BASE_URL } from "@env";


const SPbuttons = ({mascota_id}) => {

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
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA"+mascota_id);
    
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

  //ANIMACION
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
        }

        // Agrega un efecto de limpieza para reiniciar la animación
        // return () => {
        //     setScaleValue(new Animated.Value(0));
        // };
        return cleanUp;
        
  }, []);
  
       

  // Aplicar la escala al estilo del componente
  const containerStyle = {
        ...styles.footerContainer,
        transform: [{ scale: scaleValue }],
  };
  //FIN ANIMACION

  return (
    <Animated.View style={containerStyle}>
      <View style={styles.buttonsMain}>
        <TouchableOpacity style={styles.backIcons} onPress={() => postLike(mascota_id)}>
          <AntDesign name="hearto" size={40} color="white" />
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
        <TouchableOpacity style={styles.backIcons}>
          <AntDesign name="close" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsSecondary}>
        <TouchableOpacity style={styles.backIcons2}>
          <AntDesign name="sharealt" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.backIcons2}>
          <AntDesign name="ellipsis1" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const width = Dimensions.get("window").width;
  const styles = StyleSheet.create({
    footerContainer: {
      width: 410,
      height: 400,
      backgroundColor: "#7A5FB5",
      borderRadius: 200,
      position: "absolute",
      bottom: -220,
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
      backgroundColor: "#5D2CC7",
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    backIcons2: {
      backgroundColor: "#5D2CC7",
      width: 45,
      height: 45,
      borderRadius: 22.5,
      justifyContent: "center",
      alignItems: "center",
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

export default SPbuttons;

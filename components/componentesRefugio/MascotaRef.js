import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const obtenerTamanioTexto = (tamanio) => {
  switch (tamanio) {
    case 1:
      return "Chico";
    case 2:
      return "Mediano";
    case 3:
      return "Grande";
    default:
      return "Desconocido";
  }
};

const obtenerEdadTexto = (edad) => {
  switch (edad) {
    case 1:
      return "Cachorro";
    case 2:
      return "Juvenil";
    case 3:
      return "Adulto";
    default:
      return "Desconocido";
  }
};

const obtenerSexoTexto = (sexo) => {
  switch (sexo) {
    case 1:
      return <Foundation name="male-symbol" size={40} color="blue" />;
    case 2:
      return <Foundation name="female-symbol" size={40} color="pink" />;
    default:
      return "Desconocido";
  }
};

const obtenerCuidados = (cuidadosEspeciales) => {
  if (cuidadosEspeciales === true) {
    return <Text> SI </Text>;
  } else {
    return <Text> NO </Text>;
  }
};

const MascotaRef = ({ mascota }) => {
  if (mascota.imagen.length !== 0) {
    console.log(mascota.imagen);
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerPet}>
        <Text style={styles.namePet}>{mascota.nombre}</Text>
        <View>
          <Ionicons
            style={styles.pawIcon}
            name="paw"
            size={35}
            // color={cambioColorPaw(mascotas[currentIndex].nivelCuidado)}
            color="blue"
          />
          <Text
            style={[
              styles.pawIconNumber,
              // {
              // color:
              //     mascotas[currentIndex].nivelCuidado === 1 ||
              //     mascotas[currentIndex].nivelCuidado === 5
              //     ? "white"
              //     : "black",
              // },
            ]}
          >
            {/* {mascotas[currentIndex].nivelCuidado} */}4
          </Text>
        </View>
      </View>
      <Image
        source={
          mascota.imagen.length !== 0
            ? { uri: mascota.imagen[0].url }
            : require("../../assets/refugio1.jpg")
        }
        style={styles.image}
      />
      <View style={styles.dataContainer}>
        <View style={styles.data1}>
          <Text style={styles.data}>
            Tamaño: {obtenerTamanioTexto(mascota.tamanio)}
          </Text>
          <Text style={styles.data}>
            Edad: {obtenerEdadTexto(mascota.edad)}
          </Text>
        </View>

        <Text style={styles.data}>{obtenerSexoTexto(mascota.sexo)}</Text>
      </View>
      <Text style={styles.data2}>
        CuidadosEspeciales: {obtenerCuidados(mascota.cuidadosEspeciales)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 5,
    width: screenWidth - screenWidth * 0.53,
    height: screenHeight - screenHeight * 0.7,
    alignItems: "center",
  },
  headerPet: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: screenWidth - screenWidth * 0.55,
    borderRadius: 10,
    height: 150,
    resizeMode: "cover",
  },
  namePet: {
    fontSize: 20,
  },
  dataContainer: {
    width: screenWidth - screenWidth * 0.53,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
  },
  data: {
    fontSize: 14,
    margin: 2,
  },
  data1: {},
  dificultad: {
    color: "red",
  },
  data2: {
    marginRight: 20, //DEBATIBLE
  },
  pawIcon: {
    position: "relative",
  },
  pawIconNumber: {
    position: "absolute",
    top: 15,
    left: 14,
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});

export default MascotaRef;

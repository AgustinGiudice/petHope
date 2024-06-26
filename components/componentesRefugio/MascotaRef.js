import { React, useState, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import { TokenContext } from "../../context/TokenContext";
import { UserContext } from "../../context/UserContext";
import { cambioColorPaw } from "../../functions/colorUtils";

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
      return <Foundation name="male-symbol" size={20} color="#33ccff" />;
    case 2:
      return <Foundation name="female-symbol" size={20} color="pink" />;
    default:
      return "Desconocido";
  }
};

const MascotaRef = ({ mascota, navigation }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [mascotaEliminada, setMascotaEliminada] = useState(false);
  const { token } = useContext(TokenContext);

  console.log(mascota);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("EditarMascota", { mascota: mascota })}
    >
      <View style={styles.container}>
        <View style={styles.headerPet}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.namePet}>
            {mascota.nombre}
          </Text>
          <View>
            <Ionicons
              style={styles.pawIcon}
              name="paw"
              size={35}
              color={cambioColorPaw(mascota.nivelCuidado)}
            />
            <Text style={styles.pawIconNumber}>{mascota.nivelCuidado}</Text>
          </View>
        </View>
        <View>
          <Image
            source={
              mascota.imagen.length !== 0
                ? { uri: mascota.imagen[0].url }
                : require("../../assets/default.jpg")
            }
            style={styles.image}
          />
        </View>
        <View style={styles.heightdataContainer}>
          <View style={styles.dataContainer}>
            <View style={styles.data1}>
              <Text style={styles.data}>
                Talla {obtenerTamanioTexto(mascota.tamanio)}
              </Text>
              <Text style={styles.data}>{obtenerEdadTexto(mascota.edad)}</Text>
              <Text style={styles.data}>
                {mascota.raza && mascota.raza.nombre}
              </Text>
            </View>
            <Text style={styles.data}>{obtenerSexoTexto(mascota.sexo)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 5,
    width: screenWidth - screenWidth * 0.53,
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
    width: screenWidth - screenWidth * 0.7,
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
    fontSize: 11,
    fontWeight: "bold",
    color: "black",
  },
});

export default MascotaRef;

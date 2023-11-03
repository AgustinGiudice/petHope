import React from "react";
import { View, Text, Image, StyleSheet,TouchableOpacity } from "react-native";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const cambioColorPaw = (numColor) => {
  let color;

  switch (numColor) {
    case 1:
      color = "blue";
      break;
    case 2:
      color = "green";
      break;
    case 3:
      color = "yellow";
      break;
    case 4:
      color = "orange";
      break;
    case 5:
      color = "red";
      break;
    default:
      color = "red";
      break;
  }

  return color;
};

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
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.namePet}>{mascota.nombre}</Text>
        <View>
          <Ionicons
            style={styles.pawIcon}
            name="paw"
            size={35}
            color={cambioColorPaw(mascota.nivelCuidado)}
          />
          <Text
            style={[
              styles.pawIconNumber,
               {
               color:
                   mascota.nivelCuidado === 1 ||
                   mascota.nivelCuidado === 5
                   ? "white"
                   : "white",
               },
            ]}
          >
          {mascota.nivelCuidado} 
          </Text>
        </View>
      </View>
      <View>
        <Image
          source={
            mascota.imagen.length !== 0
            ? { uri: mascota.imagen[0].url }
            : require("../../assets/refugio1.jpg")
          }
          style={styles.image}
          />
          <View style={styles.buttonsImage}>
            <TouchableOpacity style={styles.buttonedit} onPress={() => handleEdit()}>
              <AntDesign name="edit" size={20} color="black" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttondelete} onPress={() => handleDelete()}>
              <MaterialCommunityIcons name="delete" size={20} color="black" />
            </TouchableOpacity>
          </View>
      </View>
      <View style={styles.heightdataContainer}>

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
        Cuidados Especiales: {obtenerCuidados(mascota.cuidadosEspeciales)}
      </Text>

      </View>
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
    width: screenWidth - screenWidth * 0.70,
   
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
  buttonsImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'column',
  },
  buttonedit:{
    backgroundColor:"#76DF00",
    borderRadius:5,
    marginBottom: 5,
    marginTop: 5,
    width: 25,
    height: 25,
    justifyContent:"center",
    alignItems:"center"
  },
  buttondelete:{
    backgroundColor:"#DD4000",
    borderRadius:5,
    width: 25,
    height: 25,
    justifyContent:"center",
    alignItems:"center"
  }
});

export default MascotaRef;

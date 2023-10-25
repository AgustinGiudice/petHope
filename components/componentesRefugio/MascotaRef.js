import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import Ionicons from "react-native-vector-icons/Ionicons";
const MascotaRef = () => {
  return (
    <View style={styles.container}>
        <View style={styles.headerPet}>
            <Text style={styles.namePet}>Pedrito</Text>
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
                {/* {mascotas[currentIndex].nivelCuidado} */}
                4
                </Text>
            </View>
        </View>
      <Image
        source={require("../../assets/refugio1.jpg")} 
        style={styles.image}
      />
   
        <View style={styles.data1}>
            <Text style={styles.data}>Tamaño: Medio</Text>
            <Text style={styles.data}>Edad: Cachorro</Text>
            <Text style={styles.data}>Sexo: Masculino</Text>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10, 
    margin: 10, 
    width: screenWidth - screenWidth * 0.55,
    height: screenHeight - screenHeight * 0.70,
    alignItems:"center",
  },
  headerPet:{
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },
  image: {
    width: screenWidth - screenWidth * 0.55,
    borderRadius: 10, 
    height: 150, 
    resizeMode: 'cover', 
  },
  namePet:{
    fontSize:20
  },
  data: {
    fontSize: 14, 
    margin: 2, 
  },
  data1:{
  
  },
  dificultad:{
    color:"red"
  },
  pawIcon: {
    position: "relative",
  },
  pawIconNumber: {
    position: "absolute",
    top: 15,
    left: 14,
    fontSize: 12,
    fontWeight:'bold',
    color:"white"
  },
});

export default MascotaRef;

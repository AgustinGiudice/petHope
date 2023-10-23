import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MascotaRef = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/refugio1.jpg")} 
        style={styles.image}
      />
      <View>
        <View style={styles.data1}>
            <Text style={styles.data}>Tamaño: Medio</Text>
            <Text style={styles.data}>Edad: Cachorro</Text>
        </View>
        <View style={styles.data1}>
            <Text style={styles.data}>Sexo: Masculino</Text>
            <Text style={styles.data}>Dificultad: 3</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10, 
    margin: 10, 
    width: 240,
    alignItems:"center",
    
  },
  image: {
    width: 200, 
    height: 150, 
    resizeMode: 'cover', 
  },
  data: {
    fontSize: 14, 
    margin: 5, 
  },
  data1:{
    flexDirection:"row"
  }
});

export default MascotaRef;

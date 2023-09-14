import { View, Text, Image, StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../hooks/useScreenResize";
import { getAnimalDescripcion, getEdadDescripcion, getTamanioDescripcion, getSexoDescripcion } from "../hooks/getDescripciones";
const ItemList = ({ item }) => {
  
  return (
    <View style={styles.mascotaItem}>
      <Image source={{ uri: item.pic }} style={styles.mascotaImagen} />
      <Text style={styles.mascotaNombre}>{item.nombre}</Text>
      <Text>Raza: {getAnimalDescripcion(item.raza)}</Text>
      <Text>Edad: {getEdadDescripcion(item.edad)}</Text>
      <Text>Nivel de Cuidado: {item.nivelCuidado}</Text>
      <Text>Distancia: {(item.distance / 1000).toFixed(2)} km</Text>
      <Text>Tamaño: {getTamanioDescripcion(item.tamanio)}</Text>
      <Text>Sexo: {getSexoDescripcion(item.sexo)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mascotaItem: {
    marginTop: 5,
    borderRadius: 5,
    textAlign: "center",
    justifyContent: "space-between",
    width: screenWidth ,
    // position:"relative",
    zIndex:1,

  },
  mascotaImagen: {
    width: "100%",
    height: screenHeight * 0.6,
    borderRadius: 5,
    resizeMode: "cover",
    alignContent: "center",
    marginTop:-10
  },
  mascotaNombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ItemList;

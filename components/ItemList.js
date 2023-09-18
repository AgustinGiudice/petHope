import { View, Text, Image, StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../hooks/useScreenResize";
import { getAnimalDescripcion, getEdadDescripcion, getTamanioDescripcion, getSexoDescripcion } from "../hooks/getDescripciones";
const ItemList = ({ item }) => {
  
  return (
    <View style={styles.mascotaItem}>
      <Image source={{ uri: item.pic }} style={styles.mascotaImagen} />
      <View  style={styles.dataItem}>
        {/* <Text>Nivel de Cuidado: {item.nivelCuidado}</Text>
        <Text style={styles.mascotaNombre}>{item.nombre}</Text> */}
        <View style={styles.dataItemArria}>
          <Text style={styles.tag}>Raza: {getAnimalDescripcion(item.raza)}</Text>
          <Text style={styles.tag}>Edad: {getEdadDescripcion(item.edad)}</Text>
          <Text style={styles.tag}>Distancia: {(item.distance / 1000).toFixed(2)} km</Text>
        </View>
        <View  style={styles.dataItemArria}>
          <Text style={styles.tag}>Tamaño: {getTamanioDescripcion(item.tamanio)}</Text>
          <Text style={styles.tag}>Sexo: {getSexoDescripcion(item.sexo)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mascotaItem: {
    marginTop: 5,
    borderRadius: 5,
    textAlign: "center",
    width: screenWidth ,
    // position:"relative",
    zIndex:1,
    gap:2
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
  dataItem:{
   alignItems:"center"
  },
  dataItemArria: {
    flexDirection:"row"
  },
  tag:{
    textAlign:"center",
    justifyContent:"center",
    alignContent:"center",
    backgroundColor:"#9A34EA",
    width: 130,
    height: 25,
    borderRadius: 5,
    margin:3,
    color:"white"
  }
});

export default ItemList;

import { View, Text, Image, StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../hooks/useScreenResize";
import { getAnimalDescripcion, getEdadDescripcion, getTamanioDescripcion, getSexoDescripcion } from "../hooks/getDescripciones";
const ItemList = ({ nombre, children }) => {
  
  return (
    <>
    <View style={styles.mascotaItem}>
      <Image source={{ uri: item.pic }} style={styles.mascotaImagen} />
      <View  style={styles.dataItem}>
        {/* <Text>Nivel de Cuidado: {item.nivelCuidado}</Text>
        <Text style={styles.mascotaNombre}>{item.nombre}</Text> */}
        <View style={styles.dataItemArria}>
          <Text>Raza: {getAnimalDescripcion(item.raza)}</Text>
          <Text>Edad: {getEdadDescripcion(item.edad)}</Text>
          <Text>Distancia: {(item.distance / 1000).toFixed(2)} km</Text>
        </View>
        <View  style={styles.dataItemArria}>
          <Text>Tamaño: {getTamanioDescripcion(item.tamanio)}</Text>
          <Text>Sexo: {getSexoDescripcion(item.sexo)}</Text>
        </View>
      </View>
    </View>

    <View>
        <Text>{nombre}: {children}</Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({

});

export default ItemList;

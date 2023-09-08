import { View, Text, Image, StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../hooks/useScreenResize";
import Menu from "./Menu";

const ItemList = ({ item }) => {
  const styles = StyleSheet.create({
    mascotaItem: {
      marginTop: 5,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      borderRadius: 5,
      textAlign: "center",
      justifyContent: "space-between",
      height: screenHeight * 0.87,
      width: screenWidth - 10,
    },
    mascotaImagen: {
      width: "100%",
      height: screenHeight * 0.6,
      borderRadius: 5,
      resizeMode: "cover",
      alignContent: "center",
    },
    mascotaNombre: {
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.mascotaItem}>
      <Image source={{ uri: item.pic }} style={styles.mascotaImagen} />
      <Text style={styles.mascotaNombre}>{item.nombre}</Text>
      <Menu
              mascota_id={item.id}
            />
      <Text>Raza: {item.raza === 1 ? "Perro" : "Gato"}</Text>
      <Text>
        Edad:{" "}
        {item.edad === 1 ? "Cachorro" : item.edad === 2 ? "Juvenil" : "Adulto"}
      </Text>
      <Text>Nivel de Cuidado: {item.nivelCuidado}</Text>
      <Text>Distancia: {(item.distance / 1000).toFixed(2)} km</Text>
      <Text>
        Tamaño:{" "}
        {item.tamanio === 1 ? "Chico" : item.tamanio === 2 ? "Medio" : "Grande"}
      </Text>
    </View>
  );
};

export default ItemList;

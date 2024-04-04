import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import img from "../assets/perrogato.jpg";
import { Image } from "react-native";
import HeaderMascota from "./HeaderMascota";
import { COLORS } from "../styles";

const SinMascotas = ({ filtros, setFiltros, setResetMatches }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <HeaderMascota
        filtros={filtros}
        setFiltros={setFiltros}
        setResetMatches={setResetMatches}
        mascota={{ nombre: "No encontramos nada" }}
      />
      <View style={[styles.imgContainer, { height: width - 30 }]}>
        <Image source={img} style={styles.imagen} />
      </View>
      <Text style={styles.texto}>
        Probá cambiando el filtro de arriba o volvé más tarde
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS[50],
    flex: 1,
    gap: 20,
  },
  texto: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
    paddingHorizontal: 50,
    flex: 1,
  },
  imgContainer: {
    marginTop: 60,
    padding: 20,
    borderRadius: 500,
    backgroundColor: COLORS[300],
    borderWidth: 3,
    borderColor: COLORS[600],
  },
  imagen: {
    borderColor: COLORS[400],
    borderWidth: 2,
    borderRadius: 500,
    aspectRatio: 1,
    height: "100%",
  },
});

export default SinMascotas;

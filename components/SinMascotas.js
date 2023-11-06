import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import img from "../assets/perrogato.jpg";
import { Image } from "react-native";
import HeaderMascota from "./HeaderMascota";

const SinMascotas = ({ filtros, setFiltros, setResetMatches }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <HeaderMascota
        filtros={filtros}
        setFiltros={setFiltros}
        setResetMatches={setResetMatches}
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
    backgroundColor: "#f1f1f1",
    flex: 1,
    alignItems: "center",
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
    backgroundColor: "#C69AE8",
    borderWidth: 3,
    borderColor: "#9A34EA",
  },
  imagen: {
    borderColor: "#9A34EA",
    borderWidth: 2,
    borderRadius: 500,
    aspectRatio: 1,
    height: "100%",
  },
});

export default SinMascotas;

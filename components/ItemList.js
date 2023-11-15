import { View, Text, Image, StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../hooks/useScreenResize";
import {
  getEdadDescripcion,
  getTamanioDescripcion,
} from "../hooks/getDescripciones";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import HeaderMascota from "./HeaderMascota";
import Foundation from "react-native-vector-icons/Foundation";
import Constants from "expo-constants";
import { COLORS } from "../styles";

const obtenerTipoMascota = (t) => {
  switch (t) {
    case 1:
      return <FontAwesome5 name="dog" size={40} color="black" />;

    case 2:
      return <FontAwesome5 name="cat" size={40} color="black" />;

    default:
      return <FontAwesome5 name="dog" size={40} color="black" />;
  }
};

const obtenerSexoTexto = (sexo) => {
  switch (sexo) {
    case 1:
      return <Foundation name="male-symbol" size={45} color="#33ccff" />;
    case 2:
      return <Foundation name="female-symbol" size={45} color="pink" />;
    default:
      return "Desconocido";
  }
};

function getRazaTexto(raza) {
  if (raza === "Otra") {
    return "Sin raza";
  }
  return raza;
}

const ItemList = ({ item, filtros, setFiltros, setResetMatches }) => {
  return (
    <View style={styles.mascotaItem}>
      <HeaderMascota
        mascota={item}
        filtros={filtros}
        setFiltros={setFiltros}
        setResetMatches={setResetMatches}
      />
      <View>
        <View>
          <Image
            source={
              // {uri: item.imagenes.length > 0 ? item.imagenes[0].url : null,}
              require("../assets/refugio1.jpg")
            }
            style={styles.mascotaImagen}
          />
          <LinearGradient
            colors={["rgba(255, 99, 71, 0)", "#000000"]}
            style={styles.gradient}
          ></LinearGradient>
        </View>
        <View style={styles.containerDistancia}>
          <AntDesign name="enviromento" size={22} color={COLORS[50]} />
          <Text style={styles.itemDistancia}>
            {" "}
            A {(item.distance / 1000).toFixed(2)} km de distancia.
          </Text>
        </View>
      </View>
      <View style={styles.dataItem}>
        <View style={styles.dataItemArria}>
          <Text style={styles.tag}>{getRazaTexto(item.raza)}</Text>
          <Text style={styles.tag}>
            Talla {getTamanioDescripcion(item.tamanio)}
          </Text>
          <Text style={styles.tag}>{getEdadDescripcion(item.edad)}</Text>
        </View>

        <View style={styles.dataItemArria3}>
          <Text>{obtenerTipoMascota(item.anima)}</Text>
          <Text>{obtenerSexoTexto(item.sexo)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mascotaItem: {
    borderRadius: 5,
    textAlign: "center",
    width: screenWidth,
    flex: 1,
    zIndex: 1,
    gap: 3,
    backgroundColor: COLORS[50],
    overflow: "hidden",
    minHeight: screenHeight,
    maxHeight: screenHeight,
    paddingTop: Constants.statusBarHeight,
  },
  mascotaImagen: {
    width: "100%",
    height: screenHeight * 0.68,
    borderRadius: 5,
    resizeMode: "cover",
    position: "relative",
  },
  containerDistancia: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  itemDistancia: {
    fontSize: screenHeight * 0.018,
    color: "white",
  },
  mascotaNombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dataItem: {
    alignItems: "center",
    position: "relative",
    //aca
  },
  dataItemArria: {
    flexDirection: "row",
    width: screenWidth,
    justifyContent: "space-around",
  },
  dataItemArria2: {
    flexDirection: "row",
  },
  dataItemArria3: {
    position: "absolute",
    bottom: -screenHeight * 0.08,
    flexDirection: "row",
    width: screenWidth - 25,
    justifyContent: "space-between",
  },
  tag: {
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: COLORS[700],
    width: screenWidth * 0.3,
    height: screenHeight * 0.03,
    borderRadius: 5,
    color: COLORS[50],
    margin: 3,
    fontSize: screenHeight * 0.013,
    padding: screenHeight * 0.003,
  },
  gradient: {
    position: "absolute",
    width: screenWidth,
    height: 100,
    bottom: 0,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  iconMasota: {
    width: 80,
    height: 90,
  },
});

export default ItemList;

import { View, Text, Image, StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../hooks/useScreenResize";
import {
  getAnimalDescripcion,
  getEdadDescripcion,
  getTamanioDescripcion,
  getSexoDescripcion,
} from "../hooks/getDescripciones";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import HeaderMascota from "./HeaderMascota";

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
            source={{
              uri: item.imagenes.length > 0 ? item.imagenes[0].url : null,
            }}
            style={styles.mascotaImagen}
          />
          <LinearGradient
            colors={["rgba(255, 99, 71, 0)", "#000000"]}
            style={styles.gradient}
          ></LinearGradient>
        </View>
        <View style={styles.containerDistancia}>
          <AntDesign name="enviromento" size={22} color="white" />
          <Text style={styles.itemDistancia}>
            {" "}
            A {(item.distance / 1000).toFixed(2)} km de distancia.
          </Text>
        </View>
      </View>
      <View style={styles.dataItem}>
        {/* <Text>Nivel de Cuidado: {item.nivelCuidado}</Text>
        <Text style={styles.mascotaNombre}>{item.nombre}</Text> */}
        <View style={styles.dataItemArria}>
          <Text style={styles.tag}>Raza: {item.raza}</Text>
          <Text style={styles.tag}>
            Animal: {getAnimalDescripcion(item.animal)}
          </Text>
          <Text style={styles.tag}>Edad: {getEdadDescripcion(item.edad)}</Text>
        </View>
        <View style={styles.dataItemArria2}>
          <Text style={styles.tag}>
            Tamaño: {getTamanioDescripcion(item.tamanio)}
          </Text>
          <Text style={styles.tag}>Sexo: {getSexoDescripcion(item.sexo)}</Text>
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
    // position:"relative",
    zIndex: 1,
    gap: 3,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  mascotaImagen: {
    width: "100%",
    height: screenHeight * 0.6,
    borderRadius: 5,
    resizeMode: "cover",
    alignContent: "center",
    marginTop: -10,
    position: "relative",
  },
  containerDistancia: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  itemDistancia: {
    fontSize: 20,
    color: "white",
  },
  mascotaNombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dataItem: {
    alignItems: "center",
  },
  dataItemArria: {
    flexDirection: "row",
    width: screenWidth,
    justifyContent: "space-around",
  },
  dataItemArria2: {
    flexDirection: "row",
  },
  tag: {
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#9A34EA",
    width: 130,
    height: 25,
    borderRadius: 5,
    color: "white",
    margin: 3,
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
});

export default ItemList;

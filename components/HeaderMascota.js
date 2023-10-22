import { View, Text, StyleSheet } from "react-native";
import ButtonFilters from "./ButtonFilters";
import Ionicons from "react-native-vector-icons/Ionicons";
import {  screenWidth } from "../hooks/useScreenResize";

const HeaderMascota = (
  filtros,
  setFiltros,
  currentIndex,
  mascotas,
  setResetMatches
) => {
  const cambioColorPaw = (numColor) => {
    let color;

    switch (numColor) {
      case 1:
        color = "blue";
        break;
      case 2:
        color = "green";
        break;
      case 3:
        color = "yellow";
        break;
      case 4:
        color = "orange";
        break;
      case 5:
        color = "red";
        break;
      default:
        color = "red";
        break;
    }

    return color;
  };

  return (
    <View style={styles.headerItem}>
      <View style={styles.headerItem2}>
        <View style={styles.headerItemsContenido}>
          <View style={styles.buttonFilters}>
            <ButtonFilters
              filtros={filtros}
              setFiltros={setFiltros}
              setResetMatches={setResetMatches}
            />
          </View>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.namePet}>
            {mascotas[currentIndex].nombre}
          </Text>
          <View>
            <Ionicons
              style={styles.pawIcon}
              name="paw"
              size={45}
              color={cambioColorPaw(mascotas[currentIndex].nivelCuidado)}
            />
            <Text
              style={[
                styles.pawIconNumber,
                {
                  color:
                    mascotas[currentIndex].nivelCuidado === 1 ||
                    mascotas[currentIndex].nivelCuidado === 5
                      ? "white"
                      : "black",
                },
              ]}
            >
              {mascotas[currentIndex].nivelCuidado}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerItem: {
    position: "relative",
    backgroundColor: "#7A5FB5",
    width: screenWidth,
    height: 50,
    borderRadius: 10,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerItem2: {
    position: "absolute",
    backgroundColor: "#C69AE8",
    width: 1300,
    height: 1300,
    borderRadius: 630,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: -35,
    elevation: 10, // Para Android
    shadowColor: "black", // Para iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  headerItemsContenido: {
    flexDirection: "row",
    width: screenWidth,
    justifyContent: "space-between",
    marginBottom: 30,
    alignItems: "baseline",
    paddingHorizontal: 30,
    textAlign: "center",
  },
  buttonFilters: {
    zIndex: 1,
  },
  namePet: {
    color: "white",
    fontWeight: "bold",
    fontSize: 28,
    flex: 1,
    paddingHorizontal: 3,
    textAlign: "center",
    textAlignVertical: "center",
  },
  pawIcon: {
    position: "relative",
  },
  pawIconNumber: {
    position: "absolute",
    top: 19,
    left: 18,
    fontSize: 12,
  },
});

export default HeaderMascota;

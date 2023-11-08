import { View, Text, StyleSheet } from "react-native";
import ButtonFilters from "./ButtonFilters";
import Ionicons from "react-native-vector-icons/Ionicons";
import { screenWidth, screenHeight } from "../hooks/useScreenResize";

const HeaderMascota = ({ filtros, setFiltros, mascota, setResetMatches }) => {
  const cambioColorPaw = (numColor) => {
    let color;

    switch (numColor) {
      case 1:
        color = "#0080ff";
        break;
      case 2:
        color = "#33ff66";
        break;
      case 3:
        color = "#ffdb4d";
        break;
      case 4:
        color = "#ff944d";
        break;
      case 5:
        color = "#ff4d4d";
        break;
      default:
        color = "#ff4d4d";
        break;
    }

    return color;
  };

  return (
    <View style={styles.headerItem}>
      <View style={styles.headerItem2}>
        <View style={styles.headerItemsContenido}>
          {filtros && (
            <View style={styles.buttonFilters}>
              <ButtonFilters
                filtros={filtros}
                setFiltros={setFiltros}
                setResetMatches={setResetMatches}
              />
            </View>
          )}
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.namePet}>
            {mascota
              ? mascota.nombre
              : " No tenemos más mascotas para mostrarte"}
          </Text>
          <View>
            {mascota && (
              <>
                <Ionicons
                  style={styles.pawIcon}
                  name="paw"
                  size={45}
                  color={cambioColorPaw(mascota.nivelCuidado)}
                />
                <Text style={styles.pawIconNumber}>{mascota.nivelCuidado}</Text>
              </>
            )}
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
    height: screenHeight * 0.045,
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
    marginBottom: screenHeight * 0.025,
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

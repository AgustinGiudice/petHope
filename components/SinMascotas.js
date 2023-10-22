import { View, Text, StyleSheet } from "react-native";
import ButtonFilters from "./ButtonFilters";

const SinMascotas = ({ filtros, setFiltros, setResetMatches }) => {
  return (
    <View style={styles.buttonFilters}>
      <Text styles={styles.sinMascotas}>No hay mascotas para mostrar</Text>

      <ButtonFilters
        filtros={filtros}
        setFiltros={setFiltros}
        setResetMatches={setResetMatches}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonFilters: {
    zIndex: 1,
  },
  sinMascotas: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    flex: 1,
  },
});

export default SinMascotas;

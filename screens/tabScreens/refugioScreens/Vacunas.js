import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ListaVacunas from "../../../components/componentesRefugio/ListaVacunas";
import { getVacunas } from "../../../services/vacunasService"; // Asegúrate de actualizar la ruta si es necesario

const mascotaId = "5e4b9002-9bff-419d-be73-d387b6effe97"; // Ejemplo de ID de mascota, reemplaza o ajusta según necesites

const Vacunas = ({ navigation }) => {
  const [vacunas, setVacunas] = useState([]);

  useEffect(() => {
    const cargarVacunas = async () => {
      const vacunasData = await getVacunas(mascotaId);
      setVacunas(vacunasData);
    };

    cargarVacunas();
  }, []); // El arreglo vacío asegura que el efecto se ejecute solo una vez al montar el componente

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Vacunas</Text>
      <ListaVacunas vacunas={vacunas} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#e3e3e3",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    paddingBottom: 25,
    paddingHorizontal: 10,
  },
  titulo: {
    fontSize: 20,
    color: "#9A34EA",
    fontWeight: "bold",
    padding: 20,
  },
});

export default Vacunas;
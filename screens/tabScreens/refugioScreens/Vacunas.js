import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ListaVacunas from "../../../components/componentesRefugio/ListaVacunas";
import { getVacunas } from "../../../services/getVacunas";
import Constants from "expo-constants";
import { TokenContext } from "../../../context/TokenContext";

const Vacunas = ({ route }) => {
  const { token } = useContext(TokenContext);
  const [vacunas, setVacunas] = useState([]);
  const { mascotaId } = route.params;
  useEffect(() => {
    console.log("ID EN VACUNAS" + mascotaId);
    const cargarVacunas = async () => {
      const vacunasData = await getVacunas(token, mascotaId);
      setVacunas(vacunasData);
    };

    cargarVacunas();
  }, [mascotaId]); // El arreglo vacío asegura que el efecto se ejecute solo una vez al montar el componente

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
// [
//   {
//     id: "7517ad31-0226-48a6-a729-ba80e0ca10cd",
//     nombre: "Sextuple",
//     tipoAnimal: "perro",
//     aplicacionCachorro: [
//       {
//         nombre: "1er dosis",
//         edadDias: 87,
//       },
//       {
//         nombre: "2da dosis",
//         edadDias: 108,
//       },
//     ],
//     aplicacionAdulto: [
//       {
//         meses: 12,
//         nombre: "anual",
//       },
//     ],
//     dosis: [
//       {
//         nombre: "1er dosis",
//         estado: "aplicada",
//         fechaAplicacion: "2024-04-15T00:00:00.000Z",
//       },
//       {
//         nombre: "2da dosis",
//         estado: "aplicada",
//         fechaAplicacion: "2024-04-15T00:00:00.000Z",
//       },
//       {
//         nombre: "anual",
//         estado: "aplicada",
//         fechaAplicacion: "2025-05-21T00:00:00.000Z",
//       },
//     ],
//   },
//   {
//     id: "f414d167-de23-44ac-aaaa-5a63232ed612",
//     nombre: "Quintuple",
//     tipoAnimal: "perro",
//     aplicacionCachorro: [
//       {
//         nombre: "1er dosis",
//         edadDias: 45,
//       },
//       {
//         nombre: "2da dosis",
//         edadDias: 66,
//       },
//     ],
//     aplicacionAdulto: null,
//     dosis: [
//       {
//         nombre: "1er dosis",
//         estado: "aplicada",
//         fechaAplicacion: "2024-04-15T00:00:00.000Z",
//       },
//       {
//         nombre: "2da dosis",
//         estado: "aplicada",
//         fechaAplicacion: "2024-04-15T00:00:00.000Z",
//       },
//     ],
//   },
//   {
//     id: "1fb7ec5e-79a3-4a19-acac-cb93069fbc72",
//     nombre: "Rabia",
//     tipoAnimal: "perro",
//     aplicacionCachorro: [
//       {
//         nombre: "única dosis",
//         edadDias: 129,
//       },
//     ],
//     aplicacionAdulto: [
//       {
//         meses: 12,
//         nombre: "anual",
//       },
//     ],
//     dosis: [
//       {
//         nombre: "única dosis",
//         estado: "aplicada",
//         fechaAplicacion: "2024-04-15T00:00:00.000Z",
//       },
//       {
//         nombre: "anual",
//         estado: "aplicada",
//         fechaAplicacion: "2024-04-15T00:00:00.000Z",
//       },
//     ],
//   },
//   {
//     id: "f2acba7a-1173-4a0d-b909-0833305358c8",
//     nombre: "Desparacitación",
//     tipoAnimal: "perro",
//     aplicacionCachorro: [
//       {
//         nombre: "única dosis",
//         edadDias: 21,
//       },
//     ],
//     aplicacionAdulto: [
//       {
//         meses: 6,
//         nombre: "semestral",
//       },
//     ],
//     dosis: [
//       {
//         nombre: "única dosis",
//         estado: "pendiente",
//         fechaAplicacion: null,
//       },
//       {
//         nombre: "semestral",
//         estado: "pendiente",
//         fechaAplicacion: null,
//       },
//     ],
//   },
//   {
//     id: "5821d586-837a-4bb7-ab67-a32d5e220186",
//     nombre: "Bordetella Bronchiseptica",
//     tipoAnimal: "perro",
//     aplicacionCachorro: [
//       {
//         nombre: "única dosis",
//         edadDias: 150,
//       },
//     ],
//     aplicacionAdulto: [
//       {
//         meses: 6,
//         nombre: "semestral",
//       },
//     ],
//     dosis: [
//       {
//         nombre: "única dosis",
//         estado: "aplicada",
//         fechaAplicacion: "2024-04-15T00:00:00.000Z",
//       },
//       {
//         nombre: "semestral",
//         estado: "pendiente",
//         fechaAplicacion: null,
//       },
//     ],
//   },
// ]

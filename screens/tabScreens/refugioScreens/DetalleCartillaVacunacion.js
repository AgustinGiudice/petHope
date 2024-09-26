import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from "@react-native-community/datetimepicker";
import { actualizarVacuna, agregarVacuna, getVacunasDetalladas2, eliminarVacuna } from "../../../services/cartillaServices";
import { TokenContext } from "../../../context/TokenContext";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Constants from "expo-constants";

const DetalleCartillaVacunacion = ({ route }) => {
  const { mascotaId, mascotaTipo } = route.params;
  const { token } = useContext(TokenContext);
  const navigation = useNavigation();
  const [modoEdicion, setModoEdicion] = useState(false);
  const [vacunasDetalladas, setVacunasDetalladas] = useState([]);
  const [vacunasParaActualizar, setVacunasParaActualizar] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dosisDisponibles, setDosisDisponibles] = useState([]);
  const [dosisSeleccionada, setDosisSeleccionada] = useState(null);
  const [vacunaSeleccionadaId, setVacunaSeleccionadaId] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const tipoAnimal = mascotaTipo === 1 ? "perro" : "gato";
  useEffect(() => {
    const cargarVacunasDetalladas = async () => {
      try {
        const vacunasData = await getVacunasDetalladas2(mascotaId, token);
        // Filtrar las vacunas según el tipo de animal de la mascota
        const vacunasFiltradas = vacunasData.filter(vacuna => vacuna.tipoAnimal === tipoAnimal);
        setVacunasDetalladas(vacunasFiltradas);
      } catch (error) {
        console.error("Error al cargar las vacunas detalladas:", error);
        Alert.alert("Error", "No se pudieron cargar las vacunas detalladas.");
      }
    };
  
    cargarVacunasDetalladas();
  }, [mascotaId, token, tipoAnimal]); // tipoAnimal debe ser un estado o una propiedad que determines de alguna forma
  

  const toggleModoEdicion = () => {
    setModoEdicion(!modoEdicion);
  };

  const onDosisChange = (itemValue) => {
    setDosisSeleccionada(itemValue);
    setMostrarDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fechaSeleccionada;
    setFechaSeleccionada(currentDate);
    setMostrarDatePicker(Platform.OS === "ios");
  };

  const abrirModalParaVacuna = (vacuna) => {
    const dosisFiltradas = vacuna.dosis
      .filter((d) => d.estado === "pendiente" && !dosisYaSeleccionada(vacuna.id, d.nombre))
      .map((d) => d.nombre);

    const dosisAdultoDisponible = vacuna.aplicacionAdulto && vacuna.aplicacionAdulto.length > 0
      && !dosisYaSeleccionada(vacuna.id, vacuna.aplicacionAdulto[0].nombre)
      ? vacuna.aplicacionAdulto[0].nombre : null;

    const dosisDisponiblesParaSeleccion = new Set(dosisFiltradas);
    if (dosisAdultoDisponible) {
      dosisDisponiblesParaSeleccion.add(dosisAdultoDisponible);
    }

    const dosisDisponiblesArray = Array.from(dosisDisponiblesParaSeleccion);

    if (dosisDisponiblesArray.length > 0) {
      setDosisDisponibles(dosisDisponiblesArray);
      setDosisSeleccionada(dosisDisponiblesArray[0]);
    } else {
      Alert.alert("Aviso", "Todas las dosis para esta vacuna ya han sido seleccionadas.");
      setModalVisible(false);
      return;
    }

    setVacunaSeleccionadaId(vacuna.id);
    setModalVisible(true);
  };

  const agregarDosis = async () => {
    if (dosisSeleccionada && fechaSeleccionada) {
      const nuevaVacunaParaActualizar = {
        mascotaId,
        vacunaId: vacunaSeleccionadaId,
        fechaAplicacion: fechaSeleccionada.toISOString().split("T")[0],
        dosis: dosisSeleccionada,
      };

      try {
        await agregarVacuna(nuevaVacunaParaActualizar, token);
        Alert.alert("Éxito", "La vacuna ha sido agregada correctamente.");
        setVacunasParaActualizar([...vacunasParaActualizar, nuevaVacunaParaActualizar]);
        setModalVisible(false);
      } catch (error) {
        console.error("Error al agregar la vacuna:", error);
        Alert.alert("Error", "Ocurrió un error al agregar la vacuna.");
      }
    } else {
      Alert.alert("Error", "Por favor, seleccione una dosis y una fecha para agregar.");
    }
  };

  const dosisYaSeleccionada = (vacunaId, nombreDosis) => {
    return vacunasParaActualizar.some(
      (vacuna) => vacuna.vacunaId === vacunaId && vacuna.dosis === nombreDosis
    );
  };

  const eliminarVacunaSeleccionada = async (vacunaId, nombreDosis) => {
    try {
      await eliminarVacuna({ mascotaId, vacunaId, dosis: nombreDosis }, token);
      Alert.alert("Éxito", "La vacuna ha sido eliminada correctamente.");
      // Recargar las vacunas después de la eliminación
      const vacunasData = await getVacunasDetalladas2(mascotaId, token);
      setVacunasDetalladas(vacunasData);
    } catch (error) {
      console.error("Error al eliminar la vacuna:", error);
      Alert.alert("Error", "Ocurrió un error al eliminar la vacuna.");
    }
  };

  const enviarActualizaciones = async () => {
    try {
      for (const vacuna of vacunasParaActualizar) {
        await actualizarVacuna(vacuna, token);
      }
      Alert.alert("Éxito", "Las vacunas se han actualizado correctamente.");
      setVacunasParaActualizar([]);
      navigation.navigate("EditarMascota", { mascotaId });
    } catch (error) {
      console.error("Error al actualizar las vacunas:", error);
      Alert.alert("Error", "Ocurrió un error al actualizar las vacunas.");
    }
  };

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tabla}>
          {vacunasDetalladas.map((vacuna) => (
            <View key={vacuna.id} style={styles.fila}>
              <Text style={styles.nombreVacuna}>{vacuna.nombre}</Text>
              <View style={styles.dosisContainer}>
                {vacuna.dosis.map((dosis, index) => (
                  <View key={index} style={styles.dosisInfo}>
                    <Icon
                      name={dosis.estado === "aplicada" || dosisYaSeleccionada(vacuna.id, dosis.nombre)
                        ? "check-circle" : "times-circle"}
                      size={20}
                      color={dosis.estado === "aplicada" || dosisYaSeleccionada(vacuna.id, dosis.nombre)
                        ? "green" : "red"}
                      style={styles.icono}
                    />
                    <Text style={styles.textoDosis}>
                      {`${dosis.nombre} - ${dosis.estado === "aplicada" || dosisYaSeleccionada(vacuna.id, dosis.nombre)
                        ? "Aplicada" : "Pendiente"}`}
                    </Text>
                    {dosis.fechaAplicacion && (
                      <Text style={styles.fechaAplicacion}>
                        {` el: ${new Date(dosis.fechaAplicacion).toLocaleDateString()}`}
                      </Text>
                    )}
                    {modoEdicion && (
                      <TouchableOpacity onPress={() => eliminarVacunaSeleccionada(vacuna.id, dosis.nombre)} style={styles.botonEliminar}>
                        <Icon name="trash" size={20} color="#f00" />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
              {modoEdicion && (
                <TouchableOpacity onPress={() => abrirModalParaVacuna(vacuna)} style={styles.botonEditar}>
                  <Icon name="edit" size={20} color="#555" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Seleccione la dosis para agregar:</Text>
            <Picker
              selectedValue={dosisSeleccionada}
              onValueChange={onDosisChange}
              style={styles.picker}
            >
              {dosisDisponibles.map((dosis, index) => (
                <Picker.Item key={index} label={dosis} value={dosis} />
              ))}
            </Picker>
            {mostrarDatePicker && (
              <DateTimePicker
                value={fechaSeleccionada}
                mode="date"
                display="default"
                onChange={onDateChange}
                style={styles.datePicker}
              />
            )}
            {fechaSeleccionada && (
              <TouchableOpacity onPress={() => setMostrarDatePicker(true)}>
                <Text style={styles.fechaTexto}>
                  Fecha Seleccionada: {fechaSeleccionada.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            )}
            <Button title="Agregar" onPress={agregarDosis} />
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.fab} onPress={toggleModoEdicion}>
        <Icon name={modoEdicion ? "times" : "pencil-alt"} size={24} color="white" />
      </TouchableOpacity>
      {modoEdicion && (
        <TouchableOpacity style={styles.botonEnviar} onPress={enviarActualizaciones}>
          <Text style={styles.textoBotonEnviar}>Actualizar Vacunas</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
    marginTop: Constants.statusBarHeight,
  },
  tabla: {
    alignItems: "flex-start",
    gap: 10,
    width: "100%",
  },
  fila: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  nombreVacuna: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 18,
  },
  dosisContainer: {
    paddingVertical: 5,
  },
  dosisInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
  },
  textoDosis: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
  fechaAplicacion: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#333",
  },
  fab: {
    position: "absolute",
    right: 25,
    bottom: 25,
    backgroundColor: "#db3e00",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: { height: 4, width: 0 },
  },
  botonEnviar: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    margin: 10,
    alignItems: "center",
  },
  textoBotonEnviar: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  picker: {
    width: 200,
  },
  botonEditar: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  botonEliminar: {
    marginLeft: 10,
  },
  datePicker: {
    width: 200,
  },
});

export default DetalleCartillaVacunacion;

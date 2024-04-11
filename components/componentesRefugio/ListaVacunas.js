import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
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
import Icon from "react-native-vector-icons/FontAwesome5"; // Asegúrate de tener este paquete instalado

import DateTimePicker from "@react-native-community/datetimepicker"; // Importa el DatePicker
//service de registrarVacunas
import { registrarVacunas } from "../../services/registrarVacunas";

const ListaVacunas = ({ vacunas }) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [vacunasParaAgregar, setVacunasParaAgregar] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dosisDisponibles, setDosisDisponibles] = useState([]);
  const [dosisSeleccionada, setDosisSeleccionada] = useState(null);
  const [vacunaSeleccionadaId, setVacunaSeleccionadaId] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date()); // Estado para la fecha seleccionada
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false); // Nuevo estado para controlar la visibilidad del DateTimePicker
  // Activa o desactiva el modo de edición
  const toggleModoEdicion = () => {
    setModoEdicion(!modoEdicion);
  };

  // Agrega una vacuna al estado vacunasParaAgregar
  // const agregarVacuna = (vacunaId, dosisNombre) => {
  //   const nuevaVacuna = {
  //     mascotaId: "5e4b9002-9bff-419d-be73-d387b6effe97", // Asegúrate de reemplazar esto con el ID de la mascota actual
  //     vacunaId: vacunaId,
  //     fechaAplicacion: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
  //     dosis: dosisNombre,
  //   };
  //   setVacunasParaAgregar([...vacunasParaAgregar, nuevaVacuna]);
  // };

  // Ejemplo de cómo manejar el envío de las vacunas agregadas al backend
  const enviarVacunas = () => {
    console.log(vacunasParaAgregar);
    
    registrarVacunas(vacunasParaAgregar).then((response) => {
      if (response.success) {
        Alert.alert("Vacunas enviadas", "Las vacunas se han enviado correctamente.");
        setVacunasParaAgregar([]); // Limpia el estado de vacunasParaAgregar
      } else {
        Alert.alert("Error", "Ocurrió un error al enviar las vacunas.");
      }
    }
    );
  };

  const onDosisChange = (itemValue) => {
    setDosisSeleccionada(itemValue);
    setMostrarDatePicker(true); // Muestra el DateTimePicker una vez se selecciona una dosis
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fechaSeleccionada;
    setFechaSeleccionada(currentDate);
    setMostrarDatePicker(Platform.OS === "ios"); // En Android, oculta el picker después de seleccionar la fecha. En iOS, puedes querer dejarlo visible.
  };

  const abrirModalParaVacuna = (vacuna) => {
    // Filtra las dosis pendientes que no estén ya seleccionadas para agregar
    const dosisFiltradas = vacuna.dosis
      .filter(
        (d) =>
          d.estado === "pendiente" &&
          !dosisYaSeleccionadaParaAgregar(vacuna.id, d.nombre)
      )
      .map((d) => d.nombre);

    // Verifica si se pueden reaplicar dosis de adultos y no están ya seleccionadas
    const dosisAdultoDisponible =
      vacuna.aplicacionAdulto &&
      vacuna.aplicacionAdulto.length > 0 &&
      !dosisYaSeleccionadaParaAgregar(
        vacuna.id,
        vacuna.aplicacionAdulto[0].nombre
      )
        ? vacuna.aplicacionAdulto[0].nombre
        : null;

    // Utiliza un Set para evitar duplicados
    const dosisDisponiblesParaSeleccion = new Set(dosisFiltradas);
    if (dosisAdultoDisponible) {
      dosisDisponiblesParaSeleccion.add(dosisAdultoDisponible);
    }

    // Convierte el Set nuevamente a un array para el estado
    const dosisDisponiblesArray = Array.from(dosisDisponiblesParaSeleccion);

    if (dosisDisponiblesArray.length > 0) {
      setDosisDisponibles(dosisDisponiblesArray);
      setDosisSeleccionada(dosisDisponiblesArray[0]);
    } else {
      // Manejo cuando no hay dosis disponibles
      Alert.alert(
        "Aviso",
        "Todas las dosis para esta vacuna ya han sido seleccionadas."
      );
      setModalVisible(false);
      return;
    }

    setVacunaSeleccionadaId(vacuna.id);
    setModalVisible(true);
  };

  const agregarDosis = () => {
    if (dosisSeleccionada && fechaSeleccionada) {
      const nuevaVacunaParaAgregar = {
        mascotaId: "5e4b9002-9bff-419d-be73-d387b6effe97",
        vacunaId: vacunaSeleccionadaId,
        fechaAplicacion: fechaSeleccionada.toISOString().split("T")[0], // Usa la fecha seleccionada
        dosis: dosisSeleccionada,
      };
      setVacunasParaAgregar([...vacunasParaAgregar, nuevaVacunaParaAgregar]);
      setModalVisible(false); // Cierra el modal
    } else {
      Alert.alert(
        "Error",
        "Por favor, seleccione una dosis y una fecha para agregar."
      );
    }
  };
  const dosisYaSeleccionadaParaAgregar = (vacunaId, nombreDosis) => {
    return vacunasParaAgregar.some(
      (vacuna) => vacuna.vacunaId === vacunaId && vacuna.dosis === nombreDosis
    );
  };
  const mostrarFechaPicker = () => {
    setMostrarDatePicker(true);
  };
  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tabla}>
          {vacunas.map((vacuna) => (
            <View key={vacuna.id} style={styles.fila}>
              <Text style={styles.nombreVacuna}>{vacuna.nombre}</Text>
              <View style={styles.dosisContainer}>
                {vacuna.dosis.map((dosis, index) => (
                  <View key={index} style={styles.dosisInfo}>
                    <Icon
                      name={
                        dosis.estado === "aplicada" ||
                        dosisYaSeleccionadaParaAgregar(vacuna.id, dosis.nombre)
                          ? "check-circle"
                          : "times-circle"
                      }
                      size={20}
                      color={
                        dosis.estado === "aplicada" ||
                        dosisYaSeleccionadaParaAgregar(vacuna.id, dosis.nombre)
                          ? "green"
                          : "red"
                      }
                      style={styles.icono}
                    />
                    <Text style={styles.textoDosis}>
                      {`${dosis.nombre} - ${
                        dosis.estado === "aplicada" ||
                        dosisYaSeleccionadaParaAgregar(vacuna.id, dosis.nombre)
                          ? "Aplicada"
                          : "Pendiente"
                      }`}
                    </Text>
                    {/* Modificado para mostrar la fecha de la dosis ya seleccionada para agregar */}
                    {(dosis.estado === "aplicada" ||
                      dosisYaSeleccionadaParaAgregar(
                        vacuna.id,
                        dosis.nombre
                      )) && (
                      <Text style={styles.fechaAplicacion}>
                        {` el: ${
                          dosisYaSeleccionadaParaAgregar(
                            vacuna.id,
                            dosis.nombre
                          )
                            ? new Date(
                                vacunasParaAgregar.find(
                                  (v) =>
                                    v.vacunaId === vacuna.id &&
                                    v.dosis === dosis.nombre
                                ).fechaAplicacion
                              ).toLocaleDateString()
                            : new Date(
                                dosis.fechaAplicacion
                              ).toLocaleDateString()
                        }`}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
              {modoEdicion && (
                <TouchableOpacity
                  onPress={() => abrirModalParaVacuna(vacuna)}
                  style={styles.botonEditar}
                >
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
            <Text style={styles.modalText}>
              Seleccione la dosis para agregar:
            </Text>
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
              <TouchableOpacity onPress={mostrarFechaPicker}>
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
        <Icon
          name={modoEdicion ? "times" : "pencil-alt"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      {modoEdicion && (
        <TouchableOpacity style={styles.botonEnviar} onPress={enviarVacunas}>
          <Text style={styles.textoBotonEnviar}>Enviar Vacunas</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
  },
  tabla: {
    // Orienta las celdas de manera horizontal
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
  header: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "bold",
    backgroundColor: "#db3e00",
    color: "white",
    fontSize: 18,
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
    backgroundColor: "#db3e00", // Color que prefieras para el botón
    width: 56, // Tamaño del FAB
    height: 56, // Tamaño del FAB
    borderRadius: 28, // Hacerlo circular
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: { height: 4, width: 0 },
  },
  botonAgregar: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#007bff", // Color de fondo para el botón de agregar
    padding: 8,
    borderRadius: 4, // Bordes redondeados para el botón de agregar
  },
  botonEnviar: {
    backgroundColor: "#28a745", // Color de fondo para el botón de enviar
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
    // Puedes necesitar otros estilos aquí
  },
  botonEditar: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  datePicker: {
    width: 200,
  },
});

export default ListaVacunas;

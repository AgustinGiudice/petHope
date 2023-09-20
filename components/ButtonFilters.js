import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { screenHeight, screenWidth } from "../hooks/useScreenResize.js";
import Radio from "./Radio.js";
import Input from "./Input.js";
import AntDesign from "react-native-vector-icons/AntDesign.js";
import Ionicons from "react-native-vector-icons/Ionicons.js";
import { Slider } from "@react-native-assets/slider";

const ButtonFilters = ({ filtros, setFiltros, setResetMatches }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [distancia, setDistancia] = useState(filtros.distancia);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal}>
        <Ionicons name="options-outline" size={35} color="black" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContainer}>
                <Text style={styles.title}>Filtros</Text>
                <Text style={styles.filterTitle}>Distancia</Text>
                <Slider
                  value={distancia}
                  minimumValue={500}
                  maximumValue={100000}
                  step={500}
                  thumbTintColor="#9A34EA"
                  minimumTrackTintColor="#ccc" // The track color before the current value
                  maximumTrackTintColor="#fff"
                  onValueChange={(value) => {
                    const newFiltro = filtros;
                    newFiltro.distancia = value;
                    setFiltros(newFiltro);
                    setDistancia(value);
                  }}
                />
                <Text style={styles.filterTitle}>{distancia / 1000} km</Text>

                <Text style={styles.filterTitle}>Tipo de animal</Text>
                <Radio
                  defaultValue={
                    filtros.tipoMascota === 1
                      ? "Perro"
                      : filtros.tipoMascota === 2
                      ? "Gatos"
                      : "Ambos"
                  }
                  data={["Perro", "Gato", "Ambos"]}
                  handleSelect={(value) => {
                    const formatedValue =
                      value === "Perro" ? 1 : value === "Gato" ? 2 : 3;
                    if (formatedValue !== filtros.tipoMascota) {
                      const newFiltro = filtros;
                      newFiltro.tipoMascota = formatedValue;
                      setFiltros(newFiltro);
                    }
                  }}
                />
                <Text style={styles.filterTitle}>Sexo</Text>
                <Radio
                  defaultValue={
                    filtros.tipoMascota === 1
                      ? "Macho"
                      : filtros.tipoMascota === 2
                      ? "Hembra"
                      : "Ambos"
                  }
                  data={["Macho", "Hembra", "Ambos"]}
                  handleSelect={(value) => {
                    const formatedValue =
                      value === "Macho" ? 1 : value === "Hembra" ? 2 : 3;
                    if (formatedValue !== filtros.sexo) {
                      const newFiltro = filtros;
                      newFiltro.sexo = formatedValue;
                      setFiltros(newFiltro);
                    }
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    {
                      closeModal();
                      setResetMatches(true);
                    }
                  }}
                  style={styles.filtrarButton}
                >
                  <Text>Filtrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <AntDesign name="close" size={23} />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttonText: {
    color: "black",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 5,
    color: "#9A34EA",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro semitransparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#C69AE8", // Fondo del modal
    borderRadius: 5,
    padding: 20,
    width: screenWidth * 0.8,
    height: screenHeight * 0.8,
  },
  closeButton: {
    position: "absolute",
    top: 7,
    right: 7,
  },
  filtrarButton: {
    backgroundColor: "#9A34EA",
    color: "white",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 7,
    right: 7,
  },
});

export default ButtonFilters;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { screenHeight, screenWidth } from "../hooks/useScreenResize.js";
import Radio from "./Radio.js";
import Input from "./Input.js";
import AntDesign from "react-native-vector-icons/AntDesign.js";

const ButtonFilters = ({ filtros, setFiltros, setIsFilterChanged }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonFilterSP} onPress={openModal}>
        <Text style={styles.buttonText}>Filtros</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
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
                <Input
                  style={styles.input}
                  placeholder="Ingrese la distancia"
                  setValue={(value) =>
                    setFiltros({
                      ...filtros,
                      ...(filtros.distancia = value),
                    })
                  }
                />
                <Text style={styles.filterTitle}>Tipo de animal</Text>
                <Radio
                  data={["Perro", "Gato", "Ambos"]}
                  handleSelect={(value) => {
                    const formatedValue =
                      value === "Perro" ? 1 : value === "Gato" ? 2 : 3;
                    if (formatedValue !== filtros.tipoMascota) {
                      setFiltros({
                        ...filtros,
                        ...(filtros.tipoMascota = formatedValue),
                      });
                      setIsFilterChanged(true); //DESPUES SACAR Y PASARLO AL ONPRESS() DE ALGÚN BOTON
                    }
                  }}
                />
                <Text style={styles.filterTitle}>Sexo</Text>
                <Radio
                  data={["Macho", "Hembra", "Ambos"]}
                  handleSelect={(value) => {
                    const formatedValue =
                      value === "Macho" ? 1 : value === "Hembra" ? 2 : 3;
                    if (formatedValue !== filtros.sexo) {
                      setFiltros({
                        ...filtros,
                        ...(filtros.sexo = formatedValue),
                      });
                      setIsFilterChanged(true); //DESPUES SACAR Y PASARLO AL ONPRESS() DE ALGÚN BOTON
                    }
                  }}
                />
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
  buttonFilterSP: {
    position: "absolute",
    top: 1,
    right: 20,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
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
    color: "#369EFE",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro semitransparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#A5D4FF", // Fondo del modal
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
});

export default ButtonFilters;

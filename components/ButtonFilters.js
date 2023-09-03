import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import RadioSelector from "./RadioSelector.js";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ButtonFilters = ({ children, filtros, setFiltros }) => {
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
        <Text style={styles.buttonText}>Filter</Text>
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
                {children}
                <Text style={styles.label}>Distancia</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingrese la distancia"
                />

                <RadioSelector
                  setFiltros={setFiltros}
                  filtros={filtros}
                  atributo={"tipoMascota"}
                  titulo={"Seleccione Raza"}
                  values={["Perro", "Gato", "Ambos"]}
                ></RadioSelector>

                {/* <RadioSelector titulo={"Seleccione Tamaño"} opcion1={"Chico"} opcion2={"Mediano"} opcion3={"Grande"}></RadioSelector>
                
                <RadioSelector titulo={"Seleccione Sexo"} opcion1={"Macho"} opcion2={"Hmebra"} opcion3={"Ambos"}></RadioSelector> */}

                <TouchableOpacity onPress={closeModal}>
                  <Text style={styles.buttonText}>Cerrar</Text>
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff", // Fondo del modal
    borderRadius: 5,
    padding: 20,
    width: screenWidth * 0.8,
    height: screenHeight * 0.8,
  },
});

export default ButtonFilters;

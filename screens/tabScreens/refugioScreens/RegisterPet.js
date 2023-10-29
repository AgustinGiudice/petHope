import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Constants from "expo-constants";
//https://github.com/AdelRedaa97/react-native-select-dropdown#buttonTextAfterSelection
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import { BASE_URL } from "@env";
import AddImageModal from "../../../components/AddImageModal";

const RegisterPet = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [selectedPic, setSelectedPic] = useState(null);
  const [addImageModalVisible, setAddImageModalVisible] = useState(false);
  const [newPetData, setNewPetData] = useState({
    nombre: "",
    animal: "",
    sexo: "",
    raza: "",
    edad: "",
    nivelCuidado: "",
    cuidadosEspeciales: "",
    tamanio: "",
    descripcion: "",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Publicar una mascota</Text>
      <View style={styles.row}>
        <View style={styles.inputsContainer}>
          <Input
            value={newPetData.nombre}
            setValue={setNewPetData}
            placeholder="Nombre"
            atributo="nombre"
          />
          <Select
            values={["Perro", "Gato"]}
            setValues={(item) => {
              const newData = newPetData;
              newData.animal = item === "Perro" ? 1 : 2;
              setNewPetData(newData);
            }}
            texto={"Animal"}
          />
          <Select
            values={["Macho", "Hembra"]}
            setValues={(item) => {
              const newData = newPetData;
              newData.sexo = item === "Macho" ? 1 : 2;
              setNewPetData(newData);
            }}
            texto={"Sexo"}
          />
          <Select
            values={["Perro", "Gato"]}
            setValues={(item) => {
              const newData = newPetData;
              newData.edad =
                item === "Cachorro" ? 1 : item === "Juvenil" ? 2 : 3;
              setNewPetData(newData);
            }}
            texto={"Edad"}
          />
          <Select
            values={["Raza", "Raza"]}
            //poner la lista de razas
            setValues={(item) => {
              const newData = newPetData;
              newData.raza = item === "Perro" ? 1 : 2;
              setNewPetData(newData);
            }}
            texto={"Raza"}
          />
          <Select
            values={["Pequeño", "Mediano", "Grande"]}
            setValues={(item) => {
              const newData = newPetData;
              newData.tamanio =
                item === "Pequeño" ? 1 : item === "Mediano" ? 2 : 3;
              setNewPetData(newData);
            }}
            texto={"Tamaño"}
          />
        </View>
        <View style={styles.column}>
          {images.map((image, key) => {
            return (
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => setSelectedPic(image)}
                key={key}
              >
                <Image source={{ uri: image }} style={styles.image} />
              </TouchableOpacity>
            );
          })}
          {images.length < 4 && (
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => setAddImageModalVisible(true)}
            >
              <View
                style={[
                  styles.image,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <MaterialIcons name="add-a-photo" size={30} color="white" />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <AddImageModal
          isVisible={addImageModalVisible}
          setIsVisible={setAddImageModalVisible}
          setImages={(img) => setImages([...images, img])}
        />
        <Modal
          isVisible={selectedPic !== null}
          onBackdropPress={() => setSelectedPic(null)}
        >
          <View style={styles.imageSelected}>
            <Image source={{ uri: selectedPic }} style={styles.imageSelected} />
            <TouchableOpacity
              onPress={() => setSelectedPic(null)}
              style={styles.picModalCloseButton}
            >
              <Icon name="times" size={25} color="#9A34EA" />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
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
  },
  titulo: {
    fontSize: 20,
    color: "#9A34EA",
    fontWeight: "bold",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 25,
    justifyContent: "flex-start",
  },
  inputsContainer: {
    flexDirection: "column",
    flex: 4,
    backgroundColor: "#e3e3e3",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
    gap: 10,
  },
  column: {
    flex: 3,
    alignItems: "flex-end",
    gap: 2,
  },
  imageContainer: {
    aspectRatio: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#C69AE8",
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
  },
  picModalCloseButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  imageSelected: {
    width: "100%",
    aspectRatio: 1,
  },
});

export default RegisterPet;

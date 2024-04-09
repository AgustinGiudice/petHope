import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Constants from "expo-constants";
//https://github.com/AdelRedaa97/react-native-select-dropdown#buttonTextAfterSelection
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import AddImageModal from "../../../components/AddImageModal";
import { UserContext } from "../../../context/UserContext";
import { TokenContext } from "../../../context/TokenContext";
import { agregarMascota } from "../../../services/agregarMascota";

const RegisterPet = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [selectedPic, setSelectedPic] = useState(null);
  const [addImageModalVisible, setAddImageModalVisible] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [newPetData, setNewPetData] = useState({
    nombre: "",
    animal: "",
    sexo: "",
    raza: "",
    edad: "",
    nivelCuidado: null,
    cuidadosEspeciales: true,
    tamanio: "",
    descripcion: "",
    refugioId: currentUser.id,
  });

  const handleClick = () => {
    agregarMascota(newPetData, images, token, navigation, setCurrentUser);
  };

  useEffect(() => {
    console.log(newPetData);
  }, [newPetData]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Publicar una mascota</Text>
      <View style={styles.row}>
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
        <View style={styles.inputsContainer}>
          <ScrollView>
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
              values={["Golden", "Husky"]}
              //poner la lista de razas
              setValues={(item) => {
                const newData = newPetData;
                newData.raza = item;
                setNewPetData(newData);
              }}
              texto={"Raza"}
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
              values={["Cachorro", "Juvenil", "Adulto"]}
              setValues={(item) => {
                const newData = newPetData;
                newData.edad =
                  item === "Cachorro" ? 1 : item === "Juvenil" ? 2 : 3;
                setNewPetData(newData);
              }}
              texto={"Edad"}
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
            <Select
              values={[1, 2, 3, 4, 5]}
              setValues={(item) => {
                const newData = { ...newPetData, nivelCuidado: item };
                setNewPetData(newData);
              }}
              texto={"Nivel de Cuidado"}
            />
            <Input
              value={newPetData.descripcion}
              setValue={setNewPetData}
              placeholder="Descripcion"
              atributo="descripcion"
            />
          </ScrollView>
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
      <FontAwesome
        name="arrow-right"
        size={40}
        style={{
          color: "#9A34EA",
          position: "absolute",
          bottom: 30,
          right: 30,
        }}
        onPress={handleClick}
      />
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
    alignItems: "flex-end",
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

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
import { BASE_URL } from "@env";
import LoadingComponent from "../../../components/LoadingComponent";

const RegisterPet = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [selectedPic, setSelectedPic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [addImageModalVisible, setAddImageModalVisible] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const initialPetData = {
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
    vif: null,
    vilef: null,
  };
  const [newPetData, setNewPetData] = useState(initialPetData);

  //TRAER RAZAS
  const [razas, setRazas] = useState([]);
  const [loadingRazas, setLoadingRazas] = useState(false);

  const handleAnimalChange = async (animal) => {
    if (animal) {
      let animalnumber = "";
      if (animal == "Perro") {
        animalnumber = 1;
      } else {
        animalnumber = 2;
      }
      setNewPetData((prevData) => ({ ...prevData, animal: animalnumber }));
      setLoadingRazas(true);

      try {
        const response = await fetch(
          `${BASE_URL}api/razas/allrazas?animal=${animalnumber}`,

          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify({ animal }),
          }
        );
        const data = await response.json();
        setRazas(data);
        console.log("RAZAS NUEVASELREF" + JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching razas:", error);
      }
      setLoadingRazas(false);
    } else {
      setRazas([]);
    }
  };

  const handleClick = () => {
    setIsLoading(true);
    setLoadingRazas(true);
    agregarMascota(newPetData, images, token, navigation, setCurrentUser).then(
      () => {
        setNewPetData(initialPetData);
        setImages([]);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  {
    if (isLoading) {
      return <LoadingComponent />;
    } else {
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
              <FontAwesome
                name="arrow-right"
                size={40}
                style={{
                  color: "#9A34EA",
                  position: "absolute",
                  bottom: 30,
                  right: 30,
                  zIndex: 999,
                }}
                onPress={handleClick}
              />
            </View>
            <ScrollView style={styles.inputsContainer}>
              {/* <ScrollView style={styles.scrollRegisterPet}> */}
              <Input
                style={styles.inputRegisterPet}
                value={newPetData.nombre}
                setValue={setNewPetData}
                placeholder="Nombre"
                atributo="nombre"
                width="100%"
              />

              <Select
                style={styles.select}
                values={["Perro", "Gato"]}
                setValues={handleAnimalChange}
                texto={"Animal"}
                width="100%"
              />
              <Select
                width="100%"
                values={razas.map((raza) => raza.nombre)}
                setValues={(item) => {
                  const selectedRaza = razas.find(
                    (raza) => raza.nombre === item
                  ); // Buscar la raza seleccionada por su nombre
                  if (selectedRaza) {
                    const newData = { ...newPetData, raza: selectedRaza.id }; // Guardar el ID de la raza seleccionada en newPetData
                    setNewPetData(newData);
                  }
                }}
                texto={"Raza"}
                loading={loadingRazas}
                disabled={!newPetData.animal}
                placeholder={
                  !newPetData.animal ? "Seleccione tipo de animal" : undefined
                }
              />
              <Select
                width="100%"
                values={["Macho", "Hembra"]}
                setValues={(item) => {
                  const newData = newPetData;
                  newData.sexo = item === "Macho" ? 1 : 2;
                  setNewPetData(newData);
                }}
                texto={"Sexo"}
              />
              <Select
                width="100%"
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
                width="100%"
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
                width="100%"
                values={[1, 2, 3, 4, 5]}
                setValues={(item) => {
                  const newData = { ...newPetData, nivelCuidado: item };
                  setNewPetData(newData);
                }}
                texto={"Nivel de Cuidado"}
              />
              <Select
                width="100%"
                values={["VIF: Si", "VIF: No"]}
                setValues={(item) => {
                  const newData = {
                    ...newPetData,
                    vif: item === "Si" ? true : false,
                  };
                  setNewPetData(newData);
                }}
                texto={"Sufre VIF?"}
              />
              <Select
                width="100%"
                values={["VILEF: Si", "VILEF: No"]}
                setValues={(item) => {
                  const newData = {
                    ...newPetData,
                    vilef: item === "Si" ? true : false,
                  };
                  setNewPetData(newData);
                }}
                texto={"Sufre VILEF?"}
              />

              <Input
                width="100%"
                value={newPetData.descripcion}
                setValue={setNewPetData}
                placeholder="Descripcion"
                atributo="descripcion"
              />
            </ScrollView>

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
                <Image
                  source={{ uri: selectedPic }}
                  style={styles.imageSelected}
                />
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
    }
  }
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
    paddingHorizontal: 10,
    gap: 10,
  },

  inputsContainer: {
    // flexDirection: "column",
    flex: 1,
    width: "100%",
    backgroundColor: "#e3e3e3",
    // justifyContent: "flex-start",
    // alignItems: "flex-end",
    borderRadius: 10,
    gap: 10,
  },
  column: {
    flex: 1,
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

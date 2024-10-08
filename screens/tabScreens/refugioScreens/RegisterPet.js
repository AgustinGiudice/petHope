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
import { getRazas } from "../../../services/getRazas";
import { UserContext } from "../../../context/UserContext";
import { TokenContext } from "../../../context/TokenContext";
import { agregarMascota } from "../../../services/agregarMascota";
import LoadingComponent from "../../../components/LoadingComponent";

const RegisterPet = ({ navigation }) => {
  const [mascotaId, setMascotaId] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPic, setSelectedPic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(false);
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
      getRazas(animalnumber, setRazas).then(() => {
        setLoadingRazas(false);
      });
    } else {
      setRazas([]);
    }
  };

  const handleSubmit = async () => {
    let localError = [];
    Object.keys(newPetData).forEach((key) => {
      if (
        (newPetData[key] === "" && key !== "descripcion") ||
        (newPetData[key] === null && key !== "vilef" && key !== "vif")
      ) {
        if (key === "tamanio") {
          localError.push(`Por favor corregir el campo tamaño`);
        } else if (key === "nivelCuidado") {
          localError.push(`Por favor corregir el campo nivel de cuidado`);
        } else {
          localError.push(`Por favor corregir el campo ${key}`);
        }
      }
    });
    if (images.length < 1) {
      localError.push(`Carga por lo menos una foto de la mascota`);
    }
    if (localError.length !== 0) {
      setError(localError);
    }

    try {
      // Espera a que agregarMascota se complete y obtén el ID de la nueva mascota.
      const id = await agregarMascota(
        newPetData,
        images,
        token,
        navigation,
        setCurrentUser
      );
      console.log("ID obtenido de agregarMascota:", id);

      // Actualiza el estado con el nuevo ID de mascota.
      setMascotaId(id);

      // Limpia el estado y prepara para la siguiente acción.
      setNewPetData(initialPetData);
      setImages([]);
      setIsLoading(false);
      setConfirmationModal(true);

      // Navega a la pantalla Vacunas, pasando el ID de mascota obtenido.
      navigation.navigate("Vacunas", { mascotaId: id });
    } catch (error) {
      console.error("Error en agregarMascota:", error);
      // Manejo del error, por ejemplo, mostrar un mensaje al usuario.
      setIsLoading(false); // Asegúrate de detener cualquier indicador de carga.
    }
  };

  const handleDelete = () => {
    const newImages = images.filter((img) => img !== selectedPic);
    setImages(newImages);
    setSelectedPic(null);
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
          <View style={styles.rowContainer}>
            <Text style={styles.titulo}>Publicar una mascota</Text>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <ScrollView contentContainerStyle={styles.column}>
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
            </ScrollView>
            <ScrollView contentContainerStyle={{ gap: 12, paddingBottom: 100 }}>
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
              {newPetData.animal === 2 && (
                <>
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
                </>
              )}

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
                  onPress={handleDelete}
                  style={styles.trashButton}
                >
                  <FontAwesome
                    name="trash"
                    size={40}
                    style={{ color: "red" }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedPic(null)}
                  style={styles.picModalCloseButton}
                >
                  <Icon name="times" size={25} color="#9A34EA" />
                </TouchableOpacity>
              </View>
            </Modal>
            <Modal
              isVisible={confirmationModal}
              onBackdropPress={() => setConfirmationModal(false)}
            >
              <View style={styles.modalContainer}>
                <FontAwesome
                  name="check-circle"
                  size={150}
                  style={{ color: "green" }}
                />
                <Text>Mascota creada exitosamente</Text>
              </View>
            </Modal>
            <Modal
              isVisible={error !== null}
              onBackdropPress={() => setError(null)}
            >
              <View style={styles.modalContainer}>
                <FontAwesome
                  name="times-circle"
                  size={150}
                  style={{ color: "red" }}
                />
                {error &&
                  error.map((e) => {
                    return <Text key={e}>{e}</Text>;
                  })}
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
    paddingBottom: 25,
    paddingHorizontal: 10,
  },
  titulo: {
    fontSize: 18,
    color: "#9A34EA",
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  column: {
    gap: 5,
    paddingBottom: 100,
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
  button: {
    backgroundColor: "#9A34EA",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  trashButton: {
    position: "absolute",
    width: 42,
    height: 42,
    right: 5,
    bottom: 5,
    backgroundColor: "white",
    padding: 2,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingVertical: 20,
  },
});

export default RegisterPet;

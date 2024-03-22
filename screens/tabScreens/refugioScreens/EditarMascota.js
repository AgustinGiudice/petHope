import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import Constants from "expo-constants";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { TokenContext } from "../../../context/TokenContext";
import { useContext, useState } from "react";
import HeaderMascota from "../../../components/HeaderMascota";
import AddImageModal from "../../../components/AddImageModal";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BASE_URL } from "@env";
import ConfirmationModal from "./ConfirmationModal";
import { ActivityIndicator } from "react-native";

const EditarMascota = ({ route, navigation }) => {
  const { mascota } = route.params;
  const [newPetData, setNewPetData] = useState(mascota);
  const [selectedPic, setSelectedPic] = useState(null);
  const { token } = useContext(TokenContext);
  const [addImageModalVisible, setAddImageModalVisible] = useState(false);
  const [replaceImageModalVisible, setReplaceImageModalVisible] =
    useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [mascotaEliminada, setMascotaEliminada] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleDeleteConfirmation = () => {
    setConfirmationModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setLoading(true);
    handleDelete(mascota.id);
    setMascotaEliminada(true);
    // setConfirmationModalVisible(false);
  };

  const handleCancelDelete = () => {
    setConfirmationModalVisible(false);
  };

  const cambiarImagen = (img) => {
    const newData = newPetData;
    const index = newData.imagen.find((imagen) => imagen === selectedPic);
    newData.imagen[index] = img;
    console.log(newData.imagen);
  };

  const handleRedirect = () => {
    if (redirect) {
      navigation.navigate("RefShowPets");
    }
  };
  const handleDelete = async (idMascota) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}api/mascotas/deletePetsRef/${idMascota}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        // Eliminación exitosa
        // navigation.navigate("RefShowPets");
        setRedirect(true);
      } else {
        console.error("Error al eliminar la mascota.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error al eliminar la mascota:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <HeaderMascota mascota={mascota} /> */}
      <View style={styles.row}>
        <View style={styles.column}>
          {mascota.imagen.map((image, key) => {
            return (
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => {
                  setSelectedPic(image);
                  setReplaceImageModalVisible(true);
                }}
                key={key}
              >
                <Image source={{ uri: image.url }} style={styles.image} />
              </TouchableOpacity>
            );
          })}
          {mascota.imagen.length < 4 && (
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
          <Input
            value={newPetData.nombre}
            setValue={setNewPetData}
            placeholder="Nombre"
            atributo="nombre"
          />
          <Select
            defaultValue={newPetData.animal === 1 ? "Perro" : "Gato"}
            values={["Perro", "Gato"]}
            setValues={(item) => {
              const newData = newPetData;
              newData.animal = item === "Perro" ? 1 : 2;
              setNewPetData(newData);
            }}
            texto={"Animal"}
          />
          <Select
            defaultValue={newPetData.sexo === 1 ? "Macho" : "Hembra"}
            values={["Macho", "Hembra"]}
            setValues={(item) => {
              const newData = newPetData;
              newData.sexo = item === "Macho" ? 1 : 2;
              setNewPetData(newData);
            }}
            texto={"Sexo"}
          />
          <Select
            defaultValue={
              newPetData.edad === 1
                ? "Cachorro"
                : newPetData.edad === 2
                ? "Juvenil"
                : "Adulto"
            }
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
            defaultValue={newPetData.raza}
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
            defaultValue={
              newPetData.animal === 1
                ? "Pequeño"
                : newPetData.animal === 2
                ? "Mediano"
                : "Grande"
            }
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
      </View>
      <AddImageModal
        isVisible={addImageModalVisible}
        setIsVisible={setAddImageModalVisible}
        setImages={(img) => setImages([...images, img])}
      />
      <AddImageModal
        isVisible={replaceImageModalVisible}
        setIsVisible={setReplaceImageModalVisible}
        setImages={(img) => cambiarImagen(img)}
        currentImage={selectedPic}
      />

      <TouchableOpacity
        style={styles.buttondelete}
        onPress={handleDeleteConfirmation}
      >
        <Text> Eliminar Registro </Text>
      </TouchableOpacity>

      <ConfirmationModal
        isVisible={confirmationModalVisible}
        message={
          loading ? (
            <ActivityIndicator color="white" />
          ) : (
            "¿Estás seguro de que quieres eliminar este registro?"
          )
        }
        onConfirm={handleConfirmDelete}
        onchangemessage={mascotaEliminada}
        onCancel={handleCancelDelete}
        onRedirect={handleRedirect}
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
    marginTop: "10%",
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
  buttondelete: {
    backgroundColor: "#FF3838",
    borderRadius: 5,
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditarMascota;

import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";
import Input from "../../../components/Input";
import Input2 from "../../../components/Input2";
import Select from "../../../components/Select";
import { TokenContext } from "../../../context/TokenContext";
import { editarMascota } from "../../../services/editarMascota"; // Importar el servicio
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-web";

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
  const [isEditing, setIsEditing] = useState(false); // Nuevo estado para modo edición

  const handleDeleteConfirmation = () => {
    setConfirmationModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setLoading(true);
    handleDelete(mascota.id);
    setMascotaEliminada(true);
  };

  const handleCancelDelete = () => {
    setConfirmationModalVisible(false);
  };

  const cambiarImagen = (img) => {
    const newData = { ...newPetData };
    const index = newData.imagen.findIndex((imagen) => imagen === selectedPic);
    newData.imagen[index] = img;
    setNewPetData(newData);
  };

const handleViewVacunas = () => {
    navigation.navigate("DetalleCartillaVacunacion", { mascotaId: mascota.id, mascotaTipo: mascota.animal });
  };
  const handleRedirect = () => {
    if (redirect) {
      navigation.navigate("RefShowPets");
    }
  };

  const handleEditChange = (field, value) => {
    setNewPetData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    console.log("Edito la PETDATA", newPetData.nombre);
    setIsEditing(true); // Activar el modo edición cuando haya cambios
  };

  const handleSaveChanges = async () => {
    console.log("Guardando cambios...");
    setLoading(true);
    try {
      const data = {
        nombre: newPetData.nombre,
        animal: newPetData.animal,
        sexo: newPetData.sexo,
        edad: newPetData.edad,
        nivelCuidado: newPetData.nivelCuidado,
        cuidadosEspeciales: newPetData.cuidadosEspeciales,
        raza: newPetData.raza,
        tamanio: newPetData.tamanio,
        descripcion: newPetData.descripcion,
        vif: newPetData.vif,
        viLef: newPetData.viLef,
      };
      console.log("DATA", data);
      await editarMascota(newPetData.id, data, token);
      setIsEditing(false); // Desactivar el modo edición
      navigation.goBack(); // Volver después de guardar
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.column}>
              {mascota.imagen.map((image, key) => (
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
              ))}
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
               <TouchableOpacity
                style={styles.buttonViewVacunas}
                onPress={handleViewVacunas}
              >
              <Text style={styles.buttonText}> Ir a cartilla de vacunación </Text>
            </TouchableOpacity>
            {isEditing && (
            <TouchableOpacity
              style={styles.buttonConfirm}
              onPress={handleSaveChanges}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Confirmar cambios</Text>
              )}
            </TouchableOpacity>
          )}
            </View>
            <View style={styles.inputsContainer}>
              <Input2
                value={newPetData.nombre} // Valor correcto desde el estado
                setValue={(value) => handleEditChange("nombre", value)} // handleEditChange se encarga del cambio
                placeholder="Nombre"
              />

              <Select
                defaultValue={newPetData.animal === 1 ? "Perro" : "Gato"}
                values={["Perro", "Gato"]}
                setValues={(item) =>
                  handleEditChange("animal", item === "Perro" ? 1 : 2)
                }
                texto={"Animal"}
              />
              <Select
                defaultValue={newPetData.sexo === 1 ? "Macho" : "Hembra"}
                values={["Macho", "Hembra"]}
                setValues={(item) =>
                  handleEditChange("sexo", item === "Macho" ? 1 : 2)
                }
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
                setValues={(item) =>
                  handleEditChange(
                    "edad",
                    item === "Cachorro" ? 1 : item === "Juvenil" ? 2 : 3
                  )
                }
                texto={"Edad"}
              />
              <Select
                defaultValue={newPetData.raza}
                values={["Golden", "Husky"]}
                setValues={(item) => handleEditChange("raza", item)}
                texto={"Raza"}
              />
              <Select
                defaultValue={
                  newPetData.tamanio === 1
                    ? "Pequeño"
                    : newPetData.tamanio === 2
                    ? "Mediano"
                    : "Grande"
                }
                values={["Pequeño", "Mediano", "Grande"]}
                setValues={(item) =>
                  handleEditChange(
                    "tamanio",
                    item === "Pequeño" ? 1 : item === "Mediano" ? 2 : 3
                  )
                }
                texto={"Tamaño"}
              />

              {/* Mostrar los campos vif y vilef solo si el animal es un GATO (animal === 2) */}
              {newPetData.animal === 2 && (
                <>
                  <View style={styles.selectColumn}>
                    <Text style={styles.label}>VIF</Text>
                    <Select
                      defaultValue={newPetData.vif ? "Sí" : "No"}
                      values={["Sí", "No"]}
                      setValues={(item) =>
                        handleEditChange("vif", item === "Sí")
                      }
                    />
                  </View>
                  <View style={styles.selectColumn}>
                    <Text style={styles.label}>VI-LEF</Text>
                    <Select
                      defaultValue={newPetData.viLef ? "Sí" : "No"}
                      values={["Sí", "No"]}
                      setValues={(item) =>
                        handleEditChange("viLef", item === "Sí")
                      }
                    />
                  </View>
                </>
              )}

              {/* Campo para la descripción */}
              <Input
                value={newPetData.descripcion}
                setValue={(value) => handleEditChange("descripcion", value)}
                placeholder="Descripción"
                multiline
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  row: {
    marginTop: "10%",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 25,
    justifyContent: "flex-start",
  },
  row2: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 25,
    justifyContent: "space-between",
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
  buttonConfirm: {
    backgroundColor: "#34A853",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  label: {
    color: "#C69AE8",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonViewVacunas: {
    backgroundColor: "#34A853",
    borderRadius: 5,
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    color: "white",
  },
});

export default EditarMascota;

import { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { TokenContext } from "../context/TokenContext";
import { UserContext } from "../context/UserContext";
import { BASE_URL } from "@env";

const AddImageModal = ({
  id,
  isVisible,
  setIsVisible,
  setImages,
  currentImage,
}) => {
  const { token } = useContext(TokenContext);
  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setNewImage(result.assets[0].uri);
        setError(null);
      }
    } catch (error) {
      setError("Hubo un problema al cargar el archivo");
      console.error("No se pudo cargar la imágen", error);
    }
  };

  const takeImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setNewImage(result.assets[0].uri);
        setError(null);
      }
    } catch (error) {
      setError("Hubo un problema al usar la cámara");
      console.error("No se pudo sacar la foto", error);
    }
  };

  const handleAccept = async () => {
    console.log("Agregando imagen");
    // Comprueba si hay una nueva imagen
    if (newImage) {
      try {
        // Crear una instancia de FormData para enviar los archivos
        const formData = new FormData();
        // const response = await fetch(newImage);
        // const blob = await response.blob();

        formData.append("userImage", {
          uri: newImage,
          name: "userImage.jpg", // Nombre de archivo arbitrario
          type: "image/jpeg", // Cambia esto según el tipo de archivo
        });

        // Poner el loading en true

        // Realizar la solicitud POST con fetch
        fetch(
          `${BASE_URL}api/${
            currentUser.isRefugio ? "refugios" : "usuarios"
          }/upload-img/${id}`,
          {
            method: "PUT",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              // La solicitud se completó con éxito
              return response.json();
            } else {
              // Manejar errores aquí, por ejemplo, mostrar un mensaje de error
              throw new Error("Error al subir la imagen");
            }
          })
          .then((data) => {
            // Procesar la respuesta si es necesario
            if (data.imageUrl) {
              setImages(data.imageUrl);

              setCurrentUser({ ...currentUser, imagen: data.imageUrl });
            }
          })

          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            // Poner el loading en false
            setIsVisible(false);
            setNewImage(null);
          });
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
      }
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => !loading && setIsVisible(false)}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          onPress={() => setIsVisible(false)}
          style={styles.modalCloseButton}
          disabled={loading}
        >
          <Icon name="times" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.titulo}>
          {currentImage ? "Editar mi imagen" : "Agregar una foto"}
        </Text>
        {error && <Text>{error}</Text>}
        {newImage && (
          <Image
            source={{ uri: newImage }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <View style={styles.botonera}>
          <TouchableOpacity
            onPress={() => setIsVisible(false)}
            style={styles.boton}
            disabled={loading}
          >
            <Text style={{ color: "white" }}>Cancelar</Text>
          </TouchableOpacity>
          {newImage ? (
            <TouchableOpacity
              onPress={() => {
                if (id) {
                  handleAccept();
                } else {
                  setImages(newImage);
                  setIsVisible(false);
                  setNewImage(null);
                }
              }}
              style={styles.boton}
            >
              {loading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text style={{ color: "white" }}>Aceptar</Text>
              )}
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity onPress={pickImage} style={styles.boton}>
                <Text style={{ color: "white" }}>Galería</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={takeImage} style={styles.boton}>
                <Text style={{ color: "white" }}>Cámara</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    gap: 5,
    position: "relative",
    alignItems: "center",
  },
  modalCloseButton: {
    alignSelf: "flex-end",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    color: "#9A34EA",
  },
  botonera: {
    flexDirection: "row",
    gap: 10,
  },
  boton: {
    backgroundColor: "#C69AE8",
    color: "white",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    flex: 1,
  },
});

export default AddImageModal;

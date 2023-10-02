import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

const ChangeImageModal = ({
  isVisible,
  setIsVisible,
  setImages,
  images,
  selectedImage,
}) => {
  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);

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
  const handleAccept = () => {
    if (Array.isArray(images)) {
      const newArray = [...images];
      newArray.push(newImage);
      setImages(newArray);
    } else {
      setImages(newImage);
    }
    //poner el loading en true

    //hacer el fetch y cuando termine poner el loading en false
    setIsVisible(false);
    setNewImage(null);
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
        <Text style={styles.titulo}>Cambiar foto</Text>
        {error && <Text>{error}</Text>}

        <Image
          source={{ uri: newImage ? newImage : selectedImage }}
          style={{ width: 200, height: 200 }}
        />
        <View style={styles.botonera}>
          <TouchableOpacity
            onPress={() => setIsVisible(false)}
            style={styles.boton}
            disabled={loading}
          >
            <Text style={{ color: "white" }}>Cancelar</Text>
          </TouchableOpacity>
          {newImage ? (
            <TouchableOpacity onPress={handleAccept} style={styles.boton}>
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

export default ChangeImageModal;

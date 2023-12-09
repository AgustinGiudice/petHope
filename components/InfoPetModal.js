import { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  getEdadDescripcion,
  getTamanioDescripcion,
  getSexoDescripcion,
} from "../hooks/getDescripciones";
import { ScrollView } from "react-native-gesture-handler";
import { TokenContext } from "../context/TokenContext";
import { setMascotaLike } from "../services/setMascotaLike";

const InfoPetModal = ({
  isVisible,
  setIsVisible,
  petInfo,
  setShowLikeAnimation,
  setResetMatches,
  currentUserId,
}) => {
  const [selectedPic, setSelectedPic] = useState(null);
  const likeAnimationValue = useRef(new Animated.Value(0)).current;
  const placeholderImg = require("../assets/logo.png");
  const { token } = useContext(TokenContext);

  const postLike = async () => {
    try {
      const response = await setMascotaLike(petInfo.id, currentUserId, token);

      if (!response.ok) {
        throw new Error("Error al likear mascota");
      }
      setShowLikeAnimation(true);

      Animated.sequence([
        Animated.timing(likeAnimationValue, {
          toValue: 1, // Ajusta el valor final de la animación (puede ser cualquier valor)
          duration: 500, // Duración de la primera parte de la animación en milisegundos
          useNativeDriver: false,
        }),
        Animated.timing(likeAnimationValue, {
          toValue: 0, // Ajusta el valor final de la animación (puede ser cualquier valor)
          duration: 500, // Duración de la segunda parte de la animación en milisegundos
          delay: 300, // Retardo entre la primera y la segunda parte de la animación
          useNativeDriver: false,
        }),
      ]).start(() => {
        likeAnimationValue.setValue(0);
        setShowLikeAnimation(false);
        setResetMatches(true);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <ScrollView>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={styles.modalCloseButton}
            >
              <Icon name="times" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.titulo}>{petInfo.nombre}</Text>
            <View style={styles.row}>
              {petInfo.imagenes.length === 0 && (
                <TouchableOpacity style={styles.imageContainer}>
                  <Image source={placeholderImg} style={styles.image} />
                </TouchableOpacity>
              )}
              {petInfo.imagenes.map((image, key) => {
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
            </View>
            <Text>Edad: {getEdadDescripcion(petInfo.edad)}</Text>
            <Text>Tamaño: {getTamanioDescripcion(petInfo.tamanio)}</Text>
            <Text>Sexo: {getSexoDescripcion(petInfo.sexo)}</Text>
            <Text>
              Requiere de cuidados especiales:{" "}
              {petInfo.cuidadosEspeciales ? "Si" : "No"}
            </Text>
            <Text>Refugio: {petInfo.refugio.nombre || petInfo.refugio.id}</Text>
            <Text>Distancia: {(petInfo.distance / 1000).toFixed(2)}km</Text>
            <View style={styles.botones}>
              <TouchableOpacity
                style={[styles.boton, { backgroundColor: "red" }]}
              >
                <Text style={{ color: "white" }}>Denunciar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.boton, { backgroundColor: "#C69AE8" }]}
                onPress={async () => {
                  setIsVisible(false);
                  await postLike(petInfo.id);
                }}
              >
                <Text style={{ color: "white" }}>Adoptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    gap: 5,
    position: "relative",
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
  row: {
    flexDirection: "row-reverse",
    gap: 10,
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap-reverse",
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#C69AE8",
    flexBasis: "48%",
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
  },
  picModalContainer: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    gap: 5,
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
  botones: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  boton: {
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
});

export default InfoPetModal;

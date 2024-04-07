import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import LoadingComponent from "../../components/LoadingComponent";
import { TokenContext } from "../../context/TokenContext";
import { UserContext } from "../../context/UserContext";
import { getRefugios } from "../../services/getRefugios";
import { BASE_URL } from "@env";
import HeaderMascota from "../../components/HeaderMascota";
import Constants from "expo-constants";

const Refugios = ({ navigation }) => {
  const { token } = useContext(TokenContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRefugio, setSelectedRefugio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refugios, setRefugios] = useState();

  const openModal = (refugio) => {
    setSelectedRefugio(refugio);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRefugio(null);
    setModalVisible(false);
  };

  useEffect(() => {
    const url = `${BASE_URL}api/refugios?latitud=${currentUser.ubicacion.coordinates[0]}&longitud=${currentUser.ubicacion.coordinates[1]}`;
    getRefugios(url, token, navigation, setRefugios, setCurrentUser).then(() =>
      setIsLoading(false)
    );
  }, []);

  {
    if (isLoading) {
      return <LoadingComponent />;
    } else {
      return (
        <>
          <View style={styles.container}>
            <HeaderMascota mascota={{ nombre: "Refugios" }} />
            <FlatList
              data={refugios}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <View style={styles.noticiaContainer}>
                  <Image
                    source={{ uri: item.imagen }}
                    style={styles.imagenNoticia}
                  />
                  <Text style={styles.nombreRef}>{item.nombre}</Text>
                  <Text style={styles.data}>
                    A {item.distance.toFixed(2)} Km de distancia
                  </Text>
                  <Text style={styles.data}>Aloja {item.animal}</Text>
                  <View style={styles.orderButton}>
                    <TouchableOpacity
                      style={styles.containerBotonVerMas}
                      onPress={() => openModal(item)}
                    >
                      <Text style={styles.textoBotonVerMas}>Ver Más</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>

          {/* Modal para mostrar más información del refugio */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            {selectedRefugio && (
              <ScrollView style={{ top: 0, flex: 1 }}>
                <View>
                  <HeaderMascota mascota={{ nombre: selectedRefugio.nombre }} />
                </View>
                <View style={styles.modalContainer}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: selectedRefugio.imagen }}
                      style={styles.modalImage}
                    />
                  </View>

                  <View style={styles.dataRef}>
                    {selectedRefugio.descripcion && ( //si no tiene descripcion, no se ve el campo.
                      <Text style={styles.modalLink}>
                        {selectedRefugio.descripcion}
                      </Text>
                    )}
                    <Text style={styles.modalLink}>
                      Mascotas Registradas: {selectedRefugio.mascotas.length}
                    </Text>
                    <Text style={styles.modalLink}>
                      Enlace de Donación: {selectedRefugio.linkDonacion}
                    </Text>
                    <Text style={styles.modalLink}>
                      Facebook: {selectedRefugio.facebook}
                    </Text>
                    <Text style={styles.modalLink}>
                      Instagram: {selectedRefugio.instagram}
                    </Text>
                  </View>
                  <View style={styles.containerButton}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={closeModal}
                    >
                      <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            )}
          </Modal>
        </>
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3E3E3",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: screenWidth >= 500 ? 70 : 0,
  },

  noticiaContainer: {
    marginTop: screenHeight * 0.042,
    marginHorizontal: 10,
    padding: screenWidth >= 500 ? 50 : 10,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 3,
  },
  imagenNoticia: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 5,
  },
  nombreRef: {
    fontSize: screenWidth >= 500 ? 24 : 19,

    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
  },
  data: {
    marginBottom: 8,
    fontSize: screenWidth >= 500 ? 19 : 14,
  },
  orderButton: {
    alignItems: "center",
  },
  containerBotonVerMas: {
    width: 150,
    height: 35,
    backgroundColor: "#9A34EA",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotonVerMas: {
    color: "white",
    fontSize: screenHeight * 0.02,
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: screenWidth >= 500 ? 55 : 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
  },
  modalImage: {
    width: screenWidth >= 500 ? "80%" : "100%",
    aspectRatio: screenWidth >= 500 ? 1.2 : 1,
    resizeMode: "cover",
    borderRadius: 5,
  },
  dataRef: {
    padding: 10,
  },
  modalDescription: {
    fontSize: screenHeight * 0.018,
    marginTop: 10,
    borderColor: "#9A34EA",
    borderBottomWidth: 1,
    padding: 3,
    alignItems: "center",
  },
  modalLink: {
    fontSize: screenWidth >= 500 ? screenHeight * 0.02 : screenHeight * 0.018,

    marginTop: 10,
    borderColor: "#9A34EA",
    borderBottomWidth: 1,
    padding: 3,
    alignItems: "center",
  },
  containerButton: {
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#9A34EA",
    borderRadius: 5,
    padding: 10,
    width: screenWidth - screenWidth * 0.5,
  },
  closeButtonText: {
    color: "white",
    fontSize: screenHeight * 0.018,
    textAlign: "center",
  },
});

export default Refugios;

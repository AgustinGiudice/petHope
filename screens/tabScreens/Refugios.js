import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import Constants from "expo-constants";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import LoadingComponent from "../../components/LoadingComponent";
import { TokenContext } from "../../context/TokenContext";
import { UserContext } from "../../context/UserContext";
import { getRefugios } from "../../services/getRefugios";
import { BASE_URL } from "@env";

const Refugios = ({ navigation }) => {
  const { token } = useContext(TokenContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRefugio, setSelectedRefugio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const openModal = (refugio) => {
    setSelectedRefugio(refugio);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRefugio(null);
    setModalVisible(false);
  };

  const [refugios, setRefugios] = useState();

  

  useEffect( async() => {
    // Obtener las mascotas
    try {
      const url = `${BASE_URL}api/refugios?latitud=${currentUser.ubicacion.coordinates[0]}&longitud=${currentUser.ubicacion.coordinates[1]}`;
      await getRefugios(url, token, navigation, setRefugios, setCurrentUser);
      console.log(refugios);
    } catch (error) {
      console.error("Error al obtener refugios:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={refugios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.noticiaContainer}>
              <Image source={item.imagen} style={styles.imagenNoticia} />
              <Text style={styles.nombreRef}>{item.nombre}</Text>
              <Text style={styles.distanciaRef}>
                A {item.distance.toFixed(2)} Km de distancia
              </Text>
              <Text style={styles.acepta}>Acepta {item.animal}</Text>
              <View style={styles.orderButton}>
                <TouchableOpacity style={styles.containerBotonVerMas}>
                  <Text
                    style={styles.textoBotonVerMas}
                    onPress={() => openModal(item)}
                  >
                    Ver Más
                  </Text>
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
          <>
            <View style={styles.headerItem}>
              <View style={styles.headerItem2}>
                <View style={styles.headerItemsContenido}>
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={styles.namePet}
                  >
                    {selectedRefugio.nombre}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.modalContainer}>
              <Image
                source={selectedRefugio.imagen}
                style={styles.modalImage}
              />
              <View style={styles.dataRef}>
                <Text style={styles.modalDescription}>
                  {selectedRefugio.descripcion}
                </Text>
                <Text style={styles.modalLink}>
                  Enlace de Donación: {selectedRefugio.linkDonacion}
                </Text>
                <Text style={styles.modalLink}>
                  Mascotas Registradas: {selectedRefugio.mascotasRegistradas}
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
          </>
        )}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3E3E3",
  },
  noticiaContainer: {
    marginTop: Constants.statusBarHeight,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 3,
  },
  imagenNoticia: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
  },
  nombreRef: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
  },
  descripcionNoticia: {
    fontSize: 16,
    marginTop: 5,
  },
  acepta: {
    marginBottom: 8,
  },
  orderButton: {
    alignItems: "center",
  },
  containerBotonVerMas: {
    width: 100,
    height: 35,
    backgroundColor: "#9A34EA",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotonVerMas: {
    color: "white",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 5,
  },
  dataRef: {
    padding: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginTop: 10,
    borderColor: "#9A34EA",
    borderBottomWidth: 1,
    padding: 3,
    alignItems: "center",
  },
  modalLink: {
    fontSize: 16,
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
    backgroundColor: "#9A34EA",
    borderRadius: 5,
    padding: 10,
    width: screenWidth - screenWidth * 0.5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  //HEADER ESTILOS
  headerItem: {
    position: "relative",
    backgroundColor: "#7A5FB5",
    width: screenWidth,
    height: 50,
    borderRadius: 10,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerItem2: {
    position: "absolute",
    backgroundColor: "#C69AE8",
    width: 1300,
    height: 1300,
    borderRadius: 630,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: -35,
    elevation: 10, // Para Android
    shadowColor: "black", // Para iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  headerItemsContenido: {
    flexDirection: "row",
    width: screenWidth,
    justifyContent: "space-between",
    marginBottom: 30,
    alignItems: "baseline",
    paddingHorizontal: 30,
    textAlign: "center",
  },
  buttonFilters: {
    zIndex: 1,
  },
  namePet: {
    color: "white",
    fontWeight: "bold",
    fontSize: 28,
    flex: 1,
    paddingHorizontal: 3,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default Refugios;

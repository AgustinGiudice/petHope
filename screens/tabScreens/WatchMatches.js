import React, { useState, useEffect } from "react";
import { format, set } from "date-fns";
import { BASE_URL } from "@env";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { screenWidth } from "../../hooks/useScreenResize";
import {
  getAnimalDescripcion,
  getEdadDescripcion,
  getTamanioDescripcion,
  getSexoDescripcion,
} from "../../hooks/getDescripciones";
import Modal from "react-native-modal";

const MatchesScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  // Función para manejar la acción de abrir el chat con el refugio
  const handleChatClick = (refugio, mascota) => {
    // Implementa la lógica para abrir el chat con el refugio aquí
    // Puedes navegar a una nueva pantalla de chat o mostrar un modal de chat, por ejemplo.
    console.log("Abriendo chat con refugio", refugio);
    navigation.navigate("Chat", { refugio: refugio, mascota: mascota });
  };

  const handleVerRefugio = () => {
    // Implementa la lógica para abrir el chat con el refugio aquí
    // Puedes navegar a una nueva pantalla de chat o mostrar un modal de chat, por ejemplo.
    console.log("Abriendo refugio");
  };

  const handleCancelarMatch = () => {
    // Implementa la lógica para abrir el chat con el refugio aquí

    console.log("Cancelando match");
  };

  const handleDenunciarRefugio = () => {
    // Implementa la lógica para abrir el chat con el refugio aquí

    console.log("Denunciando refugio");
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchMatches = async () => {
    try {
      setRefreshing(true);

      const response = await fetch(`${BASE_URL}api/match`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Aquí puedes agregar otros encabezados si es necesario
        },
      });
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de matches.");
      }
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error("Error al obtener los matches:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // if (isLoading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      {matches.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          {/* <Text onPress={()=>{navigation.navigate("Refugios")}}>Ir a refugios</Text> */}
          <FlatList
            data={matches}
            renderItem={({ item }) => (
              <View style={styles.matchItem}>
                <View style={styles.containerLeft}>
                  <View
                    onPress={() => handleChatClick(item.mascota.refugioId)}
                    style={styles.imagenContainer}
                  >
                    <Image
                      source={{ uri: item.mascota.pic }}
                      style={styles.mascotaImagen}
                    />
                  </View>

                  <View style={styles.column}>
                    <Text style={styles.letraGrande} numberOfLines={1}>
                      {item.mascota.nombre} - {item.refugio.nombre}
                    </Text>
                    <Text style={styles.letraChica}>
                      {getAnimalDescripcion(item.mascota.animal)}{" "}
                      {getEdadDescripcion(item.mascota.edad)}{" "}
                      {getTamanioDescripcion(item.mascota.tamanio)}
                    </Text>
                    <Text style={styles.letraChica}>
                      {getSexoDescripcion(item.mascota.sexo)}
                    </Text>
                  </View>
                </View>

                <View style={styles.containerIcons}>
                  <MaterialIcons
                    name="chat"
                    size={25}
                    onPress={() => handleChatClick(item.refugio, item.mascota)}
                  />
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={25}
                    onPress={toggleModal}
                  />
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            style={styles.matchContainer}
            onEndReached={fetchMatches}
            onEndReachedThreshold={0.1}
            refreshing={refreshing}
            onRefresh={fetchMatches}
          />
        </View>
      )}

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          {/* Opciones: ver refugio, cancelar match, denunciar */}
          <TouchableOpacity
            onPress={toggleModal}
            style={styles.modalCloseButton}
          >
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Opciones</Text>
          <TouchableOpacity onPress={handleVerRefugio}>
            <Text style={styles.modalText}>Ver refugio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelarMatch}>
            <Text style={styles.modalText}>Cancelar match</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDenunciarRefugio}>
            <Text style={styles.modalText}>Denunciar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#E3E3E3",
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    paddingTop: 40,
  },
  matchContainer: {
    width: screenWidth,
    paddingHorizontal: 10,
  },
  letraGrande: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
  },
  letraChica: {
    fontSize: 10,
    textAlign: "left",
    color: "#9A34EA",
  },
  noMatchesText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  matchItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 5,
    elevation: 5,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    justifyContent: "space-between",
    gap: 2,
    flexShrink: 99,
  },
  mascotaImagen: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  containerLeft: {
    flexDirection: "row",
    gap: 5,
    flexShrink: 99,
  },
  containerIcons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default MatchesScreen;

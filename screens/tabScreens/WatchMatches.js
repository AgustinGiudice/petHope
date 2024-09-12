import React, { useState, useEffect, useContext } from "react";
import Constants from "expo-constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import {
  getAnimalDescripcion,
  getEdadDescripcion,
  getTamanioDescripcion,
  getSexoDescripcion,
} from "../../hooks/getDescripciones";
import Modal from "react-native-modal";
import { UserContext } from "../../context/UserContext";
import { TokenContext } from "../../context/TokenContext";
import LoadingComponent from "../../components/LoadingComponent";
import { getMatches } from "../../services/getMatches";
import { cancelarMatch } from "../../services/cancelarMatch";
import HeaderMascota from "../../components/HeaderMascota";
import { COLORS } from "../../styles";
import { screenWidth, screenHeight } from "../../hooks/useScreenResize";

const MatchesScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [isModalForMoreInfoVisible, setIsModalForMoreInfoVisible] =
    useState(false);
  const [isModalForUserInfoVisible, setIsModalForUserInfoVisible] =
    useState(false);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);

  const [userAbrir, setuserAbrir] = useState(null);
  const [match_id, setmatch_id] = useState(null);
  // Función para manejar la acción de abrir el chat con el refugio
  const handleChatClick = (receiver, mascota, refugio) => {
    // Implementa la lógica para abrir el chat con el refugio aquí
    // Puedes navegar a una nueva pantalla de chat o mostrar un modal de chat, por ejemplo.
    console.log("Abriendo chat con refugio", refugio);
    navigation.navigate("Chat", {
      receiver: receiver,
      mascota: mascota,
      refugio: refugio,
    });
  };

  const handleVerUser = () => {
    setIsModalForMoreInfoVisible(false);
    setIsModalForUserInfoVisible(true);
  };

  const handleDenunciarRefugio = () => {
    // Implementa la lógica para abrir el chat con el refugio aquí

    console.log("Denunciando refugio");
  };

  const openMoreInfoModal = (user, match) => {
    setIsModalForMoreInfoVisible(!isModalForMoreInfoVisible);
    setuserAbrir(user);
    setmatch_id(match);
  };

  const handleCancelarMatch = async () => {
    try {
      // Llama a la función cancelarMatch
      await cancelarMatch(match_id, token, navigation, setCurrentUser);

      // Cierra el modal
      setIsModalForMoreInfoVisible(false);

      // Recarga la lista de matches
      getMatches(
        navigation,
        currentUser,
        setCurrentUser,
        token,
        setIsLoading,
        setMatches,
        setRefreshing
      );
    } catch (error) {
      console.error("Error al cancelar el match: ", error);
    }
  };

  useEffect(() => {
    setRefreshing(true);
    getMatches(
      navigation,
      currentUser,
      setCurrentUser,
      token,
      setIsLoading,
      setMatches,
      setRefreshing
    );
    setRefreshing(false);
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }
  console.log(matches.length);
  if (matches.length === 0) {
    return (
      <View style={styles.noMatchesContainer}>
        <Text style={styles.letraGrande}>
          ¡Todavía no elegiste una mascota!
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Paw")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Ver mascotas</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderMascota mascota={{ nombre: "Mensajes" }} />
      <FlatList
        data={matches}
        contentContainerStyle={{
          paddingBottom: 90,
          marginTop: height * 0.1,
          flex: 1,
          minHeight: screenHeight - Constants.statusBarHeight - 60,
          backgroundColor: COLORS[200],
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.matchItem}
            onPress={() =>
              handleChatClick(
                currentUser.id === item.refugio.id
                  ? item.usuario
                  : item.refugio,
                item.mascota,
                item.refugio
              )
            }
          >
            <View style={styles.containerLeft}>
              <View style={styles.imagenContainer}>
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
            <View style={styles.column_design}>
              <View style={styles.containerIcons}>
                <MaterialIcons
                  name="chat"
                  size={25}
                  onPress={() =>
                    handleChatClick(
                      currentUser.id === item.refugio.id
                        ? item.usuario
                        : item.refugio,
                      item.mascota,
                      item.refugio
                    )
                  }
                />
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={25}
                  onPress={() =>
                    openMoreInfoModal(
                      currentUser.id == item.refugio.id
                        ? item.usuario
                        : item.refugio,
                      item.id
                    )
                  }
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={[styles.matchContainer, { width: width }]}
        onEndReachedThreshold={0.1}
        refreshing={refreshing}
        onRefresh={() =>
          getMatches(
            navigation,
            currentUser,
            setCurrentUser,
            token,
            setIsLoading,
            setMatches,
            setRefreshing
          )
        }
      />

      <Modal
        isVisible={isModalForMoreInfoVisible}
        onBackdropPress={() => setIsModalForMoreInfoVisible(false)}
        userAbrir={userAbrir}
        match_id={match_id}
      >
        <View style={styles.modalContent}>
          {/* Opciones: ver refugio, cancelar match, denunciar */}
          <TouchableOpacity
            onPress={() => setIsModalForMoreInfoVisible(false)}
            style={styles.modalCloseButton}
          >
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Opciones</Text>
          <TouchableOpacity onPress={handleVerUser}>
            <Text style={styles.modalText}>
              {currentUser.estado ? "Ver usuario" : "Ver refugio"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelarMatch}>
            <Text style={styles.modalText}>Cancelar match</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDenunciarRefugio}>
            <Text style={styles.modalText}>Denunciar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {isModalForUserInfoVisible && (
        <Modal
          isVisible={true}
          onBackdropPress={() => {
            setIsModalForUserInfoVisible(false);
            setIsModalForMoreInfoVisible(true);
          }}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                setIsModalForUserInfoVisible(false);
                setIsModalForMoreInfoVisible(true);
              }}
              style={styles.modalCloseButton}
            >
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text> {userAbrir.nombre} </Text>
            <Text> {userAbrir.direccion} </Text>
          </View>
        </Modal>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: COLORS[200],
  },

  matchContainer: {
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
    color: COLORS[600],
  },
  noMatchesText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  matchItem: {
    backgroundColor: COLORS[50],
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

  column_design: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 1,
    gap: 15,
  },
  containerIcons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS[50],
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
  noMatchesContainer: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  button: {
    backgroundColor: COLORS[600],
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: COLORS[50],
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MatchesScreen;

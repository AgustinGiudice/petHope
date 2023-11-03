import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import {
  getAnimalDescripcion,
  getEdadDescripcion,
  getTamanioDescripcion,
  getSexoDescripcion,
} from "../../hooks/getDescripciones";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";
import io from "socket.io-client";
import { UserContext } from "../../context/UserContext";
import LoadingComponent from "../../components/LoadingComponent";
import { getChat } from "../../services/getChat";
import { TokenContext } from "../../context/TokenContext";

const Chat = ({ route }) => {
  const { receiver, mascota } = route.params;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  // const fecha_format = format(new Date(f.created_at), 'dd/MM/yyyy');

  const navigation = useNavigation();
  const [isModalMascotaVisible, setIsModalMascotaVisible] = useState(false);
  const [isModalRefugioVisible, setIsModalRefugioVisible] = useState(false);
  const [isModalMascotaPicVisible, setIsModalMascotaPicVisible] =
    useState(false);

  const socket = io("https://mascotas-back-31adf188c4e6.herokuapp.com/");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [loading, setIsLoading] = useState(true);

  // Función para enviar un mensaje
  const sendMessage = () => {
    // Aquí puedes enviar el mensaje al servidor o realizar las acciones necesarias
    // Luego, actualiza el estado de los mensajes.
    if (newMessage !== "") {
      const message = {
        text: newMessage,
        sender: currentUser.id,
        receiver: receiver.id, // Reemplaza con el ID del destinatario
        mascota: mascota.id,
        timestamp: new Date().toISOString(), // Agrega el timestamp
      };
      socket.emit("chat message", message);
      setNewMessage("");
      Keyboard.dismiss();
    } else {
      console.log("Meter un mensaje de error o algo");
    }
  };

  useEffect(() => {
    getChat(
      receiver.id,
      currentUser.id,
      mascota.id,
      setMessages,
      token,
      setCurrentUser,
      navigation
    );
    setIsLoading(false);
  }, []);

  // Simula la carga de mensajes cuando se monta el componente
  useEffect(() => {
    socket.on("chat message", (mensaje) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: mensaje.text, sender: mensaje.sender },
      ]);
    });

    return () => {
      socket.off("chat message");
    };
  }, [messages]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.spacebet}>
        <TouchableOpacity onPress={() => navigation.navigate("Match")}>
          <FontAwesome name="arrow-left" size={25} style={styles.arrow} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setIsModalMascotaVisible(true)}>
            <Text style={styles.nombreGrande}>
              {currentUser.hasOwnProperty("estado")
                ? receiver.nombre
                : mascota.nombre}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsModalRefugioVisible(true)}>
            <Text style={styles.nombreChico}>
              {currentUser.hasOwnProperty("estado")
                ? mascota.nombre
                : mascota.refugio.nombre}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setIsModalMascotaPicVisible(true)}>
          <Image source={{ uri: mascota.pic }} style={styles.mascotaImagen} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(message, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection:
                item.sender === currentUser.id ? "row-reverse" : "row",
            }}
          >
            <View
              style={{
                backgroundColor:
                  item.sender === currentUser.id ? "#C69AE8" : "#9A34EA",
                padding: 10,
                margin: 5,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white" }}>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          marginRight: 10,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            marginLeft: 10,
          }}
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <Button
          style={{ backgroundColor: "#9A34EA", borderRadius: 5 }}
          title="Enviar"
          onPress={sendMessage}
        />
      </View>

      <Modal
        isVisible={isModalMascotaVisible}
        onBackdropPress={() => setIsModalMascotaVisible(false)}
      >
        <View style={styles.modalContent}>
          {/* Contenido del modal */}
          <Text numberOfLines={1} style={styles.modalTitle}>
            {mascota.nombre}
          </Text>
          <Text style={styles.modalText}>
            {getAnimalDescripcion(mascota.animal)} -{" "}
            {getEdadDescripcion(mascota.edad)}{" "}
          </Text>

          <Text style={styles.modalText}>
            {getTamanioDescripcion(mascota.tamanio)} -{" "}
            {getSexoDescripcion(mascota.sexo)}
          </Text>

          <TouchableOpacity
            onPress={() => setIsModalMascotaVisible(false)}
            style={styles.modalCloseButton}
          >
            <Icon name="times" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={isModalRefugioVisible}
        onBackdropPress={() => setIsModalRefugioVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{mascota.refugio.nombre}</Text>
          <Text style={styles.modalText}>{mascota.refugio.direccion}</Text>
          <TouchableOpacity
            onPress={() => setIsModalRefugioVisible(false)}
            style={styles.modalCloseButton}
          >
            <Icon name="times" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={isModalMascotaPicVisible}
        onBackdropPress={() => setIsModalMascotaPicVisible(false)}
      >
        <View style={styles.modalPicContent}>
          <Image
            source={{ uri: mascota.pic }}
            style={styles.mascotaModalImagen}
          />
          <TouchableOpacity
            onPress={() => setIsModalMascotaPicVisible(false)}
            style={styles.modalCloseButton}
          >
            <Icon name="times" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalPicContent: {
    backgroundColor: "white",
    padding: 5,
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
  buttonRojo: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  spacebet: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eee",
    marginBottom: 40,
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  estadoIndicator: {
    borderRadius: 5,
    padding: 5,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  fechaIndicator: {
    borderRadius: 5,
    padding: 5,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  arrow: {
    color: "#C69AE8",
  },
  nombreGrande: {
    fontWeight: "bold",
    color: "#9A34EA",
    fontSize: 18,
    textAlign: "center",
  },
  nombreChico: {
    textAlign: "center",
    fontSize: 14,
  },
  mascotaImagen: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  mascotaModalImagen: {
    width: "100%",
    aspectRatio: 1,
  },
});

export default Chat;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
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

const Chat = ({ route }) => {
  const { refugio, mascota } = route.params;

  // const fecha_format = format(new Date(f.created_at), 'dd/MM/yyyy');

  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible_2, setModalVisible_2] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal_2 = () => {
    setModalVisible_2(!isModalVisible_2);
  };
  // use getEstadoNombre to get the name of the state

  // const estadoColor = estadoColores[reclamo.estado];

  // const estadoIndicatorStyle = {
  //   backgroundColor: estadoColor || '#FFFFFF',
  // };

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Función para enviar un mensaje
  const sendMessage = () => {
    // Aquí puedes enviar el mensaje al servidor o realizar las acciones necesarias
    // para guardar el mensaje en el contexto del reclamo con idReclamo.
    // Luego, actualiza el estado de los mensajes.

    // Ejemplo de cómo podrías actualizar el estado:
    setMessages([...messages, { text: newMessage, sender: "usuario" }]);
    setNewMessage("");
  };

  // Simula la carga de mensajes cuando se monta el componente
  useEffect(() => {
    // Aquí podrías obtener los mensajes del reclamo con idReclamo
    // desde tu API o desde el almacenamiento local y establecerlos en el estado.
    // Ejemplo:
    // console.log(match);

    const initialMessages = [
      { text: "Hola, ¿en qué puedo ayudarte?", sender: "refugio" },
      { text: "Tengo un problema con mi match.", sender: "usuario" },
    ];
    setMessages(initialMessages);
  }, [refugio]);

  return (
    <View style={styles.container}>
      <View style={styles.spacebet}>
        <TouchableOpacity onPress={() => navigation.navigate("Match")}>
          <FontAwesome name="arrow-left" size={40} style={styles.arrow} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.nombreMascota}>{mascota.nombre}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal_2}>
            <Text style={styles.nombreRefugio}>Refugio {refugio.nombre}</Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: mascota.pic }} style={styles.mascotaImagen} />
      </View>

      {/* <View>
      <Text style={[styles.estadoIndicator, estadoIndicatorStyle]}> {getEstadoNombre(reclamo.estado)}</Text>
      <Text style={[styles.fechaIndicator, estadoIndicatorStyle]}> Conversación iniciada el ${fecha_format}</Text>


    </View> */}

      <FlatList
        data={messages}
        keyExtractor={(message, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: item.sender === "usuario" ? "row-reverse" : "row",
            }}
          >
            <View
              style={{
                backgroundColor:
                  item.sender === "usuario" ? "#C69AE8" : "#9A34EA",
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

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
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
            onPress={toggleModal}
            style={styles.modalCloseButton}
          >
            <Icon name="times" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={isModalVisible_2} onBackdropPress={toggleModal_2}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{refugio.nombre}</Text>
          <Text style={styles.modalText}>{refugio.direccion}</Text>
          <TouchableOpacity
            onPress={toggleModal}
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
    marginTop: Constants.statusBarHeight,
    paddingBottom: 10,
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
  buttonRojo: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  spacebet: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ddd",
    marginBottom: 40,
    padding: 10,
    borderBottomColor: "#bbb",
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
  nombreMascota: {
    fontWeight: "bold",
    color: "#9A34EA",
    fontSize: 18,
    textAlign: "center",
  },
  nombreRefugio: {
    textAlign: "center",
    fontSize: 14,
  },
  mascotaImagen: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default Chat;

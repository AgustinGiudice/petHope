import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import Menu from "../components/Menu";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { screenHeight, screenWidth } from "../hooks/useScreenResize";

const PersonalData = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const userData = {
    nombre: "Alexis",
    apellido: "Maubert",
    direccion: "Calle Alegría de los pibes",
    telefono: 1161746234,
    email: "alexismaubertop@gmail.com",
    pic: null,
    //pic: "https://images.pexels.com/photos/5648357/pexels-photo-5648357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };

  const handlePressPic = () => {
    setModalVisible(true);
    console.log("Aca se va a poder modificar una foto");
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalWindow}>
          <Text style={styles.textWhite}>Aca van a haber cosas </Text>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.header}>
          {userData.pic === null ? (
            <View style={styles.profilePic}>
              <TouchableOpacity onPress={() => handlePressPic()}>
                <FontAwesome5
                  name="user-edit"
                  size={screenHeight / 4}
                  style={{ color: "#73a2f2" }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Image source={{ uri: userData.pic }} style={styles.profilePic} />
              <TouchableOpacity
                onPress={() => handlePressPic()}
                style={styles.changePic}
              >
                <FontAwesome5
                  name="user-edit"
                  size={20}
                  style={{ color: "#73a2f2" }}
                />
              </TouchableOpacity>
            </>
          )}
          <Text style={styles.titulo}>
            {userData.nombre} {userData.apellido}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.fieldName}>
            <Text style={styles.textWhite}>Direccion :</Text>
          </View>
          <View style={styles.fieldData}>
            <Text
              style={styles.textBlack}
              onPress={() =>
                console.log("Tocando aca se debería poder editar esto")
              }
            >
              {userData.direccion}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.fieldName}>
            <Text style={styles.textWhite}>Teléfono :</Text>
          </View>
          <View style={styles.fieldData}>
            <Text
              style={styles.textBlack}
              onPress={() =>
                console.log("Tocando aca se debería poder editar esto")
              }
            >
              {userData.telefono}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.fieldName}>
            <Text style={styles.textWhite}>E-mail :</Text>
          </View>
          <View style={styles.fieldData}>
            <Text
              style={styles.textBlack}
              onPress={() =>
                console.log("Tocando aca se debería poder editar esto")
              }
            >
              {userData.email}
            </Text>
          </View>
        </View>
      </View>
      <Menu navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  modalWindow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(10,10,10,0.5)",
  },
  header: {
    paddingTop: 40,
    backgroundColor: "#007bff",
    width: "100%",
    alignItems: "center",
  },
  titulo: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignSelf: "center",
    color: "white",
  },
  profilePic: {
    height: screenHeight / 3,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  changePic: {
    position: "absolute",
    top: screenHeight / 3,
    right: 10,
  },
  row: {
    flexDirection: "row",
    borderRadius: 5,
    width: screenWidth - 10,
    backgroundColor: "#fff",
  },
  fieldName: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 5,
    width: "25%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  fieldData: {
    backgrondColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "75%",
  },
  textWhite: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  textBlack: {
    fontSize: 12,
    color: "black",
  },
});

export default PersonalData;

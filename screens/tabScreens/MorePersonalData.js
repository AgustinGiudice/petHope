import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { UserContext } from "../../context/UserContext";
import AddImageModal from "../../components/AddImageModal";
import ChangeImageModal from "../../components/ChangeImageModal";
import { color } from "react-native-reanimated";

const MorePersonalData = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const userData = currentUser;
  console.log(userData);

  currentUser.pic = null;
  //pic: "https://images.pexels.com/photos/5648357/pexels-photo-5648357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

  const [editableData, setEditableData] = useState({
    nombre: userData.nombre,
    apellido: userData.apellido,
    edad: String(userData.edad),
    mail: userData.mail,
    telefono: userData.telefono,
    descripcion: userData.descripcion,
  });

  const [profilePic, setProfilePic] = useState(userData.pic);
  const [error, setError] = useState(null);
  useEffect(() => {});

  const handlePressPic = () => {
    setModalVisible(true);
    console.log("Aca se va a poder modificar una foto");
  };

  const handleEditInformation = () => {
    const updatedUserData = {
      ...editableData,
      edad: Number(editableData.edad), // Convertir la edad de nuevo a número
      telefono: Number(editableData.telefono),
    };

    fetch(
      `https://mascotas-back-31adf188c4e6.herokuapp.com/api/usuarios/edit/${userData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // actualizar el usuario en el contexto
        setCurrentUser(data.usuario);

        navigation.navigate("PersonalData");
      })
      .catch((error) => {
        console.error("Error actualizando la información:", error);
        setError("Error al actualizar la información");
      });
  };

  return (
    <>
      <View style={styles.container}>
        {profilePic ? (
          <ChangeImageModal
            isVisible={modalVisible}
            setIsVisible={setModalVisible}
            images={profilePic}
            setImages={setProfilePic}
            selectedImage={profilePic}
          />
        ) : (
          <AddImageModal
            isVisible={modalVisible}
            setIsVisible={setModalVisible}
            images={profilePic}
            setImages={setProfilePic}
          />
        )}
        <View style={styles.header}>
          <FontAwesome
            name="arrow-left"
            size={25}
            style={styles.arrow}
            onPress={() => navigation.navigate("PersonalData")}
          />
          <View style={styles.headerItem}>
            <View style={styles.headerItem2}>
              <View style={styles.headerItemsContenido}>
                <View>
                  <Text style={styles.nameUser}>{userData.nombre}</Text>
                </View>
              </View>
            </View>
          </View>
          {userData.pic === null ? (
            <View style={styles.profilePic}>
              <TouchableOpacity onPress={() => handlePressPic()}>
                <FontAwesome5
                  name="user-edit"
                  size={screenHeight / 6}
                  style={{ color: "#C69AE8" }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Image source={{ uri: userData.pic }} style={styles.profilePic} />
          )}
        </View>
        <View style={styles.dataContainer}>
          <TouchableOpacity
            onPress={() => handleEditInformation()}
            style={styles.changePic}
          >
            <FontAwesome5
              name="user-edit"
              size={20}
              style={{ color: "#9A34EA" }}
            />
          </TouchableOpacity>
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          <View style={styles.column}>
            <ScrollView >
              <View style={styles.textContainer}>
                <Text style={styles.fieldName}>Nombre</Text>
                <TextInput
                  value={editableData.nombre}
                  onChangeText={(text) =>
                    setEditableData((prevState) => ({
                      ...prevState,
                      nombre: text,
                    }))
                  }
                  style={styles.inputStyle}
                  placeholder="Nombre"
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.fieldName}>Apellido</Text>
                <TextInput
                  value={editableData.apellido}
                  onChangeText={(text) =>
                    setEditableData((prevState) => ({
                      ...prevState,
                      apellido: text,
                    }))
                  }
                  style={styles.inputStyle}
                  placeholder="Apellido"
                />
              </View>
              <Text style={styles.fieldName}>Edad</Text>
              <View style={styles.textContainer}>
                <TextInput
                  value={editableData.edad}
                  onChangeText={(text) =>
                    setEditableData((prevState) => ({
                      ...prevState,
                      edad: text,
                    }))
                  }
                  style={styles.inputStyle}
                  placeholder="Edad"
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.fieldName}>Teléfono</Text>
              <View style={styles.textContainer}>
                <TextInput
                  value={editableData.telefono}
                  onChangeText={(text) =>
                    setEditableData((prevState) => ({
                      ...prevState,
                      telefono: text,
                    }))
                  }
                  style={styles.inputStyle}
                  placeholder="Teléfono"
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.fieldName}>E-mail</Text>
              <View style={styles.textContainer}>
                <TextInput
                  value={editableData.mail}
                  onChangeText={(text) =>
                    setEditableData((prevState) => ({
                      ...prevState,
                      mail: text,
                    }))
                  }
                  style={styles.inputStyle}
                  placeholder="E-mail"
                  keyboardType="email-address"
                />
              </View>
              <Text style={styles.fieldName}>Descripcion</Text>
              <View style={styles.textContainer}>
                <TextInput
                  value={editableData.descripcion}
                  multiline={true}
                  onChangeText={(text) =>
                    setEditableData((prevState) => ({
                      ...prevState,
                      descripcion: text,
                    }))
                  }
                  style={styles.inputStyle}
                  placeholder="Descripcion"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
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
  header: {
    paddingTop: 10,
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  profilePic: {
    aspectRatio: 1,
    height: screenHeight / 4,
    backgroundColor: "white",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  changePic: {
    top: 10,
    right: 10,
    position: "absolute",
  },
  dataContainer: {
    gap: 10,
    backgroundColor: "#eee",
    minHeight: screenHeight / 2,
    paddingHorizontal: 20,
    width: screenWidth,
  },
  column: {
    justifyContent: "flex-start",
    width: "70%",
  },
  textContainer: {
    borderColor: "#9A34EA",
    borderBottomWidth: 1,
    padding: 3,
    alignItems: "flex-start",
  },
  textWhite: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  textBlack: {
    fontSize: 14,
    color: "black",
  },
  fieldName: {
    fontSize: 10,
    fontWeight: "bold",
  },
  arrow: {
    color: "#C69AE8",
    position: "absolute",
    top: 100,
    left: 20,
    zIndex: 10,
  },
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
    justifyContent: "center",
    width: screenWidth - screenWidth * 0.2,
    padding: 10,
    alignItems: "center",
  },
  nameUser: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 5,
  },
});

export default MorePersonalData;

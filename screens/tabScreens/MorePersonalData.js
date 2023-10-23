import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { UserContext } from "../../context/UserContext";
import AddImageModal from "../../components/AddImageModal";
import ChangeImageModal from "../../components/ChangeImageModal";
import Input from "../../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MorePersonalData = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const userData = currentUser;

  const [editableData, setEditableData] = useState({
    nombre: userData.nombre,
    apellido: userData.apellido,
    edad: String(userData.edad),
    mail: userData.mail,
    telefono: String(userData.telefono),
    descripcion: userData.descripcion,
  });

  const [profilePic, setProfilePic] = useState(userData.imagen);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePressPic = () => {
    setModalVisible(true);
    console.log("Aca se va a poder modificar una foto");
  };

  const handleEditInformation = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setLoading(true);
    const updatedUserData = {
      ...editableData,
      edad: Number(editableData.edad), // Convertir la edad de nuevo a número
      telefono: Number(editableData.telefono),
    };
    AsyncStorage.getItem("token").then((cache) => {
      const token = JSON.parse(cache);
      fetch(
        `https://mascotas-back-31adf188c4e6.herokuapp.com/api/usuarios/edit/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
          body: JSON.stringify(updatedUserData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          data.usuario.imagen && data.usuario.tuvoMascotas
            ? (data.usuario.completado = 100)
            : data.usuario.imagen || data.usuario.tuvoMascotas
            ? (data.usuario.completado = 66)
            : (data.usuario.completado = 33);

          // actualizar el usuario en el contexto
          setCurrentUser(data.usuario);

          navigation.navigate("PersonalData");
        })
        .catch((error) => {
          console.error("Error actualizando la información:", error);
          setError("Error al actualizar la información");
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <>
      <View style={styles.container}>
        {userData.imagen ? (
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
          {userData.imagen === null ? (
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
            <Image
              source={{ uri: userData.imagen }}
              style={styles.profilePic}
            />
          )}
        </View>
        <View style={styles.dataContainer}>
          <TouchableOpacity
            onPress={() => handleEditInformation()}
            style={styles.changePic}
          >
            <FontAwesome5 name="edit" size={30} style={{ color: "#9A34EA" }} />
          </TouchableOpacity>

          {error && <Text style={{ color: "red" }}>{error}</Text>}
          <View style={styles.column}>
            <ScrollView collapsable={true}>
              <View style={styles.textContainer}>
                <Text style={styles.fieldName}>Nombre</Text>
                <Input
                  value={editableData.nombre}
                  setValue={setEditableData}
                  atributo="nombre"
                  placeholder="Nombre"
                  disable={!isEditing}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.fieldName}>Apellido</Text>
                <Input
                  value={editableData.apellido}
                  setValue={setEditableData}
                  atributo="apellido"
                  disable={!isEditing}
                />
              </View>
              <Text style={styles.fieldName}>Edad</Text>
              <View style={styles.textContainer}>
                <Input
                  value={editableData.edad}
                  setValue={setEditableData}
                  atributo="edad"
                  placeholder="Edad"
                  disable={!isEditing}
                />
              </View>
              <Text style={styles.fieldName}>Teléfono</Text>
              <View style={styles.textContainer}>
                <Input
                  value={editableData.telefono}
                  setValue={setEditableData}
                  atributo="telefono"
                  placeholder="Teléfono"
                  disable={!isEditing}
                />
              </View>
              <Text style={styles.fieldName}>E-mail</Text>
              <View style={styles.textContainer}>
                <Input
                  value={editableData.mail}
                  setValue={setEditableData}
                  atributo="mail"
                  placeholder="E-mail"
                  disable={!isEditing}
                />
              </View>
              <Text style={styles.fieldName}>Descripcion</Text>
              <View style={styles.textContainer}>
                <Input
                  value={editableData.descripcion}
                  setValue={setEditableData}
                  atributo="descripcion"
                  placeholder="Descripcion"
                  disable={!isEditing}
                />
              </View>
            </ScrollView>
          </View>
        </View>

        {isEditing ? ( // Renderizar el botón "Confirmar" solo cuando la edición está habilitada
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.confirmButton}
          >
            {loading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            )}
          </TouchableOpacity>
        ) : (
          !userData.tieneMascotas && (
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.surveyButton}
            >
              <Text style={styles.confirmButtonText}>Cuestionario</Text>
            </TouchableOpacity>
          )
        )}
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
    width: "100%",
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
    minHeight: screenHeight / 1.5,
    paddingHorizontal: 20,
    width: screenWidth,
  },
  column: {
    justifyContent: "flex-start",
    width: "70%",
    maxHeight: screenHeight / 2 - 120,
  },
  textContainer: {
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
  confirmButton: {
    backgroundColor: "#9A34EA",
    position: "absolute",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    right: 10,
    bottom: 20,
    minWidth: 120,
  },
  surveyButton: {
    backgroundColor: "#9A34EA",
    position: "absolute",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignSelf: "center",
    right: 10,
    bottom: 20,
  },
  confirmButtonText: {
    color: "white",
  },
});

export default MorePersonalData;

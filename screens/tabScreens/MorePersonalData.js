import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
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
import HeaderMascota from "../../components/HeaderMascota";
import Constants from "expo-constants";
import { BASE_URL } from "@env";

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
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const maxNumCharacters = 150;
  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    telefono: "",
    mail: "",
    descripcion: "",
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardIsOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardIsOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleEditInformation = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setLoading(true);
    // Validar campos antes de enviar la solicitud
    const { nombre, apellido, edad, telefono, mail, descripcion } =
      editableData;
    let hasErrors = false;
    const newErrors = {};

    // Validar nombre
    if (!nombre) {
      newErrors.nombre = "Nombre es requerido";
      hasErrors = true;
    } else {
      newErrors.nombre = "";
    }

    // Validar apellido
    if (!apellido) {
      newErrors.apellido = "Apellido es requerido";
      hasErrors = true;
    } else {
      newErrors.apellido = "";
    }

    // Validar edad este no habria que sacarlo?
    if (!edad || isNaN(Number(edad))) {
      newErrors.edad = "Edad debe ser un número";
      hasErrors = true;
    } else {
      newErrors.edad = "";
    }

    // Validar teléfono
    if (!telefono || isNaN(Number(telefono))) {
      newErrors.telefono = "Teléfono debe ser un número";
      hasErrors = true;
    } else {
      newErrors.telefono = "";
    }

    // Validar correo electrónico
    if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      newErrors.mail = "Correo electrónico inválido";
      hasErrors = true;
    } else {
      newErrors.mail = "";
    }

    // Validar descripción
    if (!descripcion) {
      newErrors.descripcion = "Descripción es requerida";
      hasErrors = true;
    } else if (descripcion.length > 150) {
      newErrors.descripcion =
        "La descripción no puede superar los 150 caracteres";
      hasErrors = true;
    } else {
      newErrors.descripcion = "";
    }
    //aca
    setErrors(newErrors);

    if (hasErrors) {
      setLoading(false);
      return;
    }

    const updatedUserData = {
      ...editableData,
      edad: Number(editableData.edad), // Convertir la edad de nuevo a número
      telefono: Number(editableData.telefono),
    };
    AsyncStorage.getItem("token").then((cache) => {
      const token = JSON.parse(cache);
      fetch(`${BASE_URL}api/usuarios/edit/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(updatedUserData),
      })
        .then((response) => response.json())
        .then((data) => {
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
        <View style={styles.containerHeader}>
          <HeaderMascota mascota={{ nombre: userData.nombre }} />
        </View>
        <AddImageModal
          id={currentUser.id}
          isVisible={modalVisible}
          setIsVisible={setModalVisible}
          images={profilePic}
          setImages={setProfilePic}
        />
        <View style={styles.header}>
          <FontAwesome
            name="arrow-left"
            size={25}
            style={styles.arrow}
            onPress={() => navigation.navigate("PersonalData")}
          />

          {!keyboardIsOpen ? (
            userData.imagen === null ? (
              <View style={styles.profilePic}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <FontAwesome5
                    name="user-edit"
                    size={screenHeight / 3}
                    style={{ color: "#C69AE8" }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <Image
                source={{ uri: userData.imagen }}
                style={styles.profilePic}
              />
            )
          ) : null}
        </View>
        {/* PARTE 2 */}
        <View
          style={[
            styles.dataContainer,
            keyboardIsOpen && { marginTop: screenHeight * 0.1 },
          ]}
        >
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
                  onChangeText={(text) =>
                    setEditableData({ ...editableData, nombre: text })
                  }
                />
                {errors.nombre !== "" && (
                  <Text style={styles.errorText}>{errors.nombre}</Text>
                )}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.fieldName}>Apellido</Text>
                <Input
                  value={editableData.apellido}
                  setValue={setEditableData}
                  atributo="apellido"
                  disable={!isEditing}
                />
                {errors.apellido !== "" && (
                  <Text style={styles.errorText}>{errors.apellido}</Text>
                )}
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
                {errors.edad !== "" && (
                  <Text style={styles.errorText}>{errors.edad}</Text>
                )}
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
                {errors.telefono !== "" && (
                  <Text style={styles.errorText}>{errors.telefono}</Text>
                )}
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
                {errors.mail !== "" && (
                  <Text style={styles.errorText}>{errors.mail}</Text>
                )}
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
                <Text
                  style={{
                    color:
                      editableData.descripcion.length <= maxNumCharacters
                        ? "gray"
                        : "red",
                    alignSelf: "flex-end",
                  }}
                >
                  {editableData.descripcion.length}/{maxNumCharacters}
                           
                </Text>
                {errors.descripcion !== "" && (
                  <Text style={styles.errorText}>{errors.descripcion}</Text>
                )}
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
    flexDirection: screenWidth >= 500 ? "row" : "column",

    alignItems: "center",
    gap: 5,
    paddingTop: Constants.statusBarHeight,
    height: "100%",
  },
  containerHeader: {
    position: "absolute",
    left: "50%",
    top: 30,
  },
  header: {
    paddingTop: 10,
    backgroundColor: "white",
    width: screenWidth >= 500 ? "50%" : "100%",
    height: screenWidth >= 500 ? "100%" : "50%",
    alignItems: "center",
    justifyContent: "center",
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
    minHeight: "100%",
    paddingHorizontal: 20,
    width: screenWidth >= 500 ? "50%" : screenWidth,
    justifyContent: screenWidth >= 500 ? "center" : "flex-start",
  },
  column: {
    justifyContent: "flex-start",
    width: "90%",
    height: "100%",
    maxHeight: screenWidth >= 500 ? "100%" : screenHeight / 2 - 110,
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
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default MorePersonalData;

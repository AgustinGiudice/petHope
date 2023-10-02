import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddImageModal from "../../components/AddImageModal";
import ChangeImageModal from "../../components/ChangeImageModal";
import { UserContext } from "../../context/UserContext";

const PersonalData = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { currentUser } = useContext(UserContext);
  const userData = currentUser;
  currentUser.edad = 30;
  currentUser.completado = 100;
  currentUser.pic = null;
  //pic: "https://images.pexels.com/photos/5648357/pexels-photo-5648357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

  const [profilePic, setProfilePic] = useState(userData.pic);

  useEffect(() => {});

  const handlePressPic = () => {
    setModalVisible(true);
  };

  const handleLogout = async () => {
    try {
      // Eliminar el token de AsyncStorage
      await AsyncStorage.removeItem("token");
      console.log("TOKEN ELIMINADO");
      // Redirigir al usuario a la pantalla de inicio de sesión
      navigation.navigate("LoginScreen"); // Reemplaza "Login" con la pantalla de inicio de sesión real en tu aplicación
    } catch (error) {
      console.error("Error al intentar cerrar sesión:", error);
    }
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
          <View style={styles.containerCompletado}>
            <Text style={styles.textoCompletado}>
              {userData.completado}% COMPLETADO
            </Text>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  userData.completado >= 33
                    ? { backgroundColor: "#C69AE8" }
                    : { backgroundColor: "white" },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  userData.completado >= 66
                    ? { backgroundColor: "#C69AE8" }
                    : { backgroundColor: "white" },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  userData.completado >= 99
                    ? { backgroundColor: "#C69AE8" }
                    : { backgroundColor: "white" },
                ]}
              />
            </View>
          </View>
          {profilePic === null ? (
            <View>
              <TouchableOpacity onPress={() => handlePressPic()}>
                <FontAwesome5
                  name="user-edit"
                  size={screenHeight / 4}
                  style={{ color: "#C69AE8" }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Image source={{ uri: profilePic }} style={styles.profilePic} />
              <TouchableOpacity
                onPress={() => handlePressPic()}
                style={styles.changePic}
              >
                <FontAwesome5
                  name="user-edit"
                  size={20}
                  style={{ color: "#C69AE8" }}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.textContainer}>
            <Text>
              {userData.nombre} {userData.apellido}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text>{userData.edad}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>{userData.descripcion}</Text>
          </View>
          <TouchableOpacity>
            <Text onPress={handleLogout}>CERRAR SESION</Text>
          </TouchableOpacity>
        </View>
        <FontAwesome
          name="arrow-right"
          size={25}
          style={styles.arrow}
          onPress={() => navigation.navigate("MorePersonalData")}
        />
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
    paddingTop: 30,
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    gap: 20,
    position: "relative",
  },
  containerCompletado: {
    width: "100%",
    alignItems: "center",
    gap: 5,
    paddingVertical: 10,
  },
  textoCompletado: {
    fontWeight: "bold",
    fontSize: 10,
  },
  barContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  bar: {
    paddingVertical: 1,
    paddingHorizontal: 40,
    borderRadius: 3,
    borderColor: "#9A34EA",
    borderWidth: 1,
  },
  titulo: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignSelf: "center",
    color: "white",
  },
  profilePic: {
    aspectRatio: 1,
    width: screenWidth - 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200,
    borderColor: "#9A34EA",
    borderWidth: 2,
  },
  changePic: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  dataContainer: {
    gap: 10,
    backgroundColor: "#F1E0FE",
    minHeight: screenHeight,
    padding: 20,
  },
  textContainer: {
    borderColor: "#9A34EA",
    borderBottomWidth: 1,
    padding: 3,
    alignItems: "center",
  },
  arrow: {
    color: "#9A34EA",
    position: "absolute",
    bottom: 10,
    right: 10,
    borderColor: "#9A34EA",
  },
});

export default PersonalData;

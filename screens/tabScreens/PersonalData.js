import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AddImageModal from "../../components/AddImageModal";
import ChangeImageModal from "../../components/ChangeImageModal";
import { UserContext } from "../../context/UserContext";

const PersonalData = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { currentUser } = useContext(UserContext);
  const userData = currentUser;
  userData.completado =
    userData.imagen && userData.tuvoMascotas !== null
      ? 100
      : userData.imagen || userData.tuvoMascotas !== null
      ? 66
      : 33;

  if (!currentUser.estado) {
    currentUser.edad = calcularEdad(currentUser.fechaDeNacimiento);
  }
  const [profilePic, setProfilePic] = useState(userData.imagen);

  const porcentajes = (
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
  );

  const widthSize = () => {
    if (screenWidth >= 500) {
      setIsTablet(true);
    } else {
      setIsTablet(false);
    }
  };

  useEffect(() => {
    widthSize(); // Llama a la función widthSize al montar el componente
    // const handleScreenResize = () => {
    //   widthSize(); // Llama a la función widthSize cuando se detecta un cambio de tamaño en la pantalla
    // };

    // Dimensions.addEventListener("change", handleScreenResize);

    // return () => {
    //   Dimensions.removeEventListener("change", handleScreenResize);
    // };
  }, []);
  return (
    <>
      <View style={styles.container}>
        <AddImageModal
          id={currentUser.id}
          isVisible={modalVisible}
          setIsVisible={setModalVisible}
          images={profilePic}
          setImages={setProfilePic}
          currentImage={profilePic}
        />

        <View style={styles.header}>
          {!currentUser.estado && porcentajes}
          {profilePic === null ? (
            <View>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <FontAwesome5
                  name="user-edit"
                  size={screenHeight / 4}
                  style={{ color: "#C69AE8" }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("MorePersonalData")}
              >
                <Image source={{ uri: profilePic }} style={styles.profilePic} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
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
            {currentUser.estado ? (
              <Text>{userData.mail}</Text>
            ) : (
              <Text>{userData.edad}</Text>
            )}
          </View>
          <View style={styles.textContainer}>
            <Text>{userData.descripcion}</Text>
          </View>
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
    backgroundColor: "#F1E0FE",
    flexDirection: screenWidth >= 500 ? "row" : "column",
  },
  header: {
    paddingTop: 30,
    backgroundColor: "white",
    width: screenWidth >= 500 ? "50%" : "100%",
    alignItems: "center",
    gap: 20,
    position: "relative",
    height: screenWidth >= 500 ? "100%" : "60%",
    justifyContent: screenWidth >= 500 ? "center" : "flex-start",
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
    width: 300,
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
    left: 10,
  },
  dataContainer: {
    gap: 10,
    minHeight: screenHeight,
    padding: 20,
    width: screenWidth >= 500 ? "50%" : "100%",
    justifyContent: screenWidth >= 500 ? "center" : "flex-start",
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
function calcularEdad(fechaNacimiento) {
  const fechaNacimientoDate = new Date(fechaNacimiento);
  const fechaActual = new Date();

  // Calcula la diferencia en milisegundos
  const diferencia = fechaActual - fechaNacimientoDate;

  // Convierte la diferencia en años
  const edad = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));

  return edad;
}
export default PersonalData;

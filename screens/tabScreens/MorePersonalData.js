import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import UploadImageModal from "../../components/UploadImageModal";

const MorePersonalData = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const userData = {
    nombre: "Alexis",
    apellido: "Maubert",
    edad: 30,
    direccion: "Calle Alegría de los pibes",
    telefono: 1161746234,
    email: "alexismaubertop@gmail.com",
    completado: 100,
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elit ligula, tincidunt quis ante at, bibendum placerat odio. Mauris eget tristique nunc. Aliquam posuere erat pellentesque cursus semper. Nam id mauris nec lectus rhoncus blandit a a sapien. ",
    //pic: null,
    pic: "https://images.pexels.com/photos/5648357/pexels-photo-5648357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };

  useEffect(() => {});

  const handlePressPic = () => {
    setModalVisible(true);
    console.log("Aca se va a poder modificar una foto");
  };

  return (
    <>
      <UploadImageModal visible={modalVisible} setVisible={setModalVisible} />
      <View style={styles.container}>
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
          {userData.pic === null ? (
            <View style={styles.profilePic}>
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
              <Image source={{ uri: userData.pic }} style={styles.profilePic} />
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
            <Text style={styles.textBlack}>
              {userData.nombre} {userData.apellido}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textBlack}>{userData.edad}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textBlack}>{userData.descripcion}</Text>
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
    height: screenHeight / 3,
    width: screenWidth / 1.5,
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
    minHeight: screenHeight / 2,
    padding: 20,
  },
  textContainer: {
    borderColor: "#9A34EA",
    borderBottomWidth: 1,
    padding: 3,
    alignItems: "center",
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
});

export default MorePersonalData;

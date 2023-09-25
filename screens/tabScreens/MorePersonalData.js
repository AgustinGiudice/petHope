import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import UploadImageModal from "../../components/UploadImageModal";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
                  size={screenHeight / 4}
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
            onPress={() => handlePressPic()}
            style={styles.changePic}
          >
            <FontAwesome5
              name="user-edit"
              size={20}
              style={{ color: "#9A34EA" }}
            />
          </TouchableOpacity>
          <View style={styles.column}>
            <View style={styles.textContainer}>
              <Text style={styles.fieldName}>Nombre</Text>
              <Text style={styles.textBlack}>
                {userData.nombre} {userData.apellido}
              </Text>
            </View>
            <Text style={styles.fieldName}>Edad</Text>
            <View style={styles.textContainer}>
              <Text style={styles.textBlack}>{userData.edad}</Text>
            </View>
            <Text style={styles.fieldName}>Teléfono</Text>
            <View style={styles.textContainer}>
              <Text style={styles.textBlack}>{userData.telefono}</Text>
            </View>
            <Text style={styles.fieldName}>E-mail</Text>
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.textBlack}>
                {userData.email}
              </Text>
            </View>
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
    height: screenWidth,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  changePic: {
    alignSelf: "flex-end",
  },
  dataContainer: {
    gap: 10,
    backgroundColor: "#eee",
    minHeight: screenHeight / 2,
    padding: 20,
    width: screenWidth,
  },
  column: {
    justifyContent: "flex-start",
    width: "70%",
    paddingBottom: 120,
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
});

export default MorePersonalData;

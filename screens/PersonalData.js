import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Image,
} from "react-native";
import Menu from "../components/Menu";
import { screenHeight } from "../hooks/useScreenResize";

const PersonalData = ({ navigation }) => {
  const userData = {
    nombre: "El Ale",
    apellido: "De La Gente",
    direccion: "Los caminos de la vida s/n",
    pic: "https://images.pexels.com/photos/5648357/pexels-photo-5648357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Información personal</Text>
        </View>
        <View style={styles.row}>
          <Image source={{ uri: userData.pic }} style={styles.profilePic} />

          <View style={styles.personalInfo}>
            <Text style={styles.text}>
              {userData.nombre} {userData.apellido}
            </Text>
            <Text style={styles.text}>{userData.direccion}</Text>
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
    alignItems: "flex-start",
  },
  header: {
    paddingVertical: 10,
    paddingTop: 40,
    backgroundColor: "#007bff",
    width: "100%",
    paddingHorizontal: 10,
  },
  titulo: {
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    gap: 5,
  },
  profilePic: {
    width: "50%",
    height: screenHeight / 3,
    borderRadius: 10,
  },
  personalInfo: {},
  text: {
    fontSize: 10,
  },
});

export default PersonalData;

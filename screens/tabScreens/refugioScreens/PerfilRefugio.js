import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../../../context/UserContext";

const PerfilRefugio = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const userData = currentUser;

  const [shelterData, setShelterData] = useState({
    name: "Nombre del Refugio",
    description: "Descripción del refugio...",
    imageUrl: "https://via.placeholder.com/150", // URL de la imagen del refugio
    // Otros datos editables del refugio
  });

  const handleEditProfile = () => {
    // Lógica para editar el perfil del refugio
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: shelterData.imageUrl }} style={styles.image} />

      <ScrollView style={styles.contentContainer}>
        <View style={styles.dataContainer}>
          <Text style={styles.fieldName}>Nombre:</Text>
          <Text style={styles.fieldValue}>{shelterData.name}</Text>
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.fieldName}>Descripción:</Text>
          <Text style={styles.fieldValue}>{shelterData.description}</Text>
        </View>

        {/* Más campos editables del perfil del refugio */}
      </ScrollView>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200, // Altura de la imagen del refugio
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 20,
  },
  dataContainer: {
    marginBottom: 15,
  },
  fieldName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "#9A34EA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 20,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PerfilRefugio;

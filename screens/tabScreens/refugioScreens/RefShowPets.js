import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import MascotaRef from "../../../components/componentesRefugio/MascotaRef";
import { screenHeight, screenWidth } from "../../../hooks/useScreenResize";
import LoadingComponent from "../../../components/LoadingComponent";
import { TokenContext } from "../../../context/TokenContext";
import { UserContext } from "../../../context/UserContext";
import { getMascotasRef } from "../../../services/getMascotasRef";
import { BASE_URL } from "@env";
import HeaderMascota from "../../../components/HeaderMascota";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native"; // Importar useFocusEffect

const RefShowPets = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(TokenContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [searchText, setSearchText] = useState(""); // Declarar el estado antes del useEffect
  const [mascotasRef, setMascotasRef] = useState([]);

  const fetchMascotas = async () => {
    setIsLoading(true); // Mostrar loading mientras se fetchean los datos
    try {
      const url = `${BASE_URL}api/mascotas/petsRef/${currentUser.id}`;
      await getMascotasRef(url, token, navigation, setMascotasRef, setCurrentUser);
    } catch (error) {
      console.error("Error al obtener mascotas de refugio:", error);
    } finally {
      setIsLoading(false); // Ocultar loading cuando se obtienen los datos
    }
  };

  // Utilizar useFocusEffect para refetch al volver a la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchMascotas(); // Refetch cuando la pantalla vuelve a estar en foco
    }, [])
  );

  const renderItem = ({ item }) => {
    if (
      searchText.length === 0 ||
      item.nombre.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return (
        <View style={styles.item}>
          <MascotaRef mascota={item} navigation={navigation} />
        </View>
      );
    } else {
      return null; // Oculta las mascotas que no coincidan con la búsqueda
    }
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <View style={styles.container}>
        <HeaderMascota mascota={{ nombre: "Mascotas" }} />
        <View style={styles.container2}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
          <FlatList
            style={styles.flatlist}
            data={mascotasRef}
            renderItem={renderItem}
            keyExtractor={(item) => item.id} // Use toString to ensure it's a string
            numColumns={2}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    marginTop: screenHeight - screenHeight * 0.95,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: screenWidth - screenWidth * 0.2,
  },
  container: {
    flex: 1,
    backgroundColor: "#E3E3E3",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  container2: {
    paddingTop: screenHeight * 0.02,
  },
  namePet: {
    color: "white",
    fontWeight: "bold",
    fontSize: 28,
    flex: 1,
    paddingHorizontal: 3,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default RefShowPets;

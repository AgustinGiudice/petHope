import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import MascotaRef from "../../../components/componentesRefugio/MascotaRef";
import { screenHeight, screenWidth } from "../../../hooks/useScreenResize";
import LoadingComponent from "../../../components/LoadingComponent";
import { TokenContext } from "../../../context/TokenContext";
import { UserContext } from "../../../context/UserContext";
import { getMascotasRef } from "../../../services/getMascotasRef";
import { BASE_URL } from "@env";

const RefShowPets = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(TokenContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [searchText, setSearchText] = useState(""); // Declarar el estado antes del useEffect

  const [mascotasRef, setMascotasRef] = useState([]);

  useEffect(() => {
    try {
      const url = `${BASE_URL}api/mascotas/petsRef/${currentUser.id}`;
      getMascotasRef(url, token, navigation, setMascotasRef, setCurrentUser);
    } catch (error) {
      console.error("Error al obtener mascotas de refugio:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
      <View style={styles.headerItem}>
        <View style={styles.headerItem2}>
          <View style={styles.headerItemsContenido}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.namePet}>
              Mascotas
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
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
    width: screenWidth,
    justifyContent: "space-between",
    marginBottom: 30,
    alignItems: "baseline",
    paddingHorizontal: 30,
    textAlign: "center",
  },
  buttonFilters: {
    zIndex: 1,
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

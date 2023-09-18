import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { BASE_URL } from "@env";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { screenWidth } from "../../hooks/useScreenResize";
import {
  getAnimalDescripcion,
  getEdadDescripcion,
  getTamanioDescripcion,
  getSexoDescripcion,
} from "../../hooks/getDescripciones";

const MatchesScreen = ({ navigation }) => {
  // Función para manejar la acción de abrir el chat con el refugio
  const handleChatClick = (refugio, mascota) => {
    // Implementa la lógica para abrir el chat con el refugio aquí
    // Puedes navegar a una nueva pantalla de chat o mostrar un modal de chat, por ejemplo.
    console.log("Abriendo chat con refugio", refugio);
    navigation.navigate('Chat', { refugio: refugio, mascota: mascota });
  };

  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMatches = async () => {
    try {
      setRefreshing(true);

      const response = await fetch(`${BASE_URL}api/match`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Aquí puedes agregar otros encabezados si es necesario
        },
      });
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de matches.");
      }
      const data = await response.json();
      setMatches(data);
      console.log(data)
    } catch (error) {
      console.error("Error al obtener los matches:", error);
    } finally {
      setRefreshing(false);

    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // if (isLoading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      {matches.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={matches}
          renderItem={({ item }) => (
            <View style={styles.matchItem}>
              <View style={styles.containerLeft}>
                <View
                  onPress={() => handleChatClick(item.mascota.refugioId)}
                  style={styles.imagenContainer}
                >
                  <Image
                    source={{ uri: item.mascota.pic }}
                    style={styles.mascotaImagen}
                  />
                </View>

                <View style={styles.column}>
                  <Text style={styles.letraGrande} numberOfLines={1}>
                    {item.mascota.nombre} - Refugio Devoto
                  </Text>
                  <Text style={styles.letraChica}>
                    {getAnimalDescripcion(item.mascota.animal)}{" "}
                    {getEdadDescripcion(item.mascota.edad)}{" "}
                    {getTamanioDescripcion(item.mascota.tamanio)}
                  </Text>
                  <Text style={styles.letraChica}>
                    {getSexoDescripcion(item.mascota.sexo)}
                  </Text>
                </View>
              </View>

              <View style={styles.containerIcons}>
                <MaterialIcons name="chat" size={25}  onPress={() => handleChatClick(item.refugio, item.mascota )} />
                <MaterialCommunityIcons name="dots-vertical" size={25} />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.matchContainer}
          onEndReached={fetchMatches}
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={fetchMatches}
          
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#fff",
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    paddingTop: 40,
  },
  matchContainer: {
    maxWidth: screenWidth,
    paddingHorizontal: 10,
  },
  letraGrande: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
  },
  letraChica: {
    fontSize: 10,
    textAlign: "left",
  },
  noMatchesText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  matchItem: {
    backgroundColor: "#c3c3c3",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    padding: 5,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    justifyContent: "space-between",
    gap: 2,
    flexShrink: 99,
  },
  mascotaImagen: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  containerLeft: {
    flexDirection: "row",
    gap: 5,
    flexShrink: 99,
  },
  containerIcons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MatchesScreen;

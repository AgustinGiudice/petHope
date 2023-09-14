import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { BASE_URL } from "@env";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { screenWidth } from "../hooks/useScreenResize";
import {
  getAnimalDescripcion,
  getEdadDescripcion,
  getTamanioDescripcion,
  getSexoDescripcion,
} from "../hooks/getDescripciones";

const MatchesScreen = () => {
  // Función para manejar la acción de abrir el chat con el refugio
  const handleChatClick = (refugioId) => {
    // Implementa la lógica para abrir el chat con el refugio aquí
    // Puedes navegar a una nueva pantalla de chat o mostrar un modal de chat, por ejemplo.
  };

  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Función para cargar los matches del usuario
    const fetchMatches = async () => {
      try {
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
      } catch (error) {
        console.error("Error al obtener los matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {matches.length === 0 ? (
        <Text style={styles.noMatchesText}>No hay matches disponibles.</Text>
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
                <Image
                  source={require("../chat.png")} // Reemplaza con la imagen del icono de chat
                  style={styles.chatIcon}
                />
                <Image
                  source={require("../dots_1.png")} // Reemplaza con la imagen del icono de chat
                  style={styles.chatIcon}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.matchContainer}
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
  chatIcon: {
    width: 25,
    height: 25,
  },
});

export default MatchesScreen;

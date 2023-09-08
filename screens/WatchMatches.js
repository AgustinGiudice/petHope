import React, { useState, useEffect } from "react";
import { format } from 'date-fns';

import { BASE_URL } from "@env";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from "react-native";

function getEstadoDescripcion(estado) {
    switch (estado) {
      case 1:
        return "En espera de aceptación";
      case 2:
        return "En curso";
      case 3:
        return "Adoptado";
      default:
        return "Desconocido";
    }
  }
  
  function getTamanioDescripcion(tamanio) {
    switch (tamanio) {
      case 1:
        return "Pequeño";
      case 2:
        return "Mediano";
      case 3:
        return "Grande";
      default:
        return "Desconocido";
    }
  }
  
  function getEdadDescripcion(edad) {
    switch (edad) {
      case 1:
        return "Cachorro";
      case 2:
        return "Adulto-Mediano";
      case 3:
        return "Adulto";
      default:
        return "Desconocido";
    }
  }
  
  function getSexoDescripcion(sexo) {
    switch (sexo) {
      case 1:
        return "Macho";
      case 2:
        return "Hembra";
      default:
        return "Desconocido";
    }
  }
  
  function getAnimalDescripcion(animal) {
    switch (animal) {
      case 1:
        return "Perro";
      case 2:
        return "Gato";
      default:
        return "Desconocido";
    }
  }
  
  

const MatchesScreen = () => {
    // Función para manejar la acción de abrir el chat con el refugio
  const handleChatClick = (refugioId) => {
    // Implementa la lógica para abrir el chat con el refugio aquí
    // Puedes navegar a una nueva pantalla de chat o mostrar un modal de chat, por ejemplo.
  };

  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("-----------------------------------------------------------------------");
    console.log(matches)
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
        console.log(data);
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
              <TouchableOpacity onPress={() => handleChatClick(item.mascota.refugioId)}>
                <View style={styles.column}>
                  <Image source={{ uri: item.mascota.pic }} style={styles.mascotaImagen} />
                  
                </View>
              </TouchableOpacity>

              <View style={styles.column}>
                <Text style={styles.letraGrande}>{item.mascota.nombre} - Refugio Devoto</Text>
                <Text>{getAnimalDescripcion(item.mascota.animal)} {getEdadDescripcion(item.mascota.edad)}</Text>
                <Text>{getSexoDescripcion(item.mascota.sexo)} {getTamanioDescripcion(item.mascota.tamanio)}</Text>
              </View>

              <View style={styles.containerIcons}>
              <Image
                source={require('../chat.png')} // Reemplaza con la imagen del icono de chat
                style={styles.chatIcon}
              />
              <Image
                source={require('../dots_1.png')} // Reemplaza con la imagen del icono de chat
                style={styles.chatIcon}
              />
              </View>
          </View>

          )}
          keyExtractor={(item) => item.id.toString()}
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
        paddingTop: 40, //Para que la pantalla siempre ocupe el 100% del dispositivo
        overflow: "hidden",
        position: "relative",
        alignItems: "center",
      },
      letraGrande:{
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "left",
      },
   noMatchesText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  matchItem: {
    backgroundColor: '#c3c3c3',
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column:{
    display: 'flex',
    flexDirection: 'column',
    padding: 6,
    textAlign:'center',
    justifyContent: 'flex-start',
    gap: 5

  },
  mascotaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mascotaImagen: {
    width: 75,
    height: 75,
    borderRadius: 25, // Hacer un círculo
    marginRight: 10,
  },
  containerIcons: {
    display: 'flex',
    flexDirection: 'row',
    gap:10,
    justifyContent: "center",
    alignItems: 'center',
  },
  chatIcon: {
    width: 25,
    height: 25,
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  
});

export default MatchesScreen;

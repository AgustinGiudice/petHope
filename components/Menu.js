import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BASE_URL } from "@env";
import { useState } from "react";

const Menu = ({ mascota_id }) => {
  const [matchResponse, setMatchResponse] = useState(null); // Estado para almacenar la respuesta

   // POST 
   const postLike = async () => {
      console.log(mascota_id)
      var url = `${BASE_URL}api/match`;
    try {
        const response = await fetch(`${BASE_URL}api/match`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idMascota: mascota_id,
          }),
        });

        if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del backend:", data);
        setMatchResponse(data); // Actualiza el estado con la respuesta
      } else {
        console.error("Error en la respuesta del backend:", response.status);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
      
    
  };

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.button} color="#007bff">
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} color="#007bff">
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pawbutton} onPress={() => postLike(mascota_id)}>
        <FontAwesome name="paw" size={50} />
      </TouchableOpacity>
      <View style={styles.space}></View>
      <TouchableOpacity style={styles.button} color="#007bff">
        <Text>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} color="#007bff">
        <Text>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    overflow: "visible",
    backgroundColor: "#007bff",
    height: 60,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  space: {
    width: 75,
  },
  pawbutton: {
    backgroundColor: "#777bf6",
    position: "absolute",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginHorizontal: width / 3,
    zIndex: 2,
    bottom: 0,
  },
});

export default Menu;

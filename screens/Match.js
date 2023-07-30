import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";

function Match({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [pic, setPic] = useState("");
  const [edad, setEdad] = useState(null);
  const [nivelCuidado, setNivelCuidado] = useState(null);
  const id = 1;
  fetch(`http://localhost:3000/api/mascotas/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setNombre(data.nombre);
      setPic(data.pic);
      setEdad(data.edad);
      setNivelCuidado(data.nivelCuidado);
    })
    .catch((error) => {
      console.error("Error al guardar el usuario:", error);
      // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario si la petición falla
    });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Image style={styles.pic} source={pic} />
      <Text>{nombre}</Text>
      <Text>{edad}</Text>
      <Text>{nivelCuidado}</Text>
      <Button title="Ir a Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
const styles = StyleSheet.create({
  pic: {
    width: 600,
    height: 400,
  },
});
export default Match;

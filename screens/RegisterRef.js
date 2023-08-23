import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const RegisterRef = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [contacto, setContacto] = useState("");

  const handleSubmit = () => {
    // Crear un objeto con los datos del refugio
    const refugioData = {
      nombre,
      direccion,
      contacto,
      latitud: -34.61, //coordenadas hardcodeadas para dejar el refugio en devoto... XQ SI
      longitud: -58.51815,
    };

    // Realizar la petición POST al backend para guardar los datos del refugio
    fetch("https://mascotas-back-31adf188c4e6.herokuapp.com/api/refugios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refugioData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del backend:", data);
        // Reiniciar los campos del formulario después de guardar los datos
        setNombre("");
        setDireccion("");
        setContacto("");
        navigation.navigate("ShowPets");
      })
      .catch((error) => {
        console.error("Error al guardar el refugio:", error);
        // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario si la petición falla
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackText}>Volver</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
      />
      <Text style={styles.label}>Dirección:</Text>
      <TextInput
        style={styles.input}
        value={direccion}
        onChangeText={setDireccion}
        placeholder="Dirección"
      />
      <Text style={styles.label}>Contacto:</Text>
      <TextInput
        style={styles.input}
        value={contacto}
        onChangeText={setContacto}
        placeholder="Contacto"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterRef;

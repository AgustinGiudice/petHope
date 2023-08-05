import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const RegisterPet = ({ navigation }) => {
  const initialPetData = {
    nombre: "",
    edad: "",
    nivelCuidado: "",
    tamanio: "",
    pic: "",
    raza: "",
  };
  const [petData, setPetData] = useState(initialPetData);

  const handleSubmit = () => {
    // Realizar la petición POST al backend para guardar los datos del usuario
    fetch("http://localhost:3000/api/mascotas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("*********\nRespuesta del backend:", data);
        // Reiniciar los campos del formulario después de guardar los datos
        setPetData(initialPetData);
      })
      .catch((error) => {
        console.error("Error al guardar el usuario:", error);
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
        value={petData.nombre}
        onChangeText={(value) => setPetData({ ...petData, nombre: value })}
        placeholder="Nombre"
      />
      <Text style={styles.label}>Edad:</Text>
      <TextInput
        style={styles.input}
        value={petData.edad}
        onChangeText={(value) => setPetData({ ...petData, edad: value })}
        placeholder="Edad"
      />
      <Text style={styles.label}>Nivel de Cuidado:</Text>
      <TextInput
        style={styles.input}
        value={petData.nivelCuidado}
        onChangeText={(value) =>
          setPetData({ ...petData, nivelCuidado: value })
        }
        placeholder="Nivel de cuidado"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Tamaño:</Text>
      <TextInput
        style={styles.input}
        value={petData.tamanio}
        onChangeText={(value) => setPetData({ ...petData, tamanio: value })}
        placeholder="Tamaño"
      />
      <Text style={styles.label}>Raza:</Text>
      <TextInput
        style={styles.input}
        value={petData.raza}
        onChangeText={(value) => setPetData({ ...petData, raza: value })}
        placeholder="Tamaño"
      />
      <Text style={styles.label}>Pic:</Text>
      <TextInput
        style={styles.input}
        value={petData.pic}
        onChangeText={(value) => setPetData({ ...petData, pic: value })}
        placeholder="Pic"
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

export default RegisterPet;

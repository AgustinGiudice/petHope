import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Picker, Switch, StyleSheet } from "react-native";

const RegisterPet = ({ navigation }) => {
  const initialPetData = {
    nombre: "",
    edad: "cachorro", 
    nivelCuidado: "1", 
    cuidadosEspeciales: false,
    raza: "perro", 
    tamanio: "chico", 
    pic: "",
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

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={petData.nombre}
          onChangeText={(value) => setPetData({ ...petData, nombre: value })}
          placeholder="Nombre"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Edad:</Text>
        <Picker
          style={styles.picker}
          selectedValue={petData.edad}
          onValueChange={(itemValue) => setPetData({ ...petData, edad: itemValue })}
        >
          <Picker.Item label="Cachorro" value="cachorro" />
          <Picker.Item label="Juvenil" value="juvenil" />
          <Picker.Item label="Adulto" value="adulto" />
        </Picker>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nivel de Cuidado:</Text>
        <Picker
          style={styles.picker}
          selectedValue={petData.nivelCuidado}
          onValueChange={(itemValue) => setPetData({ ...petData, nivelCuidado: itemValue })}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
        </Picker>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Requiere cuidados especiales?</Text>
        <Switch
          value={petData.cuidadosEspeciales}
          onValueChange={(value) => setPetData({ ...petData, cuidadosEspeciales: value })}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Raza:</Text>
        <Picker
          style={styles.picker}
          selectedValue={petData.raza}
          onValueChange={(itemValue) => setPetData({ ...petData, raza: itemValue })}
        >
          <Picker.Item label="Perro" value="perro" />
          <Picker.Item label="Gato" value="gato" />
        </Picker>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Tamaño:</Text>
        <Picker
          style={styles.picker}
          selectedValue={petData.tamanio}
          onValueChange={(itemValue) => setPetData({ ...petData, tamanio: itemValue })}
        >
          <Picker.Item label="Chico" value="chico" />
          <Picker.Item label="Medio" value="medio" />
          <Picker.Item label="Grande" value="grande" />
        </Picker>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Pic:</Text>
        <TextInput
          style={styles.input}
          value={petData.pic}
          onChangeText={(value) => setPetData({ ...petData, pic: value })}
          placeholder="Pic"
        />
      </View>

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
  fieldContainer: {
    marginBottom: 15,
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
  },
  picker: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
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
  goBackButton: {
    backgroundColor: "gray",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  goBackText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterPet;

import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
//https://github.com/AdelRedaa97/react-native-select-dropdown#buttonTextAfterSelection
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BASE_URL } from "@env";

const RegisterPet = ({ navigation }) => {
  const [newPetData, setNewPetData] = useState({
    nombre: "",
    animal: "",
    sexo: "",
    raza: "",
    edad: "",
    nivelCuidado: "",
    cuidadosEspeciales: "",
    tamanio: "",
    descripcion: "",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Publicar una mascota</Text>
      <View style={styles.inputsContainer}>
        <Input
          value={newPetData.nombre}
          setValue={setNewPetData}
          placeholder="Nombre de la Mascota"
          atributo="nombre"
        />
        <Select
          values={["Perro", "Gato"]}
          setValues={(item) => {
            const newData = newPetData;
            newData.animal = item === "Perro" ? 1 : 2;
            setNewPetData(newData);
          }}
          texto={"Selecciona que animal es"}
        />
        <Select
          values={["Macho", "Hembra"]}
          setValues={(item) => {
            const newData = newPetData;
            newData.sexo = item === "Macho" ? 1 : 2;
            setNewPetData(newData);
          }}
          texto={"Selecciona el sexo de la mascota"}
        />
        <Select
          values={["Perro", "Gato"]}
          setValues={(item) => {
            const newData = newPetData;
            newData.edad = item === "Cachorro" ? 1 : item === "Juvenil" ? 2 : 3;
            setNewPetData(newData);
          }}
          texto={"Selecciona la edad de la mascota"}
        />
        <Select
          values={["Raza", "Raza"]}
          //poner la lista de razas
          setValues={(item) => {
            const newData = newPetData;
            newData.raza = item === "Perro" ? 1 : 2;
            setNewPetData(newData);
          }}
          texto={"Selecciona la raza de la mascota"}
        />
        <Select
          values={["Pequeño", "Mediano", "Grande"]}
          setValues={(item) => {
            const newData = newPetData;
            newData.tamanio =
              item === "Pequeño" ? 1 : item === "Mediano" ? 2 : 3;
            setNewPetData(newData);
          }}
          texto={"Selecciona que tan grande es la mascota"}
        />
        <Input
          value={newPetData.descripcion}
          setValue={setNewPetData}
          placeholder="Descripción"
          atributo="descripcion"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 20,
    color: "#9A34EA",
    fontWeight: "bold",
  },
  inputsContainer: {
    width: "100%",
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    gap: 10,
  },
});

export default RegisterPet;

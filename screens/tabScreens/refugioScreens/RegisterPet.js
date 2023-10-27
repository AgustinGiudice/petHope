import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
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
        <Input
          value={newPetData.animal}
          setValue={setNewPetData}
          placeholder="Perro o gato"
          atributo="animal"
        />
        <Select
          values={["Perro", "Gato"]}
          setValue={setNewPetData}
          atributo={"Selecciona tipo de animal"}
        />
        <Input
          value={newPetData.sexo}
          setValue={setNewPetData}
          placeholder="Sexo"
          atributo="sexo"
        />
        <Input
          value={newPetData.edad}
          setValue={setNewPetData}
          placeholder="Edad"
          atributo="edad"
        />
        <Input
          value={newPetData.nivelCuidado}
          setValue={setNewPetData}
          placeholder="Nivel de cuidado??"
          atributo="nivelCuidado"
        />
        <Input
          value={newPetData.cuidadosEspeciales}
          setValue={setNewPetData}
          placeholder="Cuidados Especiales??"
          atributo="cuidadosEspeciales"
        />
        <Input
          value={newPetData.raza}
          setValue={setNewPetData}
          placeholder="Raza"
          atributo="raza"
        />
        <Input
          value={newPetData.tamanio}
          setValue={setNewPetData}
          placeholder="Tamaño"
          atributo="tamanio"
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
    gap: 5,
  },
});

export default RegisterPet;

import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import SelectDropdown from "react-native-select-dropdown";
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
        <Input
          value={newPetData.animal}
          setValue={setNewPetData}
          placeholder="Perro o gato"
          atributo="animal"
        />
        {/* <Select
           values={["Perro", "Gato"]}
           setValue={setNewPetData}
           atributo={"Selecciona tipo de animal"}
         /> */}

        <SelectDropdown
          data={["Perro", "Gato"]}
          buttonStyle={{
            borderColor: "#C69AE8",
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#e3e3e3",
            width: "80%",
          }}
          renderDropdownIcon={() => {
            return (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={25}
                style={{ color: "#C69AE8" }}
              />
            );
          }}
          buttonTextStyle={{
            color: "#9A34EA",
          }}
          defaultButtonText="Selecciona que animal es"
          rowStyle={{
            borderColor: "#9A34EA",
            borderRightWidth: 5,
            borderLeftWidth: 5,
            borderBottomColor: "#9A34EA",
          }}
          rowTextStyle={{ color: "#9A34EA" }}
          selectedRowStyle={{ backgroundColor: "#C69AE8" }}
          selectedRowTextStyle={{ color: "#e3e3e3" }}
          dropdownOverlayColor="#rgba(50,50,50,0.8)"
          dropdownStyle={{ margin: 0 }}
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

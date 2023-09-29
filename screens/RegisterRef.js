import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Constants from "expo-constants";
import RegisterModal from "../components/RegisterModal";
import Input from "../components/Input";

const RegisterRef = ({ navigation }) => {
  const [indexModal, setIndexModal] = useState(0);
  const initialData = {
    nombre: "",
    direccion: "",
    telefono: "",
    mail: "",
    latitud: -34.564979, //coordenadas hardcodeadas para dejar el refugio en devoto... XQ SI
    longitud: -58.454552,
    pass: "",
    repeatPass: "",
  };
  const [refugioData, setRefugioData] = useState(initialData);
  const handleSubmit = () => {
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
        setRefugioData(initialData);
        navigation.navigate("ShowPets");
      })
      .catch((error) => {
        console.error("Error al guardar el refugio:", error);
        // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario si la petición falla
      });
  };

  return (
    <View style={styles.container}>
      <RegisterModal visible={indexModal === 0} setVisible={setIndexModal}>
        <Text>¿Cuál es el nombre del refugio?</Text>
        <Input
          value={refugioData.nombre}
          setValue={setRefugioData}
          placeholder={"Nombre"}
          atributo={"nombre"}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 1} setVisible={setIndexModal}>
        <Text>¿Cuáles son los datos de contacto?</Text>
        <Input
          value={refugioData.telefono}
          setValue={setRefugioData}
          placeholder={"Teléfono"}
          atributo={"telefono"}
        />
        <Input
          value={refugioData.mail}
          setValue={setRefugioData}
          placeholder={"E-mail"}
          atributo={"mail"}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 2} setVisible={setIndexModal}>
        <Text style={styles.title}>Ingresá una contraseña</Text>
        <Input
          value={refugioData.pass}
          setValue={setRefugioData}
          placeholder="Contraseña"
          atributo="pass"
        />
        <Input
          value={refugioData.repeatPass}
          setValue={setRefugioData}
          placeholder="Repetír contraseña"
          atributo="repeatPass"
        />
      </RegisterModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight,
    backgroundColor: "#C69AE8",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterRef;

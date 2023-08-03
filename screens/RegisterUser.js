import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

// import MapView from "react-native-maps";

const CreateUserForm = ({ navigation }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [alertMessage, setAlertMessage] = useState("");
const [isAlertVisible, setIsAlertVisible] = useState(false);

const showAlert = (message) => {
  setAlertMessage(message);
  setIsAlertVisible(true);
};

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
    setLatitude("Waiting..");
    setLongitude("Waiting..");
    if (errorMsg) {
      setLatitude("Ocurrió un error");
      setLongitude("Ocurrió un error");
    } else if (location) {
      setLongitude(location.longitude);
      setLatitude(location.latitude);
    }
  });

  const handleSubmit = () => {
    if (!nombre || !apellido || !telefono || !mail || !pass) {
      showAlert("Por favor, completa todos los campos.");
      return;
    }
    
    // Crear un objeto con los datos del usuario
    const usuarioData = {
      nombre,
      apellido,
      telefono,
      mail,
      pass
    };
    
    // Realizar la petición POST al backend para guardar los datos del usuario
    fetch("http://localhost:3000/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("*********\nRespuesta del backend:", data);
        // Reiniciar los campos del formulario después de guardar los datos
        setNombre('');
        setApellido('');
        setTelefono('');
        setMail('');
        setPass('');

        navigation.navigate("Home"); // Reemplaza "Inicio" con el nombre de tu pantalla de inicio

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
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
      />
      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
        placeholder="Apellido"
      />
      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        placeholder="Teléfono"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={mail}
        onChangeText={setMail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={pass}
        onChangeText={setPass}
        placeholder="Contraseña"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>

      {isAlertVisible && (
      <View style={styles.alert}>
        <Text style={styles.alertText}>{alertMessage}</Text>
        <TouchableOpacity
          style={styles.alertButton}
          onPress={() => setIsAlertVisible(false)}
        >
          <Text style={styles.alertButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    )}

      {/* <View>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        />
        <Text>Latitud : {latitude}</Text>
        <Text>Longitud : {longitude}</Text>
      </View> */}
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
  map: {
    height: 200,
    
  }
});

export default CreateUserForm;

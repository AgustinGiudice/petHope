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
  const initialUserData = {
    nombre: "",
    apellido: "",
    telefono: "",
    mail: "",
    pass: "",
    latitud: null,
    longitud: null,
    espacioDisponible: null,
    aceptaCuidadosEspeciales: false,
  };
  const [userData, setUserData] = useState(initialUserData);
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

      let geolocation = await Location.getCurrentPositionAsync({});
      setLocation(geolocation.coords);
    })();
    if (errorMsg) {
      console.log(errorMsg);
    } else if (location) {
      //console.log(location); //Necesito saber como hacer para que no se ejecute 2 MILLONES DE VECES!!!!!!!!!!!!
      setUserData({
        ...userData,
        latitud: location.latitude,
        longitud: location.longitude,
      });
    }
  }, [location]);

  const handleSubmit = () => {
    if (
      !userData.nombre ||
      !userData.apellido ||
      !userData.telefono ||
      !userData.mail ||
      !userData.pass
    ) {
      showAlert("Por favor, completa todos los campos.");
      return;
    }

    // Realizar la petición POST al backend para guardar los datos del usuario
    fetch("http://localhost:3000/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("*********\nRespuesta del backend:", data);
        // Reiniciar los campos del formulario después de guardar los datos
        setUserData(initialUserData);
        navigation.navigate("ShowPets"); // Reemplaza "Inicio" con el nombre de tu pantalla de inicio
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
        value={userData.nombre}
        onChangeText={(value) => setUserData({ ...userData, nombre: value })}
        placeholder="Nombre"
      />
      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={userData.apellido}
        onChangeText={(value) => setUserData({ ...userData, apellido: value })}
        placeholder="Apellido"
      />
      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        value={userData.telefono}
        onChangeText={(value) => setUserData({ ...userData, telefono: value })}
        placeholder="Teléfono"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={userData.mail}
        onChangeText={(value) => setUserData({ ...userData, mail: value })}
        placeholder="Email"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={userData.pass}
        onChangeText={(value) => setUserData({ ...userData, pass: value })}
        placeholder="Contraseña"
      />

      {location === null ? (
        <TouchableOpacity style={styles.button} disabled>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      )}

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
      {/* 
       <View>
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
      </View>  */}
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
  },
});

export default CreateUserForm;

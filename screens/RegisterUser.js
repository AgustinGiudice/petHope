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
import MapView, { Marker } from "react-native-maps";
import RegisterModal from "../components/RegisterModal";
import Input from "../components/Input";
import Radio from "../components/Radio";

const CreateUserForm = ({ navigation }) => {
  const initialUserData = {
    nombre: "",
    apellido: "",
    telefono: "",
    mail: "",
    pass: "",
    latitud: -34.4634938947938,
    longitud: -58.527161947963336,
    espacioDisponible: null,
    aceptaCuidadosEspeciales: false,
  };
  const [userData, setUserData] = useState(initialUserData);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [indexModal, setIndexModal] = useState(0);

  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertVisible(true);
  };

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      // Configura la región inicial
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

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
    } else {
      // Realizar la petición POST al backend para guardar los datos del usuario
      fetch("https://mascotas-back-31adf188c4e6.herokuapp.com/api/usuarios", {
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
          navigation.navigate("Login"); // Reemplaza "Inicio" con el nombre de tu pantalla de inicio
        })
        .catch((error) => {
          console.error("Error al guardar el usuario:", error);
          console.log(userData);
          // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario si la petición falla
        });
    }
  };

  return (
    <View style={styles.container}>
      <RegisterModal visible={indexModal === 0} setVisible={setIndexModal}>
        <Text style={styles.title}>¡Bienvenido!</Text>
      </RegisterModal>
      <RegisterModal visible={indexModal === 1} setVisible={setIndexModal}>
        <Text style={styles.title}>¿Cómo te llamas?</Text>
        <Input
          value={userData.nombre}
          setValue={setUserData}
          placeholder="Nombre"
          atributo="nombre"
        />

        <Input
          value={userData.apellido}
          setValue={setUserData}
          placeholder="Apellido"
          atributo="apellido"
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 2} setVisible={setIndexModal}>
        <Text style={styles.title}>Decinos cual es tu E-mail</Text>
        <Input
          value={userData.mail}
          setValue={setUserData}
          placeholder="E-mail"
          atributo="mail"
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 3} setVisible={setIndexModal}>
        <Text style={styles.title}>¿Cómo es el lugar donde vivís actualmente?</Text>
        <Radio data={["Monoambiente", "Departamento", "Casa"]} />
      </RegisterModal>
      <RegisterModal visible={indexModal === 4} setVisible={setIndexModal}>
        <Text style={styles.title}>¿Cuál es tu ocupación?</Text>
        <Radio data={["Desocupado", "Estudiante", "Trabajador/a", "Estudiante y trabajador/a"]} />
      </RegisterModal>
      {/* <TouchableOpacity
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

      {location && (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Mi Ubicación"
            description="Estoy aquí"
            draggable
          />
        </MapView>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: "#A5D4FF",
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  goBackText: {
    color: "blue",
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

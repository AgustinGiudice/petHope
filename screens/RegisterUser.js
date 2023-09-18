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
    repeatPass: "",
    latitud: -34.4634938947938,
    longitud: -58.527161947963336,
    espacioDisponible: null,
    aceptaCuidadosEspeciales: false,
    tipoAnimal: null,
    edadPreferida: null,
    tamanioPreferido: null,
    tieneNinios: null,
    tieneMascotas: null,
    tuvoMascotas: null,
  };
  const [userData, setUserData] = useState(initialUserData);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [indexModal, setIndexModal] = useState(1);

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
        // Reiniciar los campos del formulario después de guardar los datos
        setUserData(initialUserData);
        navigation.navigate("Tabs"); // Reemplaza "Inicio" con el nombre de tu pantalla de inicio
      })
      .catch((error) => {
        console.error("Error al guardar el usuario:", error);
        console.log(userData);
        // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario si la petición falla
      });
  };

  return (
    <View style={styles.container}>
      {/* <RegisterModal visible={indexModal === 0} setVisible={setIndexModal}>
        <Text style={styles.title}>¡Bienvenido!</Text>
      </RegisterModal> */}
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
        <Text style={styles.title}>Ingresá una contraseña</Text>
        <Input
          value={userData.pass}
          setValue={setUserData}
          placeholder="Contraseña"
          atributo="pass"
        />
        <Input
          value={userData.repeatPass}
          setValue={setUserData}
          placeholder="Repetír contraseña"
          atributo="repeatPass"
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 4} setVisible={setIndexModal}>
        <View style={styles.warningContainer} key={99}>
          <Text style={styles.title}>
            A continuación te haremos unas preguntas que nos van a permitir
            encontrar las mascotas ideales para vos
          </Text>
          <Text style={styles.warning}>
            ¡Tené en cuenta que, hasta que no contestes estas preguntas no vas a
            poder ver mascotas!
          </Text>
        </View>
      </RegisterModal>
      <RegisterModal visible={indexModal === 5} setVisible={setIndexModal}>
        <Text style={styles.title}>
          ¿Cómo es el lugar donde vivís actualmente?
        </Text>
        <Radio
          data={["Monoambiente", "Departamento", "Casa"]}
          handleSelect={() => console.log()}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 6} setVisible={setIndexModal}>
        <Text style={styles.title}>¿Cuál es tu ocupación?</Text>
        <Radio
          data={[
            "Desocupado/a",
            "Estudiante",
            "Trabajador/a",
            "Estudiante y Trabajador/a",
          ]}
          handleSelect={(value) => {
            console.log(value);
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 7} setVisible={setIndexModal}>
        <Text style={styles.title}>
          ¿Tiene experiencia previa con mascotas?
        </Text>
        <Radio
          data={["Si", "No"]}
          handleSelect={(value) => {
            const formatedValue = value === "No" ? false : true;
            setUserData({
              ...userData,
              ...(userData.tuvoMascotas = formatedValue),
            });
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 8} setVisible={setIndexModal}>
        <Text style={styles.title}>
          ¿Tiene alguna preferencia por un tipo de Animal?
        </Text>
        <Radio
          data={["Perro", "Gato", "Indiferente"]}
          handleSelect={(value) => {
            const formatedValue =
              value === "Perro" ? 1 : value === "Gato" ? 2 : 3;
            setUserData({
              ...userData,
              ...(userData.tipoAnimal = formatedValue),
            });
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 9} setVisible={setIndexModal}>
        <Text style={styles.title}>
          ¿Tiene alguna preferencia de edad para la mascota?
        </Text>
        <Radio
          data={["Cachorro", "Juvenil", "Adulto", "Indistinto"]}
          handleSelect={(value) => {
            const formatedValue =
              value === "Cachorro"
                ? 1
                : value === "Juvenil"
                ? 2
                : value === "Adulto"
                ? 3
                : 4;
            setUserData({
              ...userData,
              ...(userData.edadPreferida = formatedValue),
            });
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 10} setVisible={setIndexModal}>
        <Text style={styles.title}>
          ¿Tiene alguna preferencia de tamaño para la mascota?
        </Text>
        <Radio
          data={["Pequeño", "Mediano", "Grande", "Indistinto"]}
          handleSelect={(value) => {
            const formatedValue =
              value === "Pequeño"
                ? 1
                : value === "Mediano"
                ? 2
                : value === "Grande"
                ? 3
                : 4;
            setUserData({
              ...userData,
              ...(userData.tamanioPreferido = formatedValue),
            });
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 11} setVisible={setIndexModal}>
        <Text style={styles.title}>¿Tiene niños en casa?</Text>
        <Radio
          data={[
            "No",
            "Si, Menores de 5 años",
            "Si, entre 12 y 15 años",
            "Si, mayores de 15 años",
          ]}
          handleSelect={(value) => {
            const formatedValue =
              value === "No"
                ? 1
                : value === "Si, Menores de 5 años"
                ? 2
                : value === "Si, entre 12 y 15 años"
                ? 3
                : 4;
            setUserData({
              ...userData,
              ...(userData.tieneNinios = formatedValue),
            });
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 12} setVisible={setIndexModal}>
        <Text style={styles.title}>¿Tiene otras mascotas en casa?</Text>
        <Radio
          data={["Si", "No"]}
          handleSelect={(value) => {
            const formatedValue = value === "No" ? false : true;
            setUserData({
              ...userData,
              ...(userData.tieneMascotas = formatedValue),
            });
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 13} setVisible={setIndexModal}>
        <Text style={styles.title}>
          ¿Está dispuesto a adoptar una mascota con necesidades especiales o
          problemas de salud?
        </Text>
        <Radio
          data={["Si", "No"]}
          handleSelect={(value) => {
            const formatedValue = value === "No" ? false : true;
            setUserData({
              ...userData,
              ...(userData.aceptaCuidadosEspeciales = formatedValue),
            });
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 14} setVisible={setIndexModal}>
        <View key={33} style={styles.lastContainer}>
          <Text style={styles.title}>
            ¡Muchas gracias por contestar las preguntas!
          </Text>
          <Text>Ya podes encontrar tu mascota soñada</Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.start}>Empezar</Text>
          </TouchableOpacity>
        </View>
      </RegisterModal>
      {/* {location && (
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
    backgroundColor: "#C69AE8",
    flex: 1,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
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
  lastContainer: {
    gap: 20,
    alignItems: "center",
  },
  start: {
    backgroundColor: "#9A34EA",
    width: 150,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    color: "white",
  },
});

export default CreateUserForm;

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RegisterModal from "../components/RegisterModal";
import Input from "../components/Input";
import MapView, { Marker } from "react-native-maps";
import LoadingComponent from "../components/LoadingComponent";
import * as Location from "expo-location";
import { COLORS } from "../styles";

const RegisterRef = ({ navigation }) => {
  const [indexModal, setIndexModal] = useState(0);
  const initialData = {
    nombre: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    telefono: "",
    mail: "",
    latitud: null, //coordenadas hardcodeadas para dejar el refugio en devoto... XQ SI
    longitud: null,
    pass: "",
    repeatPass: "",
    descripcion: "agregar Descripcion",
    facebook: "facebook.com",
    instagram: "instagram.com",
    web: "web.com",
    linkDonacion: "paypal.com",
  };
  const [refugioData, setRefugioData] = useState(initialData);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00322,
    longitudeDelta: 0.00021,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      // Configura la región inicial
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      const newData = refugioData;
      newData.latitud = location.coords.latitude;
      newData.longitud = location.coords.longitude;
      setRefugioData(newData);
      setIsLoading(false);
    })();
  }, []);

  const handleNext = async (value) => {
    setError([]);
    if (value === null) {
      setError(["Selecciona una opción"]);
    } else {
      setIndexModal(indexModal + 1);
    }
  };


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
        navigation.navigate("Tabs");
      })
      .catch((error) => {
        console.error("Error al guardar el refugio:", error);
      });
  };

  if (isLoading) {
    <LoadingComponent />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a PetHope!</Text>
      <Text>Queremos que nos cuentes de vos</Text>
      <FontAwesome
        name="arrow-right"
        size={40}
        style={styles.arrow}
        onPress={() => handleNext()}
      />
      <RegisterModal
        visible={indexModal === 1}
        setVisible={setIndexModal}
        setError={setError}
      >
        <Text>¿Cuál es el nombre del refugio?</Text>
        <Input
          value={refugioData.nombre}
          setValue={setRefugioData}
          placeholder={"Nombre"}
          atributo={"nombre"}
        />
      </RegisterModal>
      <RegisterModal
        visible={indexModal === 2}
        setVisible={setIndexModal}
        setError={setError}
      >
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
      <RegisterModal
        visible={indexModal === 3}
        setVisible={setIndexModal}
        setError={setError}
      >
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
      <RegisterModal
        visible={indexModal === 4}
        setVisible={setIndexModal}
        setError={setError}
      >
        <Text style={styles.title}>Por último</Text>
        <Text style={styles.title}>Te pedimos tu dirección</Text>
        <Input
          value={refugioData.direccion}
          setValue={setRefugioData}
          placeholder="Dirección"
          atributo="direccion"
        />
        <Input
          value={refugioData.ciudad}
          setValue={setRefugioData}
          placeholder="Ciudad"
          atributo="ciudad"
        />
        <Input
          value={refugioData.provincia}
          setValue={setRefugioData}
          placeholder="provincia"
          atributo="provincia"
        />
      </RegisterModal>
      <RegisterModal
        visible={indexModal === 5}
        setVisible={setIndexModal}
        setError={setError}
      >
        <Text style={styles.title}>
          Mové el cursor hasta que coincida con tu ubicación
        </Text>
        <MapView style={styles.map} region={region}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Mi Ubicación"
            description="Estoy aquí"
            draggable
            onDragEnd={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              const newData = refugioData;
              newData.latitud = latitude;
              newData.longitud = longitude;
              setRefugioData(newData);
              setRegion({ ...region, latitude, longitude });
            }}
          />
        </MapView>
      </RegisterModal>
      <RegisterModal
        visible={indexModal === 6}
        setVisible={setIndexModal}
        setError={setError}
      >
        <View key={33} style={styles.lastContainer}>
          <Text style={styles.title}>
            ¡Muchas gracias por contestar las preguntas!
          </Text>
          <Text>Ya podés empezar a cambiarle la vida a un animalito</Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.start}>Empezar</Text>
          </TouchableOpacity>
        </View>
      </RegisterModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS[400],
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS[50],
  },
  map: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 10,
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
  arrow: {
    color: "white",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default RegisterRef;

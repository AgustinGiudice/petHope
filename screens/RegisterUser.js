import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import RegisterModal from "../components/RegisterModal";
import Input from "../components/Input";
import Radio from "../components/Radio";
import LoadingComponent from "../components/LoadingComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const CreateUserForm = ({ navigation, route }) => {
  const { currentUser } = useContext(UserContext);
  const { index } = route.params;
  const initialUserData = {
    nombre: "",
    apellido: "",
    telefono: null,
    mail: "",
    pass: "",
    repeatPass: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    latitud: null,
    longitud: null,
    espacioDisponible: null,
    aceptaCuidadosEspeciales: false,
    tipoAnimal: null,
    edadPreferida: null,
    tamanioPreferido: null,
    tieneNinios: null,
    tieneMascotas: null,
    tuvoMascotas: null,
    descripcion: null,
    fechaDeNacimiento: null, //Después crear un date selector
  };
  const { setCurrentUser } = useContext(UserContext);
  const [userData, setUserData] = useState(currentUser || initialUserData);
  const [errorMsg, setErrorMsg] = useState(null);
  const [indexModal, setIndexModal] = useState(index || 1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00322,
    longitudeDelta: 0.00021,
  });
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      // Configura la región inicial
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      const newData = userData;
      newData.latitud = region.latitude;
      newData.longitud = region.longitude;
      setUserData(newData);
      setIsLoading(false);
    })();
  }, []);
  const handleActualizarDatos = async () => {
    setIsLoading(true);
    const cache = await AsyncStorage.getItem("token");
    console.log(cache.token);

    fetch(
      `https://mascotas-back-31adf188c4e6.herokuapp.com/api/usuarios/edit/${userData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cache.token}`,
        },
        body: JSON.stringify(userData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.usuario.profilePic && data.usuario.tuvoMascotas
          ? (data.usuario.completado = 100)
          : data.usuario.profilePic || data.usuario.tuvoMascotas
          ? (data.usuario.completado = 66)
          : (data.usuario.completado = 33);

        // actualizar el usuario en el contexto
        setCurrentUser(data.usuario);

        navigation.navigate("Tabs");
      })
      .catch((error) => {
        console.error("Error actualizando la información:", error);
        setErrorMsg("Error al actualizar la información");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleLogin = () => {
    fetch(
      "https://mascotas-back-31adf188c4e6.herokuapp.com/api/usuarios/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Response del login", data);
        if (data.token && data.usuario) {
          data.usuario.imagen && data.usuario.tuvoMascotas
            ? (data.usuario.completado = 100)
            : data.usuario.imagen || data.usuario.tuvoMascotas
            ? (data.usuario.completado = 66)
            : (data.usuario.completado = 33);
          const data_user = {
            token: data.token,
            usuario: data.usuario,
            matches: data.matches,
          };
          AsyncStorage.setItem("token", JSON.stringify(data_user))
            .then(() => {
              console.log("Token guardado correctamente:", data.token);
              return AsyncStorage.getItem("token"); // Recuperar el token
            })
            .then((storedToken) => {
              console.log("Token almacenado en AsyncStorage:", storedToken); //mostrar token en async storage
              const { usuario, token } = data;
              setCurrentUser(usuario);
              //clean state
              setUserData(initialUserData);

              navigation.navigate("Tabs", { usuario, token });
            })
            .finally(() => {
              setLoadingFetch(false);
            });
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
      });
  };
  const handleSubmit = () => {
    //Realizar la petición POST al backend para guardar los datos del usuario
    setLoadingFetch(true);
    console.log("Datos del usuario enviados", userData);
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
        console.log("Respuesta del back", data);
        if (!index) {
          handleLogin();
        }
      })
      .catch((error) => {
        console.error("Error al guardar el usuario:", error);
        console.log(userData);
        // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario si la petición falla
      })
      .finally(setLoadingFetch(false));
  };
  if (isLoading) {
    <LoadingComponent />;
  }
  return (
    <View style={styles.container}>
      <RegisterModal visible={indexModal === 1} setVisible={setIndexModal}>
        <Text style={styles.title}>¡Bienvenido a PetHope!</Text>
        <Text>Queremos que nos cuentes de vos</Text>
      </RegisterModal>
      <RegisterModal visible={indexModal === 2} setVisible={setIndexModal}>
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
      <RegisterModal visible={indexModal === 3} setVisible={setIndexModal}>
        <Text style={styles.title}>Decinos cual es tu E-mail</Text>
        <Input
          value={userData.mail}
          setValue={setUserData}
          placeholder="E-mail"
          atributo="mail"
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 5} setVisible={setIndexModal}>
        <Text style={styles.title}>
          Contanos un poco mas de vos en una breve descripcion! &#40; Opcional
          &#41;{" "}
        </Text>
        <Input
          value={userData.descripcion}
          setValue={setUserData}
          placeholder="Descripcion"
          atributo="descripcion"
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 4} setVisible={setIndexModal}>
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

      <RegisterModal visible={indexModal === 6} setVisible={setIndexModal}>
        <Text style={styles.title}>Ingresá tu dirección</Text>
        <Input
          value={userData.direccion}
          setValue={setUserData}
          atributo={"direccion"}
          placeholder={"Dirección"}
        />
        <Input
          value={userData.ciudad}
          setValue={setUserData}
          atributo={"ciudad"}
          placeholder={"Ciudad"}
        />
        <Input
          value={userData.provincia}
          setValue={setUserData}
          atributo={"provincia"}
          placeholder={"Provincia"}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 7} setVisible={setIndexModal}>
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
              setRegion({ ...region, latitude, longitude });
              const newData = userData;
              newData.latitud = latitude;
              newData.longitud = longitude;
              setUserData(newData);
            }}
          />
        </MapView>
      </RegisterModal>
      <RegisterModal visible={indexModal === 8} setVisible={setIndexModal}>
        <Text style={styles.title}>Decinos cual es tu teléfono</Text>
        <Input
          value={userData.telefono}
          setValue={setUserData}
          placeholder="Teléfono"
          atributo="telefono"
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 9} setVisible={setIndexModal}>
        <Text style={styles.title}>Decinos cual es tu Fecha de nacimiento</Text>
        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            display="spinner"
            onChange={(event, selectedDate) => {
              if (event.type === "set") {
                const newData = userData;
                currentDate = selectedDate || date;
                newData.fechaDeNacimiento = currentDate;
                console.log(currentDate);
                setDate(currentDate);
                setUserData(newData);
                setFormattedDate(
                  format(currentDate, "dd 'de' MMMM 'de' yyyy", { locale: es })
                );
              }
              setShowDatePicker(false);
            }}
            minDate={new Date("1900-01-01")}
            maxDate={new Date()}
          />
        )}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          value={date || ""}
          placeholder={"fecha"}
        >
          <Text style={{ color: "#9A34EA", fontWeight: "bold" }}>
            {date ? formattedDate : "Elegir fecha"}
          </Text>
        </TouchableOpacity>
      </RegisterModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C69AE8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastContainer: {
    gap: 20,
    alignItems: "center",
  },
  botonStart: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
  },
  start: {
    backgroundColor: "#9A34EA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    color: "white",
  },
  map: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 10,
  },
});

export default CreateUserForm;

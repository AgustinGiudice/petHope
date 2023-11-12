import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import RegisterModal from "../components/RegisterModal";
import Input from "../components/Input";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LoadingComponent from "../components/LoadingComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { TokenContext } from "../context/TokenContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { registrarUsuario } from "../services/registrarUsuario";
import { login } from "../services/logIn";

const CreateUserForm = ({ navigation }) => {
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
    fechaDeNacimiento: null,
  };
  const { setCurrentUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);
  const [userData, setUserData] = useState(initialUserData);
  const [error, setError] = useState([]);
  const [indexModal, setIndexModal] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00322,
    longitudeDelta: 0.00021,
  });
  const [formattedDate, setFormattedDate] = useState(null);

  const handleNext = async (values) => {
    let hasEmptyValues = false;
    let passMatch = true;
    let pass = "";
    setError([]);

    if (values) {
      values.forEach((campo) => {
        if (
          (campo.valor === "" && campo.nombre !== "Descripción") ||
          (!campo.valor && campo.nombre !== "Descripción")
        ) {
          if (campo.nombre === "Fecha de Nacimiento") {
            setError((prev) => [...prev, `Elegí tu fecha de nacimiento`]);
          } else {
            setError((prev) => [
              ...prev,
              `Completar el campo de ${campo.nombre}`,
            ]);
          }
          hasEmptyValues = true;
        }
        if (
          campo.nombre === "Contraseña" ||
          campo.nombre === "Repetir contraseña"
        ) {
          if (pass === "") {
            pass = campo.valor;
          } else if (pass !== campo.valor) {
            setError((prev) => [...prev, `Las contraseñas no coinciden`]);
            passMatch = false;
          }
        }
      });
    }
    if (!hasEmptyValues && passMatch) {
      if (indexModal === 9) {
        setIsLoading(true);
        await registrarUsuario(userData);
        await handleLogin();
        navigation.navigate("CuestionarioUsuario");
      } else {
        setIndexModal(indexModal + 1);
      }
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Se negaron los permisos de localización");
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
            });
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
      });
  };
  if (isLoading) {
    <LoadingComponent />;
  }
  return (
    <View style={styles.container}>
      <RegisterModal visible={indexModal === 1} setVisible={setIndexModal}>
        <Text style={styles.title}>¡Bienvenido a PetHope!</Text>
        <Text>Queremos que nos cuentes de vos</Text>
        <FontAwesome
          name="arrow-right"
          size={40}
          style={styles.arrow}
          onPress={() => handleNext()}
        />
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
        {error.length !== 0
          ? error.map((e) => {
              return (
                <Text key={e} style={{ color: "red" }}>
                  {e}
                </Text>
              );
            })
          : null}
        <FontAwesome
          name="arrow-right"
          size={40}
          style={styles.arrow}
          onPress={() =>
            handleNext([
              { nombre: "Nombre", valor: userData.nombre },
              { nombre: "Apellido", valor: userData.apellido },
            ])
          }
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
        {error.length !== 0
          ? error.map((e) => {
              return (
                <Text key={e} style={{ color: "red" }}>
                  {e}
                </Text>
              );
            })
          : null}
        <FontAwesome
          name="arrow-right"
          size={40}
          style={styles.arrow}
          onPress={() =>
            handleNext([{ nombre: "E-mail", valor: userData.mail }])
          }
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
        {error.length !== 0
          ? error.map((e) => {
              return (
                <Text key={e} style={{ color: "red" }}>
                  {e}
                </Text>
              );
            })
          : null}
        <FontAwesome
          name="arrow-right"
          size={40}
          style={styles.arrow}
          onPress={() =>
            handleNext([
              { nombre: "Contraseña", valor: userData.pass },
              { nombre: "Repetir contraseña", valor: userData.repeatPass },
            ])
          }
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
        {error.length !== 0
          ? error.map((e) => {
              return (
                <Text key={e} style={{ color: "red" }}>
                  {e}
                </Text>
              );
            })
          : null}
        <FontAwesome
          name="arrow-right"
          size={40}
          style={styles.arrow}
          onPress={() =>
            handleNext([{ nombre: "Descripción", valor: userData.descripcion }])
          }
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
        {error.length !== 0
          ? error.map((e) => {
              return (
                <Text key={e} style={{ color: "red" }}>
                  {e}
                </Text>
              );
            })
          : null}
        <FontAwesome
          name="arrow-right"
          size={40}
          style={styles.arrow}
          onPress={() =>
            handleNext([
              { nombre: "Dirección", valor: userData.direccion },
              { nombre: "Ciudad", valor: userData.ciudad },
              { nombre: "Provincia", valor: userData.provincia },
            ])
          }
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
        <FontAwesome
          name="arrow-right"
          size={40}
          style={styles.arrow}
          onPress={() => handleNext()}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 8} setVisible={setIndexModal}>
        <Text style={styles.title}>Decinos cual es tu teléfono</Text>
        <Input
          value={userData.telefono}
          setValue={setUserData}
          placeholder="Teléfono"
          atributo="telefono"
        />
        {error.length !== 0
          ? error.map((e) => {
              return (
                <Text key={e} style={{ color: "red" }}>
                  {e}
                </Text>
              );
            })
          : null}
        <FontAwesome
          name="arrow-right"
          size={40}
          style={styles.arrow}
          onPress={() =>
            handleNext([{ nombre: "Teléfono", valor: userData.telefono }])
          }
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
        {error.length !== 0
          ? error.map((e) => {
              return (
                <Text key={e} style={{ color: "red" }}>
                  {e}
                </Text>
              );
            })
          : null}
        <FontAwesome
          name="arrow-right"
          size={40}
          style={styles.arrow}
          onPress={() =>
            handleNext([
              {
                nombre: "Fecha de Nacimiento",
                valor: userData.fechaDeNacimiento,
              },
            ])
          }
        />
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
  arrow: {
    color: "white",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default CreateUserForm;

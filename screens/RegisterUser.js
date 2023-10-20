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
// import DatePicker from "react-native-datepicker";
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
        if (data.token && data.usuario) {
          data.usuario.profilePic && data.usuario.tuvoMascotas
            ? (data.usuario.completado = 100)
            : data.usuario.profilePic || data.usuario.tuvoMascotas
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
        console.log("hasta aca llega", data);
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
      <RegisterModal visible={indexModal === 10} setVisible={setIndexModal}>
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
      <RegisterModal visible={indexModal === 11} setVisible={setIndexModal}>
        <Text style={styles.title}>
          ¿Cómo es el lugar donde vivís actualmente?
        </Text>
        <Radio
          data={["Monoambiente", "Departamento", "Casa"]}
          handleSelect={() => console.log()}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 12} setVisible={setIndexModal}>
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
      <RegisterModal visible={indexModal === 13} setVisible={setIndexModal}>
        <Text style={styles.title}>
          ¿Tiene experiencia previa con mascotas?
        </Text>
        <Radio
          data={["Si", "No"]}
          handleSelect={(value) => {
            const formatedValue = value === "No" ? false : true;
            const newData = userData;
            userData.tuvoMascotas = formatedValue;
            setUserData(newData);
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 14} setVisible={setIndexModal}>
        <Text style={styles.title}>
          ¿Tiene alguna preferencia por un tipo de Animal?
        </Text>
        <Radio
          data={["Perro", "Gato", "Indiferente"]}
          handleSelect={(value) => {
            const formatedValue =
              value === "Perro" ? 1 : value === "Gato" ? 2 : 3;
            const newData = userData;
            userData.tipoAnimal = formatedValue;
            setUserData(newData);
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 15} setVisible={setIndexModal}>
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
            const newData = userData;
            userData.edadPreferida = formatedValue;
            setUserData(newData);
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 16} setVisible={setIndexModal}>
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
            const newData = userData;
            userData.tamanioPreferido = formatedValue;
            setUserData(newData);
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 17} setVisible={setIndexModal}>
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
            const newData = userData;
            userData.tieneNinios = formatedValue;
            setUserData(newData);
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 18} setVisible={setIndexModal}>
        <Text style={styles.title}>¿Tiene otras mascotas en casa?</Text>
        <Radio
          data={["Si", "No"]}
          handleSelect={(value) => {
            const formatedValue = value === "No" ? false : true;
            const newData = userData;
            userData.tieneMascotas = formatedValue;
            setUserData(newData);
          }}
        />
      </RegisterModal>
      <RegisterModal visible={indexModal === 19} setVisible={setIndexModal}>
        <Text style={styles.title}>
          ¿Está dispuesto a adoptar una mascota con necesidades especiales o
          problemas de salud?
        </Text>
        <Radio
          data={["Si", "No"]}
          handleSelect={(value) => {
            const formatedValue = value === "No" ? false : true;
            const newData = userData;
            userData.aceptaCuidadosEspeciales = formatedValue;
            setUserData(newData);
          }}
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
      <RegisterModal visible={indexModal === 20} setVisible={setIndexModal}>
        <View key={33} style={styles.lastContainer}>
          <Text style={styles.title}>
            ¡Muchas gracias por contestar las preguntas!
          </Text>
          {console.log(userData)}
          <Text>Ya podes encontrar tu mascota soñada</Text>
          <TouchableOpacity
            onPress={index ? handleActualizarDatos : handleSubmit}
          >
            {loadingFetch ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text style={styles.start}>Empezar</Text>
            )}
          </TouchableOpacity>
        </View>
      </RegisterModal>
      <RegisterModal visible={indexModal === 21} setVisible={setIndexModal}>
        <View key={33} style={styles.lastContainer}>
          {!index ? (
            <>
              <Text style={styles.title}>¡Muchas gracias!</Text>
              <Text>Ya podes continuar</Text>
              <Text>
                Acordate que, hasta que no completes el formulario, no vas a ver
                mascotas
              </Text>
              <TouchableOpacity onPress={handleSubmit} style={styles.start}>
                {loadingFetch ? (
                  <ActivityIndicator color={"white"} />
                ) : (
                  <Text style={{ color: "white" }}>Continuar</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text>
                Te pedimos que llenes el formulario a la brevedad para poder
                disfrutar todas las funcionalidades de PetHope
              </Text>
              <TouchableOpacity
                style={styles.start}
                onPress={() => navigation.navigate("Tabs")}
              >
                <Text style={{ color: "white" }}>Volver</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
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
  start: {
    backgroundColor: "#9A34EA",
    width: 150,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  map: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 10,
  },
});

export default CreateUserForm;

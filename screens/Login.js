import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import Input from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";

const LoginScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({ email: "", pass: "" });
  const [error, setError] = useState(""); // Estado para el mensaje de error

  const { setCurrentUser } = useContext(UserContext);

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
          const data_user = {
            token: data.token,
            usuario: data.usuario,
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
              navigation.navigate("Tabs", { usuario, token });
            });
        } else {
          setError("Inicio de sesión fallido"); // Establecer mensaje de error
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
      });
  };
  useEffect(() => {
    var token = AsyncStorage.getItem("token");
    console.log(token);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.inputsContainer}>
        <Input
          value={userData.email}
          setValue={setUserData}
          placeholder="E-mail"
          atributo="email"
        />
        <Input
          value={userData.pass}
          setValue={setUserData}
          placeholder="Contraseña"
          atributo="pass"
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={{ color: "white" }}>Ingresar</Text>
      </TouchableOpacity>

      <Text
        style={styles.registerTextContainer}
        onPress={() => navigation.navigate("RegisterChoice")}
      >
        <Text style={styles.registerText}>¿No tenes cuenta? Registrate!</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C69AE8",
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9A34EA",
  },
  inputsContainer: {
    width: "100%",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#9A34EA",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  registerTextContainer: {
    borderTopWidth: 1,
    borderBottomColor: "black",
    paddingTop: 20,
  },
  registerText: {
    color: "black",
    fontSize: 12,
  },
});

export default LoginScreen;

import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Input from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { TokenContext } from "../context/TokenContext";
import { login } from "../services/logIn";

const LoginScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({ mail: "", pass: "" });
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const { setCurrentUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);
  const [isRefugio, setIsRefugio] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await login(
      userData,
      setUserData,
      isRefugio,
      setToken,
      setCurrentUser,
      setError,
      navigation
    );
    setIsLoading(false);
  };

  useEffect(() => {
    const token = AsyncStorage.getItem("token");
    console.log(token);
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      {/* LOGUEARSE COMO USUARIO O REFUGIO */}
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setIsRefugio(!isRefugio)}
      >
        <Text style={{ color: "black" }}>
          {isRefugio
            ? "Iniciar sesión como Usuario Normal"
            : "Iniciar sesión como Refugio"}
        </Text>
      </TouchableOpacity>

      <View style={styles.inputsContainer}>
        <Input
          value={userData.mail}
          setValue={setUserData}
          placeholder="E-mail"
          atributo="mail"
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
        {isLoading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text style={{ color: "white" }}>Ingresar</Text>
        )}
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

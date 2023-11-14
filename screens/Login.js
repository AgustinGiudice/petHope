import { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import Input from "../components/Input";
import { UserContext } from "../context/UserContext";
import { TokenContext } from "../context/TokenContext";
import { login } from "../services/logIn";
import logo from "../assets/logo4.png";

const LoginScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({ mail: "", pass: "" });
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const { setCurrentUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    await login(
      userData,
      setUserData,
      setToken,
      setCurrentUser,
      setError,
      navigation
    );
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.main}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C69AE8",
  },
  main: {
    backgroundColor: "#eee",
    width: "80%",
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  logo: {
    aspectRatio: 1,
    height: "15%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#eee",
    padding: 30,
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
  errorText: {
    color: "red",
  },
});

export default LoginScreen;

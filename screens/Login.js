import { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Keyboard,
} from "react-native";
import Input from "../components/Input";
import { UserContext } from "../context/UserContext";
import { TokenContext } from "../context/TokenContext";
import { login } from "../services/logIn";
import logo from "../assets/logo4.png";
import { COLORS } from "../styles";

const LoginScreen = ({ navigation }) => {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardIsOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardIsOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
      {!keyboardIsOpen && <Image source={logo} style={styles.logo} />}
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

        <TouchableOpacity onPress={() => navigation.navigate("RegisterChoice")}>
          <Text style={styles.registerText}>¿No tenes cuenta? Registrate!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS[400],
  },
  main: {
    backgroundColor: COLORS[50],
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
    color: COLORS[50],
    padding: 30,
  },
  inputsContainer: {
    width: "100%",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: COLORS[600],
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  registerText: {
    color: COLORS[950],
    fontSize: 12,
  },
  errorText: {
    color: "red",
  },
});

export default LoginScreen;

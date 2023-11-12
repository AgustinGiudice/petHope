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
    setError("");
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
    setError("");
  }, [isRefugio]);
  useEffect(() => {
    const token = AsyncStorage.getItem("token");
    console.log(token);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.tabContainer}>
        <View style={[styles.tab, isRefugio ? null : styles.tabActive]}>
          <TouchableOpacity onPress={() => setIsRefugio(false)}>
            <Text>Cliente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.tab, isRefugio ? styles.tabActive : null]}>
          <TouchableOpacity onPress={() => setIsRefugio(true)}>
            <Text>Refugio</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    backgroundColor: "#9A34EA",
  },
  tabContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ddd",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: "#9A34EA",
    borderBottomWidth: 1,
    flex: 1,
  },
  tabActive: {
    borderBottomWidth: 0,
    backgroundColor: "#eee",
  },
  main: {
    backgroundColor: "#eee",
    width: "80%",
    aspectRatio: 1,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
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

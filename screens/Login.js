import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const handleLogin = () => {
    const loginData = {
      email,
      pass,
    };

    fetch("https://mascotas-back-31adf188c4e6.herokuapp.com/api/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.token) {
          const { usuario, token } = data;
          navigation.navigate('Home', { usuario, token });
        } else {
          setError("Inicio de sesión fallido"); // Establecer mensaje de error
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
      });
  };

 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={pass}
        onChangeText={setPass}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.registerButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.registerTextContainer}>
        <Text style={styles.registerText}>¿No tenes cuenta? Registrate!</Text>
      </Text>
      <View style={styles.registerButtonsContainer}>
        <TouchableOpacity style={styles.registerButton}>
          <Button
            title="Registrarme como Usuario"
            onPress={() => navigation.navigate("RegisterUser")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton}>
          <Button
            title="Registrarme como Refugio"
            onPress={() => navigation.navigate("RegisterRef")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton}>
          <Button
            title="Mandame al main"
            onPress={() => navigation.navigate("ShowPets")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton}>
          <Button
            title="Agregar Mascota"
            onPress={() => navigation.navigate("Pet")}
          />
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "black",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginBottom: 25,
  },
  registerTextContainer: {
    marginBottom: 20,
    borderTopWidth: 1,
    borderBottomColor: "black",
    paddingTop: 20,
  },
  registerText: {
    color: "black",
    fontSize: 16,
  },
  registerButtonsContainer: {
    flexDirection: "column",
    gap: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;

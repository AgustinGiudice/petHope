import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={pass}
        onChangeText={setPass}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.registerButtonText}>Iniciar Sesion</Text>
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
            onPress={() => navigation.navigate("Matchs")}
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

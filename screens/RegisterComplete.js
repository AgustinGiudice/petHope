import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../styles";
import logo from "../assets/logo4.png";

const RegisterComplete = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¡Muchas Gracias!</Text>
      <Text style={styles.texto}>
        Te enviamos un correo para que verifiques tu cuenta
      </Text>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen")}
        style={styles.linkContainer}
      >
        <Text style={styles.link}>Volver al inicio</Text>
      </TouchableOpacity>
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
  titulo: {
    fontSize: 26,
    color: "white",
    padding: 15,
  },
  texto: {
    padding: 10,
    textAlign: "center",
  },
  logo: {
    aspectRatio: 1,
    height: "15%",
    top: 75,
  },
  link: {
    color: "white",
  },
  linkContainer: {
    position: "absolute",
    bottom: 50,
  },
});

export default RegisterComplete;

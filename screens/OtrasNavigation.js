import { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../hooks/useScreenResize";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo3 from "../assets/logo3.png";
import { UserContext } from "../context/UserContext";

function OtrasNavigation({ navigation }) {
  const { setCurrentUser } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      // Eliminar el token de AsyncStorage
      await AsyncStorage.removeItem("token");
      console.log("TOKEN ELIMINADO");
      // Redirigir al usuario a la pantalla de inicio de sesión
      navigation.navigate("LoginScreen"); // Reemplaza "Login" con la pantalla de inicio de sesión real en tu aplicación
    } catch (error) {
      console.error("Error al intentar cerrar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo3} style={styles.logo} />

      <View style={styles.btnsContainer}>
        <TouchableOpacity style={styles.botonContainer}>
          <Text style={styles.textoBtn}>Terminos Y Condiciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonContainer}>
          <Text style={styles.textoBtn}>Puntuanos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonContainer}>
          <Text style={styles.textoBtn}>Configuracion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonContainer}>
          <Text style={styles.textoBtn}>Denunciar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonContainer}>
          <Text style={styles.textoBtn}>Denunciar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botonContainer, styles.btnCerrarSesion]}
          onPress={handleLogout}
        >
          <Text style={styles.textoBtn}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#E3E3E3",
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
  btnsContainer: {
    marginTop: 50,
  },
  botonContainer: {
    backgroundColor: "#C69AE8",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: screenWidth * 0.95,
    height: screenHeight * 0.055,
    justifyContent: "center",
  },
  btnCerrarSesion: {
    backgroundColor: "#FF3838", // Puedes ajustar el color según tus necesidades
  },
  textoBtn: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default OtrasNavigation;

import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import paw from "../assets/logo4.png";
import { COLORS } from "../styles";

const RegisterChoice = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("RegisterUser")}
      >
        <Text style={styles.text}>¡Quiero adoptar!</Text>
      </TouchableOpacity>
      <View style={styles.separador} />
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("RegisterRef")}
      >
        <Text style={styles.text}>Soy un refugio</Text>
      </TouchableOpacity>
      <Image source={paw} style={styles.logo} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C69AE8",
    gap: 50,
  },
  logo: {
    height: 100,
    width: 100,
    aspectRatio: 1,
    position: "absolute",
    bottom: 20,
  },
  separador: {
    borderTopColor: COLORS[300],
    borderTopWidth: 1,
    width: "60%",
  },
  boton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS[600],
  },
  text: {
    fontSize: 16,
    color: COLORS[50],
  },
});
export default RegisterChoice;

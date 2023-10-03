import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const RegisterChoice = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.choiceButton}
        onPress={() => navigation.navigate("RegisterUser", { index: null })}
      >
        <Text style={styles.text}>¡Quiero adoptar!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.choiceButton}
        onPress={() => navigation.navigate("RegisterRef")}
      >
        <Text style={styles.text}>Soy un refugio</Text>
      </TouchableOpacity>
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
  choiceButton: {
    backgroundColor: "#9A34EA",
    borderRadius: 200,
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default RegisterChoice;

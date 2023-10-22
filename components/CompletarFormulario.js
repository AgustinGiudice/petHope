import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CompletarFormulario = ({ navigation }) => {
  return (
    <View>
      <Text>
        Sin completar el formulario no te podemos mostrar las mascotas que son
        ideales para vos
      </Text>
      <TouchableOpacity
        style={styles.surveyButton}
        onPress={() => {
          navigation.navigate("RegisterUser", { index: 10 });
        }}
      >
        <Text style={styles.surveyButtonText}>Formulario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  surveyButton: {
    backgroundColor: "#9A34EA",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignSelf: "center",
    marginTop: 30,
  },
  surveyButtonText: {
    color: "white",
  },
});

export default CompletarFormulario;

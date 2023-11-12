import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CompletarFormulario = ({ navigation }) => {
  return (
    <View>
      <Text>
        Sin completar el cuestionario no te podemos mostrar las mascotas que son
        ideales para vos
      </Text>
      <TouchableOpacity
        style={styles.surveyButton}
        onPress={() => {
          navigation.navigate("CuestionarioUsuarioRegistro");
        }}
      >
        <Text style={styles.surveyButtonText}>Cuestionario</Text>
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

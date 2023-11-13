import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const CompletarFormulario = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <View>
      {!currentUser.imagen ? (
        <Text>Terminá de completar tu perfil subiendo una foto tuya</Text>
      ) : (
        <Text>
          Sin completar el cuestionario no te podemos mostrar las mascotas que
          son ideales para vos
        </Text>
      )}
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

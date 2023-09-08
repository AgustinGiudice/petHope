import { useState } from "react";
import { Modal, StyleSheet, View, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const RegisterModal = ({ children, visible, setVisible }) => {
  const [error, setError] = useState([]);

  const handleSubmit = () => {
    let hasEmptyValues = false;
    setError([]);
    if (children.length > 1) {
      children.forEach((element) => {
        if (element.props.value === "") {
          setError((prev) => [
            ...prev,
            `Completar el campo de ${element.props.placeholder}`,
          ]);
          hasEmptyValues = true;
        }
        //
        //Hacer condicional para el formato de mail tambien!!!!
        //
        if (element.props.placeholder === "mail") {
          //
          //Hacer el fetcheo, el loading y el renderizado condicional
          //
          setError((prev) => [
            ...prev,
            "Este E-mail ya tiene una cuenta asociada",
          ]);
        }
      });
    }
    if (!hasEmptyValues) {
      setVisible((prev) => prev + 1);
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={() => setVisible((prev) => prev - 1)}
    >
      <View style={styles.modal}>
        {children}
        {error.length !== 0
          ? error.map((e) => {
              return (
                <Text key={e} style={styles.error}>
                  {e}
                </Text>
              );
            })
          : null}
        <FontAwesome
          name="arrow-right"
          size={40}
          style={styles.arrow}
          onPress={() => handleSubmit()}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A5D4FF",
    gap: 15,
  },
  arrow: {
    color: "white",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  error: {
    color: "red",
  },
});

export default RegisterModal;

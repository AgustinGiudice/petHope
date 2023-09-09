import { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, Animated, Easing } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const RegisterModal = ({ children, visible, setVisible }) => {
  const [error, setError] = useState([]);
  const modalFadeIn = new Animated.Value(0);
  const modalFadeOut = new Animated.Value(1);

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

  useEffect(() => {
    if (visible) {
      Animated.timing(modalFadeIn, {
        toValue: 1,
        duration: 300, // Duración de la animación en milisegundos
        easing: Easing.linear, // Tipo de interpolación
        useNativeDriver: true, // Habilita el uso del controlador nativo para el rendimiento
      }).start();
    } else {
      Animated.timing(modalFadeOut, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      });
    }
  }, [visible]);

  return (
    <Modal
      transparent={false}
      visible={visible}
      onRequestClose={() => setVisible((prev) => prev - 1)}
    >
      <Animated.View
        style={[
          styles.modal,
          {
            opacity: visible ? modalFadeIn : modalFadeOut,
            transform: [
              {
                scale: visible
                  ? modalFadeIn.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.7, 1],
                    })
                  : modalFadeOut,
              },
            ],
          },
        ]}
      >
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
      </Animated.View>
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

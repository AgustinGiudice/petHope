import { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Animated,
  Easing,
  useWindowDimensions,
} from "react-native";

const RegisterModal = ({ children, visible, setVisible }) => {
  const modalFadeIn = new Animated.Value(0);
  const modalFadeOut = new Animated.Value(1);

  const handleNext = () => {
    let hasEmptyValues = false;
    let passMatch = true;
    let pass = "";
    setError([]);
    if (children.length >= 1) {
      children.forEach((element) => {
        if (!element) {
          return;
        }
        if (
          element.props.placeholder === "fecha" &&
          element.props.value === ""
        ) {
          setError((prev) => [...prev, `Por favor elegir una fecha`]);
          hasEmptyValues = true;
        }
        if (
          element.props.value === "" &&
          element.props.placeholder !== "fecha"
        ) {
          setError((prev) => [
            ...prev,
            `Completar el campo de ${element.props.placeholder}`,
          ]);
          hasEmptyValues = true;
        }
        if (
          element.props.atributo === "pass" ||
          element.props.atributo === "repeatPass"
        ) {
          if (pass === "") {
            pass = element.props.value;
          } else {
            if (pass !== element.props.value) {
              passMatch = false;
              setError((prev) => [...prev, "Las contraseñas no coinciden"]);
            }
          }
        }
        //
        //Hacer condicional para el formato de mail tambien!!!!
        //
        if (element.props.placeholder === "iugigpj") {
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
    if (!hasEmptyValues && passMatch) {
      setVisible((prev) => prev + 1);
    }
  };

  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#C69AE8",
      gap: 15,
      padding: 20,
    },
    // arrow: {
    //   color: "white",
    //   position: "absolute",
    //   bottom: 20,
    //   right: 20,
    // },
    error: {
      color: "red",
    },
    containerButtons: {
      width: width,
      position: "absolute",
      bottom: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
  });

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
      onRequestClose={() => setVisible((prev) => prev - 1)} //ojo con esto
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
        {/* {error.length !== 0
          ? error.map((e) => {
              return (
                <Text key={e} style={styles.error}>
                  {e}
                </Text>
              );
            })
          : null} */}
        {/* {children.key == 99 ? (
          <View style={styles.containerButtons}>
            <TouchableOpacity onPress={() => setVisible(21)}>
              <Text>Completar más tarde</Text>
            </TouchableOpacity>
            <FontAwesome
              name="arrow-right"
              size={40}
              style={{ color: "white" }}
              onPress={() => handleNext()}
            />
          </View>
        ) : children.key == 33 ? null : (
          <FontAwesome
            name="arrow-right"
            size={40}
            style={styles.arrow}
            onPress={() => handleNext()}
          />
        )} */}
      </Animated.View>
    </Modal>
  );
};

export default RegisterModal;

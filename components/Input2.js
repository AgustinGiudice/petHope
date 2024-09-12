import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input2 = ({ value, setValue, placeholder, atributo, disable, width }) => {
  return (
    <TextInput
      style={[
        atributo === "descripcion" ? styles.textArea : styles.input,
        { width: width ? width : "80%" }, // Establece el ancho según la prop width o usa el 80% por defecto
      ]}
      value={value} // Asegúrate de que esto sea siempre el valor pasado desde el padre
      onChangeText={(text) => {
        setValue(text); // No necesitamos lógica adicional aquí, pasamos el valor directamente
      }}
      secureTextEntry={atributo === "pass" || atributo === "repeatPass"}
      placeholder={placeholder}
      placeholderTextColor={"#9A34EA"}
      multiline={atributo === "descripcion" ? true : false}
      numberOfLines={atributo === "descripcion" ? 6 : 1}
      keyboardType={
        atributo === "edad" || atributo === "telefono"
          ? "numeric"
          : atributo === "mail"
          ? "email-address"
          : "default"
      }
      editable={disable ? false : true}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#9A34EA",
    paddingHorizontal: 5,
  },
  textArea: {
    borderBottomWidth: 1,
    borderColor: "#9A34EA",
    paddingHorizontal: 5,
  },
});

export default Input2;

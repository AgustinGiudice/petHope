import { StyleSheet, TextInput } from "react-native";

const Input = ({ value, setValue, placeholder, atributo }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={(value) => {
        if (atributo === "distancia") {
          value = parseInt(value);
        }
        setValue((prev) => ({
          ...prev,
          [atributo]: value,
        }));
      }}
      secureTextEntry={atributo === "pass" || atributo === "repeatPass"}
      placeholder={placeholder}
      placeholderTextColor={"#9A34EA"}
      keyboardType={ atributo === "edad" || atributo === "telefono" ? "numeric" : atributo === "mail" ? "email-address" :"default"}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#9A34EA",
    paddingHorizontal: 5,
    width: "80%",
  },
});

export default Input;

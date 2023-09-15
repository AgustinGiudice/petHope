import { StyleSheet, TextInput } from "react-native";

const Input = ({ value, setValue, placeholder, atributo }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={(value) =>
        setValue((prev) => ({
          ...prev,
          [atributo]: value,
        }))
      }
      secureTextEntry={atributo === "pass"}
      placeholder={placeholder}
      placeholderTextColor={"#369EFE"}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#369EFE",
    paddingHorizontal: 5,
    width: "80%",
  },
});

export default Input;

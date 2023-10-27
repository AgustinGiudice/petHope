import { StyleSheet } from "react-native";
import { View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Select = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="keyboard-arrow-down"
        size={25}
        style={{ color: "#C69AE8" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#C69AE8",
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
  },
});
export default Select;

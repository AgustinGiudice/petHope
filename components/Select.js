import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import { Touchable } from "react-native";
import { TouchableOpacity } from "react-native";
import { useState } from "react";

const Select = ({ values, setValue, atributo }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          padding: 5,
          justifyContent: "space-between",
        }}
        onPress={() => setOpenModal(true)}
      >
        <Text style={styles.selectedValue}>{atributo}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={25}
          style={{ color: "#C69AE8" }}
        />
        <Modal
          isVisible={openModal}
          onBackdropPress={() => setOpenModal(false)}
        >
          <View style={styles.valuesContainer}>
            {values.map((value) => {
              return <Text style={styles.values}>{value}</Text>;
            })}
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#C69AE8",
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    position: "relative",
  },
  selectedValue: {
    color: "#9A34EA",
  },
  valuesContainer: {
    height: "30%",
    aspectRatio: 1,
    backgroundColor: "#e3e3e3",
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  values: {
    color: "#C69AE8",
  },
});
export default Select;

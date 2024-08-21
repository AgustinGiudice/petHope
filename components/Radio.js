import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Radio = ({ data, handleSelect, defaultValue, isDisabled }) => {
  const [checked, setChecked] = useState(defaultValue);

  return (
    <View style={styles.radio}>
      {data.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.btn}
          onPress={() => {
            if (!isDisabled) {
              setChecked(item);
              handleSelect(item);
            }
          }}
          disabled={isDisabled}
        >
          <MaterialIcons
            name={checked === item ? "radio-button-on" : "radio-button-off"}
            size={25}
            style={styles.radioBtn}
          />
          <Text style={styles.item}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    flexDirection: "column",
    gap: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  radioBtn: {
    color: "#9A34EA",
  },
  item: {
    color: "#9A34EA",
  },
});

export default Radio;

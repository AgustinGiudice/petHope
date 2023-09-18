import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Radio = ({ data, handleSelect, defaultValue }) => {
  const [checked, setChecked] = useState(defaultValue);
  return (
    <View style={styles.radio}>
      <View style={styles.radio}>
        {data.map((item, key) => {
          console.log(key);
          return (
            <View key={item}>
              {checked == item ? (
                <TouchableOpacity style={styles.btn}>
                  <MaterialIcons
                    name="radio-button-on"
                    size={25}
                    style={styles.radioBtn}
                  />
                  <Text style={styles.item}>{item}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setChecked(item);
                    handleSelect(item);
                  }}
                  style={styles.btn}
                >
                  <MaterialIcons
                    name="radio-button-off"
                    size={25}
                    style={styles.radioBtn}
                  />
                  <Text style={styles.item}>{item}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
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
    color: "#9A34EA",
  },
  radioBtn: {
    color: "#9A34EA",
  },
  item: {
    color: "#9A34EA",
  },
});

export default Radio;

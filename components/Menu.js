import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Menu = () => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.button} color="#007bff">
        <Text>1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} color="#007bff">
        <Text>2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pawbutton}>
        <FontAwesome name="paw" size={50} />
      </TouchableOpacity>
      <View style={styles.space}></View>
      <TouchableOpacity style={styles.button} color="#007bff">
        <Text>3</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} color="#007bff">
        <Text>4</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    overflow: "visible",
    backgroundColor: "#007bff",
    height: 50,
    width: "100%",
    alignItems: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20
    ,
  },
  space: {
    width: 75,
  },
  pawbutton: {
    backgroundColor: "#777bf6",
    position: "absolute",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    zIndex: 2,
    bottom: 0,
  },
});

export default Menu;

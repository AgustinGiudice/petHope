import React from "react";
import { View, ActivityIndicator, StyleSheet, Image } from "react-native";
import logo from "../assets/logo.png";

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} />
      <ActivityIndicator size={"large"} color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#C69AE8",
  },
});

export default LoadingComponent;

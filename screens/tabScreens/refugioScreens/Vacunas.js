import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const Vacunas = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fieldName}>Vacunas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Vacunas;

import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

const DatePickerComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha de nacimiento</Text>
      <TextInput
        placeholder="DD/MM/AAAA" //alrevez
        value={date}
        onChangeText={(text) => {
          const date = new Date(text);
          setDate(date);
        }}
      />
      <Button title="Aceptar" onPress={() => onDateChange(date)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DatePickerComponent;
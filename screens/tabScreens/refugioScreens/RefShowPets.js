import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import MascotaRef from "../../../components/componentesRefugio/MascotaRef";

const data = [
  { id: '1', name: 'Mascota 1' },
  { id: '2', name: 'Mascota 2' },
  { id: '3', name: 'Mascota 3' },
  { id: '4', name: 'Mascota 4' },  
  { id: '4', name: 'Mascota 4' },  
  { id: '4', name: 'Mascota 4' },  
  { id: '4', name: 'Mascota 4' },
];

const RefShowPets = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <MascotaRef />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RefShowPets</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Mostrar dos elementos por fila
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3E3E3",
  justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    color: "red",
  },
  item: {
    
  },
});

export default RefShowPets;

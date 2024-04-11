import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Asegúrate de tener este paquete instalado

const ListaVacunas = ({ vacunas, onEditPress }) => {
  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tabla}>
          {vacunas.map((vacuna) => (
            <View key={vacuna.id} style={styles.fila}>
              <Text style={styles.nombreVacuna}>{vacuna.nombre}</Text>
              <View style={styles.dosisContainer}>
                {vacuna.dosis.map((dosis, index) => (
                  <View key={index} style={styles.dosisInfo}>
                    <Icon
                      name={
                        dosis.estado === "aplicada"
                          ? "check-circle"
                          : "times-circle"
                      }
                      size={20}
                      color={dosis.estado === "aplicada" ? "green" : "red"}
                      style={styles.icono}
                    />
                    <Text style={styles.textoDosis}>
                      {`${dosis.nombre} - ${
                        dosis.estado === "aplicada" ? "Aplicada" : "Pendiente"
                      }`}
                    </Text>
                    {dosis.fechaAplicacion && (
                      <Text style={styles.fechaAplicacion}>
                        {`Aplicada en: ${new Date(
                          dosis.fechaAplicacion
                        ).toLocaleDateString()}`}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={onEditPress}>
        <Icon name="pencil-alt" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  tabla: {
    // Orienta las celdas de manera horizontal
    alignItems: "flex-start",
    gap: 10,
  },
  fila: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "bold",
    backgroundColor: "#db3e00",
    color: "white",
    fontSize: 18,
  },
  nombreVacuna: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 18,
  },
  dosisContainer: {
    paddingVertical: 5,
  },
  dosisInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
  },
  textoDosis: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
  fechaAplicacion: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#333",
  },
  fab: {
    position: "absolute",
    right: 25,
    bottom: 25,
    backgroundColor: "#db3e00", // Color que prefieras para el botón
    width: 56, // Tamaño del FAB
    height: 56, // Tamaño del FAB
    borderRadius: 28, // Hacerlo circular
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: { height: 4, width: 0 },
  },
});

export default ListaVacunas;

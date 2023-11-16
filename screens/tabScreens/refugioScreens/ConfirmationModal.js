import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmationModal = ({ isVisible, message, onConfirm, onCancel,onchangemessage,onRedirect }) => {
  return (
    <Modal transparent visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            {!onchangemessage?
            <Text>{message}</Text>
        :
        <Text>MASCOTA ELIMINADA</Text>    
        }
          <View style={styles.buttonContainer}>
            {!onchangemessage ? 
            <>
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text>Confirmar</Text>
            </TouchableOpacity>
            </>
            :
            <TouchableOpacity onPress={onRedirect} style={styles.button}>
            <Text>Continuar</Text>
            </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default ConfirmationModal;

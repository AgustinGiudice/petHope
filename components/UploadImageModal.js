import { Modal, StyleSheet, View, Text } from "react-native";
import { screeHeight } from "../hooks/useScreenResize";

const UploadImageModal = ({ visible, setVisible }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalWindow}>
          <Text style={styles.text}>Aca van a haber cosas </Text>
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
    backgroundColor: "rgba(10,10,10,0.7)",
  },
  modalWindow: {
    padding: 20,
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 20,
  },
});
export default UploadImageModal;

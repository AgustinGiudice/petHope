import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet ,Dimensions } from 'react-native';
import { Picker } from "@react-native-picker/picker";


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ButtonFilters = ({children}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.containerr}>
      <TouchableOpacity style={styles.buttonFilterSP} onPress={openModal}>
        <Text style={styles.buttonText}>Filter</Text>
      </TouchableOpacity>

      {modalVisible && (
        <View style={styles.modalContainer}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    containerr:{
        alignItems:"center"
    },
    buttonFilterSP: {
    position: 'absolute',
    top: 1,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  buttonText: {
    color: '#fff',
  },
  modalContainer: {
    position: 'absolute',
    zIndex:1,
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.8,
    height: screenHeight * 0.8, 
    backgroundColor: 'rgba(10, 10, 0, 0.85)',
    borderRadius:5,
  },
  contenidoModal: {
    color: 'white', // Agregamos el estilo para el color del texto
  },
  
});

export default ButtonFilters;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

import {
    getAnimalDescripcion,
    getEdadDescripcion,
    getTamanioDescripcion,
    getSexoDescripcion,
  } from "../../hooks/getDescripciones";


const Chat = ({ route }) => {
  const { refugio, mascota } = route.params;
  console.log("REFUGIO")
  console.log(refugio)
  console.log("MASCOTA")
  console.log(mascota)

  

  // const fecha_format = format(new Date(f.created_at), 'dd/MM/yyyy');

  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible_2, setModalVisible_2] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal_2 = () => {
    setModalVisible_2(!isModalVisible_2);
  };
  // use getEstadoNombre to get the name of the state

  // const estadoColor = estadoColores[reclamo.estado];

  // const estadoIndicatorStyle = {
  //   backgroundColor: estadoColor || '#FFFFFF',
  // };
  

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Función para enviar un mensaje
  const sendMessage = () => {
    // Aquí puedes enviar el mensaje al servidor o realizar las acciones necesarias
    // para guardar el mensaje en el contexto del reclamo con idReclamo.
    // Luego, actualiza el estado de los mensajes.

    // Ejemplo de cómo podrías actualizar el estado:
    setMessages([...messages, { text: newMessage, sender: 'usuario' }]);
    setNewMessage('');
  };

  // Simula la carga de mensajes cuando se monta el componente
  useEffect(() => {
    // Aquí podrías obtener los mensajes del reclamo con idReclamo
    // desde tu API o desde el almacenamiento local y establecerlos en el estado.
    // Ejemplo:
    // console.log(match); 

    const initialMessages = [
      { text: 'Hola, ¿en qué puedo ayudarte?', sender: 'refugio' },
      { text: 'Tengo un problema con mi match.', sender: 'usuario' },
    ];
    setMessages(initialMessages);
  }, [refugio]);

  return (
    <View style={styles.container}>
    <View style={styles.spacebet}>
   
      <TouchableOpacity onPress={() => navigation.navigate('Match')}
        style={{padding:10}}> 
        <Text>Volver a mis Matcheos</Text>
      </TouchableOpacity>

      <Button onPress={toggleModal_2} title={refugio.nombre}/>
      <Button onPress={toggleModal} title={mascota.nombre}/>
    </View>

    {/* <View>
      <Text style={[styles.estadoIndicator, estadoIndicatorStyle]}> {getEstadoNombre(reclamo.estado)}</Text>
      <Text style={[styles.fechaIndicator, estadoIndicatorStyle]}> Conversación iniciada el ${fecha_format}</Text>


    </View> */}
    
    
      <FlatList
        data={messages}
        keyExtractor={(message, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: item.sender === 'usuario' ? 'row-reverse' : 'row' }}>
            <View
              style={{
                backgroundColor: item.sender === 'usuario' ? '#218AFF' : '#a4bb03',
                padding: 10,
                margin: 5,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: 'white' }}>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:10, marginRight:10 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginRight: 10, marginLeft:10 }}
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          {/* Contenido del modal */}
          <Text numberOfLines={1} style={styles.modalTitle}>
            {mascota.nombre}
          </Text>
          <Text style={styles.modalText}>
            {getAnimalDescripcion(mascota.animal)}{" "} - {getEdadDescripcion(mascota.edad)}{" "}
          </Text>
          
          <Text style={styles.modalText}>
          {getTamanioDescripcion(mascota.tamanio)} - {getSexoDescripcion(mascota.sexo)}
          </Text>
          

          <TouchableOpacity onPress={toggleModal} style={styles.modalCloseButton}>
            <Icon name="times" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={isModalVisible_2} onBackdropPress={toggleModal_2}>
              <View style={styles.modalContent}> 
                <Text style={styles.modalTitle}>{refugio.nombre}</Text>
                <Text style={styles.modalText}>{refugio.direccion}</Text>
                <TouchableOpacity onPress={toggleModal} style={styles.modalCloseButton}>
                  <Icon name="times" size={24} color="black" />
                </TouchableOpacity>
              </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 30,
  
  },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalText: {
        fontSize: 16,
        marginBottom: 10,
      },
      modalCloseButton: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      buttonRojo: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
      },
      spacebet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40
      },
      estadoIndicator: {
        borderRadius: 5,
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
      },
      fechaIndicator: {
        borderRadius: 5,
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
      },

      

});

export default Chat;

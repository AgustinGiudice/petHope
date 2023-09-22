import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Constants from 'expo-constants';

const Refugios = ({ navigation }) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRefugio, setSelectedRefugio] = useState(null);

  const openModal = (refugio) => {
    setSelectedRefugio(refugio);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRefugio(null);
    setModalVisible(false);
  };

  const refugios = [
    {
      nombre: "Refugio Devoto",
      descripcion:
        "Estamos emocionados de anunciar la inauguración de nuestro nuevo refugio de animales, que proporcionará un hogar seguro y amoroso para cientos de animales necesitados.",
      imagen: require("../../assets/refugio1.jpg"),
      distancia: 12,
      animal: "Perros",
      mascotasRegistradas: 735,
      linkDonacion: "https://linkdedonacion.com",
    },
    {
      nombre: "Gatitos felices",
      descripcion:
        "Estamos emocionados de anunciar la inauguración de nuestro nuevo refugio de animales, que proporcionará un hogar seguro y amoroso para cientos de animales necesitados.",
      imagen: require("../../assets/refugio2.jpg"),
      distancia: 12,
      animal: "Gatos",
      mascotasRegistradas: 735,
      linkDonacion: "https://linkdedonacion.com",
    },
    {
      nombre: "Patitas Tristes",
      descripcion:
        "Estamos emocionados de anunciar la inauguración de nuestro nuevo refugio de animales, que proporcionará un hogar seguro y amoroso para cientos de animales necesitados.",
      imagen: require("../../assets/refugio1.jpg"),
      distancia: 12,
      animal: "Perros y Gatos",
      mascotasRegistradas: 735,
      linkDonacion: "https://linkdedonacion.com",
    },
    {
      nombre: "Unidos por los animales - A 23km de distancia",
      descripcion:
        "Estamos emocionados de anunciar la inauguración de nuestro nuevo refugio de animales, que proporcionará un hogar seguro y amoroso para cientos de animales necesitados.",
      imagen: require("../../assets/refugio2.jpg"),
      distancia: 12,
      animal: "Perros",
      mascotasRegistradas: 735,
      linkDonacion: "https://linkdedonacion.com",
    },
  ];

  return (
    <>
    <FlatList
      data={refugios}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.noticiaContainer}>
          <Image source={item.imagen} style={styles.imagenNoticia} />
          <Text style={styles.nombreRef}>{item.nombre}</Text>
          <Text style={styles.distanciaRef}>
            A {item.distancia} Km de distancia
          </Text>
          <Text style={styles.acepta}>Acepta {item.animal}</Text>
          <View style={styles.orderButton}>
            <TouchableOpacity style={styles.containerBotonVerMas}>
              <Text style={styles.textoBotonVerMas} onPress={() => openModal(item)}>Ver Más</Text>
            </TouchableOpacity>  
          </View>
        </View>
      )}
      />

       {/* Modal para mostrar más información del refugio */}
       <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        {selectedRefugio && (
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedRefugio.nombre}</Text>
            <Image source={selectedRefugio.imagen} style={styles.modalImage} />
            <Text style={styles.modalDescription}>
              {selectedRefugio.descripcion}
            </Text>
            <Text style={styles.modalLink}>
              Enlace de Donación: {selectedRefugio.linkDonacion}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModal}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>

      </>
  );
};

const styles = StyleSheet.create({
  noticiaContainer: {
    marginTop: Constants.statusBarHeight,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 3,
  },
  imagenNoticia: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
  },
  nombreRef: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
  },
  descripcionNoticia: {
    fontSize: 16,
    marginTop: 5,
  },
  acepta: {
    marginBottom: 8,
  },
  orderButton: {
    alignItems: "center",
  },
  containerBotonVerMas: {
    width: 100,
    height: 35,
    backgroundColor: "#9A34EA",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotonVerMas:{
    color:"white",
    fontSize:18
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  modalDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  modalLink: {
    fontSize: 16,
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#9A34EA',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Refugios;

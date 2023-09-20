import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const Refugios = ({ navigation }) => {
  const refugios = [
    {
        
      titulo: 'Refugio Devoto - A 15km de distancia',
      descripcion:
        'Estamos emocionados de anunciar la inauguración de nuestro nuevo refugio de animales, que proporcionará un hogar seguro y amoroso para cientos de animales necesitados.',
      imagen: require('../../assets/refugio1.jpg'), // Asegúrate de tener la imagen en tu proyecto
    },
    {
      titulo: 'Unidos por los animales - A 23km de distancia',
      descripcion:
        'Hemos tenido un mes exitoso en términos de adopciones. ¡Gracias a la comunidad por adoptar a tantos animales y darles un nuevo comienzo!',
      imagen: require('../../assets/refugio2.jpg'), // Asegúrate de tener la imagen en tu proyecto
    },
    {
      titulo: 'Gatitos felices - A 4km de distancia',
      descripcion:
        'Nuestro refugio de animales está organizando una campaña de donación de alimentos para ayudar a los animales necesitados. ¡Únete y ayuda a los animales hambrientos!',
      imagen: require('../../assets/refugio1.jpg'), // Asegúrate de tener la imagen en tu proyecto
    },
    {
      titulo: 'Voluntarios necesarios - A 45km de distancia',
      descripcion:
        'Estamos buscando voluntarios apasionados para ayudar en nuestro refugio. Si amas a los animales y quieres marcar la diferencia, ¡únete a nuestro equipo!',
      imagen: require('../../assets/refugio2.jpg'), // Asegúrate de tener la imagen en tu proyecto
    },
  ];

  return (
    <FlatList
      data={refugios}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.noticiaContainer}>
          <Image source={item.imagen} style={styles.imagenNoticia} />
          <Text style={styles.tituloNoticia}>{item.titulo}</Text>
          <Text style={styles.descripcionNoticia}>{item.descripcion}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  noticiaContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 3,
  },
  imagenNoticia: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  tituloNoticia: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  descripcionNoticia: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default Refugios;

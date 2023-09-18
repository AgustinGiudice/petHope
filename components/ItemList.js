import { View, Text, Image, StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../hooks/useScreenResize";
import { getAnimalDescripcion, getEdadDescripcion, getTamanioDescripcion, getSexoDescripcion } from "../hooks/getDescripciones";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from 'expo-linear-gradient';
const ItemList = ({ item }) => {
  
  return (
    <View style={styles.mascotaItem}>
      <View>
        <View>
        <Image source={{ uri: item.pic }} style={styles.mascotaImagen} />
        <LinearGradient
        colors={['rgba(255, 99, 71, 0)', '#000000']}
        style={styles.gradient}
        ></LinearGradient>
        </View>
        <View style={styles.containerDistancia}>
          <AntDesign name="enviromento" size={22} color="white"/>
          <Text style={ styles.itemDistancia}> A {(item.distance / 1000).toFixed(2)} km de distancia.</Text>
        </View>
      </View>
      <View  style={styles.dataItem}>
        {/* <Text>Nivel de Cuidado: {item.nivelCuidado}</Text>
        <Text style={styles.mascotaNombre}>{item.nombre}</Text> */}
        <View style={styles.dataItemArria}>
          <Text style={styles.tag}>Raza: {getAnimalDescripcion(item.raza)}</Text>
          <Text style={styles.tag}>Edad: {getEdadDescripcion(item.edad)}</Text>
        </View>
        <View  style={styles.dataItemArria2}>
          <Text style={styles.tag}>Tamaño: {getTamanioDescripcion(item.tamanio)}</Text>
          <Text style={styles.tag}>Sexo: {getSexoDescripcion(item.sexo)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mascotaItem: {
    marginTop: 5,
    borderRadius: 5,
    textAlign: "center",
    width: screenWidth ,
    // position:"relative",
    zIndex:1,
    gap:2
  },
  mascotaImagen: {
    width: "100%",
    height: screenHeight * 0.6,
    borderRadius: 5,
    resizeMode: "cover",
    alignContent: "center",
    marginTop:-10,
    position:"relative"
  },
  containerDistancia:{
    flexDirection:"row",
    position:"absolute",
    bottom:10,
    left:10,
  },
  itemDistancia: {
    fontSize:20,
    color: "white"
  },
  mascotaNombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dataItem:{
   alignItems:"center"
  },
  dataItemArria:{
    flexDirection:"row",
    width: screenWidth,
    justifyContent:"space-around"
  },
  dataItemArria2: {
    flexDirection:"row"
    
  },
  tag:{
    textAlign:"center",
    justifyContent:"center",
    alignContent:"center",
    backgroundColor:"#9A34EA",
    width: 130,
    height: 25,
    borderRadius: 5,
    margin:3,
    color:"white"
  },
  gradient: {
    position:"absolute",
    width:screenWidth,
    height: 100,
    bottom:0,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemList;

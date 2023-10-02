import { View, Text, Image, StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../hooks/useScreenResize";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";
import Logo from "../assets/logo.png";

function OtrasNavigation({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <TouchableOpacity style={styles.botonContainer}>
        <Text style={styles.textoBtn}>Terminos Y Condiciones</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botonContainer}>
        <Text style={styles.textoBtn}>Puntuanos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botonContainer}>
        <Text style={styles.textoBtn}>Configuracion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botonContainer}>
        <Text style={styles.textoBtn}>Denunciar</Text>
      </TouchableOpacity >
      <TouchableOpacity style={styles.botonContainer}>
        <Text style={styles.textoBtn}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        marginTop: Constants.statusBarHeight,
        justifyContent:"center",
        alignItems:"center",
        gap:10,
        backgroundColor:"#E3E3E3",
        height:screenHeight,
        width:screenWidth
    },
    logo:{
        width: screenWidth * 0.4,
        height: screenHeight * 0.3,
    },
    botonContainer:{
        backgroundColor:"white",
        width: screenWidth * 0.95,
        height: screenHeight * 0.06,
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center"
    },
    textoBtn:{
        fontSize:16
    }
});

export default OtrasNavigation;

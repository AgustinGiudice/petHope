import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { BASE_URL } from "@env";
import Constants from 'expo-constants'
import ImgRef from '../../assets/refugio.jpg'
import { screenHeight, screenWidth } from "../../hooks/useScreenResize";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ShowRefugios = () => {
  const styles = StyleSheet.create({
    containerSR:{
        alignItems:"center",
      
    },
    containerItem: {
        marginTop: Constants.statusBarHeight,
        flexDirection:"row",
        backgroundColor:"#8E8E8E",
        width:screenWidth - screenWidth * .1,
    },
    refIamge: {
        width:screenWidth - screenWidth * .65,
        height: screenHeight - screenHeight * .65
    },
    containerRefData:{
        justifyContent:"space-between",
        margin:20,
        gap:20,
        alignItems:"center"
        
    },
    NomRef:{
        color:"white",
        fontWeight:"bold",
        fontSize:20
    },
    containerDataRef:{
        height: 70 ,
        justifyContent:"space-between"
    },
    ubiRef:{
        flexDirection:"row",
        gap:4
    },
    buttonModal:{
        flexDirection:"row",
        backgroundColor:"pink",
        height:30,
        width: 90,
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center"
    }
  });

  return (
    <View style={styles.containerSR}>
        <View style={styles.containerItem}>
            <View>
                <Image
                    source={ImgRef}
                    style={styles.refIamge}
                />
            </View>
            <View style={styles.containerRefData}>
                <View>
                    <Text style={styles.NomRef}>NombreRefugio</Text>
                </View>
                <View style={styles.containerDataRef}>
                    <View style={styles.ubiRef}>
                        <View>
                            <AntDesign name="enviromento" size={20} color="white" />
                        </View>
                        <View>
                            <Text style={styles.dataRef}>A 27km de distancia.</Text>
                        </View>
                    </View>
                    <Text style={styles.dataRef}>Tiene: Perros Gatos</Text>
                </View>
                <View>
                <TouchableOpacity style={styles.buttonModal}>
                    <MaterialIcons name="unfold-more" size={20} color="white" />
                    <Text>Ver Más</Text>
                </TouchableOpacity>
                </View>

            </View>
        </View>
        <View style={styles.containerItem}>
            <View>
                <Image
                    source={ImgRef}
                    style={styles.refIamge}
                />
            </View>
            <View style={styles.containerRefData}>
                <View>
                    <Text style={styles.NomRef}>NombreRefugio</Text>
                </View>
                <View style={styles.containerDataRef}>
                    <View style={styles.ubiRef}>
                        <View>
                            <AntDesign name="enviromento" size={20} color="white" />
                        </View>
                        <View>
                            <Text style={styles.dataRef}>A 27km de distancia.</Text>
                        </View>
                    </View>
                    <Text style={styles.dataRef}>Tiene: Perros Gatos</Text>
                </View>
                <View>
                <TouchableOpacity style={styles.buttonModal}>
                    <MaterialIcons name="unfold-more" size={20} color="white" />
                    <Text>Ver Más</Text>
                </TouchableOpacity>
                </View>

            </View>
        </View>
    </View>
  );
};

export default ShowRefugios;

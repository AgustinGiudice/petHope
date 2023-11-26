import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { screenHeight, screenWidth } from "../hooks/useScreenResize";


const Test = ({ navigation }) => {

  
  
    return (
      <>
        <View style={styles.root}>
            
            <View style={styles.left}></View>
            <View style={styles.right}></View>

        </View>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      flexDirection:"row"
    },
    left: {
        width: screenWidth * 0.2,
        backgroundColor:"pink"
    },
    right:{
        flex:1,
        backgroundColor:"blue"
    }
   
  });
  
  export default Test;
  
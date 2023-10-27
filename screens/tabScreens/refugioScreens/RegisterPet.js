import React, {useContext,useEffect,useState} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import MascotaRef from "../../../components/componentesRefugio/MascotaRef";
import { screenHeight, screenWidth } from "../../../hooks/useScreenResize";
import LoadingComponent from "../../../components/LoadingComponent";
import { TokenContext } from "../../../context/TokenContext";
import { UserContext } from "../../../context/UserContext";
import { BASE_URL } from "@env";



const RegisterPet = ({ navigation }) => {

  return (
    <>
    <View style={styles.container}>
       <Text>Register pet</Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3E3E3",
  justifyContent: "center",
    alignItems: "center",
  },
  
});

export default RegisterPet;

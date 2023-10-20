import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";


const ChatRef = ({ navigation }) => {
 
  return (
    <>
    <View style={styles.container}>
        <Text  style={styles.title}>ChatRef</Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#E3E3E3"
  },
  title:{
    fontSize:40,
    textAlign:"center",
    color:"red"
  }
});

export default ChatRef;

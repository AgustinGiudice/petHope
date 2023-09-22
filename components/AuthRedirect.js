// AuthRedirect.js
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


const AuthRedirect = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si el token está presente en AsyncStorage
    AsyncStorage.getItem("token")
      .then((token) => {
        if (token) {
          setIsLoggedIn(true);
          console.log("TRUE EL TOKEN" + token);
          navigation.navigate("Paw");
          
        } else {
          setIsLoggedIn(false);
          console.log("false EL TOKEN");
          navigation.navigate("LoginScreen");
        }
      })
      .catch((error) => {
        console.error("Error al verificar la autenticación:", error);
      })




  }, []);

  // useEffect(() => {
  //   // Redirigir al usuario a la pantalla de inicio de sesión si no está autenticado

  // }, [isLoggedIn, navigation]);

  return <View />;
};

export default AuthRedirect;

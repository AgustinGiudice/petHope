import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Login";
import TabNavigation from "./TabNavigation";
import CreateUserForm from "./RegisterUser";
import RegisterChoice from "./RegisterChoice";
import RegisterRef from "./RegisterRef";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useContext } from "react";
import Chat from "./tabScreens/Chat";
import DrawerNavigation from "./DrawerNavigation";
import { LogBox } from "react-native";

import LoadingComponent from "../components/LoadingComponent";
import { UserContext } from "../context/UserContext";
import { TokenContext } from "../context/TokenContext";
import {
  matchesCount,
  CountMatchesContext,
} from "../context/CountMatchesContext";

const Stack = createStackNavigator();
LogBox.ignoreAllLogs();

function MainNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { setCurrentUser } = useContext(UserContext);
  const { setMatchesCount } = useContext(CountMatchesContext);
  const { setToken } = useContext(TokenContext);
  // .then((token) => {

  //   // request a la api para traer el count de notificaciones de matches
  //   fetch("http://")
  //   .then((response) => response.json())
  //   .then((json) => {
  //     console.log(json);
  //     setMatchesCount(json.count);
  //   })
  // })

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        if (token) {
          console.log("TOKEN:" + token);
          const token_parsed = JSON.parse(token);
          setIsLoggedIn(true);
          const usuario = token_parsed.usuario;

          console.log("usuario parseado", usuario);
          setCurrentUser(usuario);
          setToken(token_parsed.token);
          const count = token_parsed.matches;
          console.log(count); 
          setMatchesCount(count);
        } else {
          console.log("no hay token");
        }
        setIsLoading(false); // Indica que hemos terminado de verificar la autenticación
      })
      .catch((error) => {
        console.error("Error al verificar la autenticación:", error);
        setIsLoading(false); // En caso de error, también terminamos de verificar
      });
  }, []);

  if (isLoading) {
    // Mientras estamos verificando la autenticación, puedes mostrar un componente de carga o pantalla de carga
    return <LoadingComponent />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "Tabs" : "LoginScreen"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterChoice" component={RegisterChoice} />
        <Stack.Screen name="RegisterUser" component={CreateUserForm} />
        <Stack.Screen name="RegisterRef" component={RegisterRef} />
        <Stack.Screen name="Tabs" component={TabNavigation} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;

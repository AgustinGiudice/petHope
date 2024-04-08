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
import { LogBox } from "react-native";

import LoadingComponent from "../components/LoadingComponent";
import { UserContext } from "../context/UserContext";
import { TokenContext } from "../context/TokenContext";
import {
  matchesCount,
  CountMatchesContext,
} from "../context/CountMatchesContext";
import RegisterPet from "./tabScreens/refugioScreens/RegisterPet";
import CuestionarioUsuarioRegistro from "./CuestionarioUsuarioRegistro";
import RegisterComplete from "./RegisterComplete";

const Stack = createStackNavigator();
LogBox.ignoreAllLogs();

function MainNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let primerLogin = null;

  const { setCurrentUser, currentUser } = useContext(UserContext);
  const { setMatchesCount } = useContext(CountMatchesContext);
  const { setToken } = useContext(TokenContext);

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        if (token) {
          const token_parsed = JSON.parse(token);
          setIsLoggedIn(true);
          const usuario = token_parsed.usuario;

          setCurrentUser(usuario);
          if (usuario.hasOwnProperty("contadorMatch")) {
            usuario.isRefugio = false;
          } else {
            usuario.isRefugio = true;
          }
          setToken(token_parsed.token);
          const count = token_parsed.matches;
          setMatchesCount(count);
        } else {
          setIsLoggedIn(false);
        }
        primerLogin = currentUser.primer_login;
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
        initialRouteName={
          isLoggedIn
            ? currentUser.primer_login
              ? "Tabs"
              : "Tabs"
            : "LoginScreen"
        }
        //initialRouteName="test"
        screenOptions={{ headerShown: false, detachPreviousScreen: true }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ detachPreviousScreen: true }}
        />
        <Stack.Screen name="RegisterChoice" component={RegisterChoice} />
        <Stack.Screen
          name="RegisterComplete"
          component={RegisterComplete}
          options={{ detachPreviousScreen: true, gestureEnabled: false }}
        />
        <Stack.Screen name="RegisterUser" component={CreateUserForm} />
        <Stack.Screen
          name="CuestionarioUsuarioRegistro"
          component={CuestionarioUsuarioRegistro}
          options={{ detachPreviousScreen: true, gestureEnabled: false }}
        />
        <Stack.Screen name="RegisterRef" component={RegisterRef} />
        <Stack.Screen
          name="Tabs"
          component={TabNavigation}
          options={{ freezeOnBlur: true }}
        />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="test" component={RegisterPet} />
        <Stack.Screen
          name="CuestionarioUsuario"
          component={CuestionarioUsuarioRegistro}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Login";
import TabNavigation from "./TabNavigation";
import CreateUserForm from "./RegisterUser";
import RegisterChoice from "./RegisterChoice";
import RegisterRef from "./RegisterRef";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import Chat from "./tabScreens/Chat";

const Stack = createStackNavigator();


function MainNavigation() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    
    AsyncStorage.getItem("token")
      .then((token) => {
        if (token) {
          console.log("TOKEN:" + token)
          setIsLoggedIn(true);
          // console.log("TRUE EL TOKEN" + token);
          // navigation.navigate("Paw");
          
        } else {
          setIsLoggedIn(false);
          // console.log("false EL TOKEN");
          // navigation.navigate("LoginScreen");
        }
      })
      .catch((error) => {
        console.error("Error al verificar la autenticación:", error);
      })
      
  },[])


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

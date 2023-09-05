import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Importa los íconos que desees utilizar

// SCREENS
import LoginScreen from "./screens/Login";
import PersonalData from "./screens/PersonalData";
import ShowPets from "./screens/ShowPets";
import RegisterPet from "./screens/RegisterPet"; //cambiar por pantalla de matchs
import RegisterRef from "./screens/RegisterRef"; //este va a ser cambiado por otro menu asique seguramente lo borre pero me daba tock

import CircularIcon from "./components/circularIcon";

const Tab = createBottomTabNavigator();

const iconColor = "white"; // Variable para el color de los íconos

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={{
        tabBarStyle: { backgroundColor: "#7A5FB5" }, // Establece el fondo de color violeta claro
        tabBarShowLabel: false, // Oculta las etiquetas de descripción
        tabBarInactiveTintColor: "white", // Color del ícono cuando no está seleccionado
        tabBarActiveTintColor:"black"
      }}
    >
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-home" size={size} color={color} />
          ),
        }}
      />
        <Tab.Screen
          name="Perfil"
          component={PersonalData}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="ios-person" size={size} color={color} />
            ),
          }}
        />
      <Tab.Screen
        name="Pets"
        component={ShowPets}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-paw" size={50} color={color} backgroundColor={"purple"} />
          ),
        }}
      />
      <Tab.Screen
        name="Matchs"
        component={RegisterPet}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-chatbox" size={size} color={color}  />
          ),
          tabBarBadge:16,
        }}
      />
        <Tab.Screen
        name="Otro"
        component={RegisterRef}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-menu" size={40} color={color}  />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

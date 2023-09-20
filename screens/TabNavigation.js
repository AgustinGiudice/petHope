import { React, useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
// SCREENS
import LoginScreen from "./Login";
import ProfileNavigation from "./ProfileNavigation";
import ShowPets from "./tabScreens/ShowPets";
import paw from "../assets/paw.png";
import paw2 from "../assets/paw2.png";
import { View, Image, Animated, useWindowDimensions } from "react-native";
import OtrasNavegaciones from "./OtrasNavegaciones";
import MatchNavigation from "./MatchNavigation";
import ShowRefugios from "./tabScreens/ShowRefugios";
import Refugios from "./tabScreens/Refugios";
const Tab = createBottomTabNavigator();

function MyTabs() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const [routeST, setRouteST] = useState("");

  const { width, height } = useWindowDimensions();
  function getWidth() {
    return width / 5;
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#C69AE8",
            height: 60,
            borderTopWidth: 0,
          }, // Establece el fondo de color violeta claro
          tabBarShowLabel: false, // Oculta las etiquetas de descripción
          tabBarInactiveTintColor: "white", // Color del ícono cuando no está seleccionado
          tabBarActiveTintColor: "black",
        }}
      >
        <Tab.Screen
          name="ShowRefugios"
          component={LoginScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="ios-home" size={size} color={color} />
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              setRouteST(route.name);
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileNavigation}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="ios-person" size={size} color={color} />
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              setRouteST(route.name);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Paw"
          component={ShowPets}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View>
                <View
                  style={{
                    width: 83,
                    height: 83,
                    backgroundColor: "#9A34EA",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 23,
                  }}
                >
                  <Image
                    source={focused ? paw : paw2}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  ></Image>
                </View>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              setRouteST(route.name);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Matchs"
          component={MatchNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="ios-chatbox" size={size} color={color} />
            ),
            tabBarBadge: 16,
            unmountOnBlur: true,
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              setRouteST(route.name);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Otro"
          component={OtrasNavegaciones}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="ios-menu" size={40} color={color} />
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              setRouteST(route.name);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>

      {routeST !== "Paw" ? (
        <Animated.View
          style={{
            width: getWidth() - 20,
            left: 10,
            height: 2,
            backgroundColor: "black",
            position: "absolute",
            bottom: 0,
            transform: [{ translateX: tabOffsetValue }],
          }}
        ></Animated.View>
      ) : (
        <Animated.View
          style={{
            width: getWidth() - 20,
            left: 10,
            height: 1,
            opacity: 0.2,
            backgroundColor: "black",
            position: "absolute",
            bottom: 0,
            transform: [{ translateX: tabOffsetValue }],
          }}
        ></Animated.View>
      )}
    </>
  );
}

export default function TabNavigation() {
  return <MyTabs />;
}

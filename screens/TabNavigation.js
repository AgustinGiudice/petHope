import { React, useRef, useState, useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
// SCREENS
import ProfileNavigation from "./ProfileNavigation";
import ShowPets from "./tabScreens/ShowPets";
import paw from "../assets/paw.png";
import paw2 from "../assets/paw2.png";
import { View, Image, Animated, useWindowDimensions } from "react-native";
import OtrasNavigation from "./OtrasNavigation";
import MatchNavigation from "./MatchNavigation";
import Refugios from "./tabScreens/Refugios";
import { CountMatchesContext } from "../context/CountMatchesContext";
import { UserContext } from "../context/UserContext";
//IMPORTS REFUGIOS
import RegisterPetNavigation from "./RegisterPetNavigation";
import PetRefNavigation from "./PetRefNavigation";

const Tab = createBottomTabNavigator();

function MyTabs() {
  //Traer usuario y token
  const { currentUser } = useContext(UserContext);

  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const [routeST, setRouteST] = useState("");

  const { matchesCount } = useContext(CountMatchesContext);

  const { width, height } = useWindowDimensions();
  function getWidth() {
    return width / 5;
  }
  useEffect(() => {
    console.log("usuario", currentUser);
    console.log("is_REFUGIO DESDE TABNAVIGATION", currentUser.isRefugio);
    // console.log("matchesCount", matchesCount);
  }, [matchesCount]);

  return (
    <>
      <Tab.Navigator
        initialRouteName="ShowRefugios"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#C69AE8",
            height: 60,
            borderTopWidth: 0,
          }, // Establece el fondo de color violeta claro
          tabBarShowLabel: false, // Oculta las etiquetas de descripción
          tabBarInactiveTintColor: "white", // Color del ícono cuando no está seleccionado
          tabBarActiveTintColor: "black",
          unmountOnBlur: true,
        }}
      >
        <Tab.Screen
          name="ShowRefugios"
          component={currentUser.isRefugio ? RegisterPetNavigation : Refugios}
          options={{
            headerShown: false,
            unmountOnBlur: true,
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
          component={currentUser.isRefugio ? PetRefNavigation : ShowPets}
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
            tabBarBadge: matchesCount,
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
          component={OtrasNavigation}
          options={{
            unmountOnBlur: true,
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

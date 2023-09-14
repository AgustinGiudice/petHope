import {React, useRef} from "react";
import { useState } from "react";
import 'react-native-gesture-handler';
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Importa los íconos que desees utilizar


// SCREENS
import LoginScreen from "./screens/Login";
import PersonalData from "./screens/PersonalData";
import WatchMatches from "./screens/WatchMatches";
import ShowPets from "./screens/ShowPets";
import RegisterPet from "./screens/RegisterPet"; //cambiar por pantalla de matchs
import RegisterRef from "./screens/RegisterRef"; //este va a ser cambiado por otro menu asique seguramente lo borre pero me daba tock
import RegisterUser from "./screens/RegisterUser"
import paw from './assets/paw.png';
import paw2 from './assets/paw2.png';
import OtrasNavegaciones from "./screens/OtrasNavegaciones";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import { Animated } from "react-native";
import { Dimensions } from "react-native";

const Tab = createBottomTabNavigator();

function MyTabs({route}) {
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    const [routeST, setRouteST] = useState('');
  return (
    <>
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={{
          tabBarStyle: { backgroundColor: "#7A5FB5", height: 60 }, // Establece el fondo de color violeta claro
          tabBarShowLabel: false, // Oculta las etiquetas de descripción
          tabBarInactiveTintColor: "white", // Color del ícono cuando no está seleccionado
          tabBarActiveTintColor: "black",
        }}
      >
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
                <Ionicons name="ios-home" size={size} color={color} />
                ),headerShown:false,
            }}
            listeners={({navigation, route}) => ({
                tabPress: e => {
                    setRouteST(route.name);
                    Animated.spring(tabOffsetValue, {
                        toValue: 0,
                        useNativeDriver: true
                    }).start();
                }
            })}
            />
        <Tab.Screen
          name="Perfil"
          component={RegisterUser}
          options={{
              tabBarIcon: ({ size, color }) => (
                  <Ionicons name="ios-person" size={size} color={color} />
                  ),
                  headerShown:false,
                }}
                listeners={({navigation, route}) => ({
                    tabPress: e => {
                        setRouteST(route.name);
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth(),
                            useNativeDriver: true
                        }).start();
                    }
                })}
                />
        <Tab.Screen
          name="Paw"
          component={ShowPets}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View>
                <View
                  style={{
                    width: 83,
                    height: 83,
                    backgroundColor: "#5D2CC7",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems:"center",
                    marginBottom:23,
                    zIndex:999
                }}>
                    <Image source={focused? paw : paw2} style={{
                        width: 50,
                        height:50,
                    }}></Image>
                </View>
            </View>

          ),headerShown:false
        }}
        listeners={({ navigation, route }) => ({
            tabPress: e => {
                // Agrega una condición para ocultar el Animated.View en la pantalla "Paw"
                if (route.name == "Paw") {
                    console.log(route);
                    setRouteST(route.name);
                    console.log(routeST);
                    Animated.spring(tabOffsetValue, {
                        toValue: getWidth() * 2,
                        useNativeDriver: true
                    }).start();
                }
            }
        })}
        />
      <Tab.Screen
        name="Matchs"
        component={WatchMatches}
        options={{
            tabBarIcon: ({ size, color }) => (
                <Ionicons name="ios-chatbox" size={size} color={color}  />
                ),
          tabBarBadge:16,
        }}
        listeners={({navigation, route}) => ({
            tabPress: e => {
                console.log(route);
                setRouteST(route.name);
                console.log(routeST);
                console.log(tabOffsetValue);
                Animated.spring(tabOffsetValue, {
                    toValue: getWidth() *3,
                    useNativeDriver: true
                }).start();
            }
        })}
        />
        <Tab.Screen
        name="Otro"
        component={OtrasNavegaciones}
        options={{
            tabBarIcon: ({ size, color }) => (
                <Ionicons name="ios-menu" size={40} color={color}  />
                )
            }}
            listeners={({navigation, route}) => ({
                tabPress: e => {
                    setRouteST(route.name);
                    Animated.spring(tabOffsetValue, {
                        toValue: getWidth()*4,
                        useNativeDriver: true
                        
                    }).start();
                    console.log(tabOffsetValue);
                }
            })}
            />
    </Tab.Navigator>
    
    {routeST !== "Paw" ? (
                    <Animated.View style={{
                        width: getWidth() - 20,
                        left: 10,
                        height: 2,
                        backgroundColor: "black",
                        position: "absolute",
                        bottom: 0,
                        zIndex:1,
                        transform: [
                            { translateX: tabOffsetValue }
                        ]
                    }}>
                    </Animated.View>
                ):(
                    <Animated.View style={{
                        width: getWidth() - 20,
                        left: 10,
                        height: 0,
                        backgroundColor: "black",
                        position: "absolute",
                        bottom: 0,
                        zIndex:1,
                        transform: [
                            { translateX: tabOffsetValue }
                        ]
                    }}>
                    </Animated.View>
                )}

      <Animated.View
        style={{
          width: getWidth() - 20,
          left: 10,
          height: 1,
          backgroundColor: "black",
          position: "absolute",
          bottom: 60,

          transform: [{ translateX: tabOffsetValue }],
        }}
      ></Animated.View>
    </>
  );
}

function getWidth() {
  let width = Dimensions.get("window").width;
  return width / 5;
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

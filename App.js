import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "react-native-web";
// NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./Navigation";
// SCREENS
import Login from "./screens/Login";
import Home from "./screens/Home";
import Match from "./screens/Match";
import RegisterUser from "./screens/RegisterUser";
import RegisterRef from "./screens/RegisterRef";
import RegisterPet from "./screens/RegisterPet";
import ShowPets from "./screens/ShowPets";
import PersonalData from "./screens/PersonalData";


//COMPONENTS
import Menu from "./components/Menu";

//CONTEXT
import { AuthContextProvider } from "./context/AuthContext";


export default function App() {
  
  return (
    <Navigation />
  );
}


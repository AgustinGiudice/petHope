import { StyleSheet } from "react-native";
import { StatusBar } from "react-native-web";
// NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// SCREENS
import Login from "./screens/Login";
import Home from "./screens/Home";
import Match from "./screens/Match";
import RegisterUser from "./screens/RegisterUser";
import RegisterRef from "./screens/RegisterRef";
import RegisterPet from "./screens/RegisterPet";
import ShowPets from "./screens/ShowPets";
import PersonalData from "./screens/PersonalData";

//CONTEXT
import { AuthContextProvider } from "./context/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar styles="light" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterUser"
            component={RegisterUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterRef"
            component={RegisterRef}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "uHH esto sirve para cambiar titulo" }}
          />
          <Stack.Screen
            name="Matchs"
            component={Match}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Pet"
            component={RegisterPet}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShowPets"
            component={ShowPets}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Personal"
            component={PersonalData}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

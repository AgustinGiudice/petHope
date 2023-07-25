import { StyleSheet, Text, View } from "react-native";
import CustomComponent from "./components/CustomComponent";
import HamburguerMenu from "./components/HamburguerMenu";
import Menu from "./components/Menu";

// NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// SCREENS
import Home from "./screens/home";
import Match from "./screens/Match";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <View style={styles.container}>
        <HamburguerMenu />
        <CustomComponent />
        <Menu />
      </View> */}
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'uHH esto sirve para cambiar titulo' }}/>
        <Stack.Screen name="Matchs" component={Match} options={{ headerShown: false }}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
})
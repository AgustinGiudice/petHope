import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Login";
import TabNavigation from "./TabNavigation";
import CreateUserForm from "./RegisterUser";
import RegisterChoice from "./RegisterChoice";
import RegisterRef from "./RegisterRef";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="RegisterUser"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterChoice" component={RegisterChoice} />
        <Stack.Screen name="RegisterUser" component={CreateUserForm} />
        <Stack.Screen name="RegisterRef" component={RegisterRef} />
        <Stack.Screen name="Tabs" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;

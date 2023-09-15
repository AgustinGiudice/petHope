import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Login";
import TabNavigation from "./TabNavigation";
import CreateUserForm from "./RegisterUser";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Register User Screen" component={CreateUserForm} />
        <Stack.Screen name="Tabs" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;

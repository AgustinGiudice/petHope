import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Login";
import WatchMatches from "./tabScreens/WatchMatches";
import Chat from "./tabScreens/Chat";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function MatchNavigation() {
  return (
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Match" component={WatchMatches} />
      <Stack.Screen name="Chat" component={Chat} />
        
      </Stack.Navigator>
  );
}

export default MatchNavigation;

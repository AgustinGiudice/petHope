import { createStackNavigator } from "@react-navigation/stack";
import WatchMatches from "./tabScreens/WatchMatches";
import Chat from "./tabScreens/Chat";

const Stack = createStackNavigator();

function MatchNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Match"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Match" component={WatchMatches} />
      <Stack.Screen name="Chatarat" component={Chat} />
    </Stack.Navigator>
  );
}

export default MatchNavigation;
